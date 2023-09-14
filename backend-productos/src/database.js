const mongoose = require('mongoose');
//variable de entorno
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const URL = process.env.DB




//Conectarse a la base de datos
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Successfully connected to the database");
        // await initial(); // Llama a la función inicial después de la conexión exitosa
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit(1); // Sale del proceso si hay un error de conexión
    });


module.exports = mongoose;


