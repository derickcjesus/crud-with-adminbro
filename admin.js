// Database
const mongoose = require("mongoose");
const { Script } = require("vm");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: Script,
  completed: Boolean,
  created_at: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

// Admin Bro
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

// use mongoose in adminbro
AdminBro.registerAdapter(AdminBroMongoose);

// config
const adminBroOptions = new AdminBro({
  resources: [Project],
  rootPath: "/admin",
});
const router = AdminBroExpress.buildRouter(adminBroOptions);

// Server
const express = require("express");
const server = express();

server.use(adminBroOptions.options.rootPath, router);

// Run app
const run = async () => {
  await mongoose.connect("mongodb://localhost/adminbroapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await server.listen(5500, () => console.log("Server started"));
};

run();
