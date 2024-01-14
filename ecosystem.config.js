module.exports = {
  apps: [
    {
      name: "admin-front-yeap-delivery",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "128M",
    },
    {
      name: "admin-front-json-server",
      script: "npx",
      args: "json-server --watch db.json --port 3333",
    },
  ],
};
