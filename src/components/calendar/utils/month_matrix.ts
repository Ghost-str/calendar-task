import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";

type MatrixDay = Date;

type MonthMatrix = MatrixDay[][];

export default function monthMatrix(currentDate: Date): MonthMatrix {
  const result: MonthMatrix = [];

  let innerDate = startOfMonth(currentDate);

  while (innerDate.getMonth() === currentDate.getMonth()) {
    const start = startOfWeek(innerDate);
    const end = endOfWeek(innerDate);

    result.push(eachDayOfInterval({ start, end }));

    innerDate = addDays(end, 1);
  }

  return result;
}
