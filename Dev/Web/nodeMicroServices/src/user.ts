import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let userShema=new mongoose.Schema({
    name:{type:String,required:true},
    pwd:{type:String,required:true},
    email:{type:String,required:true},
    ncin:{type:Number,required:true},
    ntel:{type:Number,required:true},
    adresse:{type:String,required:true}
})

userShema.plugin(mongoosePaginate);
const User=mongoose.model("Book",userShema);
export default User;