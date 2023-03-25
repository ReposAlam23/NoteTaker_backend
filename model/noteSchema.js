const mongoose = require("mongoose")
const notesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}
}, {timestamps: true})

const notes = mongoose.model("Notes", notesSchema)

module.exports = notes