import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username :{
            type: String,
            required : true,
            unique : true,
            index : true,
            lowerCase : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            index : true,
        },
        fullName : {
            type : String,
            required : true,
        },
        avatar : {
            type : String,
            required : true,
        },
        coverImage : {
            type : String,
        },
        refreshToken : {
            type : String,
            
        },
        password : {
            type : String,
            required : true,
        },
        followers : [
            {
                type  : mongoose.Types.ObjectId,
                ref : "User"
            }
        ],
        following : [
            {
                type  : mongoose.Types.ObjectId,
                ref : "User"
            }
        ],
        watchHistory : [
            {
                type : mongoose.Types.ObjectId,
                ref : "Video"
            }
        ],
    }, 
    {timestamps : true})

 userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
 })

export const User = mongoose.model("User", userSchema)