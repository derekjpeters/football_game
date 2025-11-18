// src/api/client.ts
import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: { "Content-Type": "application/json" },
});

export default api

/*
api.get("/game")

*** Axios will automatically turn it into ***
GET http://localhost:4000/api/game

api.post("/game/reset", some: "data")
*/