const noteModel = require('../db/models/note.model')

async function createNote(req,res) {
    try {
        const {heading, content, name} = req.body;
        const note = await noteModel.create({
            name: name,
            heading: heading,
            content: content
        })
        res.status(201).json({
            message: "Note Created Sucessfully",
            note: note
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}
async function getNote(req,res) {
    const name = req.params.name;
    try{
        const notes = await noteModel.find(
            name: name
        );
        res.status(200).json({
            notes: notes
        })
    }catch(err){
        res.status(404).json({
            message: "note not found"
        })
    }

}
module.exports = {createNote,getNote,deleteNote}
