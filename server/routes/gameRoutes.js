import express from "express";
const router = express.Router();

//Mock data for get request
let gameState = {
	score: { HOME: 0, AWAY: 0 },
	possession: "HOME",
	quarter: 1,
	status: "IN_PROGRESS",
	yardline: 25, //0..10 left -> right
	homeTeamName: "Home Ravens",
	awayTeamName: "Away DaBears",
};

//GET /api/game
router.get("/", (req, res) => {
	console.log("Current gameState", gameState);
	res.json(gameState);
});

//Patch /api/game/score {team, delta}
router.patch("/score", (req, res) => {
	const { team, delta } = req.body || {};
	if (team !== "HOME" && team !== "AWAY")
		return res.status(400).json({ error: "Invalid team" });
	gameState.score[team] += Number(delta) || 0; //{HOME: 0, AWAY: 0}
	return res.json(gameState);
});

//Patch /api/game/possession
router.patch("/possession", (req, res) => {
	const { team } = req.body || {};
	if (team !== "HOME" && team !== "AWAY")
		return res.status(400).json({ error: "Invalid team" });
	gameState.possession = team;
	return res.json(gameState);
});

//Patch /api/game/yardline { delta } <- used for the mini-game
router.patch("/yardline", (req, res) => {
	const { delta } = req.body || {};
	const step = Number(delta) || 0;
	gameState.yardline = Math.min(100, Math.max(0, gameState.yardline + step));
	return res.json(gameState);
});

//POST /api/game/teams { homeTeamId, awayTeamId } <- this will map to the teams for selection for the start of the game
router.post("/teams", (req, res) => {
	const { homeTeamId, awayTeamId } = req.body || {};
	//Map ids -> names (in our mock data in teamRoutes.js)
	const homeMap = { 1: "Home Ravens", 2: "Home Cowboys" };
	const awayMap = { 3: "Away DaBears", 4: "Away Dolphins" };
	if (homeTeamId in homeMap) gameState.homeTeamName = homeMap[homeTeamId];
	if (awayTeamId in awayMap) gameState.awayTeamName = awayMap[awayTeamId];
	return res.json(gameState);
});

//POST -> Reset Game
router.post("/reset", (req, res) => {
	gameState = {
		score: { HOME: 0, AWAY: 0 },
		possession: "HOME",
		quarter: 1,
		status: "IN_PROGRESS",
        yardline: 25,
        homeTeamName: gameState.homeTeamName,
	};
	res.json({ message: "Game Reset", gameState });
});

export default router;

/*
router.post("/users", (req, res) => {
    const {user, password} = req.body || {};
    if (!user || !password) {
    return res.status(400).json({error: "Not a valid username/password"});
    }

    const newUser = {
    id: Date.now()
    name,
    password, (encrypted)
    }

    return res.status(201).json({
    message: "Account Created Successfully",
    user: "newUser"
    })

    }

    frontEnd *** This is a note only ****

    await fetch("http:localhost:4000/api/users", {
        method: "POST",
        headers: {"Content-Type": application/json},
        body: JSON.stringify({name: "depeters", password: **************})
    })

    {
        "message": "Account Created Successfully",
        "user": {
            "id": 1099,
            "user_name": depeters,
            "password": AZ123215647-************2@@@@@@@$#$%#%$^$%^%$&$ABC
        }
    }




*/
