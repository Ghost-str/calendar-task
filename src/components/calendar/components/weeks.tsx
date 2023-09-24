import { useMemo, useState } from "react";
import monthMatrix from "../utils/month_matrix";
import { DayItemProps, DayItem } from "./day_item";
import type { ReadOnlyStyleObject } from "../../../utils";

type StyleKeys = "cell";

export type WeeksProps = Omit<DayItemProps, "day" | "onHover" | "hoverDate"> & {
  styles: ReadOnlyStyleObject<StyleKeys>;
};

export default function Weeks({
  currentMonth,
  onChange,
  styles,
  selectedDate,
  selectedSecondDate,
}: WeeksProps) {
  const currentMonthMatrix = useMemo(
    () => monthMatrix(currentMonth),
    [currentMonth],
  );

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  return (
    <tbody>
      {currentMonthMatrix.map((week, index) => {
        return (
          <tr key={index}>
            {week.map((day, index) => {
              return (
                <td key={index} className={styles.cell}>
                  <DayItem
                    day={day}
                    currentMonth={currentMonth}
                    onChange={onChange}
                    styles={styles}
                    selectedDate={selectedDate}
                    selectedSecondDate={selectedSecondDate}
                    onHover={(state) => setHoverDate(state)}
                    hoverDate={hoverDate}
                  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
