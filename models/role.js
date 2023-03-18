// Импорт схемы и модели из mongoose
const {Schema, model} = require('mongoose');
// Создание Схемы(шаблона) роли (То, как она должна будет выглядеть в базе, JSON файле)
const Role = new Schema({
    value: {type: String, unique: true, default: "USER"},
})

module.exports = model('Role', Role)