const express = require("express")
const route = express.Router()
const notesDB = require("../model/noteSchema")
route.use(express.json())

route.get("/notes/:search", async(req, res)=>{
    try{
        let search = `^${req.params.search.slice(1)}`
        const searchedNotes = await notesDB.find({title:{ $regex: search, $options: "i" }})
        res.json({
            status:"success",
            searchedNotes
            })
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route