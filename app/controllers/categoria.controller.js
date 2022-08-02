const Categoria=require('../models/categoria.model.js');

exports.create=(req,res)=>{
    console.log("Crear");
    console.log(req.body);
    const categoria = new Categoria(req.body);
    categoria.save();
    res.send('Categoria insertada');
};

exports.findAll=(req,res)=>{
    Categoria.find().then(categoria=>{
        res.status(200).send(categoria);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Ocurrio algo incorrecto"
        });
    });
    console.log("Listando");
};

exports.findOne=(req,res)=>{
    Categoria.findById(req.params.id).then(categoria=>{
        if(!categoria){
            return res.status(400).send({
                message:"Categoria no encontrada"
            });
        }
        res.status(200).send(categoria);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Categoriano encontrada"
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
            message:"Los datos de la Categoria no pueden estar vacios"
        });
    }
    Categoria.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        imageUrl: req.body.imageUrl || null
    },{new:true}).then(categoria=>{
        if(!categoria){
            return res.status(404).send({
                message:"Categoria no encontrada"
            });
        }
        res.status(200).send(categoria);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Categoria no encontrada"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
};

exports.delete=(req,res)=>{
    Categoria.findByIdAndRemove(req.params.id).then(categoria=>{
        if(!categoria){
            return res.status(400).send({message:"Categoria no encontrada"});
        }
        res.status(200).send({message:"Categoria eliminada con exito"});
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(400).send({
                message:"Categoria no encontrada"
            });
        }
        return res.status(500).send({
            message:"Ocurrio un error en el registro "+req.params.id
        });
    });
};