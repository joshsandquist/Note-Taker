const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//function to read notes from the db.jsonn
function readNotes() {
  const notesData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
  return JSON.parse(notesData);
}

//function to add notes to the db.json
function writeNotes(notes) {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
}

router.get('/notes', (req, res) => {
  try {
    //fetching our notes array using the previously defined readNotes function
    const notes = readNotes();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/notes', (req, res) => {
  try {
    //Taking in the users request body to create note
    const newNote = req.body;
    //Using the uuid package to add a unique id to each note after it is created
    newNote.id = uuidv4();
    //getting the array of notes from db.json
    const notes = readNotes();
    //pushing new note to this array
    notes.push(newNote);
    //re-inserting the updated array back into the db.json file
    writeNotes(notes);
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
