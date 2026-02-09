import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

test("button calls onClick", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Save</Button>);
  await user.click(screen.getByRole("button", { name: "Save" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("loading disables and sets aria-busy", () => {
  render(<Button isLoading>Save</Button>);
  const btn = screen.getByRole("button");
  expect(btn).toBeDisabled();
  expect(btn).toHaveAttribute("aria-busy", "true");
});
