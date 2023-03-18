// Импорт схем
const User = require('../models/user')
const Role = require('../models/role')
// Импорт шифровщика и валидатора
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
// Импорт JWT токена и ключа
const jwt = require('jsonwebtoken')
const {secret} = require('../config')


// Функция генерации токена
const generateAccessToken = (id, roles) => {
// Создание начинки
    const payload = {
        id,
        roles
    }
// Сама шифровка инфы, такого же ключа, как и в конфиге, и срок годности ключа
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class authController{
// Функция регистрации
    async registration(req, res) {

        try {
            // Проверка ошибок валидации
                const validErrors = validationResult(req);
                
                if (!validErrors.isEmpty()) {
                    return res.status(400).json({message: "Ошибочка", validErrors})
                }
            
            // Проверка на существование пользователя
                const {username, password} = req.body
                const candidate = await User.findOne({username})

                if (candidate) {
                    return res.status(400).json({message: "Пользователь с таким именем УЖЕ существует"})
                }
            
            // Шифрование пароля и установление роли
                const salt = bcrypt.genSaltSync(2)  
                const hashPass = bcrypt.hashSync(password, salt)

                const userRole = await Role.findOne({value: "USER"})
            
            // Создание нового пользователя
                const user = new User({username, password: hashPass, roles: [userRole.value]})
                await user.save()
            
                return res.json({message: "БЕЕАТЬАЬАЬ РАБОТАЕИт"})

        } catch (error) {   // Отловка ошибок
            console.log(error)
            res.status(400).json({message: "Registration error"})
        }
    }
// Функция Авторизации
    async login(req, res) {

        try {
            // Проверка ошибок валидации
                const validErrors = validationResult(req);
                    
                if (!validErrors.isEmpty()) {
                    return res.status(400).json({message: "Ошибочка", validErrors})
                }
                
            // Забираем тело запроса
                const {username, password} = req.body
                
                const candidate = await User.findOne({username})                
                if (candidate) {
                    if (bcrypt.compareSync(password, candidate.password)) {
                    // Генерируем токен
                        const token = generateAccessToken(User._id, User.roles)        
                        res.status(200).json({message: "Все кул пароль нашелся", token})
                    }
                    else {
                        res.status(400).json({message: "Пароль не правильный"})
                    }   
                }
                else {
                    res.status(400).json({message: "Чела не существует"})
                }
    
        } catch (error) {   // Отловка ошибок
                console.log(error)
                res.status(400).json({message: "Auth error"})
        } 
    }
// Функция выдачи инфы о юзерах
    async getUsers(req, res) {
        
        try {
        // Запрос на выдачу всех юзеров
            const users = await User.find();
            res.json({message: users})
            
        } catch (error) {   // Отловка ошибок
            console.log(error)
            res.status(400).json({message: "GetUsers error"})
        } 
    }
}


module.exports = new authController()