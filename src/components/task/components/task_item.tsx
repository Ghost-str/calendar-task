import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { OnDrop, Task } from "../task_dashboard";
import styles from "../task_dashboard.module.scss";
import isCanDrop from "../utils/is_can_drop";
import cn from "classnames";
import { TASK_ITEM_TYPE } from "../constants";

type TaskProps = {
  task: Task;
  onDrop: OnDrop;
};

export default function TaskItem({ task, onDrop }: TaskProps) {
  const { title, description } = task;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: TASK_ITEM_TYPE,
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  const [, drop] = useDrop<Task>(() => ({
    accept: TASK_ITEM_TYPE,
    canDrop(dragTask) {
      return isCanDrop(dragTask.status, task.status);
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
