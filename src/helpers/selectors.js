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