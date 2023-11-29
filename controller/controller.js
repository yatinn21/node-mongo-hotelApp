const User = require('../db/userModel');
const Hotel = require('../db/hotelModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'THISISSECRET';

exports.register = async (req, res) => {
    let userData = await User.findOne({ email: req.body.email });
    if (userData) {
        return res.send({ msg: 'User already registered' })
    }
    console.log(req.body.email)

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ email: req.body.email, password: hashedPassword, role: req.body.role });
    // const newUser = new User({ email: req.body.email, password: hashedPassword, role: req.body.role });
    // await newUser.save();

    return res.json({ msg: 'User registration successful' });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    let userData = await User.findOne({ email: email });
    if (!userData) {
        return res.send({ msg: 'User not register.' });
    }

    const validPswd = await bcrypt.compare(password, userData.password);
    if (!validPswd) {
        return res.send({ msg: 'Invalid password.' })
    }

    const token = jwt.sign({ role: userData.role }, SECRET_KEY);
    return res.json({ userData, token });
}

exports.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.send({ msg: 'Token missing' })
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('err', err)
            return res.send({ msg: 'token not valid' })
        }
        req.user = decoded;
        // console.log('decoded', req.user);
        // return res.send({ decoded: decoded })
        next();
    })
}

exports.addData = async (req, res) => {
    const { hotelName, hotelKind } = req.body;
    await Hotel.create({ hotelName: hotelName, hotelKind: hotelKind });
    return res.send({ msg: 'Data added successfully' });
}

exports.getAll = async (req, res) => {
    const hotels = await Hotel.find();
    return res.send({ hotels });
}

exports.getHotelById = async (req, res) => {
    try {
        console.log(req.params)
        const hotel = await Hotel.find({ hotelName: req.params.id });

        if (!hotel) {
            return res.status(404).json({ msg: 'No hotel found' });
        }

        return res.json({ hotel });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

exports.update = async (req, res) => {
    console.log(req.body);
    try {
        const { hotelName, hotelKind } = req.body;
        const updateId = req.params.id;
        const update = await Hotel.findByIdAndUpdate(updateId, { hotelName, hotelKind });
        if (!update) {
            return res.status(404).json({ msg: 'No hotel found' });
        }
        return res.json({ msg: 'Updated successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error', err: error });
    }
}

exports.delete = async (req, res) => {
    try {
        const deleteId = req.params.id;
        const deleted = await Hotel.findByIdAndDelete(deleteId);
        if (!deleted) {
            return res.status(404).json({ msg: 'No hotel found' });
        }
        return res.json({ msg: 'Deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error', err: error });
    }
}

