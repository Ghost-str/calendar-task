import styles from "./task_dashboard.module.scss";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import deepClone from "deep-clone";
import ColumnItem from "./components/column_item";

export type Status = "to-do" | "in-progress" | "completed" | "deleted";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type OnDrop = (
  id: Task["id"],
  newStatus: Status,
  before?: Task["id"],
) => void;

export type Column = {
  title: string;
  type: Status;
  tasks: Task[];
};

const COLUMNS: Column[] = [
  {
    title: "To do",
    type: "to-do",
    tasks: [],
  },
  {
    title: "In progress",
    type: "in-progress",
    tasks: [],
  },
  {
    title: "Completed",
    type: "completed",
    tasks: [],
  },
  {
    title: "Deleted",
    type: "deleted",
    tasks: [],
  },
];

type TaskDashboardProps = {
  tasks: Task[];
  onDrop: OnDrop;
};

export default function TaskDashboard({ tasks, onDrop }: TaskDashboardProps) {
  const columns: Column[] = tasks.reduce<Column[]>((acc, task) => {
    const column = acc.find((column) => column.type === task.status);
    column!.tasks.push(task);
    return acc;
  }, deepClone(COLUMNS));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles["columns-container"]}>
        {columns.map((column) => (
          <ColumnItem key={column.type} column={column} onDrop={onDrop} />
        ))}
      </div>
    </DndProvider>
  );
}
