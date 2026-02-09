import { render, screen } from "@testing-library/react";
import { TextInput } from "@/components/ui/text-input";

test("associates label and input", () => {
  render(<TextInput label="Email" />);
  const input = screen.getByLabelText("Email");
  expect(input).toBeInTheDocument();
});

test("links hint and error via aria-describedby", () => {
  render(<TextInput label="Email" hint="Hint text" error="Error text" />);
  const input = screen.getByLabelText("Email");
  const hint = screen.getByText("Hint text");
  const error = screen.getByText("Error text");
  expect(input.getAttribute("aria-describedby")).toContain(hint.id);
  expect(input.getAttribute("aria-describedby")).toContain(error.id);
});
