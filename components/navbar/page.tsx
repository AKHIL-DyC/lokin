"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { VscLock } from "react-icons/vsc"
import { useState, useEffect } from "react"
import axios from "axios"
import { RiHandCoinFill } from "react-icons/ri";

export function Nav() {
  const { data: session } = useSession()
  const email = session?.user?.email
  //@ts-expect-error-iderror
  const id = session?.user?.id as string | undefined
  const router = useRouter()
  const [points, setPoints] = useState<number | undefined>()

  useEffect(() => {
    const fetchCoins = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/coingetter?id=${email}`)
          setPoints(response.data.points)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }
    fetchCoins()
  }, [id,email])

  return (
    <div className="sticky top-0 inset-x-0 flex justify-between items-center max-w-screen-xl mx-auto  p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left side: Logo */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="font-bold text-2xl">
            <Link href="/" className="flex flex-row items-center">
              Lokin <VscLock className="ml-1" />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side: SignUp, Logout, Email, and Points */}
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          <NavigationMenuItem>
            {
              session?.user? (
                <>
                <button
                onClick={() => signOut()}
                className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
              >
                Logout
              </button>
              <Link href={'/shop'} prefetch={true}>
              <button
                className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                  Shop
              </button>
              </Link>
              </>
              )
              :
              (
                <button
              onClick={() => router.push("/signUp")}
              className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
            >
              SignUp
            </button>
              )

            }
            
          </NavigationMenuItem>
          <NavigationMenuItem>
           
          </NavigationMenuItem>
          {email && (
            <NavigationMenuItem>
              <p className="text-sm text-muted-foreground">{email}</p>
            </NavigationMenuItem>
          )}

<NavigationMenu>
   <NavigationMenuList>
     <NavigationMenuItem className="font-bold text-2xl">
       <Link href="/dashboardz" prefetch={true} className="flex flex-row items-center">
         Dashboard 
       </Link>
     </NavigationMenuItem>
   </NavigationMenuList>
 </NavigationMenu>
          {points !== undefined && (
            <NavigationMenuItem className="">
              <p className="text-lg font-medium flex flex-row items-center"><RiHandCoinFill /> <span className="font-bold ">{points}</span></p>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"