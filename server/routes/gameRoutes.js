import express from 'express';
const router = express.Router()

//Mock data for get request
let gameState = {
    score: {HOME: 21, AWAY: 7},
    possession: "AWAY",
    quarter: 3,
    status: "IN_PROGRESS"
};

//GET -> Return Mock GameState
router.get("/", (req, res) => {
    console.log("Current gameState", gameState)
    res.json(gameState);
});

//POST -> Reset Game
router.post("/reset", (req, res) => {
    gameState= {
        score: {HOME: 0, AWAY: 0},
        possession: "HOME",
        quarter: 1,
        status: "IN_PROGRESS"
    };
    res.json({message: "Game Reset", gameState})
})

export default router;