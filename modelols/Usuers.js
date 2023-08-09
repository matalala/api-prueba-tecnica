const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlegnth: [50, "El email tiene como maximo 50 caracteres"]
    },
    foto: {
        type: String,
        trim: true,
    },
    perfil: {
        type: String,
        trim: true,
    },
    familia: {
        type: String,
        trim: true,
    },
    patente: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false
})

const userModel = model('Users', usersSchema)

module.exports = userModel