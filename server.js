const mongoose = require("mongoose");
//const cors = require("cors");
const express = require('express');
const router = require('./app/controllers/router');
const puerto = 3000;
const app = express();


app.use(express.json());
app.use(router);

app.use(express.static('app'));
app.use('/views', express.static('views'));


//MONGO CONECTION
let mongoConnection = "mongodb+srv://admin:Parangaricutirimicuaro01@myapp.j2ikbis.mongodb.net/MyApp";
let db = mongoose.connection;

db.on('connecting', () => {
        console.log('Conectando a la base...');
        console.log(mongoose.connection.readyState);
});
    
db.on('connected', () => {
        console.log('¡Conectado exitosamente!');
        console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnection, {useNewUrlParser: true});


//CONECTION TO PORT
app.listen(puerto, () => {
    console.log("Página del proyecto iniciada en el puerto: " + puerto);
});

