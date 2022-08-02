const mongoose=require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    name:
    {
        type:String,
        index:true,
        required:true,
        minlength:4
    }, 
    imageUrl: 
    {
        type: String,
        required: true,
        match: [/^(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/, 'URL must start with http:// or https:// and must end with .jpg, .gif or .png'],
    },
},{
    timestamps:true
});
module.exports=mongoose.model('Categoria',CategoriaSchema);