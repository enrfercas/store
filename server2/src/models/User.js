import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';



const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true  
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {   // Este objeto de configuración se pasa como segundo argumento al constructor de Schema
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    if (!password) {
        console.error('Password is undefined or null');
        return;
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Salt:', salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypting password:', error);
        return;
    }
}





userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);  // Devuelve true si las contraseñas son iguales, false si no lo son. 
}


export default model('User', userSchema);  
