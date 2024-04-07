"use client";

import { Label } from "@radix-ui/react-label";
import { Call } from "@stream-io/video-react-sdk";
import { useState } from "react";



interface ParticipantInputProps {
    value: string;
    onChange: (value: string) => void;
  }
  
 export default function ParticipantInput({ value, onChange }: ParticipantInputProps) {
    const [active, setActive] = useState(false);
  
    return (
      <div className="space-y-2">
        <div className="font-medium">Participants:</div>
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            checked={!active}
            onChange={() => {
              setActive(false);
              onChange("");
            }}
          />
          Everyone with Link Can Join
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            checked={active}
            onChange={() => {
              setActive(true);
            }}
          />
          Private Meetings
        </label>
        {active && (
          <Label className="block space-y-1">
            <span className="font-medium">Participants Email</span>
            <textarea
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholder="Enter Participants Email Address Seprated by Commas"
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </Label>
        )}
      </div>
    );
  }
  