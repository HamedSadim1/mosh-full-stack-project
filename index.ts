import concurrently from "concurrently";

// Run both the server and client concurrently using the concurrently package
concurrently([
  {
    name: "server",
    command: "bun run dev",
    prefixColor: "green",
    cwd: "packages/server",
  },
  {
    name: "client",
    command: "bun run dev",
    prefixColor: "blue",
    cwd: "packages/client",
  },
]);
