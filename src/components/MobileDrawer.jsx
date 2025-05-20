// components/MobileDrawer.tsx
'use client'

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MobileDrawer = () => {

    const router = useRouter();

  return (
    <div className="md:hidden">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon" className="mx-3">
            <Menu className="w-5 h-5  text-black" />
          </Button>
        </DrawerTrigger>
        <DrawerContent  className="inset-y-0 left-0 h-full w-72 border-r bg-background p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
           <nav className="space-y-4">
            <button
              onClick={() => router.push('/')}
              className="block text-black text-left w-full text-sm font-medium"
            >
              Articles
            </button>
            <button
              onClick={() => router.push('/')}
              className="block text-black text-left w-full text-sm font-medium"
            >
              Publish
            </button>
            <button
              onClick={() => router.push('/')}
              className="block text-black text-left w-full text-sm font-medium"
            >
              Dashboard
            </button>
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default MobileDrawer
