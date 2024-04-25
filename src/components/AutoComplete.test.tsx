import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutoComplete from "./AutoComplete";

describe("input component", () => {
  it("renders input component", () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    expect(inputElement).toBeInTheDocument();
  });

  it("input component accepts search text", async () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    await userEvent.type(inputElement, "software");

    expect(inputElement).toHaveValue("software");
  });

  it("user can clear search text", async () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    await userEvent.type(inputElement, "software");
    const clearElement = screen.getByLabelText("clear-button");
    await userEvent.click(clearElement);

    expect(inputElement).toHaveValue("");
  });
});

// describe("input component handles events", () => {
//   it("handleChange updates inputValue", () => {
//     render(<AutoComplete />);
//     const inputElement = screen.getByLabelText("auto-complete");
//     fireEvent.change(inputElement, { target: { value: "New Value" } });
//     expect(inputElement).toHaveValue("New Value");
//   });

//   it("clearInputValue clears inputValue", () => {
//     const setInputValue = jest.fn();
//     const setOptions = jest.fn();
//     const setSelectedOption = jest.fn();
//     setInputValue("");
//     setOptions([]);
//     setSelectedOption(null);
//     render(<AutoComplete />);

//     const buttonElement = screen.getByLabelText("clear-button");
//     const inputElement = screen.getByLabelText("auto-complete");

//     fireEvent.click(buttonElement);
//     expect(setInputValue).toHaveBeenCalledWith("");
//     expect(inputElement).toHaveValue("");
//     expect(setOptions).toHaveBeenCalledWith([]);
//     expect(setSelectedOption).toHaveBeenCalledWith(null);
//   });
// });
