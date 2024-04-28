"use client";

import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface DescriptionInputProps {
  value: string;
  onchange: (value: string) => void;
}

export default function DescriptionInput({
  value,
  onchange,
}: DescriptionInputProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Info</div>
      <label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onchange("");
          }}
        />
        Add Description
      </label>
      {active && (
        <Label className="block space-y-1">
          <span className="font-medium">Description</span>
          <textarea
            value={value}
            onChange={(e) => {
              onchange(e.target.value);
            }}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </Label>
      )}
    </div>
  );
}
