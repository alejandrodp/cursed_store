const express = require('express');
const path= require("path");
const multer = require('multer');

const router = express.Router();

//variables para conectar con Neo4J.
var neo4j = require('neo4j-driver');


//Se debe colocar la dirección proporcionada por Neo4j SANDBOX y su contraseña.
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','5465'),{/* encrypted: 'ENCRYPTION_OFF' */});
var session = driver.session();



router.get('/InsertarArchivo/InsertarArchivo', function(req, res){
    res.render('InsertarArchivo/InsertarArchivo');
  })

router.post("/uploadProfilePicture", function(req, res, next) {
    var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        
        //Acá se debe especificar la ruta de import de su base de datos.
        cb(null, "/////////////////////////////")
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    const maxSize = 1 * 1000 * 1000;
    var upload = multer({
      storage: storage,
      limits: { fileSize: maxSize},
      fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /csv/;
        var mimetype = filetypes.test(file.mimetype);
    
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
          return cb(null, true);
        } 
        cb("Error: File upload only supports the "
        + "following filetypes - " + filetypes);
      }
    //mypic is the name of file attribute
    }).single("mypic");
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
      if(err) {

          // ERROR occurred (here it can be occurred due
          // to uploading image of size greater than
          // 1MB or uploading different file type)
          res.send(err)
      }
      else {

          // SUCCESS, image successfully uploaded
          req.flash('success_msg', "El archivo: "+req.file.originalname+" se ha cargado de manera correcta al sistema.");
          //Acá debe ir el algoritmo para cargar con "LOAD" a la base de datos en NEO4J
          console.log(req.file.filename);
          res.redirect("/InsertarArchivo/InsertarArchivo");
         // res.send("Success, Image uploaded!")
      }

      var nombreArchivo = req.file.filename;
  
      if(nombreArchivo== "Clientes.csv"){
        console.log("EL ARCHIVO ES EL DE CLIENTES")
        //Intentar insertar el csv en cypher
        session
            .run("LOAD CSV WITH HEADERS FROM "+"'file:///"+req.file.originalname+"'"+"AS lineCliente CREATE (:Clientes {idCliente:lineCliente.id, first_name: lineCliente.first_name, last_name:lineCliente.last_name});")
            .then(function(result){
            // res.redirect('');
              session.close();
            })
            .catch(function(err){
              console.log(err); 
            })
      } else if(nombreArchivo== "Marcas.csv"){
        console.log("EL ARCHIVO ES EL DE MARCAS")
        session
            .run("LOAD CSV WITH HEADERS FROM "+"'file:///"+req.file.originalname+"'"+"AS lineMarcas CREATE (:Marca {id:lineMarcas.id, nombre: lineMarcas.nombre, pais:lineMarcas.pais});")
            .then(function(result){
            // res.redirect('');
              session.close();
            })
            .catch(function(err){
              console.log(err); 
            })        

      } else if(nombreArchivo == "Productos.csv"){
        console.log("EL ARCHIVO ES EL DE PRODUCTOS")
        session
            .run("LOAD CSV WITH HEADERS FROM "+"'file:///"+req.file.originalname+"'"+"AS lineProductos CREATE (:Productos {id:lineProductos.id, nombre: lineProductos.nombre, marca:lineProductos.marca});")
            .then(function(result){
            // res.redirect('');
              session.close();
            })
            .catch(function(err){
              console.log(err); 
            })          

      }else if(nombreArchivo== "Compras.csv"){
        console.log("EL ARCHIVO ES EL DE COMPRAS")
        session
            .run("LOAD CSV WITH HEADERS FROM "+"'file:///"+req.file.originalname+"'"+"AS lineCompras CREATE (:Compras {idCliente:lineCompras.idCliente, idProducto: lineCompras.idProducto, cantidad:lineCompras.marca});")
            .then(function(result){
            // res.redirect('');
              session.close();
            })
            .catch(function(err){
              console.log(err); 
            }) 

      }else{
        console.log("EL ARCHIVO ES OTRO TIPO DE ARCHIVOS CSV")
        

      }


  })

});


module.exports = router;