const express = require('express')
var cors = require("cors")
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { expressjwt } = require('express-jwt');
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(expressjwt({ secret: 'superclave', algorithms: ['HS256'] }).unless({ path: ['login'] }));

const port = 3000



let lista = [];
lista.push({"id":"3", "concepto":"auriculares", "importe": "200","categoria":"entretenimiento"});
lista.push({"id":"4", "concepto":"televisor", "importe": "550","categoria":"hogar"});
lista.push({"id":"5", "concepto":"reloj", "importe": "100","categoria":"wereable"});
lista.push({"id":"6", "concepto":"dron", "importe": "750","categoria":"hobby"});

app.get('/productos', function (req, res) {
    res.send(lista);
  });
  
  app.get("/productos/filtro",function(req, res) {
  
    res.send(lista);
  
  })
  
  
  
  app.get("/productos/:id",function(req,res) {
  
  
    let listaFiltrada = lista.filter(function (elemento) {
  
      return elemento.id==req.params.id;
    });
  
    res.send(listaFiltrada[0]);
  
  
  })

  app.get("/productos/detalle/:id",function(req,res) {
  
  
    let listaFiltrada = lista.filter(function (elemento) {
  
      return elemento.id==req.params.id;
    });
  
    res.send(listaFiltrada[0]);
  
  
  })

  
  app.get("/productos/filtro/:concepto",function(req,res) {
  
  
    let listaFiltrada = lista.filter(function (elemento) {
  
      return elemento.concepto.startsWith(req.params.concepto);
    });
  
    res.send(listaFiltrada);
  
  
  })
  
  
  
  app.delete("/productos/:id", function (req, res) {
  
    //seleccion  el elemento a borrar
    let seleccionado = lista.filter(function (elemento) {
  
      return elemento.id == req.params.id;
    })[0];
    //localizo su posicion
    let indice = lista.indexOf(seleccionado);
    // borro el elemento
    lista.splice(indice, 1);
    //envio un status code de borrado
    res.status(204).send();
  })
  
  app.post("/productos",function(req,res) {
  
    lista.push(req.body);
    res.status(201).send();
  
  })
  
  app.put("/productos/:id", function (req, res) {
  
    //seleccion  el elemento a borrar
    let seleccionado = lista.filter(function (elemento) {
  
      return elemento.id == req.params.id;
    })[0];
    // esta es la parte pura de actualizacion
    
    let indice= lista.indexOf(seleccionado);
    lista[indice]=req.body;
    
    res.status(200).send();
  })
  

  app.post("/login",function(req,res) {
  
    const usuario = req.body;
    console.log(usuario);
    if (usuario.nombre == 'cecilio' && usuario.clave == 'cecilio'){
      var token = jwt.sign({id:usuario.nombre}, 'superclave', {expiresIn: '2h'});
      console.log('estoy en el token');
      res.send({token});
    }else{
      res.sendStatus(401);
      console.log('estoy en el else');
    }
    
  })
  
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });