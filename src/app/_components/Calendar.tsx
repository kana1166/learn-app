import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// ここで MyCalendarProps 型を定義して、events プロパティの型を指定します
type MyCalendarProps = {
  events: {
    title: string;
    start: Date;
    end: Date;
  }[];
};

// MyCalendar コンポーネントの引数に MyCalendarProps 型を使用します
const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="day"
        selectable
      />
    </div>
  );
};

export default MyCalendar;
