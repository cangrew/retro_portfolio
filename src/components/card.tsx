'use client';

import { PropsWithChildren } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<CardContainer className="relative inline-block">
			<CardBody className="relative group/card inline-block">
				<CardItem translateZ={30}>
					<div className="relative border border-zinc-800 hover:border-zinc-500 bg-zinc-900/20 hover:bg-gradient-to-tl from-zinc-900/60 via-zinc-800/30 to-zinc-900/60 rounded-xl transition-shadow duration-500 hover:shadow-[0_0_20px_rgba(113,113,122,0.3)] z-10 p-6 w-full h-full">
						{children}
					</div>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
};