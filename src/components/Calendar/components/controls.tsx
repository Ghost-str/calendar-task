import type { ReadOnlyStyleObject } from "../../../utils";
import useMonthsNamesList, {
  MonthNamesList,
} from "../hooks/use_month_names_list";
import useYearList from "../hooks/use_year_list";

export type ControlsEvents =
  | { type: "addMonth" }
  | { type: "subMonth" }
  | { type: "setMonth"; value: number }
  | { type: "setYear"; value: number };

type StyleKeys = "control-container" | "control-button" | "control-select";

export type ControlsProps = {
  monthsNames?: MonthNamesList;
  startYer?: number;
  endYer?: number;
  currentMonth: Date;
  onChange: (type: ControlsEvents) => void;
  styles: ReadOnlyStyleObject<StyleKeys>;
};

export default function Controls({
  monthsNames,
  startYer,
  endYer,
  currentMonth,
  onChange,
  styles,
}: ControlsProps) {
  const monthNamesList = useMonthsNamesList(monthsNames);
  const yearsList = useYearList(startYer, endYer);

  return (
    <div className={styles["control-container"]}>
      <button
        onClick={() => onChange({ type: "subMonth" })}
        className={styles["control-button"]}
      >
        {"<"}
      </button>
      <select
        value={currentMonth.getMonth()}
        onChange={(event) =>
          onChange({ type: "setMonth", value: +event.target.value })
        }
        className={styles["control-select"]}
      >
        {monthNamesList.map((monthName, index) => {
          return (
            <option key={monthName} value={index}>
              {monthName}
            </option>
          );
        })}
      </select>
      <select
        value={currentMonth.getFullYear()}
        onChange={(event) =>
          onChange({ type: "setYear", value: +event.target.value })
        }
        className={styles["control-select"]}
      >
        {yearsList.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => onChange({ type: "addMonth" })}
        className={styles["control-button"]}
      >
        {">"}
      </button>
    </div>
  );
}
