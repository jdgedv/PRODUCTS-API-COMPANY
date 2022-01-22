import mongoose from "mongoose"

mongoose
    .connect("mongodb://localhost/products-api-company", {
        useUnifiedTopology: true,//para que siempre este atento a una conexion con mongo
        useNewUrlParser: true, //permite analizar las conexiones que estamos haciendo, estas propiedades son necesaria para evitar errores por si alguna se encuentra no configurada o desactivada
        //useFindAndModify: false //para evitar que se bloquee la forma de actualizacion que estamos realizando, si sale error entonces se la puede quitar

    }) //q mongoose me haga la conexion en la ruta ppal de mi proyecto
    .then((db) => console.log("Conected!"))
    .catch((err) => console.error(err))