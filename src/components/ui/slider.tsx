"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface ISliderCustom {
  onChange?: (value: number) => void;
  value?: number;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root> & ISliderCustom,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, onChange, ...props }, ref) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0] as number[]);
  };
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      defaultValue={[1]}
      value={value}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
