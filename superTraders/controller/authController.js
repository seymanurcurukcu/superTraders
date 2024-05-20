const User = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
require('dotenv').config({
    path: `${process.cwd()}/.env`
});

const generateToken = (payload) => {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    // ExpiresIn value validation
    if (!expiresIn || (!/^\d+$/.test(expiresIn) && !/^\d+[smhd]$/.test(expiresIn))) {
        throw new Error('"expiresIn" should be a number of seconds or string representing a timespan');
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn,
    });
};

const signup = catchAsync(async (req, res, next) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new AppError('Passwords do not match', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });

    if (!newUser) {
        return next(new AppError('Failed to create the user', 400));
    }

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({ id: result.id });

    return res.status(201).json({
        status: 'success',
        data: result,
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({ id: user.id });

    return res.json({
        status: 'success',
        token,
    });
});

module.exports = { signup, login };
