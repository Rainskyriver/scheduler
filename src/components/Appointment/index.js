import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
                                            .catch(() => transition(ERROR_SAVE, true))
  };
  const deleteInterview = () => {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY))
                                   .catch(() => transition(ERROR_DELETE, true))

  }
  const confirm = () => {
    transition(CONFIRM);
  }
  return (
    <div>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === ERROR_SAVE && <Error message="Error when trying to SAVE" onClose={() => back()}/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === ERROR_DELETE && <Error message="Error when trying to DELETE" onClose={() => back()}/>}
      {mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={() => back()}/>}
      {mode === EDIT && <Form onCancel={() => back()} onSave={save} interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
          onSave={save}
        />
      )}
    </div>
  );
}
