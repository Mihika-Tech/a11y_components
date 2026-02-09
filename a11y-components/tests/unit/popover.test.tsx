import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Popover, PopoverItem } from "@/components/ui/popover";

function Demo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={(props) => <button {...props}>Open menu</button>}
      >
        <PopoverItem onSelect={() => {}}>First</PopoverItem>
        <PopoverItem onSelect={() => {}}>Second</PopoverItem>
      </Popover>

      <button>Outside</button>
    </div>
  );
}

test("opens and closes on escape", async () => {
  const user = userEvent.setup();
  render(<Demo />);

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("menu")).toBeInTheDocument();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("closes when a menu item is selected", async () => {
  const user = userEvent.setup();
  render(<Demo />);

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("menu")).toBeInTheDocument();

  await user.click(screen.getByRole("menuitem", { name: "First" }));
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("closes on tab and allows focus to move", async () => {
  const user = userEvent.setup();
  render(<Demo />);

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("menu")).toBeInTheDocument();

  await user.keyboard("{Tab}");
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  // Focus should move away naturally, at least confirm "Outside" is reachable
  await user.tab();
  expect(screen.getByRole("button", { name: "Outside" })).toBeInTheDocument();
});
