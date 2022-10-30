const express = require('express');
const path= require("path");
const multer = require('multer');

const router = express.Router();


router.get('/consultas/menuConsultas', function(req, res){
    res.render('consultas/menuConsultas');
})

router.get('/consultas/consulta1', function(req, res){
    res.render('consultas/consulta1');
})

router.get('/consultas/consulta2', function(req, res){
    res.render('consultas/consulta2');
})

router.get('/consultas/consulta3', function(req, res){
    res.render('consultas/consulta3');
})

router.get('/consultas/consulta4', function(req, res){
    res.render('consultas/consulta4');
})

router.get('/consultas/consulta5', function(req, res){
    res.render('consultas/consulta5');
})

router.get('/consultas/consulta6', function(req, res){
    res.render('consultas/consulta6');
})


module.exports = router;