import React from "react"
import { cn } from "../utils"

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode
  onClick: (id: string) => void
}

export const Chip = ({ className, onClick, children }: ChipProps) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        "bg-slate-200 inline-block  px-2 py-1 rounded-xl text-sm cursor-pointer",
        className
      )}>
      <div className='flex gap-x-3 items-center justify-center'>
        {children}
        <span className='text-lg'>&times;</span>
      </div>
    </span>
  )
}
