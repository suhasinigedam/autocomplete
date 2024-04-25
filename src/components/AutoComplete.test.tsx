import { render, screen, waitFor } from "@testing-library/react";
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

    await waitFor(() => {
      expect(inputElement).toHaveValue("");
    });
  });
});

describe("filter results", () => {
  it("getting searched results", async () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    await userEvent.type(inputElement, "software");

    await waitFor(() => {
      const listItemElements = screen.getAllByRole("listitem");
      expect(listItemElements).not.toHaveLength(0);
    });
  });
  it("not getting searched results", async () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    await userEvent.type(inputElement, "abcdefg");

    await waitFor(() => {
      const listItemElements = screen.getAllByRole("listitem");
      expect(listItemElements).not.toHaveLength(0);
    });
  });
  it("select searched results", async () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    await userEvent.type(inputElement, "software");

    const listItemElements = screen.getAllByRole("listitem");
    const firstListItem = listItemElements[0];
    userEvent.click(firstListItem);
    setTimeout(() => {
      const firstListItemContent = screen.getByRole("listitem", {
        name: /software/i,
      });
      expect(firstListItemContent).toBeInTheDocument();
      expect(inputElement).toHaveTextContent("software");
    }, 350);
  });
  it("gives message if no searched results found", async () => {
    render(<AutoComplete />);
    const inputElement = screen.getByLabelText("auto-complete");

    await userEvent.type(inputElement, "asdfsfsd");

    const listItemElements = screen.getAllByRole("listitem");
    const firstListItem = listItemElements[0];
    userEvent.click(firstListItem);
    setTimeout(() => {
      expect(firstListItem).toHaveTextContent("no result found.");
    }, 350);
  });
});
