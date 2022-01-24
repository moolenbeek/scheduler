// DayList.js

import React from "react";
import DayListItem from "../components/DayListItem";

export default function DayList(props){
  const listItems = props.days.map(weekday => 
    <DayListItem 
      {...weekday}
      key={weekday.id}
      selected={weekday.name === props.value}
      setDay={() => props.onChange(weekday.name)} />
  );

  return(
    <ul>
      { listItems }
    </ul>
  )
}