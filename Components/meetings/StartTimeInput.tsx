"use client"
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface StartTimeInputProps {
    value: string;
    onchange: (value: string) => void;
  }
  
  export default function StartTimeInput({ value, onchange }: StartTimeInputProps) {
    const [active, setActive] = useState(false);
    const datetimelocalNow = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 16);
    return (
      <div className="space-y-2">
        <div className="font-medium">Meeting Start:</div>
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            checked={!active}
            onChange={() => {
              setActive(false);
              onchange("");
            }}
          />
          Start Meeting Immediately
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            checked={active}
            onChange={() => {
              setActive(true);
              onchange(datetimelocalNow);
            }}
          />
          Start Meeting At date/time
        </label>
        {active && (
          <Label className="block space-y-1">
            <span className="font-medium">Start Time</span>
            <input
              type="datetime-local"
              value={value}
              onChange={(e) => {
                onchange(e.target.value);
              }}
              min={datetimelocalNow}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </Label>
        )}
      </div>
    );
  }