const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        OrderNumber : {
            type : Number,
            required : true,
            unique : true
        },
        OrderDate : {
            type : String,
            required : true
        },
        OrderDescription : {
            type : String
        },
        UserId : {
            type : String,
            required : true
        }
    }
);

const Order = mongoose.model("Order", orderSchema, "Order");

const getAll = (UserId, cb) => {
    Order.find({UserId : UserId}).lean().exec(
        (err, data) => {
            if(err){
                console.error(err);
                cb(err, null);
            }
            else if(err === null && data === null){
                console.error("Error while getting all orders of user : " + UserId);
                cb(true, null);
            }
            else {
                cb(false, data);
            }
        }
    );
}

const getOrderNumber = (UserId, cb) => {
    Order.findOne({UserId : UserId}).lean().exec(
        (err, data) => {
            if(err){
                console.error(err);
                cb(err, null);
            }
            else if(err === null && data === null){
                console.error("Error while getting all orders of user : " + UserId);
                cb(true, null);
            }
            else {
                cb(false, data['OrderNumber']);
            }
        }
    );
}

module.exports = {
    getAll :getAll,
    getOrderNumber : getOrderNumber
}
