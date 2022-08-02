const Mascota=require('../models/mascota.model.js');

exports.create=(req,res)=>{
    console.log("Crear");
    console.log(req.body);
    const mascota = new Mascota(req.body);
    mascota.save();
    res.send('Mascota insertada');
};

exports.findAll=(req,res)=>{
    Mascota.find().populate('categoria').then(mascota=>{
        res.status(200).send(mascota);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Ocurrio algo incorrecto"
        });
    });
    console.log("Listando");
};

exports.findOne=(req,res)=>{
    Mascota.findById(req.params.id).then(mascota=>{
        if(!mascota){
            return res.status(400).send({
                message:"Mascota no encontrada"
            });
        }
        res.status(200).send(mascota);
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
    Mascota.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        breed :req.body.breed || 0,
        age :req.body.age || 0,
        gender :req.body.gender || null,
        description :req.body.description || null,
        categoria :req.body.description || null,
        imageUrl: req.body.imageUrl || null
    },{new:true}).then(mascota=>{
        if(!mascota){
            return res.status(404).send({
                message:"Mascota no encontrada"
            });
        }
        res.status(200).send(mascota);
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
    Mascota.findByIdAndRemove(req.params.id).then(mascota=>{
        if(!Mascota){
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