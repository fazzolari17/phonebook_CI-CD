import React from "react";
import PhoneBookService from "./PhoneBookService";

function Person({ person, persons, setPersons, id, showMessage, setShowMessage, newName, setNewName }) {

    function deleteContact(e) {
        let targetId = e.target.id
        
        PhoneBookService
        .remove(targetId)

        let contactToDelete = persons.find(item => item.id === targetId)

        setPersons(prev => prev.map(item => item.id !== targetId))

        setShowMessage(prev => ({...prev, deleteMsg: true}))
        
        setNewName(contactToDelete.name)

        setTimeout(() => {
            setShowMessage( prev => ( {...prev, deleteMsg: false} ) )
            setNewName('')
        }, 2000);

    }

    return (
        <div className="contacts" key={person.id}>
            <p>{person.name} {person.number}</p> 
            <button className="delete" key={person.id} id={person.id} onClick={deleteContact}>Delete</button>
        </div>
    )
}

export default Person