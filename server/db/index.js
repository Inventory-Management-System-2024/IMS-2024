import mongoose from "mongoose";
// import dotenv from "dotenv"
// dotenv.config()
const dbConnect = async ()=>{
   try{
      console.log(`mongodb+srv://ims2k24:${process.env.MONGO_KEY}@cluster0.n22g2cy.mongodb.net/?retryWrites=true&w=majority`);
      await mongoose.connect(`mongodb+srv://ims2k24:${process.env.MONGO_KEY}@cluster0.n22g2cy.mongodb.net/?retryWrites=true&w=majority`)
   }catch(e){
      console.log(e);
   }
   
}
 export default dbConnect;