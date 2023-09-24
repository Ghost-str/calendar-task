import styles from "./task_dashboard.module.scss";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import deepClone from "deep-clone";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";

type Status = "to-do" | "in-progress" | "completed" | "deleted";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

type OnDrop = (id: Task["id"], newStatus: Status, before?: Task["id"]) => void;

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

type ColumnItemProps = {
  column: Column;
  onDrop: OnDrop;
};

type MoveMapType = {
  [key in Status]: Status[];
};

const MOVE_MAP: MoveMapType = {
  "to-do": ["in-progress"],
  completed: ["deleted", "in-progress"],
  deleted: ["in-progress"],
  "in-progress": ["completed", "deleted"],
};

function ColumnItem({ column, onDrop }: ColumnItemProps) {
  const { title, tasks } = column;
  const [{ canDrop }, dropRef] = useDrop<Task, unknown, { canDrop: boolean }>(
    () => ({
      accept: "task",
      canDrop(task) {
        return (
          task.status === column.type ||
          MOVE_MAP[task.status].includes(column.type)
        );
      },
      drop(item, monitor) {
        if (!monitor.didDrop()) {
          onDrop(item.id, column.type);
        }
      },
      collect(monitor) {
        return {
          canDrop: monitor.canDrop(),
        };
      },
    }),
  );

  const isDragging = useDragLayer(
    (monitor) => monitor.isDragging() && monitor.getItemType() === "task",
  );

  return (
    <div ref={dropRef} className={styles.column}>
      <div
        className={cn(styles["column-title"], {
          [styles["column_can_drop"]]: canDrop && isDragging,
          [styles["column_can_not_drop"]]: !canDrop && isDragging,
        })}
      >
        {title}
      </div>
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDrop={onDrop} />
        ))}
      </div>
    </div>
  );
}

type TaskProps = {
  task: Task;
  onDrop: OnDrop;
};

function TaskItem({ task, onDrop }: TaskProps) {
  const { title, description } = task;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  const [_, drop] = useDrop<Task>(() => ({
    accept: "task",
    canDrop(dragTask) {
      return (
        dragTask.status === task.status ||
        MOVE_MAP[dragTask.status].includes(task.status)
      );
    },
    drop(item) {
      onDrop(item.id, task.status, task.id);
    },
  }));

  drop(drag(ref));

  return (
    <div
      ref={ref}
      className={cn(styles["task-container"], {
        [styles["task-container_drugging"]]: isDragging,
      })}
    >
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}
