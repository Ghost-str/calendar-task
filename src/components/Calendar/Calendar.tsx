import Controls, { ControlsEvents, ControlsProps } from "./components/Controls";
import MonthMatrix, {
  DayItemClickEvents,
  MonthMatrixProps,
} from "./components/month_matrix";

export type CalendarEvents = ControlsEvents | DayItemClickEvents;

type CalendarProps = ControlsProps & MonthMatrixProps;

export default function Calendar({
  monthsNames,
  startYer,
  endYer,
  currentMonth,
  onChange,
  dayNames,
}: CalendarProps) {
  return (
    <div>
      <Controls
        monthsNames={monthsNames}
        startYer={startYer}
        endYer={endYer}
        currentMonth={currentMonth}
        onChange={onChange}
      />
      <MonthMatrix
        dayNames={dayNames}
        currentMonth={currentMonth}
        onChange={onChange}
      />
    </div>
  );
}
