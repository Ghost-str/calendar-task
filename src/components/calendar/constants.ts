export const DEFAULT_LANGUAGE = "en-US";

type ExportedDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const START_WEEK_DAY_MAP: { [key: string]: ExportedDays } = {
  "en-US": 0,
  "ru-RU": 1,
};
