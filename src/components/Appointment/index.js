// Appointment/index.js

import React from "react";
import "../Appointment/styles.scss";
import { Fragment } from 'react'

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props){
  console.log(props.interview)
  return(
    <Fragment>
      <Header time={props.time} />
      {props.interview ? 
      <>
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />
      </>
      :
      <>
        <Empty />
      </>
      }
  </Fragment>
  )
}