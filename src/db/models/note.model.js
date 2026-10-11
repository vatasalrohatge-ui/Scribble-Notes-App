const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    heading: String,
    content: String,
    name: String
})
const noteModel = new mongoose.model("Notes", noteSchema)

module.exports = noteModel;
