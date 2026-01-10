// src/components/ui/button.jsx
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-sky-500 text-white shadow hover:bg-sky-600",
        outline: "border border-white/10 bg-white/4",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export default function Button({ asChild = false, className = "", variant, size, ...props }) {
  const Comp = asChild ? Slot : "button";
  const classes = `${buttonVariants({ variant, size })} ${className}`.trim();
  return <Comp className={classes} {...props} />;
}
