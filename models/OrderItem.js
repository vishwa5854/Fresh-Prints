const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema(
    {
        OrderNumber : {
            type : String,
            required : true,
            unique : true
        },
        OrderItem : {
            type : String,
            required : true
        },
        OrderDescription : {
            type : String
        },
        OrderNo : {
            type :Number
        }
    }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema, "OrderItem");

const getOrderItems = (OrderNumber, cb) => {
    OrderItem.find({OrderNumber : OrderNumber}).lean().exec(
        (err, data) => {
            if(err){
                console.error(err);
                cb(err, null);
            }
            else if(err === null && data === null){
                console.error("Error while getting order item of an order : " + OrderNumber);
                cb(true, null);
            }
            else {
                cb(false, data);
            }
        }
    );
}


module.exports = {
    getOrderItems : getOrderItems
}

