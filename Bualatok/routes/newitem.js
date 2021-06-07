var express = require('express');
var conexion = require('../connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('product', req.session.user);
  } else {
    res.redirect('/');
  }
});


router.post('/', function(req, res, next) {

  console.log("post newitem");
  if (!req.files) {
    console.log("Ha entrado aqui por algun motivo");
    // Algo
  } else {

    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;
    let precio = req.body.precio;
    let estado = req.body.estado;
    let imagen = req.files.file;
    let fecha = new Date();
    let visualizaciones = 0;
    imagen.mv('public/uploads/' + imagen.name);

    let img_path = 'uploads/' + imagen.name;

    let data = {}; 

    conexion.query("INSERT INTO productos (nombre, precio, descripcion, foto, fecha, categoria, estado, visualizaciones, propietario) VALUES (?,?,?,?,?,?,?,?,?)", 
    [nombre, precio, descripcion, img_path, fecha.toDateString(), categoria, estado, visualizaciones, req.session.user.idusuario] ,function(err, results) {

      if(!err) {
        data.user = req.session.user;
        data.message = 'Producto añadido con exito';
        data.success = true;
        req.session.data = data;

        console.log("Producto añadido con exito");
        res.redirect('home');
      } else {
        console.log(results);
        console.log("failure");

        data.user = req.session.user;
        data.message = 'Error al añadir el producto';
        data.error = true;
        req.session.data = data;

        res.redirect('home')
      }

    });

    //req.session.message = "Producto registrado con exito";
    //res.redirect('home');
  }
})

module.exports = router;