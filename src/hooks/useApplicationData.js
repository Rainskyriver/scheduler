import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3]).then(all =>
      setState(() => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    );
  }, []);
  return {
    state,
    setDay: day => setState({
       ...state, day 
      }),
    bookInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.put(`/api/appointments/${id}`, appointment).then(() => {
        setState({
          ...state,
          appointments
        });
      })
      .catch((e) => {throw Error(e)})
    },
    cancelInterview: id => {
      return axios.delete(`/api/appointments/${id}`).then(() => {
        setState({
          ...state,
          [id]: {
            interview: null
          }
        });
      });
    }
  }
}