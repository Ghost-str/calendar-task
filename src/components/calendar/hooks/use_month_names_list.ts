import { useEffect, useState } from "react";
import monthNamesList from "../utils/month_names_list";
import { DEFAULT_LANGUAGE } from "../constants";

export type MonthNamesList = string[];

const useMonthsNamesList = (
  monthsNames?: MonthNamesList,
  language?: string,
) => {
  const [stateMonthsNames, setMonthsNames] = useState<MonthNamesList>([]);

  useEffect(() => {
    if (monthsNames) {
      setMonthsNames(monthsNames);
    } else {
      setMonthsNames(monthNamesList(language || DEFAULT_LANGUAGE));
    }
  }, [monthsNames, language]);

  return stateMonthsNames;
};

export default useMonthsNamesList;
