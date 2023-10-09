/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Manager } from "./Manager";
import { LoaderScene } from "./scenes/LoaderScene";

Manager.initialize(0x6495ed);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);
