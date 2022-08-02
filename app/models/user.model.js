const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    name:
    {
        type:String,
        index:true,
        required:true,
        minlength:2
    },
    
    lastname:
    {
        type:String,
        index:true,
        required:true,
        minlength:2
    },
    contact:
    {
        type:String,
        index:true,
        required:true,
    },
    email:
    {
        type:String,
        index:true,
        required:true,
    },
    
    address:
    {
        type:String,
        index:true,
        required:true,
        minlength:2
    },
    mascota:
    {
        type:mongoose.Schema.Types.ObjectId, ref: 'Mascota'
    },
    expiration:Date
},{
    timestamps:true
});
module.exports=mongoose.model('User',UserSchema);