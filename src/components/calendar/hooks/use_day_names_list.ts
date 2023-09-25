import { useEffect, useState } from "react";
import { dayNamesListWithDefaults } from "../utils/day_names_list";

export type DayNamesList = string[];

const useDayNamesList = (dayNames?: DayNamesList, language?: string) => {
  const [stateDaysNames, setDaysNames] = useState<DayNamesList>([]);

  useEffect(() => {
    if (dayNames) {
      setDaysNames(dayNames);
    } else {
      setDaysNames(dayNamesListWithDefaults(language));
    }
  }, [dayNames, language]);

  return stateDaysNames;
};

export default useDayNamesList;
