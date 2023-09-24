import { useDrop, useDragLayer } from "react-dnd";
import { TASK_ITEM_TYPE } from "../constants";
import { Column, OnDrop, Task } from "../task_dashboard";
import isCanDrop from "../utils/is_can_drop";
import TaskItem from "./task_item";
import styles from "../task_dashboard.module.scss";
import cn from "classnames";

type ColumnItemProps = {
  column: Column;
  onDrop: OnDrop;
};

export default function ColumnItem({ column, onDrop }: ColumnItemProps) {
  const { title, tasks } = column;
  const [{ canDrop }, dropRef] = useDrop<Task, unknown, { canDrop: boolean }>(
    () => ({
      accept: TASK_ITEM_TYPE,
      canDrop(task) {
        return isCanDrop(task.status, column.type);
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
    (monitor) =>
      monitor.isDragging() && monitor.getItemType() === TASK_ITEM_TYPE,
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
