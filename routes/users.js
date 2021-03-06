var express = require('express');
var router = express.Router();
let Order = require("../models/Order");
let OrderItem = require("../models/OrderItem");
let util = require("../util/util");
let ItemMaster = require("../models/ItemMaster");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



router.get('/orders', (req, res) => {
    Order.getOrderNumber(req.usr._id, (err, orderNumber) => {
        if(err){
            res.send(util.Failure(err));
        }
        else {
            OrderItem.getOrderItems(orderNumber,
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
    });
});

router.get("/orderedItems/", (req, res) => {
    Order.getOrderNumber(req.usr._id, (err, orderNumber) => {
        if(err){
            res.send(util.Failure(err));
        }
        else {
            OrderItem.getOrderItems(orderNumber,
                (err, data) => {
                    if(err){
                        res.send(util.Failure(err));
                    }
                    else {
                        let ans = data;
                        for (let i=0; i<data.length; i++){
                            ItemMaster.get(data[i]['OrderItem'], (err, DATA) => {
                                if(err){
                                    res.send(util.Failure(err));
                                }
                                else {
                                    ans[i]['OrderItem'] = DATA;
                                }
                                if(i === data.length - 1){
                                    res.send(util.Success(ans));
                                }
                            });
                        }
                    }
                }
            );
        }
    });
});

router.get("/orderItems/:OrderNumber/", (req, res, next) => {
    req.OrderNumber = req.params.OrderNumber;
    console.log("here")
    OrderItem.getOrderItems(req.params.OrderNumber,
        (err, data) => {
            if(err){
                res.send(util.Failure(err));
            }
            else {
                let ans = data;
                for (let i=0; i<data.length; i++){
                    ItemMaster.get(data[i]['OrderItem'], (err, DATA) => {
                        if(err){
                            res.send(util.Failure(err));
                        }
                        else {
                            ans[i]['OrderItem'] = DATA;
                        }
                        if(i === data.length - 1){
                            res.send(util.Success(ans));
                        }
                    });
                }
            }
        }
    );
})

router.get("/orders/:OrderNumber",
    (req, res) => {
        OrderItem.getOrderItems(req.params.OrderNumber,
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
