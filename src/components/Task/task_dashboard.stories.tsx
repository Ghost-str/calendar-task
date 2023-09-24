import { Meta } from "@storybook/react";
import Component, { Column, Task } from "./task_dashboard";
import { useImmer } from "use-immer";

const meta: Meta<typeof Component> = {
  title: "Components/TaskDashboard",
  component: Component,
};

export default meta;

const TASKS: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Task descr 1",
    status: "to-do",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task descr 2",
    status: "completed",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Task descr 3",
    status: "deleted",
  },
  {
    id: "4",
    title: "Task 4",
    description: "Task descr 4",
    status: "in-progress",
  },
];

export const TaskDashboard = () => {
  const [tasks, setTasks] = useImmer(TASKS);

  return (
    <Component
      tasks={tasks}
      onDrop={(taskId, newStatus, before) => {
        setTasks((draft) => {
          const taskIndex = draft.findIndex(({ id }) => id === taskId);
          const item = draft[taskIndex]!;
          item.status = newStatus;
          draft.splice(taskIndex, 1);

          if (before) {
            const beforeIndex = draft.findIndex(({ id }) => id === before);
            draft.splice(beforeIndex, 0, item);
          } else {
            draft.push(item);
          }
        });
      }}
    />
  );
};
