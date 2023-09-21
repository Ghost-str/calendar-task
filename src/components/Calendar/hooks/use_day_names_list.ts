import { useEffect, useState } from "react";
import dayNamesList from "../utils/day_names_list";

export type DayNamesList = string[];

const useDayNamesList = (dayNames?: DayNamesList) => {
  const [stateDaysNames, setDaysNames] = useState<DayNamesList>([]);

  useEffect(() => {
    if (dayNames) {
      setDaysNames(dayNames);
    } else {
      setDaysNames(dayNamesList());
    }
  }, [dayNames]);

  return stateDaysNames;
};

export default useDayNamesList;
