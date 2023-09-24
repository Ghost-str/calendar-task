type IntlDayFormatList = "long" | "short" | "narrow";

export default function dayNamesList(
  localeName = navigator.language,
  format: IntlDayFormatList = "short",
) {
  const applyFormat = new Intl.DateTimeFormat(localeName, { weekday: format })
    .format;
  return [...Array(7).keys()]
    .map((day) => {
      const date = new Date(Date.UTC(2021, 5, day));
      return {
        name: applyFormat(date),
        index: date.getDay(),
      };
    })
    .sort((a, b) => a.index - b.index)
    .map((item) => item.name);
}
