import { useEffect, useState } from "react";
import eachYearOfInterval from "date-fns/eachYearOfInterval";
import addYears from "date-fns/addYears";
import subYears from "date-fns/subYears";


export type YearList = number[];




const DEFAULT_YEAR_INTERVAL = 10;


export default function useYearList(startYer?: number, endYer?: number) {
    const [yearList, setYearList] = useState<YearList>([]);

    useEffect(()=>{
        const start = startYer ?? subYears(new Date(), DEFAULT_YEAR_INTERVAL);
        const end = endYer ?? addYears(new Date(), DEFAULT_YEAR_INTERVAL);
        
        const yearsList = eachYearOfInterval({start, end})
                        .map((year)=> year.getFullYear());

        setYearList(yearsList);
    },[startYer, endYer]);


    return yearList;
}