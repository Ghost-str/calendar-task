import { Status } from "../task_dashboard";

type MoveMapType = {
  [key in Status]: Status[];
};

const MOVE_MAP: MoveMapType = {
  "to-do": ["in-progress"],
  completed: ["deleted", "in-progress"],
  deleted: ["in-progress"],
  "in-progress": ["completed", "deleted"],
};

export default function isCanDrop(
  draggingTaskStatus: Status,
  targetItemStatus: Status,
): boolean {
  return (
    draggingTaskStatus === targetItemStatus ||
    MOVE_MAP[draggingTaskStatus].includes(targetItemStatus)
  );
}
