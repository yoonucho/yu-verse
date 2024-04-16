"use client";
import { formatISO } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const today = "";

export default function DayPickerTool({ range, setRange }) {
	const defaultSelected: DateRange = {
		from: undefined,
		to: undefined,
	};

	const selectedRange = range || defaultSelected;

	let footerText = <p>Please pick the first day.</p>;
	if (selectedRange.from && selectedRange.to) {
		footerText = `${formatISO(selectedRange.from, { representation: "date" })}–${formatISO(selectedRange.to, { representation: "date" })}`;
	}

	return <DayPicker id="test" mode="range" selected={selectedRange} footer={footerText} onSelect={setRange} />;
}
