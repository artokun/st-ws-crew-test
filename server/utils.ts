import { Server } from "bun";

export const serveStatic = async (req: Request, server: Server) => {
  const path = new URL(req.url).pathname;
  const wsUrl = `${server.hostname}:${server.port}/live-reload`;
  const filePath = `public${path}`;

  if (req.url === `http://${wsUrl}`) {
    const upgraded = server.upgrade(req);

    if (!upgraded) {
      return new Response(
        "Failed to upgrade websocket connection for live reload",
        { status: 400 }
      );
    }
    return;
  }

  if (path === "/") {
    const originalHtml = await Bun.file("public/index.html").text();
    const liveReloadScript = makeLiveReloadScript(wsUrl);
    const html = originalHtml.replace("</body>", `${liveReloadScript}</body>`);
    return new Response(html, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  const file = Bun.file(filePath);

  if (await file.exists()) {
    return new Response(file);
  }

  server.upgrade(req, {
    data: {},
  });

  return new Response("Not found", { status: 404 });
};

const reloadCommand = "reload";

export const makeLiveReloadScript = (wsUrl: string) => `
<!-- start bun live reload script -->
<script type="text/javascript">
  (function() {
    const socket = new WebSocket("ws://${wsUrl}");
      socket.onmessage = function(msg) {
      if(msg.data === '${reloadCommand}') {
        location.reload()
      }
    };
    console.log('Live reload enabled.');
  })();
</script>
<!-- end bun live reload script -->
`;
