import React, { useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
// import Note from '../components/Note';
import { userDataContext } from '../Context/userDataContext';

export default function Notes() {
    const { notes } = useContext(userDataContext);

    useEffect(() => {
        if (!Cookies.get('userTokenID')) {
            window.location.assign('/signup');
        }
    }, []);

    return (
        <div className="notes">
            {notes}
            {console.log(notes)}
        </div>
    )
}
