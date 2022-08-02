const mongoose=require('mongoose');

const PublicarSchema = new mongoose.Schema({
    name:
    {
        type:String,
        index:true,
        required:true,
        minlength:2
    },
    breed:
    {
        type:String,
        index:true,
        required:true,
        minlength:2
    },
    age:
    {
        type:String,
        index:true,
        required:true,
    },
    gender:
    {
        type:String,
        index:true,
        required:true,
    },
    description:
    {
        type:String,
        index:true,
        required:true,
        minlength:2
    },
    categoria:
    {
        type:mongoose.Schema.Types.ObjectId, ref: 'Categoria'
    },
    expiration:Date
},{
    timestamps:true
});
module.exports=mongoose.model('Publicar',PublicarSchema);