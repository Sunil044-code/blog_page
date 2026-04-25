import { cn } from "../utils"

export default function Skeleton({className,...props}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10 bg-gray-300", className)}
      {...props}
    />
  )
}

