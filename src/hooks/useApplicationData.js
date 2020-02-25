import { useReducer, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value[0].data,
          appointments: action.value[1].data,
          interviewers: action.value[2].data
        };
      case SET_INTERVIEW:
        return action.value;
      default:
        throw new Error(`Tried to reduce with ${action.type}: UNSUPPORTED`);
    }
  }
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
