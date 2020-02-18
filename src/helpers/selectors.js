export function getAppointmentsForDay(state, day) {
  const returnArray = []
  for (const selDay in state.days) {
    if (state.days[selDay].name === day) {
      for (const appointment in state.days[selDay].appointments) {
        returnArray.push(state.appointments[state.days[selDay].appointments[appointment]])
      }
      return returnArray;
    }
  }
  return returnArray;
}
export function getInterview(state, interview) {
  const returnObject = {}
}