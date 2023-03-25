const express = require("express")
const route = express.Router()
const notesDB = require("../model/noteSchema")

route.use(express.json())


//============== api to post notes =============

route.post("/notes/addnotes", async(req,res)=>{
    try{
        const {title, description} = req.body
        // console.log(title, description)
        const createNotes = await notesDB.create(req.body)
        // console.log(createNotes)
        res.json({
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
        // console.log(allnotes)
        res.json(allnotes)

    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

// ===============delete api for particular id ==========
route.delete("/delete/:id", async(req, res)=>{
    try{
        const p = req.params
        const deletenote = await notesDB.deleteOne({_id: p.id.slice(1)})
        res.json({
            status: "deleted succssfully",
            deletenote
        })
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

//================ delete api for all notes =============

route.delete("/notes/deleteAll", async(req, res)=>{
    try{
        // const {ids} = req.body
        // console.log( "inside delete")
        // const deletedData = await notesDB.deleteMany({})
        // console.log(deletedData)
        // res.json({
        //     status: "deleted successfully"
        // })


    }catch(e){
        res.json({
            status: "deletion failed",
            message: e.message
        })
    }
})

module.exports = route