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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log('props', props)
  
  return(
    <Fragment>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewers[props.interview.interviewer].name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={() => transition(SAVING)}
          onCancel={back}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={() => transition(SAVING)}
          onCancel={back}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => transition(DELETING)}
          onCancel={back}
        />
      )}

      {mode === DELETING && <Status message="Deleting" />}


      
  </Fragment>
  )
}

