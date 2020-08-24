let express = require('express');
let router = express.Router();
const UserDB = require("../models/users");
let jwt = require("../middlewares/jwt");
const util = require("../util/util");


router.post('/createUser',
    (req, res, next) => {
        if (!req.body.Email || !req.body.Password || !req.body.UserName || !req.body.FullName || !req.body.PhoneNumber) {
            res.json(util.Failure("Invalid Email, Password or name"));
        }
        else {
            req.body.Email = req.body.Email.toLowerCase();
            UserDB.saveUser(req.body,
                (error, data) => {
                    if (error) {
                        res.send(util.Failure("user already present"));
                    }
                    else {
                        res.send(util.Success(data, "user registered successfully"));
                    }
                }
            );
        }
    }
);

router.post("/validateUser",
    (req, res, next) => {
        if (!req.body.Email || !req.body.Password) {
            res.json(util.Failure("Invalid Email or Password"));
        }
        else {
            req.body.Email = req.body.Email.toLowerCase();
            UserDB.validateUserCredentials(req.body,
                (error, data) => {
                    if (error) {
                        res.send(util.Failure(error));
                    }
                    else {
                        jwt.generateToken(data,
                            (token) => {
                                data["token"] = token;
                                res.send(util.Success(data, "user login success"));
                            }
                        );
                    }
                }
            );
        }
    }
);

router.get("/", (req, res) => {
    res.send(util.Success("Authentication","hey in auth page"))
});

module.exports = router;
