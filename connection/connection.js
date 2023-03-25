const mongoose = require("mongoose")
const uri = "mongodb+srv://alamidrisi1995:Alam1234@cluster0.sy4o7vl.mongodb.net/?retryWrites=true&w=majority"

const connection = async()=>{
    try{
        await mongoose.connect(uri)
        console.log("connection to DB successful");
    }catch(e){
        console.log(e);
    }
}

module.exports = connection