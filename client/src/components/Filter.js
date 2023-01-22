import React from "react";

function Filter({filterContacts, setFilterContacts, setShowAll}) {

    function filteredContacts(e) {
        let inputField = e.target.value.toLowerCase()
        setFilterContacts(inputField)
        if(inputField.length > 0) {
            setShowAll(false)
        } else {
            setShowAll(true)
        }
    }
    
    return (
        <div>
        Filter Shown Contacts: <input onChange={filteredContacts}/>
      </div>
    )
}

export default Filter