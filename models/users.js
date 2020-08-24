const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        UserName: {
            type: String,
            required: true,
            trim: true,
        },
        Email : {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        Password: {
            type: String,
            required: true,
            minLength: 7,
        },
        FullName: {
            type : String
        },
        PhoneNumber: {
            type : String,
        }
    }
);


let users = mongoose.model("users", userSchema, "users");

const saveUser = function (user, cb) {
    bcrypt.hash(user.Password, 2,
        (err, hash) => {
            let newUser = new users(
                {
                    UserName : user.UserName,
                    Password: hash,
                    Email: user.Email,
                    FullName : user.FullName,
                    PhoneNumber : user.PhoneNumber,
                }
            );
            newUser.save(
                 (err, data) => {
                    if(err){
                        cb(err, data);
                    }
                    else {
                        delete data["Password"];
                        cb(err, data);
                    }
                }
            );
        }
    );
};


const validateUserCredentials =  (user, cb) => {
    users.findOne({Email : user.Email}).lean().exec(function (err, data) {
        if (data.length === 0) {
            cb("user not present", null);
        }
        else {
            let userFromDB = data;
            bcrypt.compare(user.Password, userFromDB.Password,
                 (err, isMatch) => {
                    if (err) {
                        return cb(err, null);
                    }
                    else if (isMatch) {
                        delete userFromDB["Password"];
                        cb(null, userFromDB);
                    }
                    else {
                        cb("Authentication Failed", null);
                    }
                }
            );
        }
    });
};


module.exports = {
    saveUser: saveUser,
    validateUserCredentials: validateUserCredentials,
};
