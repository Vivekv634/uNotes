import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Note from '../components/Note';

export default function Notes() {
    const [userID, setUserID] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        
        if (Cookies.get('userTokenID')) {
            setUserID(Cookies.get('userTokenID'));
        } else {
            window.location.assign('/signup');
        }
    }, []);
    
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get(`http://localhost:5500/user/notes?id=${userID}`);
            const result = await response.data;
            setNotes(result);
        }
        fetchNotes();
    }, [userID]);

    return (
        <div className="notes">
            {console.log(notes)}
            {notes.map(note => <Note key={note._id} title={note.title} body={note.body} />)}
        </div>
    )
}
