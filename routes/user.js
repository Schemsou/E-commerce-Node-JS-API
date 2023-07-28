const router = require("express").Router();

router.get("/usertest", (req, res) => res.json({ message: "tested" }));

router.post("/userpost", (req,res)=>{
    const username = req.body.username;
    res.status(200).json({ message: `Your name is ${username}` })
})

module.exports = router;
