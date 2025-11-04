import express from "express";
import cors from "cors";

const app = express ();
const PORT = 4000;

//Middleware
app.use(cors()); //allow our middleware to use CORS
app.use(express.json()); //parse incoming JSON bodies

//Route
app.get("/", (req, res) => {
    res.send("Football Game API is running")
});

//Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));