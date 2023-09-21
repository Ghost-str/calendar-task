import Controls, { ControlsEvents, ControlsProps } from "./components/Controls";



export type CalendarEvents = ControlsEvents;

type CalendarProps = ControlsProps;



export default function Calendar({ monthsNames, startYer, endYer, currentMonth, onChange }: CalendarProps) {

  return <div>
      <Controls monthsNames={monthsNames} startYer={startYer} endYer={endYer} currentMonth={currentMonth} onChange={onChange} />
  </div> 
}