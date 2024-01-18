import { User } from "../models";
import dbConnect from "../db";


export async function createUser(req,res,next){ 
    let user = User.findOne({email: req.body.user.email})
    if(user){
        res.send("User already exists")
    }else{  
        try{
            let doc = new User(req.body.user)
            await dbConnect()
            await doc.save()
            res.send("User successfully created")
        }catch(e){
            console.log(e)
        }
    }

}

export async function getUser(){
    
}

export async function updateUser(){

}

export async function deleteUser(){

}

export async function getAllUser(){

}


export async function register(){

}
