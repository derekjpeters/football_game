import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"

const app = express ();
const PORT = 4000;

//Middleware
app.use(cors()); //allow our middleware to use CORS
app.use(express.json()); //parse incoming JSON bodies

//Routes
app.use("/api/game", gameRoutes);
app.use("/api/teams", teamRoutes);

//Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));