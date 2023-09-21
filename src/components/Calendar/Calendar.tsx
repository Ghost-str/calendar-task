import Controls, { ControlsEvents, ControlsProps } from "./components/Controls";
import useDayNamesList, { DayNamesList } from "./hooks/use_day_names_list";



export type CalendarEvents = ControlsEvents;

type CalendarProps = ControlsProps & {
  dayNames?:  DayNamesList
};



export default function Calendar({ monthsNames, startYer, endYer, currentMonth, onChange, dayNames }: CalendarProps) {

  const dayNamesList = useDayNamesList(dayNames);

  return <div>
      <Controls monthsNames={monthsNames} startYer={startYer} endYer={endYer} currentMonth={currentMonth} onChange={onChange} />
      <table>
        <thead>
          <tr> 
            { dayNamesList.map((day)=> <th key={day}>{day}</th>)}
          </tr>
        </thead>
      </table>
  </div> 
}