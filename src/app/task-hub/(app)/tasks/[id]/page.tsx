import TaskDetailsClient from "./task-details-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  return <TaskDetailsClient id={params.id} />;
}
