const express = require("express")
const app = express()
const port = process.env.port || 3004
const connection = require("./connection/connection")
connection()
const cors = require("cors")
app.use(cors())

const signRouter = require("./routes/sign")
const notesRouter = require("./routes/notes")

app.use("/v1", signRouter)
app.use("/v1", notesRouter)

app.get("/v1", (req,res)=>{
    try{
        res.send("working fine")
    }catch(e){
        res.send(e)
        console.log(e);
    }
})

app.listen(port, ()=>{console.log(`server is running at port ${port}`)})