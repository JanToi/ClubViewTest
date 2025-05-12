import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../src/ClubCalendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface MatchEvent {
    date: Date;
    label: string;
}

const ClubCalendar: React.FC = () => {
    const [value, setValue] = useState<Value>(new Date());

    const matchEvents: MatchEvent[] = [
        { date: new Date(2025, 4, 14), label: "18:00 Tigers VS Bears"},
        { date: new Date(2025, 4, 15), label: "20:00 Hawks Player Transfers"},
        { date: new Date(2025, 4, 16), label: "16:00 Swimmers Drowning"}        
    ];

    const handleChange = (nextValue: Value, _event: React.MouseEvent<HTMLButtonElement>) => {
        setValue(nextValue);
    };

    const isSameDay = (date1: Date, date2: Date) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();

    const getEventForDate = (date: Date ) =>
        matchEvents.find((event) => isSameDay(event.date, date));

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">Club Calendar</h3>
            <Calendar
                onChange={handleChange}
                value={value}
                className="rounded-lg"
                tileClassName={({ date, view }) => {
                    if (view === 'month') {
                        if (getEventForDate(date)) {
                            return 'highlight-event'; // custom class
                        }
                    }
                    return null;
                }}
                tileContent={({ date, view }) => {
                    if (view === "month") {
                        const event = getEventForDate(date);
                        if (event) {
                            return (
                                <div className="tooltip-container">
                                    <span className="event-dot"></span>
                                    <span className="tooltip-text">{event.label}</span>
                                </div>
                            )
                        }
                    }
                    return null;
                }}
            />
        </div>
    );
};

export default ClubCalendar;
