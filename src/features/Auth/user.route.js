const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express.Router();
const User = require("./user.model");
const SECRET_KEY = process.env.SECRET_KEY;


app.post("/signup", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();
        if (user) return res.status(400).send("User already exists");

        let domain = req.body.email.split("@")[1];
        domain === "masaischool.com"
            ? (req.body.type = "admin")
            : (req.body.type = "user");

        let pass = await bcrypt.hash(req.body.password, 10);
        user = await User.create({
            ...req.body,
            password: pass,
        });
        return res
            .status(201)
            .send({ user, message: "User created Successfully" });
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            let pass = await bcrypt.compare(password, user.password);
            if (!pass) {
                return res.send("incorrect password");
            } else {
                let token = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                    },
                    SECRET_KEY
                );
                return res.send({ user, token, message: "Login Successfully" });
            }
        } else {
            return res.status(404).send("You have to signup first");
        }
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = app;