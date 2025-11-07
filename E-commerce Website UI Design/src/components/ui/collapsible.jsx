"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export function Collapsible({ ...props }) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export function CollapsibleTrigger({ ...props }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export function CollapsibleContent({ ...props }) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      {...props}
    />
  );
}
