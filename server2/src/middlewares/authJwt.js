import * as jwt from 'jsonwebtoken'
import config from '../config.js'
import User from '../models/User.js'
import Role from '../models/Role.js'




export const verifyToken = async (req, res, next) => {
    try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, config.SECRET);
      req.userId = decodedToken?.id;
      const user = await User.findById(req.userId, {password: 0});
      if(!user) return res.status(404).json({message: 'User not found'}) 

    }
    if(!token) return res.status(401).json({message: 'No token provided'})   
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next();
            return;
        }
    }
    return res.status(403).json({message: 'Require Moderator Role'})
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next();
            return;
        }
    }
    return res.status(403).json({message: 'Require Admin Role'})
}

export const isUser = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'user') {
            next();
            return;
        }
    }
    return res.status(403).json({message: 'Require User Role'})
}


