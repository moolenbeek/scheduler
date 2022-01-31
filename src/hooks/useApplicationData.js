import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  function updateSpots (actionType) {
    const days = state.days.map(day => {
      if (day.name === state.day) {
        if (actionType === "bookAppointment") {
          return { ...day, spots: day.spots - 1 }
        } else {
          return { ...day, spots: day.spots + 1 }
        }
      } else {
        return { ...day };
      }
    })
    return days;
  }
  
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${appointment.id}`, {interview})
    .then(response => {
      const days = updateSpots("bookAppointment")
      setState({
        ...state,
        appointments,
        days
      });
      return response;
    })
  }

  function deleteInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      const days = updateSpots()
      setState({
        ...state,
        appointments,
        days
      });
      return response;
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}