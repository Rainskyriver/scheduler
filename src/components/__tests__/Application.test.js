import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  queryByText,
  getByAltText,
  getAllByTestId,
  getByPlaceholderText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books and interview, and reduces spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Bob Loblaw" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Bob Loblaw"));

    const day = getAllByTestId(container, "day").find(() => "Monday");

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("loads data, cancels an interview, and increases spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(() => "Monday");

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //Render application
    const { container } = render(<Application />);

    //Wait until loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    //click "edit"
    fireEvent.click(getByAltText(appointment, "Edit"));
    //change name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i)),
      {
        target: { value: "Bob Loblaw" }
      };
    //save appointment
    fireEvent.click(getByText(appointment, "Save"));
    //check that spots remaining is the same
    const day = getAllByTestId(container, "day").find(() => "Monday");
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  /*mockRejectedValueOnce, */

  it.only("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //Render application
    const { container, debug } = render(<Application />);
    //Wait until loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    //click "edit"
    fireEvent.click(getByAltText(appointment, "Edit"));
    //save appointment
    fireEvent.click(getByText(appointment, "Save"));
    //render error
    await waitForElement(() => axios.put.mockRejectedValueOnce());
    expect(
      getByText(appointment, "Error when trying to SAVE")
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    //render
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //Wait until loaded
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    //click Delete/Confirm
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    //render error
    await waitForElement(() => axios.put.mockRejectedValueOnce());
    expect(
      getByText(appointment, "Error when trying to DELETE")
    ).toBeInTheDocument();
  });
});
