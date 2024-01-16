import React from "react"
import { cn } from "../utils"

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element
}

export const Dropdown = ({ className, children, ...props }: DropdownProps) => {
  return (
    <div
      className={cn(
        "w-1/2 max-h-40 overflow-y-scroll mx-auto shadow-xl py-4 rounded-sm",
        className
      )}
      {...props}>
      {children}
    </div>
  )
}
