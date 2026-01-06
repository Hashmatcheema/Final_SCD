//api-gateway/server.js
const express = require("express");
const proxy = require("express-http-proxy");
const app = express();

app.use("/auth", proxy("http://auth-service:4001"));
app.use("/users", proxy("http://patient-service:4002"));
app.use("/doctors", proxy("http://doctor-service:4003"));
app.use("/appointments", proxy("http://appointment-service:4004"));

app.get("/health", (_, res) => res.send("Gateway OK"));

app.listen(4000, () => console.log("API Gateway on 4000"));
