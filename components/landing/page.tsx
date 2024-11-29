import { cn } from "@/lib/utils"
import Link from "next/link"

const Landing = () => {
  return (
    
    <div className="flex min-h-[80vh] items-center justify-center bg-background">
      <div className="text-center">
        
        <h1 className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        )}>
          Lockin with <span className="text-red-700">lokin</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
            never slack off
        </p>
        <Link href={'/pomo'}>
        <button className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing