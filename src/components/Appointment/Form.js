// Appointment/Form.js

import React from "react";
import { useState } from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props){
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setInterviewer("");
    setStudent("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>

        <InterviewerList 
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}