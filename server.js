const express = require("express");
const AccountsRouter = require("./accounts-router");
const server = express();

server.use(express.json());
server.use("/api/posts", AccountsRouter);

module.exports = server;
