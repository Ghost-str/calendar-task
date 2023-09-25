import { useState } from "react";
import Component, { CalendarProps } from "./calendar";
import type { Meta } from "@storybook/react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";

const meta: Meta<typeof Component> = {
  title: "Components/Calendar",
  component: Component,
  argTypes: {
    language: {
      options: ["ru-RU", "en-US"],
      control: { type: "select", default: "ru-RU" },
      defaultValue: "ru-RU",
    },
  },
};

export default meta;

type CalendarComponentProps = {
  language: string;
};

export const Calendar = ({ language }: CalendarComponentProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSecondDate, setSelectedSecondDate] = useState<Date | null>(
    null,
  );

  const onChangeHandler: CalendarProps["onChange"] = (event) => {
    switch (event.type) {
      case "addMonth":
      case "nextClick":
        return setCurrentMonth((current) => addMonths(current, 1));
      case "subMonth":
      case "prevClick":
        return setCurrentMonth((current) => subMonths(current, 1));
      case "setMonth":
        return setCurrentMonth((current) => setMonth(current, event.value));
      case "setYear":
        return setCurrentMonth((current) => setYear(current, event.value));
      case "currentClick":
        if (!selectedDate) {
          return setSelectedDate(event.value);
        }
        if (!selectedSecondDate) {
          return setSelectedSecondDate(event.value);
        }

        setSelectedDate(null);
        setSelectedSecondDate(null);
        return;
    }
  };

  return (
    <Component
      currentMonth={currentMonth}
      onChange={onChangeHandler}
      selectedDate={selectedDate}
      selectedSecondDate={selectedSecondDate}
      language={language}
    />
  );
};
