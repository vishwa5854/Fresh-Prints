let express = require('express');
let router = express.Router();
let ItemMaster = require("../models/ItemMaster");
let Order = require("../models/Order");
let OrderItem = require("../models/OrderItem");
let util = require("../util/util");


// I will get the user id from the jwt validation as req.usr
router.get("/:itemName",
    (req, res) => {
        ItemMaster.get(req.params.itemName,
            (err, data) => {
                if(err){
                    res.send(util.Failure(err));
                }
                else {
                    res.send(util.Success(data));
                }
            }
        );
    }
);

router.get("/",
    (req, res) => {
        ItemMaster.getAll(
            (err, data) => {
                if(err){
                    res.send(util.Failure(err));
                }
                else {
                    res.send(util.Success(data));
                }
            }
        );
    }
);

module.exports = router;
