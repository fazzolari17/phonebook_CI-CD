import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import ErrorMessage from './components/ErrorMessage';
import DeleteContactMsg from './components/DeleteContactMsg';
import AddedContactMessage from './components/AddedContactMessage'
import PhoneBookService from './components/PhoneBookService';
import { nanoid } from 'nanoid';

function App() {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setFilterContacts ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ showMessage, setShowMessage ] = useState({successMsg: false, errorMsg: false, deleteMsg: false})
  let contacts = ''

  useEffect(() => {
    PhoneBookService
    .getAll()
    .then(data => setPersons(data))
  }, [newName, showMessage])

  const peopleToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterContacts))

  contacts = peopleToShow.map(item => <Person 
    key={nanoid()} 
    id={item.id} 
    person={item}
    persons={persons} 
    setPersons={setPersons} 
    showMessage={showMessage} 
    setShowMessage={setShowMessage}
    newName={newName}
    setNewName={setNewName}
  />
  )


  return (
    <div>
      {showMessage.errorMsg && <ErrorMessage name={newName} />}
      {showMessage.successMsg && <AddedContactMessage name={newName} />}
      {showMessage.deleteMsg && <DeleteContactMsg name={newName}/>}
      <h1>Phonebook</h1>
      <Filter 
        persons={persons}
        filterContacts={filterContacts}
        setFilterContacts={setFilterContacts}
        setShowAll={setShowAll}
      />
      <h3>Add New Contact</h3>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        showMessage={showMessage}
        setShowMessage={setShowMessage} 
      />
      <h2>Numbers</h2>
        {contacts}
    </div>
  );
}

export default App;
