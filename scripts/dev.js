import net from "net";
import { spawn } from "child_process";

const DEFAULT_PORT = Number(process.env.PORT) || 3002;

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "0.0.0.0");
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    port++;
  }
  return port;
}

const port = await findAvailablePort(DEFAULT_PORT);
if (port !== DEFAULT_PORT) {
  console.log(`Port ${DEFAULT_PORT} is in use — starting on ${port} instead.\n`);
}

const child = spawn("next", ["dev", "-p", String(port)], {
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
