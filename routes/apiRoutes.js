const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
//using the uuid package to give notes a unique id
const { v4: uuidv4 } = require('uuid');

//function to read notes from the db.json since we will be doing this often
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

//api route to delete notes
router.delete('/notes/:id', (req, res) => {
  try {
      // use our readnotes function to get all notes from db
      const notes = readNotes();
      //use the js method findIndex that compares the request id to the ids within our notes db array
      const noteIndex = notes.findIndex(note => note.id === req.params.id);
      //using the js splice method to remove our matched note from the notes array
      notes.splice(noteIndex, 1);
      //update db without deleted note
      writeNotes(notes);
      res.json({ message: 'Note deleted successfully!' });
  } 
  catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
