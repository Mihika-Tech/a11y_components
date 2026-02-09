import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Modal } from "@/components/ui/modal";

test("modal has no obvious a11y issues", async () => {
  const { container } = render(
    <Modal open={true} onOpenChange={() => {}} title="Dialog title" description="Dialog desc">
      Content
    </Modal>
  );

  const results = await axe(container);
  expect(results.violations).toEqual([]);
});
