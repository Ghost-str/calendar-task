import type { ReadOnlyStyleObject } from "../../../utils";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import cs from "classnames";
import isAfter from "date-fns/isAfter";

type StyleKeys =
  | "day"
  | "current-day"
  | "prev-month"
  | "next-month"
  | "selected-date"
  | "show-diff";

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
  selectedSecondDate?: Date | null;
  hoverDate: Date | null;
  onHover: (hoveredDate: Date | null) => void;
};

function customIsWithinInterval(day: Date, start: Date, end: Date) {
  if (!isAfter(start, end)) {
    return isWithinInterval(day, { start, end });
  }

  return isWithinInterval(day, { start: end, end: start });
}

export function DayItem({
  day,
  currentMonth,
  onChange,
  hoverDate,
  onHover,
  styles,
  selectedDate,
  selectedSecondDate,
}: DayItemProps) {
  const buttonType = useButtonType(day, currentMonth);

  const clickHandler = () => {
    onChange({ type: `${buttonType}Click`, value: day });
  };

  const isSelectedDate =
    (selectedDate && isSameDay(day, selectedDate)) ||
    (selectedSecondDate && isSameDay(day, selectedSecondDate));
  let className = cs(styles.day, {
    [styles["current-day"]]: isSameDay(day, new Date()),
    [styles["next-month"]]: buttonType === "next",
    [styles["prev-month"]]: buttonType === "prev",
    [styles["selected-date"]]: isSelectedDate,
    [styles["show-diff"]]:
      !isSelectedDate &&
      selectedDate != null &&
      (hoverDate != null || selectedSecondDate != null) &&
      customIsWithinInterval(
        day,
        selectedDate,
        // @ts-ignore
        selectedSecondDate ?? hoverDate,
      ),
  });

  return (
    <button
      onClick={clickHandler}
      className={className}
      onMouseEnter={() => onHover(day)}
      onMouseLeave={() => onHover(null)}
    >
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
