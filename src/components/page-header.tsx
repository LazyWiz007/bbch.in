import Image from "next/image";
import { Container } from "./ui/container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/header-banner.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1436] via-[#13268f]/90 to-[#1d3fcc]/50" />
      </div>
      <Container className="relative py-16 sm:py-20">
        {eyebrow && <p className="eyebrow text-yellow">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {subtitle}
          </p>
        )}
      </Container>
      <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
    </section>
  );
}
