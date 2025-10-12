"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-900/5", className)}
    {...props}
  />
))
Card.displayName = "Card"

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1 border-b border-slate-100 px-6 pb-4 pt-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-6", className)} {...props} />
))
CardContent.displayName = "CardContent"

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 pb-6", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter }
