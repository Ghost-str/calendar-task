import { useEffect, useState } from "react";
import getAllMonths from "../utils/month_names_list";

export type MonthNamesList = string[];

const useMonthsNamesList = (monthsNames?: MonthNamesList) => {
    const [stateMonthsNames, setMonthsNames] = useState<MonthNamesList>([]);
  
    useEffect(()=> {
      if (monthsNames) {
        setMonthsNames(monthsNames);
      } else {
        setMonthsNames(getAllMonths());
      }
    },[monthsNames]);
  
  
    return stateMonthsNames;
}


export default useMonthsNamesList;