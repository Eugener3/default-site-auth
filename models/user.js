// Импорт схемы и модели из mongoose
const {Schema, model} = require('mongoose');
// Создание Схемы(шаблона) Юзера (То, как он должен будет выглядеть в базе, JSON файле)
const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)