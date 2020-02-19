export function getAppointmentsForDay(state, day) {
  const returnArray = [];
  for (const selDay in state.days) {
    if (state.days[selDay].name === day) {
      for (const appointment in state.days[selDay].appointments) {
        returnArray.push(
          state.appointments[state.days[selDay].appointments[appointment]]
        );
      }
      return returnArray;
    }
  }
  return returnArray;
}
//return object with interview data
export function getInterview(state, interview) {
  for (const interviewer in state.interviewers) {
    if (!interview) {
      return null;
    }
    if (interview.interviewer === state.interviewers[interviewer].id) {
      return {
        interviewer: {
          avatar: state.interviewers[interviewer].avatar,
          id: state.interviewers[interviewer].id,
          name: state.interviewers[interviewer].name,
        },
        student: interview.student
      }
    }
  }
}