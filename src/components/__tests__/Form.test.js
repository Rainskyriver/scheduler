import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Appointent", () => {
  const interviewers = [
    {
      id: 1,
      name: "Bob Loblaw",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  it("renders without a student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  it("renders with an initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Barb Larb Lar" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Barb Larb Lar");
  });
  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    fireEvent.click(getByText("Save"));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
      );

      fireEvent.click(getByText("Save"));

      fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  xit("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
    const { queryByText } = render(
      <Form interviewers={interviewers} name="Jerm Bern" onSave={onSave} />
    );
    fireEvent.click(queryByText("Save"));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Jerm Bern", null);
  });
  xit("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, { target: { value: "Bernie Michaels" } });
    fireEvent.click(getByText("Save"));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Bernie Michaels", null);
  });
});
