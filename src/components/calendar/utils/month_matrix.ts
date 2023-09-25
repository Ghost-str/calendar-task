import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import { DEFAULT_LANGUAGE, START_WEEK_DAY_MAP } from "../constants";

type MatrixDay = Date;

type MonthMatrix = MatrixDay[][];

export default function monthMatrix(
  currentDate: Date,
  language: string = DEFAULT_LANGUAGE,
): MonthMatrix {
  const result: MonthMatrix = [];
  const weekStartsOn = START_WEEK_DAY_MAP[language] || 0;

  let innerDate = startOfMonth(currentDate);

  while (innerDate.getMonth() === currentDate.getMonth()) {
    const start = startOfWeek(innerDate, { weekStartsOn });
    const end = endOfWeek(innerDate, { weekStartsOn });

    result.push(eachDayOfInterval({ start, end }));

    innerDate = addDays(end, 1);
  }

  return result;
}
