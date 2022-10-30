const express = require('express');
const path= require("path");
const multer = require('multer');

const router = express.Router();


router.get('/gestion/menuGestion', function(req, res){
    res.render('gestion/menuGestion');
  })

router.get('/gestion/gestionClientes', function(req, res){
    res.render('gestion/gestionClientes');
  })

router.get('/gestion/gestionCatalogo', function(req, res){
    res.render('gestion/gestionCatalogo');
  })

router.get('/gestion/gestionCompras', function(req, res){
    res.render('gestion/gestionCompras');
  })

router.get('/gestion/crearCliente', function(req, res){
  res.render('gestion/crearCliente');
})

router.get('/gestion/eliminarCliente', function(req, res){
  res.render('gestion/eliminarCliente');
})

router.get('/gestion/consultarCliente', function(req, res){
  res.render('gestion/consultarCliente');
})

router.get('/gestion/modificarCliente', function(req, res){
  res.render('gestion/modificarCliente');
})

router.get('/gestion/crearProducto', function(req, res){
  res.render('gestion/crearProducto');
})

router.get('/gestion/eliminarProducto', function(req, res){
  res.render('gestion/eliminarProducto');
})

router.get('/gestion/consultarProducto', function(req, res){
  res.render('gestion/consultarProducto');
})

router.get('/gestion/modificarProducto', function(req, res){
  res.render('gestion/modificarProducto');
})





module.exports = router;