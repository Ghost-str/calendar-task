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
  selectedSecondDate,
  language,
}: MonthMatrixProps) {
  return (
    <table>
      <DayNamesList dayNames={dayNames} language={language} />
      <Weeks
        currentMonth={currentMonth}
        onChange={onChange}
        styles={styles}
        selectedDate={selectedDate}
        selectedSecondDate={selectedSecondDate}
        language={language}
      />
    </table>
  );
}

type DayNamesListProps = {
  dayNames?: DayNamesListType;
  language?: string;
};

function DayNamesList({ dayNames, language }: DayNamesListProps) {
  const dayNamesList = useDayNamesList(dayNames, language);

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
