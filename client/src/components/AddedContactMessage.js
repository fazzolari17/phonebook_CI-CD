import React from "react";

function AddedContactMessage({name}) {
    return (
        <div className="added-contact-message"><h4>{name} has successfully been added to you phonebook.</h4></div>
    )
}

export default AddedContactMessage