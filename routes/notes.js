const express = require("express")
const route = express.Router()
const notesDB = require("../model/noteSchema")

route.use(express.json())


//============== api to post notes =============

route.post("/notes/addnotes", async(req,res)=>{
    try{
        const {title, description} = req.body
        console.log(title, description)

        const createNotes = await notesDB.create(req.body)
        console.log(createNotes)

        res.status(200).json({
            status: "notes created successfully",
            createNotes
        })

    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

//=============== get api for all notes ==============

route.get("/notes", async(req,res)=>{
    try{
        const allnotes = await notesDB.find()
        console.log(allnotes)
        res.status(200).json(allnotes)

    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route