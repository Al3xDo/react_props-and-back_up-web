import React from "react";
import Card from "./Card";
import contacts from "../contacts.js";


function createCard(contact) {
  /* khi dung map >> nho pass day du attribute*/
  return (
    /*attri key ko the su dung vi no la ham phan biet cho ham map -> tao ra ban copy neu muon hien thi contact.id */
    <Card key={contact.id} id={contact.id} name={contact.name} img={contact.imgURL} tel={contact.phone} email={contact.email} />)
};

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {/* ham map se loop through list of object and pass one object in to the function respectively */}
      {contacts.map(createCard)}
      {/* <Card name={contacts[0].name} img={contacts[0].imgURL} tel={contacts[0].phone} email={contacts[0].email} /> */}

      {/* <Card name={contacts[1].name} img={contacts[1].imgURL} tel={contacts[1].phone} email={contacts[1].email} /> */}

      {/* <Card name={contacts[2].name} img={contacts[2].imgURL} tel={contacts[2].phone} email={contacts[2].email} /> */}
    </div>
  );
};

export default App;
