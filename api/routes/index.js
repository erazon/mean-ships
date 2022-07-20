const express= require("express");

const router= express.Router();
const shipsController= require("../controllers/ships.controllers");

router.route("/ships")
        .get(shipsController.getAll);

router.route("/ships/:shipId") // issue 5
        .get(shipsController.getOne);

module.exports= router;