import mongoose from "mongoose";

const dbConnect = async ()=>{
   try{
      await mongoose.connect(`mongodb+srv://ims2k24:${process.env.MONGO_KEY}@cluster0.n22g2cy.mongodb.net/?retryWrites=true&w=majority`)
   }catch(e){
      console.log(e);
   }
   
}
 export default dbConnect;