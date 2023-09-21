import { useEffect, useState } from "react";
import Calendar, { CalendarEvents } from "./Calendar";
import type {Meta} from "@storybook/react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";


const meta: Meta<typeof Calendar> ={
    title: 'Calendar',
    component: Calendar,
    tags: ['autodocs'],
    argTypes: {
        currentMonth: {
            control: 'date'
        }
    }
};


export default meta;


type FullCalendarProps = {
    currentMonth?: number
}

export const FullCalendar = ({ currentMonth }: FullCalendarProps) => {

    const [currentMonthWrap, setCurrentMonth]= useState<Date>(() => currentMonth && new Date(currentMonth) || new Date());
    useEffect(()=>{ currentMonth && setCurrentMonth(new Date(currentMonth))}, [currentMonth]);

    const onChangeHandler = (event: CalendarEvents) => {
        switch(event.type) {
            case "addMonth":
            case "nextClick":
                setCurrentMonth((current)=>  addMonths(current, 1));
                break;
            case "subMonth":
            case "prevClick":
                setCurrentMonth((current)=>  subMonths(current, 1));
                break;
            case "setMonth":
                setCurrentMonth((current)=>  setMonth(current, event.value));
                break;
            case "setYear":
                setCurrentMonth((current)=>  setYear(current, event.value));
                break;
        }
    }

    return <Calendar currentMonth={currentMonthWrap} onChange={onChangeHandler}/>
}