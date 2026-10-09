const noteModel = require('../db/models/note.model')

async function createNote(req,res) {
    try {
        const {heading, content} = req.body;
        if(!heading){
            res.status(400).json(){
                error: "Body Cannot Be Empty"
            }
        }
        if(!content){
            res.status(400).json(){
                error: "Body Cannot Be Empty"
            }
        }
        const note = await noteModel.create({
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
    try{
        const notes = await noteModel.find();
        res.status(200).json({
            notes: notes
        })
    }catch(err){
        res.status(404).json({
            message: "note not found"
        })
    }

}
module.exports = {createNote,getNote}
