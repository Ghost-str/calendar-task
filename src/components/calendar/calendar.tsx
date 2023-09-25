import Controls, { ControlsProps } from "./components/controls";
import MonthMatrix, { MonthMatrixProps } from "./components/month_matrix";
import builtInStyles from "./calendar.module.scss";
import { useMemo } from "react";
import type { ReadOnlyStyleObject } from "../../utils";

type StyleKeys = "container";

type UnionType = ControlsProps &
  MonthMatrixProps & { styles: ReadOnlyStyleObject<StyleKeys> };

export type CalendarProps = Omit<UnionType, "styles"> & {
  styles?: Partial<UnionType["styles"]>;
};

export default function Calendar({
  monthsNames,
  startYer,
  endYer,
  currentMonth,
  onChange,
  dayNames,
  styles,
  selectedDate,
  selectedSecondDate,
  language,
}: CalendarProps) {
  const patchedStyles = useMemo(() => {
    return {
      ...builtInStyles,
      ...styles,
    } as UnionType["styles"];
  }, [styles]);

  return (
    <div className={patchedStyles.container}>
      <Controls
        monthsNames={monthsNames}
        startYer={startYer}
        endYer={endYer}
        currentMonth={currentMonth}
        onChange={onChange}
        styles={patchedStyles}
        language={language}
      />
      <MonthMatrix
        dayNames={dayNames}
        currentMonth={currentMonth}
        onChange={onChange}
        styles={patchedStyles}
        selectedDate={selectedDate}
        selectedSecondDate={selectedSecondDate}
        language={language}
      />
    </div>
  );
}
