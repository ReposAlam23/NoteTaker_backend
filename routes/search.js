const express = require("express")
const route = express.Router()
const notesDB = require("../model/noteSchema")
route.use(express.json())

route.get("/notes/search/:userid/:search", async(req, res)=>{
    try{
        const search = `^${req.params.search}`
        const {userid} = req.params

        console.log(search, );
        const searchedNotes = await notesDB.find({
            userid: req.params.userid,
            $or: [{ title: { $regex: search, $options: "i" } },] })
            
        console.log(searchedNotes);

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