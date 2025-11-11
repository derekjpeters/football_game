import express from 'express';
const router = express.Router()

//Mock data for get request
let gameState = {
    score: {HOME: 0, AWAY: 0},
    possession: "HOME",
    quarter: 1,
    status: "IN_PROGRESS",
    yardline: 25, //0..10 left -> right
    homeTeamName: "Home Ravens",
    awayTeamName: "Away DaBears",
};

//GET /api/game
router.get("/", (req, res) => {
    console.log("Current gameState", gameState)
    res.json(gameState);
});

//Patch /api/game/score {team, delta}
router.patch("/score", (req, res) => {
    const { team, delta } = req.body || {};
    if (team !== "HOME" & team !== "AWAY") 
        return res.status(400).json({error: "Invalid team"});
    gameState.score[team] += Number(delta) || 0; //{HOME: 0, AWAY: 0}
    return res.json(gameState);
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