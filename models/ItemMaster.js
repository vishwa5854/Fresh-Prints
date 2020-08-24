const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        ItemName : {
            type : String,
            required : true,
            unique : true
        },
        ItemDescription : {
            type : String
        }
    }
);

const ItemMaster = mongoose.model("ItemMaster", itemSchema, "ItemMaster");

const get = (ItemName, cb) => {

    ItemMaster.findOne({ItemName : ItemName}).lean().exec(
        (err, data) => {
            if(err){
                console.error(err);
                cb(err, null);
            }
            else if(err === null && data === null){
                console.error("Error while getting item of an order : " + ItemName);
                cb(true, null);
            }
            else {
                cb(false, data);
            }
        }
    );
}

const getAll = (cb) => {
    ItemMaster.find({}).lean().exec(
        (err, data) => {
            if (err) {
                console.error(err);
                cb(err, null);
            } else if (err === null && data === null) {
                console.error("Error while getting item of an order : " + ItemName);
                cb(true, null);
            } else {
                cb(false, data);
            }
        }
    );
}

module.exports = {
    get : get,
    getAll : getAll
}