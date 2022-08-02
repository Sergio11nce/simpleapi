const Publicar=require('../models/publicar.model.js');

exports.create=(req,res)=>{
    console.log("Crear");
    console.log(req.body);
    const publicar = new Publicar(req.body);
    publicar.save();
    res.send('Mascota insertada');
};

exports.findAll=(req,res)=>{
    Publicar.find().populate('categoria').then(publicar=>{
        res.status(200).send(publicar);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Ocurrio algo incorrecto"
        });
    });
    console.log("Listando");
};

exports.findOne=(req,res)=>{
    Publicar.findById(req.params.id).then(publicar=>{
        if(!publicar){
            return res.status(400).send({
                message:"Mascota no encontrada"
            });
        }
        res.status(200).send(publicar);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Mascota no encontrada"
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
            message:"Los datos de la Mascota no pueden estar vacios"
        });
    }
    Publicar.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        breed :req.body.breed || 0,
        age :req.body.age || 0,
        gender :req.body.gender || null,
        description :req.body.description || null,
        categoria :req.body.description || null
    },{new:true}).then(publicar=>{
        if(!publicar){
            return res.status(404).send({
                message:"Mascota no encontrada"
            });
        }
        res.status(200).send(publicar);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Mascota no encontrada"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
};

exports.delete=(req,res)=>{
    Publicar.findByIdAndRemove(req.params.id).then(publicar=>{
        if(!Publicar){
            return res.status(400).send({message:"Mascota no encontrada"});
        }
        res.status(200).send({message:"Mascota eliminada con exito"});
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Mascota no encontrada"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
};