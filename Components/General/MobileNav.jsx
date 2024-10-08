import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Separator } from "@radix-ui/react-select";

import Image from "next/image";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <div>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Image
                src={'/assets/icons/menu.svg'}
                alt="Menu"
                width={24}
                height={24}
                className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
            {/* <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader> */}

            <Image src={'/assets/images/logo.svg'} 
                alt="logo" 
                width={128} 
                height={38}
            />
            <Separator className="border border-gray-50"/>
            <NavItems/>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileNav;
