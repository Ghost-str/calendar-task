import useDayNamesList, {
  DayNamesList as DayNamesListType,
} from "../hooks/use_day_names_list";
import Weeks, { WeeksProps } from "./weeks";

export type MonthMatrixProps = DayNamesListProps & WeeksProps;

export default function MonthMatrix({
  dayNames,
  currentMonth,
  onChange,
  styles,
  selectedDate,
}: MonthMatrixProps) {
  return (
    <table>
      <DayNamesList dayNames={dayNames} />
      <Weeks
        currentMonth={currentMonth}
        onChange={onChange}
        styles={styles}
        selectedDate={selectedDate}
      />
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
