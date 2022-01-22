import jwt from "jsonwebtoken"
import config from "../config"
import User from "../models/User"
import Role from "../models/Role"

export const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] //esta propiedad permite obtener el token de los header html
    if(!token) return res.status(403).json({message: "No token provided"})

    try{
        const decoded = jwt.verify(token,config.SECRET)
        req.userId = decoded.id

        const user = await User.findById(req.userId, {password: 0}) //el password en cero lo que hace es ocultar el dato del password cuando se soliciten los datos del usuario para evitar que un usuario malintencionado acceda a esta información
        if(!user) return res.status(404).json({ message: "No user found"})
        next()

    } catch (error){

    }
}

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: { $in: user.roles }}) //traemos todos los roles
        for(let i=0; i<roles.length; i++){
            if(roles[i].name === "moderator"){
                next()
                return
            }

        }

        return res.status(403).json({message: "Require Moderator Role!"})

    } catch (error) {
        return res.status(500).send({message: error})
    }
    
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: { $in: user.roles }}) //traemos todos los roles
        for(let i=0; i<roles.length; i++){
            if(roles[i].name === "admin"){
                next()
                return
            }

        }

        return res.status(403).json({message: "Require Administrator Role!"})

    } catch (error) {
        return res.status(500).send({message: error})
    }
    
}