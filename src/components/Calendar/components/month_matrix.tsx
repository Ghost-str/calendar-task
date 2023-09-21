import { useMemo } from "react";
import useDayNamesList, {
  DayNamesList as DayNamesListType,
} from "../hooks/use_day_names_list";
import monthMatrix from "../utils/month_matrix";

export type MonthMatrixProps = DayNamesListProps & WeekListProps;

export default function MonthMatrix({
  dayNames,
  currentMonth,
  onChange,
}: MonthMatrixProps) {
  return (
    <table>
      <DayNamesList dayNames={dayNames} />
      <WeekList currentMonth={currentMonth} onChange={onChange} />
    </table>
  );
}

type DayNamesListProps = {
  dayNames?: DayNamesListType;
};

function DayNamesList({ dayNames }: DayNamesListProps) {
  const dayNamesList = useDayNamesList(dayNames);

  return (
    <thead>
      <tr>
        {dayNamesList.map((day) => (
          <th key={day}>{day}</th>
        ))}
      </tr>
    </thead>
  );
}

type WeekListProps = {
  currentMonth: Date;
  onChange: DayItemProps["onChange"];
};

function WeekList({ currentMonth, onChange }: WeekListProps) {
  const currentMonthMatrix = useMemo(
    () => monthMatrix(currentMonth),
    [currentMonth],
  );

  return (
    <tbody>
      {currentMonthMatrix.map((week, index) => {
        return (
          <tr key={index}>
            {week.map((day, index) => {
              return (
                <td key={index}>
                  <DayItem
                    day={day}
                    currentMonth={currentMonth}
                    onChange={onChange}
                  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export type DayItemClickEvents =
  | { type: "prevClick"; value: Date }
  | { type: "currentClick"; value: Date }
  | { type: "nextClick"; value: Date };

type DayItemProps = {
  day: Date;
  currentMonth: Date;
  onChange: (type: DayItemClickEvents) => void;
};

type ButtonTypeList = "prev" | "current" | "next";

function DayItem({ day, currentMonth, onChange }: DayItemProps) {
  const dayMonth = day.getMonth();
  const currentMonthMonth = currentMonth.getMonth();

  let buttonType: ButtonTypeList = "prev";
  if (dayMonth === currentMonthMonth) {
    buttonType = "current";
  } else if (dayMonth < currentMonthMonth) {
    buttonType = "next";
  }

  const clickHandler = () => {
    onChange({ type: `${buttonType}Click`, value: day });
  };

  return <button onClick={clickHandler}>{day.getDate()}</button>;
}
