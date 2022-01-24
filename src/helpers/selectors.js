export function getAppointmentsForDay(state, day) {

  let result = []

  for (const x in state.days) {

    if (state.days[x].name === day) {

      for (const y of state.days[x].appointments) {
        result.push(state.appointments[y]);
      }
    }
  }
  return result;
}

export function getInterview(state, interview) {

  if (interview) {
    const result = {  
      "student": interview.student,
      "interviewer": {  
        "id": interview.interviewer,
        "name": state.interviewers[interview.interviewer].name,
        "avatar": state.interviewers[interview.interviewer].avatar
      }
    }
    return result;
  } else {
    return null;
  }
}