const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "src/main.js", // Punto de entrada para la aplicación pública
      template: "public/index.html",
      filename: "index.html",
      title: "Public App",
    },
    admin: {
      entry: "src/admin/admin-main.js", // Punto de entrada para la aplicación admin
      template: "public/admin.html", // Asegúrate de tener este archivo
      filename: "admin.html",
      title: "Admin App",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
