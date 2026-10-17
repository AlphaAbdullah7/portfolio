"use client";

import { ArrowRight, FileText, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { PointerEvent } from "react";
import { profile } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import Terminal from "./Terminal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
	const reduce = useReducedMotion();
	const item = (i: number) =>
		reduce
			? {}
			: {
					initial: { opacity: 0, y: 28, filter: "blur(8px)" },
					animate: { opacity: 1, y: 0, filter: "blur(0px)" },
					transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease },
				};

	const track = (e: PointerEvent<HTMLElement>) => {
		const r = e.currentTarget.getBoundingClientRect();
		e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
		e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
	};

	return (
		<section
			id='top'
			onPointerMove={track}
			className='relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44'>
			{/* Backdrop: grid, aurora glows and a cursor spotlight */}
			<div
				aria-hidden='true'
				className='grid-bg absolute inset-0 -z-10'
			/>
			<div
				aria-hidden='true'
				className='absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]'
			/>
			<div
				aria-hidden='true'
				className='absolute right-[-10%] top-40 -z-10 h-[360px] w-[420px] rounded-full bg-accent-2/10 blur-[110px]'
			/>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 hidden md:block'
				style={{
					background:
						"radial-gradient(500px circle at var(--hx, 50%) var(--hy, 30%), rgb(139 141 255 / 0.09), transparent 60%)",
				}}
			/>

			<div className='mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr]'>
				<div>
					<motion.a
						{...item(0)}
						href='#contact'
						className='inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pl-2 pr-4 text-sm text-muted backdrop-blur transition-colors hover:border-line-2 hover:text-text'>
						<span className='relative flex size-2.5 items-center justify-center'>
							<span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70' />
							<span className='relative size-2 rounded-full bg-emerald-400' />
						</span>
						Open to new opportunities
					</motion.a>

					<motion.h1
						{...item(1)}
						className='mt-7 text-[clamp(2.4rem,4.4vw,3.9rem)] font-semibold leading-[1.05] tracking-[-0.045em]'>
						Hi, I&apos;m {profile.first}.
						<br />I build{" "}
						<span className='text-gradient'>
							products people use.
						</span>
					</motion.h1>

					<motion.p
						{...item(2)}
						className='mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl'>
						{profile.lede}
					</motion.p>

					<motion.div
						{...item(3)}
						className='mt-10 flex flex-wrap items-center gap-3'>
						<a
							href='#work'
							className='group inline-flex h-12 items-center gap-2 rounded-xl bg-text px-6 font-medium text-bg shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-6px_rgb(139_141_255/0.55)] transition-transform hover:-translate-y-0.5'>
							View my work
							<ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
						</a>
						<a
							href={profile.resume}
							target='_blank'
							rel='noreferrer'
							className='inline-flex h-12 items-center gap-2 rounded-xl border border-line-2 bg-white/[0.03] px-6 font-medium text-text transition-colors hover:bg-white/[0.07]'>
							<FileText className='size-4' />
							Resume
						</a>
					</motion.div>

					<motion.div
						{...item(4)}
						className='mt-10 flex items-center gap-5 text-sm text-muted'>
						<span className='inline-flex items-center gap-1.5'>
							<MapPin className='size-4' /> {profile.location}
						</span>
						<span className='h-4 w-px bg-line-2' />
						<a
							href={profile.github}
							target='_blank'
							rel='noreferrer'
							aria-label='GitHub'
							className='transition-colors hover:text-text'>
							<GithubIcon className='size-5' />
						</a>
						<a
							href={profile.linkedin}
							target='_blank'
							rel='noreferrer'
							aria-label='LinkedIn'
							className='transition-colors hover:text-text'>
							<LinkedinIcon className='size-5' />
						</a>
					</motion.div>
				</div>

				{/* Interactive terminal */}
				<motion.div
					initial={reduce ? false : { opacity: 0, y: 24, rotateX: 8 }}
					animate={{ opacity: 1, y: 0, rotateX: 0 }}
					transition={{ duration: 1.1, delay: 0.35, ease }}
					className='w-full min-w-0 [perspective:1200px]'>
					<Terminal />
					<p className='mt-4 text-center text-sm text-faint'>
						It&apos;s interactive — try typing{" "}
						<span className='font-mono text-muted'>sudo hire-me</span>
					</p>
				</motion.div>
			</div>
		</section>
	);
}
