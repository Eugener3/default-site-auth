// import express from 'express';
// import mongoose from 'mongoose';
// import routing from './authRouter.js';

// Импорт модулей и роутов
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
// Импорт порта из .env и создание app
const PORT = process.env.PORT || 3000
const app = express();

// Создание промежуточных функций
app.use(express.json())
app.use("/auth", authRouter)
mongoose.set('strictQuery', false);


// Функция включения сервера
const start = async() => {
    try {
    // Подключение к базе данных
    
        await mongoose.connect(process.env.DB)
    // Включение самого сервера
        app.listen(PORT, () => {
            console.log("Ебать работает");
        }) 
        
    }
    catch (error) {  // Отловка ошибок
        console.log(error);
    }
}


// Вызов функции включения сервера
start();


//"type": "module",
