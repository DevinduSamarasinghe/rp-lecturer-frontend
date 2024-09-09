"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"
const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = (props) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      props.className
    )}
    {...props}
  />
)

const AlertDialogContent = (props) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        props.className
      )}
      {...props}
    />
  </AlertDialogPortal>
)

const AlertDialogHeader = (props) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      props.className
    )}
    {...props}
  />
)

const AlertDialogFooter = (props) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      props.className
    )}
    {...props}
  />
)

const AlertDialogTitle = (props) => (
  <AlertDialogPrimitive.Title
    className={cn("text-lg font-semibold", props.className)}
    {...props}
  />
)

const AlertDialogDescription = (props) => (
  <AlertDialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", props.className)}
    {...props}
  />
)

const AlertDialogAction = (props) => (
  <AlertDialogPrimitive.Action
    className={cn(buttonVariants(), props.className)}
    {...props}
  />
)

const AlertDialogCancel = (props) => (
  <AlertDialogPrimitive.Cancel
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      props.className
    )}
    {...props}
  />
)

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
