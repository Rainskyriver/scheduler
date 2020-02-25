import React, { useState } from "react";
import InterviewerList from "../InterviewerList.js";
import Button from "../Button.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [errorName, setErrorName] = useState("");
  const [errorInt, setErrorInt] = useState("");
  const validate = () => {
    if (name === "") {
      setErrorName("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setErrorName("Interviewer name cannot be blank");
      return;
    }
    setErrorName("");
    props.onSave(name, interviewer);
  };
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  const Cancel = () => {
    reset();
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{errorName}{errorInt}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={Cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
