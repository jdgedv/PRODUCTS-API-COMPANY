import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema (
    {
        username: {type: String, unique: true},
        email: {type: String, unique: true},
        password: {type: String, required: true},
        roles: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }]
    },
    {
    timestamps: true,
    versionKey: false
    }
)

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) //la cantidad de veces q va a ejecutar el proceso de encriptacion entre mas veces mas seguro pero menos rapido
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password,receivePassword) => {
    return await bcrypt.compare(password,receivePassword)
}

export default model('User',userSchema)