import useMonthsNamesList, { MonthNamesList } from "./hooks/use_month_names_list";
import useYearList from "./hooks/use_year_list";



export type CalendarEvents = 
                    | { type: "addMonth" } 
                    | { type: "subMonth" }
                    | { type: "setMonth", value: number }
                    | { type: "setYear",  value: number }



type CalendarProps = {
  monthsNames?: MonthNamesList,
  startYer?: number,
  endYer?: number,
  currentMonth: Date,
  onChange: (type: CalendarEvents)=> void,
};



export default function Calendar({ monthsNames, startYer, endYer, currentMonth, onChange }: CalendarProps) {

  const monthNamesList = useMonthsNamesList(monthsNames);
  const yearsList = useYearList(startYer, endYer);



  return <div>
    <div>
        <button onClick={()=> onChange({type: "addMonth"})}> {'<'} </button>
        <select
          value={currentMonth.getMonth()} 
          onChange={(event)=> onChange({type: "setMonth", value: +event.target.value})}
        >
          {
            monthNamesList.map((monthName, index)=> {
              return <option key={monthName} value={index}>{monthName}</option>
            })
          }
        </select>
        <select 
          value={currentMonth.getFullYear()}
          onChange={(event)=> onChange({type: "setYear", value: +event.target.value})} 
        >
          {
            yearsList.map((year)=>{
              return <option key={year} value={year}>{year}</option>
            })
          }
        </select>
        <button onClick={()=> onChange({type: "subMonth"})}> {'>'}</button>
    </div>
  </div> 
}