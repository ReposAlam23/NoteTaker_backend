const mongoose = require("mongoose")
const uri = "mongodb://localhost:27017"

const connection = async()=>{
    try{
        await mongoose.connect(uri)
        console.log("connection to DB successful");
    }catch(e){
        console.log(e);
    }
}

module.exports = connection