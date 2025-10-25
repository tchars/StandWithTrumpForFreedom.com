"use client";

import React from "react";
import Link from "next/link";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileNavProps = {
	nav: {
		name: string;
		items: {
			label: string;
			href: string;
		}[];
	}[];
};

export function MobileNav({ nav }: MobileNavProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"extend-touch-target block size-8 touch-manipulation items-center justify-start gap-2.5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent md:hidden dark:hover:bg-transparent"
					)}
				>
					<div className="relative flex items-center justify-center">
						<div className="relative size-4">
							<span
								className={cn(
									"bg-gray-700 absolute left-0 block h-0.5 w-4 transition-all duration-100",
									open ? "top-[0.4rem] -rotate-45" : "top-1"
								)}
							/>
							<span
								className={cn(
									"bg-gray-700 absolute left-0 block h-0.5 w-4 transition-all duration-100",
									open ? "top-[0.4rem] rotate-45" : "top-2.5"
								)}
							/>
						</div>
						<span className="sr-only">Toggle Menu</span>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="bg-white/95 no-scrollbar h-(--radix-popover-content-available-height) w-(--radix-popover-content-available-width) overflow-y-auto rounded-none border-none p-0 shadow-lg backdrop-blur duration-100"
				align="start"
				side="bottom"
				alignOffset={-16}
				sideOffset={4}
			>
				<div className="flex flex-col gap-8 overflow-auto px-6 py-6">
					{nav.map((category, index) => (
						<div className="flex flex-col gap-4" key={index}>
							<p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
								{category.name}
							</p>
							<div className="flex flex-col gap-3">
								{category.items.map((item, index) => (
									<Link
										key={index}
										href={item.href as string}
										className="text-xl font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 px-3 py-2 transition-colors"
										onClick={() => setOpen(false)}
									>
										{item.label}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
