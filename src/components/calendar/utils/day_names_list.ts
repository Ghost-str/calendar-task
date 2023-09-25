import { START_WEEK_DAY_MAP, DEFAULT_LANGUAGE } from "../constants";
import arrayRotate from "./array_rotate";

type IntlDayFormatList = "long" | "short" | "narrow";

export default function dayNamesList(
  localeName = navigator.language,
  startWeekDay = 0,
  format: IntlDayFormatList = "short",
) {
  const applyFormat = new Intl.DateTimeFormat(localeName, { weekday: format })
    .format;
  const week = [...Array(7).keys()]
    .map((day) => {
      const date = new Date(Date.UTC(2021, 5, day));
      return {
        name: applyFormat(date),
        index: date.getDay(),
      };
    })
    .sort((a, b) => a.index - b.index)
    .map((item) => item.name);

  return arrayRotate(week, startWeekDay);
}

export function dayNamesListWithDefaults(
  language: string = DEFAULT_LANGUAGE,
  format: IntlDayFormatList = "short",
) {
  const startWeekDay = START_WEEK_DAY_MAP[language] || 0;

  return dayNamesList(language, startWeekDay, format);
}
