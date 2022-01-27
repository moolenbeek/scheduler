// Appointment/index.js

import React from "react";
import "../Appointment/styles.scss";
import { Fragment } from 'react'

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props){

  const selectedInterviewer = props.interview && props.interviewers.find((interviewer) => interviewer.id === props.interview.interviewer);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((e) => console.log(e))
  }

  function edit() {
    transition(EDIT);
  }

  function deleting () {
    transition(DELETING)
    props.deleteInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((e) => console.log(e))
  }

  return(
    <Fragment>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={selectedInterviewer}
          onEdit={edit}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleting}
          onCancel={back}
        />
      )}

      {mode === DELETING && <Status message="Deleting" />}


      
  </Fragment>
  )
}

