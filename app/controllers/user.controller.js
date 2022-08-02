const User=require('../models/user.model.js');

exports.create=(req,res)=>{
    try {
        console.log("Crear");
        console.log(req.body);
        const user = new User(req.body);
        user.save();
        res.send({ message: 'Usuario insertado' });
    } catch (error) {
        res.status(400).send({
            messange: error
        })
    }
};

exports.findAll=(req,res)=>{
    User.find().populate('mascota').then(user=>{
        res.status(200).send(user);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Ocurrio algo incorrecto"
        });
    });
    console.log("Listando");
};

exports.findOne=(req,res)=>{
    User.findById(req.params.id).then(user=>{
        if(!user){
            return res.status(400).send({
                message:"Usuario no encontrada"
            });
        }
        res.status(200).send(user);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Usuario no encontrado"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
    console.log("Listando por ID");
};

exports.update=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del Usuario no pueden estar vacios"
        });
    }
    User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        breed :req.body.breed || 0,
        age :req.body.age || 0,
        gender :req.body.gender || null,
        description :req.body.description || null,
        categoria :req.body.description || null,
        imageUrl: req.body.imageUrl || null
    },{new:true}).then(user=>{
        if(!user){
            return res.status(404).send({
                message:"Usuario no encontrado"
            });
        }
        res.status(200).send(user);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Usuario no encontrada"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
};

exports.delete=(req,res)=>{
    User.findByIdAndRemove(req.params.id).then(user=>{
        if(!User){
            return res.status(400).send({message:"Usuario no encontrado"});
        }
        res.status(200).send({message:"Usuario eliminado con exito"});
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Usuario no encontrado"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
};