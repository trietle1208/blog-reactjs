const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuid} = require('uuid')
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        if(!name || !email || !password) {
            return next(new HttpError("Fill in all fiedls", 400))
        }

        const newEmail = email.toLowerCase()
        const emailExists = await User.findOne({email: newEmail})

        if(emailExists) {
            return next(new HttpError("Email already exists", 400))
        }

        if((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters", 400))
        }

        if(password != password2) {
            return next(new HttpError("Password confirm do not match", 400))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPass
        })

        res.status(201).json(`New user ${newUser.email} registed.`)
    } catch (error) {
        return next(new HttpError(error, 400))
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return next(new HttpError("Fill in all fiedls", 400))
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail});

        if(!user) {
            return next(new HttpError("Invalid credentials", 400))
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if(!comparePass) {
            return next(new HttpError("Invalid credentials", 400))
        }

        const {_id: id, name} = user;

        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, name})
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials", 422))
    }
}

const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id).select('-password');
        
        if(!user) {
            return next(new HttpError("User not found", 404))
        }

        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError("Get user failed. Please check your requests", 422))
    }
}

const editUser = async (req, res, next) => {
    try {
        const {name, email, currentPassword, newPassword, newConfirmNewPassword} = req.body;

        if(!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const user = await User.findById(req.user.id);

        if(!user) {
            return next(new HttpError("User not found", 404))
        }

        const emailExists = await User.findOne({email})

        if(emailExists && (emailExists._id != req.user.id)) {
            return next(new HttpError("Email already exists", 404))
        }

        const validateUserPassword = await bcrypt.compare(currentPassword, user.password)

        if(!validateUserPassword) {
            return next(new HttpError("Invalid current password", 422))
        }

        if(newPassword != newConfirmNewPassword) {
            return next(new HttpError("New passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)
    } catch (error) {
        return next(new HttpError("Update user failed. Please check your requests", 422))
    }
}

const changeAvatar = async (req, res, next) => {
    try {
        if(!req.files.avatar) {
            return next(new HttpError("Please choose an image", 422))
        }

        // find user from database
        const user = await User.findById(req.user.id)

        //delete old avatar if exists
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar} = req.files

        if(avatar.size > 500000) {
            return next(new HttpError("Profile picture too big. Should be less than 500kb", 422))
        }

        let fileName;
        fileName = avatar.name;

        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {
                avatar: newFileName
            }, {
                new: true
            })

            if(!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed", 422))
            }

            res.status(200).json(updatedAvatar)
        })
    } catch (error) {
        return next(new HttpError("Change avatar failed. Please check your requests", 422))
    }
}

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');

        res.json(authors);
    } catch (error) {
        return next(new HttpError("Get authors failed. Please check your requests", 422))
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    getAuthors,
    editUser
}