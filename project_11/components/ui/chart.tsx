"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import type { ChartPayloadItem } from "@/lib/types";

function getPayloadConfigFromPayload(
  config: Record<string, any> | undefined,
  item: ChartPayloadItem,
  key: string
): Record<string, any> {
  return config?.[key] || {};
}

const Chart = RechartsPrimitive.ResponsiveContainer;

type ChartAreaProps = React.ComponentProps<typeof RechartsPrimitive.Area>;
const ChartArea = React.forwardRef<SVGElement, ChartAreaProps>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Area
    {...props}
    className={cn("fill-primary/20 stroke-primary", className)}
  />
));
ChartArea.displayName = "ChartArea";

type ChartBarProps = React.ComponentProps<typeof RechartsPrimitive.Bar>;
const ChartBar = React.forwardRef<SVGElement, ChartBarProps>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Bar
    {...props}
    className={cn("fill-primary", className)}
  />
));
ChartBar.displayName = "ChartBar";

type ChartLineProps = React.ComponentProps<typeof RechartsPrimitive.Line>;
const ChartLine = React.forwardRef<SVGElement, ChartLineProps>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Line
    {...props}
    className={cn("stroke-primary", className)}
  />
));
ChartLine.displayName = "ChartLine";

interface ChartTooltipProps extends Omit<React.ComponentProps<typeof RechartsPrimitive.Tooltip>, 'ref'> {
  config?: Record<string, any>;
  nameKey?: string;
  nestLabel?: boolean;
  className?: string;
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ config, nameKey, nestLabel = false, className, ...props }, ref) => {
    const { payload, label, active, color } = props as any;

    if (!active || !payload) {
      return null;
    }

    const tooltipLabel = nestLabel ? (
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium">{label}</span>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-medium">{label}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 shadow-md",
          className
        )}
      >
        <div className="grid gap-2">
          {!nestLabel ? tooltipLabel : null}
          <div className="grid gap-1.5">
            {payload.map((item: ChartPayloadItem, index: number) => {
              const key = `${nameKey || item.name || item.dataKey || 'value'}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload?.fill || item.color;

              return (
                <div key={index} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {nestLabel ? (
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: indicatorColor }}
                      />
                    ) : null}
                    <span className="text-sm text-muted-foreground">
                      {itemConfig.label || key}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {typeof item === "object" && "value" in item
                      ? (item as any).value
                      : "N/A"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
ChartTooltip.displayName = "ChartTooltip";

export {
  Chart,
  ChartArea,
  ChartBar,
  ChartLine,
  ChartTooltip,
};