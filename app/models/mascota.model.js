const mongoose=require('mongoose');

const MascotaSchema = new mongoose.Schema({
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
    imageUrl: 
    {
        type: String,
        required: true,
        match: [/^(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/, 'URL must start with http:// or https:// and must end with .jpg, .gif or .png'],
    },
    categoria:
    {
        type:mongoose.Schema.Types.ObjectId, ref: 'Categoria'
    },
    expiration:Date
},{
    timestamps:true
});
module.exports=mongoose.model('Mascota',MascotaSchema);