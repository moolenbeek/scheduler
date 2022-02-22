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

  function updateSpots (newAppointments) {
    const updatedSpotsDays = state.days.map(day => {
      let freeSpots = 0;
      for (const appointmentID of day.appointments) {
        if (!newAppointments[appointmentID].interview) {
          freeSpots++
        }
      }
      return {...day, spots: freeSpots}
    })
    return updatedSpotsDays;
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

    const days = updateSpots(appointments)
    
    return axios.put(`/api/appointments/${appointment.id}`, {interview})
    .then(response => {
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

    const days = updateSpots(appointments)

    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
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