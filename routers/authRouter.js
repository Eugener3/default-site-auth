// Импорт модуля
const Router = require('express');
const app = new Router()
// Импорт класса контроллеров и функции проверки(валидации)
const controller = require('../controllers/authController')
const {check} = require('express-validator')

// Роуты с проверками
    app.post(
                '/registration',
                [
                    check('username', "Пиздец ты тупой, (Л)узер").notEmpty().isLength({min: 3, max: 30}),
                    check('password', "Пиздец ты тупой, (П)опуск").notEmpty().isLength({min: 3, max: 15})
                ],
                controller.registration
            );

    app.post(   
                '/login', 
                [
                    check('username', "Пиздец ты тупой, (Л)узер").notEmpty().isLength({min: 3, max: 30}),
                    check('password', "Пиздец ты тупой, (П)опуск").notEmpty().isLength({min: 3, max: 15})
                ], 
                controller.login
            );

    app.get(
                '/users', 
                controller.getUsers
           );

module.exports = app

