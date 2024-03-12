import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";




export const signup = async (req, res) => {
    const { username, email, password, roles } = req.body;
    try {
        const passwordHashed = await User.encryptPassword(password); // Espera a que se resuelva la promesa = await User.encryptPassword(passwordRe); // Espera a que se resuelva la promesa
        const newUser = new User({
            username,
            email,
            password: passwordHashed
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: 'user' });
            newUser.roles = [role._id];
        }


        const savedUser = await newUser.save(); // Espera a que se resuelva la promesa
        console.log('usuario salvado a la db', savedUser)
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })
        res.status(200).json({token})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}


export const signin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate('roles');
        if (!userFound) return res.status(400).json({ message: 'User not found' });
        console.log(userFound);
        const matchPassword = await User.comparePassword(req.body.password, userFound.password);
        if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });
        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })
        const roles = userFound.roles.map(role => role.name);
        const userId = userFound._id;
        res.status(200).json({token, roles, userId});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el login. Inténtelo más tarde' });
    }

}

export const signout = (req, res) => {
    res.status(200).json({ message: 'Signout' })
}

