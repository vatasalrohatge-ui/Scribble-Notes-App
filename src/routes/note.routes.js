const express = require('express');
const {createNote, getNote} = require("../controllers/note.controller")
const router = express.Router();

router.post("/create-note", createNote)
router.get("/get-note", getNote)

module.exports = router