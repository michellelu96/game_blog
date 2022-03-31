const router = require('express').Router();
const GameController = require('../controllers/games.controllers')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const express = require('express')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });



module.exports = function(app){
    app.get('/api', GameController.findAll);
    app.post('/api', upload.single('image'),GameController.createNewGame);
    app.get('/api/game/:id', GameController.findOne);
    app.put('/api/game/edit/:id', upload.single('image'),GameController.updateGame);
    app.delete('/api/game/delete/:id', GameController.delete);
    app.use('/image',express.static('images'));
}

