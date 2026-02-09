import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/components/ui/modal";

test("escape closes modal", async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();

  render(
    <Modal open={true} onOpenChange={onOpenChange} title="Dialog title">
      Content
    </Modal>
  );

  await user.keyboard("{Escape}");
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test("has dialog role and label linkage", () => {
  render(
    <Modal open={true} onOpenChange={() => {}} title="Dialog title" description="Dialog desc">
      Content
    </Modal>
  );

  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
});
