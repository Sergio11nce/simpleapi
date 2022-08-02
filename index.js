//importar los modulos
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const routes = require('./app/routes/categoria.routes')
const routesMascota = require('./app/routes/mascota.routes')
const routesUser = require('./app/routes/user.routes')
const routesPublicar = require('./app/routes/publicar.routes')
const app= express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//Configurar la base de datos
const dbconfig=require('./config/database.config.js');
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

// require('./app/routes/categoria.routes.js')(app);
app.use(express.json());

//Conexion a la base de datos
mongoose.connect(dbconfig.url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Conexion correcta");
}).catch(err=>{
    console.log("Conexion incorrecta");
    process.exit();
})

var port=process.env.PORT || 3000;

app.use('/api/', routes)
app.use('/api/', routesMascota)
app.use('/api/', routesUser)
app.use('/api/', routesPublicar)

app.listen(port,()=>{
    console.log("Servidor en el puerto: " + port);
});

