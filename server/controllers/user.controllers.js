const User = require('../models/user.model');
// const Note = require('../models/note.model');

const getAllNotes = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);
    if (user) {
        res.json(user.notes);
    } else {
        res.json({ error: "User Doesn't exists!" });
    }
}

const createNote = async (req, res) => {
    const userID = req.userID;
    const { title, body } = req.body;
    const user = await User.findById(userID);
    if (user) {
        user.notes.push({ title, body });
        const notes = await user.save();
        if (notes) {
            res.json({ notes, success: "New Note Created!" });
        }
    } else {
        res.json({ error: "User Doesn't exists!" });
    }
}

const updateNote = async (req, res) => {
    const noteID = req.params.noteID;
    const { title, body } = req.body;
    const NoteExists = await Note.findById(noteID);
    if (NoteExists) {
        const updatedNote = await Note.findByIdAndUpdate(NoteExists._id, { title, body }, { new: true });
        res.json(updatedNote);
    } else {
        res.json({ error: "Note Doesn't exists!" });
    }
}

const deleteNote = async (req, res) => {
    const userID = req.userID;
    const noteID = req.params.noteID;
    const userNotes = await User.findById(userID).select('notes');
    // user.notes.map((note) => {
    //     console.log(note._id == noteID)
    // })
    const filteredNotes = userNotes.notes.filter(note => note._id != noteID);
    userNotes.notes = [];
    filteredNotes.map((note) => {
        userNotes.notes.push(note);
    })
    await userNotes.save();
    console.log(filteredNotes)
    res.json(userNotes);
}

module.exports = { getAllNotes, createNote, updateNote, deleteNote };