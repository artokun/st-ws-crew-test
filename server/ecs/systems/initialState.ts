import { Commands, Entity, EventReader, Query, Res, With } from "thyseus";
import flatbuffers from "flatbuffers";
import { ConnectEvent, DisconnectEvent } from "../events/connectionEvents";
import { WSS } from "../resources/wss";
import { Client } from "../entities/client";
import { IsPlayer } from "../components/is-player";
import { Position } from "../components/position";
import {
  GameState,
  MessageType,
  Player,
  Vec2,
} from "../../flatbuffers/game-state";

export function handleClientConnectSystem(
  commands: Commands,
  players: Query<[Entity, Position], With<IsPlayer, Position>>,
  connectEvents: EventReader<ConnectEvent>,
  wss: Res<WSS>
) {
  if (connectEvents.length === 0) return;

  let builder = new flatbuffers.Builder(1);

  const playersPositions = [];

  for (const [entity, position] of players) {
    Player.startPlayer(builder);
    Player.addId(builder, Number(entity.id));
    Player.addPosition(
      builder,
      Vec2.createVec2(builder, position.x, position.y)
    );
    playersPositions.push(Player.endPlayer(builder));
  }

  const playersVector = GameState.createPlayersVector(
    builder,
    playersPositions
  );

  GameState.startGameState(builder);
  GameState.addMessageType(builder, MessageType.InitialState);
  GameState.addPlayers(builder, playersVector);
  const gameState = GameState.endGameState(builder);
  builder.finish(gameState);
  const buffer = builder.asUint8Array();

  const game = GameState.getRootAsGameState(
    new flatbuffers.ByteBuffer(buffer)
  ).unpack();

  console.log(JSON.stringify(game));

  for (const client of connectEvents) {
    commands.spawn().add(Client.from(client.wsClientId));
    wss.sendBuffer(client.wsClientId, buffer);
    wss.broadcast(`Player ${client.wsClientId} connected`);
  }

  connectEvents.clear();
}

export function handleClientDisconnectSystem(
  commands: Commands,
  clients: Query<[Entity, Client], With<Client>>,
  disconnectEvents: EventReader<DisconnectEvent>,
  wss: Res<WSS>
) {
  if (disconnectEvents.length === 0) return;

  const disconnectingClients = [];
  for (const disconnectClient of disconnectEvents) {
    disconnectingClients.push(disconnectClient.wsClientId);
  }

  if (disconnectingClients.length > 0) {
    for (const [entity, client] of clients) {
      if (disconnectingClients.includes(client.wsClientId)) {
        commands.despawn(entity);
        wss.broadcast(`Player ${client.wsClientId} disconnected`);
      }
    }
  }

  disconnectEvents.clear();
}
