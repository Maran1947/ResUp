const User = require('../models/User');
const Goal = require('../models/Goal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { TokenExpiredError } = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);

    let errors = { email: '', password: '' };

    if(err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    if(err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    // duplicate error code
    if(err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, 'resup secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (req,res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username,email,password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ token: token, message: "Registered successfully!" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req,res) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ token: token, message: "Log in successfully!" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

    res.send('new user login');
}

module.exports.logout_get = async (req,res) => {
    // console.log('request coming')
    res.cookie('jwt', '', { maxAge: 1 });
    // res.redirect('/');
    res.status(200).json({ success: true, message: "Logout successfully!" })
}

module.exports.set_goal = async (req,res) => {
    const { token, type, goal } = req.body;
    const decode = jwt.verify(token, 'resup secret');
    const data = {
        userId: decode.id,
        yearlyGoal: type === "yearlyGoal" ? goal : "",
        monthlyGoal: type === "monthlyGoal" ? goal : ""
    }
    try {
        const new_goal = await Goal.find({ "userId": decode.id });
        console.log(new_goal);
        if (new_goal.length === 0) {
            try {
                const newGoal = new Goal(data);
                const savedGoal = await newGoal.save(newGoal);
                res.status(200).json({ success: true, message: "✅ Successfully set!" });
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            try {
                console.log(type, goal);
                let response;
                if(type === "yearlyGoal") {  response = await Goal.findOneAndUpdate({ userId: decode.id },{ $set: { yearlyGoal: goal } }); }
                else {  response = await Goal.findOneAndUpdate({ userId: decode.id },{ $set: { monthlyGoal: goal } }); }
                console.log(response);
                res.status(201).json({ success: true, message: "✅ Set successfully!" });
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports.get_goal = async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'resup secret');
    try {
        const userGoal = await Goal.find({ "userId": decoded.id });
        return res.status(200).json({ userGoal });
    } catch (err) {
        return res.status(500).json(err);
    }
}