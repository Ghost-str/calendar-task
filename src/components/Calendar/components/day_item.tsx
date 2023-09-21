import type { ReadOnlyStyleObject } from "../../../utils";
import isSameDay from "date-fns/isSameDay";
import cs from "classnames";

type StyleKeys =
  | "day"
  | "current-day"
  | "prev-month"
  | "next-month"
  | "selected-date";
type DayItemClickEvents =
  | { type: "prevClick"; value: Date }
  | { type: "currentClick"; value: Date }
  | { type: "nextClick"; value: Date };

export type DayItemProps = {
  day: Date;
  currentMonth: Date;
  onChange: (type: DayItemClickEvents) => void;
  styles: ReadOnlyStyleObject<StyleKeys>;
  selectedDate?: Date | null;
};

export function DayItem({
  day,
  currentMonth,
  onChange,
  styles,
  selectedDate,
}: DayItemProps) {
  const buttonType = useButtonType(day, currentMonth);

  const clickHandler = () => {
    onChange({ type: `${buttonType}Click`, value: day });
  };

  let className = cs(styles.day, {
    [styles["current-day"]]: isSameDay(day, new Date()),
    [styles["next-month"]]: buttonType === "next",
    [styles["prev-month"]]: buttonType === "prev",
    [styles["selected-date"]]: selectedDate && isSameDay(day, selectedDate),
  });

  return (
    <button onClick={clickHandler} className={className}>
      {day.getDate()}
    </button>
  );
}

type ButtonTypeList = "prev" | "current" | "next";

function useButtonType(day: Date, currentMonth: Date): ButtonTypeList {
  const monthOfDay = day.getMonth();
  const monthOfCurrentMonth = currentMonth.getMonth();

  switch (true) {
    case monthOfDay === monthOfCurrentMonth:
      return "current";
    case monthOfDay > monthOfCurrentMonth:
      return "next";
    default:
      return "prev";
  }
}
