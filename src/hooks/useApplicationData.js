import { useReducer, useEffect } from "react";
import axios from "axios";
import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: all
      });
    });
  }, [state.days]);
  return {
    state,
    setDay: day => dispatch({ type: SET_DAY, value: day }),
    bookInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios
        .put(`/api/appointments/${id}`, appointment)
        .then(() => {
          dispatch({ type: SET_INTERVIEW, value: { ...state, appointments } });
        })
    },
    cancelInterview: id => {
      return axios.delete(`/api/appointments/${id}`).then(() => {
        dispatch({
          type: SET_INTERVIEW,
          value: { ...state, [id]: { interview: null } }
        });
      });
    }
  };
}
