const express = require('express');
const {createNote, getNote, deleteNote} = require("../controllers/note.controller")
const router = express.Router();

router.post("/create-note", createNote)
router.get("/get-note", getNote)
router.delete("/delete-note", deleteNote)

module.exports = router
