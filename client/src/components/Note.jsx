import React from 'react';
import DeleteNote from '../images/delete-note.svg';
import EditNote from '../images/edit-note.svg';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Note(props) {
    const handleEditNote = (e) => {
        console.log(e.target.id)
    }
    const handleDeleteNote = async (e) => {
        const response = await axios.delete(`http://localhost:5500/user/notes/delete/${props.noteID}?id=${Cookies.get('userTokenID')}`);
        const result = await response.data;
        if (result.error) {
            alert(result.error);
        } else {
            alert(result.success);
            window.location.reload();
        }
    }
    return (
        <div id={props.noteID} className='note'>
            <div className='note-title'>{props.title}</div>
            <div className='note-body'>{props.body}</div>
            <div className="note-menu">
                <div className="edit-note" onClick={handleEditNote}><img src={EditNote} alt="" id={props.noteID} /></div>
                <div className="delete-note" onClick={handleDeleteNote}><img src={DeleteNote} alt="" /></div>
            </div>
        </div>
    )
}
