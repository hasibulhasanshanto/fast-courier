import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-colors duration-200",
        "data-[state=open]:border-t-2 data-[state=open]:border-t-fuchsia-500 data-[state=open]:bg-fuchsia-50/40",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between p-5",
          "text-left text-sm font-semibold text-gray-800 transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-fuchsia-400",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none ml-4 shrink-0 size-5 text-gray-500 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon className="pointer-events-none ml-4 hidden shrink-0 size-5 text-fuchsia-500 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
      {...props}
    >
      <div className="border-t border-fuchsia-300 mx-5" />
      <div
        className={cn(
          "px-5 pb-5 pt-5 text-gray-600 leading-relaxed",
          "[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
          "[&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
