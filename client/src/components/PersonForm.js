import React from "react";
import PhoneBookService from "./PhoneBookService";

function PersonForm(props) {
    const { persons, newName, setNewName, newNumber, setNewNumber, setShowMessage } = props
  
    function addContact(e) {
        e.preventDefault()
        e.target.reset()

        let alreadyInPhonebook = persons.some( person => person.name === newName )

        if(alreadyInPhonebook) {
          alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
          // Handles the Message 
          setShowMessage(item => ({...item, errorMsg: true }))

          setTimeout(() => {
            setShowMessage(item => ({...item, errorMsg: false }))
            setNewName('')
            setNewNumber('')
          }, 2000);
          
          let contact = persons.find(item => item.name === newName)

          PhoneBookService
          .update(contact.id, {...contact, number: newNumber})
          .catch(error => {
            console.log(error.response.data.error)
          })

          return

        }
        else if (newName === '' || newNumber === ''){
          alert(`Add a name and phone number`)

        } 
        else {
          const newPerson = {
            name: newName, 
            number: newNumber
          }

          PhoneBookService
          .create(newPerson)
          .catch(error => {
            console.log(error.response.data.error)
          })

          setShowMessage(item => ({...item, successMsg: true }))

          setTimeout(() => {
            setShowMessage(item => ({...item, successMsg: false }))
            setNewName('')
            setNewNumber('')
          }, 2000);

          
        }
      }

    return (

        <form onSubmit={addContact}>
        <div>
          Name: <input onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>Number: <input onChange={(e)=>setNewNumber(e.target.value)} /></div>
        <div>
          <button className="add" type="submit">add</button>
        </div>
      </form>

    )
}

export default PersonForm