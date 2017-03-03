var express = require('express') // api rest
var bodyParser = require('body-parser') // manejo de json
var path = require('path') // manejar archivos en servidor 
var mysql = require('mysql');

var app = express()

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mundo',
    port: 3306
});
db.connect(function (error) {
    if (error) {
        console.error('Error de conexion');
        throw error;
    } else {
        console.log('Conexion correcta.');
    }

});

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
var paises = [
    {
        id: 1,
        nombre: 'Bolivia'
    },
    {
        id: 2,
        nombre: 'Alemania'
    }

]
app.get('/', function (req, res, next) {
    res.sendFile('/index.html');
});

// app.get('/paises', function (req, res, next) {
//                 console.log('paso por ERROR')

//     res.send(paises);
// });
app.get('/paises_json', function (req, res, next) {
    res.json(paises);
});
app.get('/paises', function (req, res, next) {
    consulta = db.query('SELECT id, nombre FROM pais ', function (err, result, fields) {
        if (err) {
            console.log('paso por ERROR')
            console.error(err.stack);
            throw err;

        } else {

            console.log(result.length);
            console.log('paso por aqui')
            res.send(result);
            db.end();
        }

    });
});
app.listen(4000)
console.log('servidor corriendo en el puerto 4000')

