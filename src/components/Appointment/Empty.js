import React from "react";

export default function Empty(props) {
  const addForm = () => {
    props.onAdd();
  }
  return (
  <main className="appointment__add">
    <img
      className="appointment_add-button"
      src="images/add.png"
      alt="Add"
      onClick={addForm}
      />
  </main>
  )
}