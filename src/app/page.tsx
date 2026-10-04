"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Car, CheckCircle, Navigation, Loader2 } from "lucide-react";

/* â”€â”€ Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const Instagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
);

/* â”€â”€ Floating Particle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Particle({ x, y, size, delay, duration }: { x: number; y: number; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-red-400/20 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* â”€â”€ Animated Counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AnimatedLinkRow({
  href,
  icon,
  label,
  value,
  accent,
  delay,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
  delay: number;
  external?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 80, damping: 14 }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative flex items-center gap-4 w-full rounded-2xl px-5 py-4 transition-colors duration-300 overflow-hidden cursor-pointer
        bg-zinc-900/60 border ${hovered ? accent : 'border-zinc-800'}`}
    >
      {/* Shimmer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "200%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={hovered ? { rotate: [0, -10, 10, 0], scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center flex-shrink-0"
      >
        {icon}
      </motion.div>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-zinc-600 uppercase tracking-widest">{label}</p>
        <p className="text-white font-semibold text-sm md:text-base truncate">{value}</p>
      </div>

      <motion.div animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }} transition={{ duration: 0.2 }}>
        <Navigation className="w-4 h-4 text-zinc-700 -rotate-45" />
      </motion.div>
    </motion.a>
  );
}

/* â”€â”€ Section Label â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SectionLabel({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-medium text-center"
    >
      {children}
    </motion.p>
  );
}

/* â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Home() {
  const [data, setData] = useState<any>(null);
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
    }))
  );

  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData).catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-red-500 border-t-transparent"
        />
      </div>
    );
  }

  const { general, coordonnees, liens, logo } = data;
  const hasPhone    = !!coordonnees?.telephone;
  const hasWhatsApp = !!coordonnees?.whatsapp;
  const hasEmail    = !!coordonnees?.email;
  const hasSiteWeb    = !!liens?.siteWeb;
  const hasInstagram  = !!liens?.instagram;
  const hasGoogleMaps = !!liens?.googleMaps;
  const customLinks: { label: string; url: string }[] = (data.customLinks || []).filter((l: any) => l.label && l.url);

  let rowDelay = 0.3;
  const nextDelay = (d = 0.1) => { rowDelay += d; return rowDelay; };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-red-500 selection:text-black font-sans relative overflow-hidden">

      {/* â”€â”€ Ambient Background â”€â”€ */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-red-500/20 blur-[160px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-600/20 blur-[160px] rounded-full pointer-events-none"
      />

      {/* Floating Particles */}
      {particles.current.map((p, i) => <Particle key={i} {...p} />)}

      <main className="max-w-md mx-auto px-5 py-14 relative z-10 flex flex-col items-center gap-6">

        {/* â”€â”€ Logo â”€â”€ */}
        {logo && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
            className="relative"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-6px] rounded-full border-2 border-dashed border-red-500/30"
            />
            {/* Glow pulse */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-red-400/30 blur-2xl rounded-full"
            />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900">
              <img
                src={logo}
                alt={general?.nomCommercial || "Logo"}
                className="object-cover w-full h-full"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </motion.div>
        )}

        {/* â”€â”€ Name â”€â”€ */}
        {general?.nomCommercial && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-2">
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200%" }}
                className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent"
              >
                {general.nomCommercial}
              </motion.span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <CheckCircle className="w-7 h-7 text-blue-500" />
              </motion.div>
            </h1>
          </motion.div>
        )}

        {/* â”€â”€ ActivitÃ© + Ville â”€â”€ */}
        {(general?.activite || general?.ville) && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-center flex flex-col gap-1 -mt-2"
          >
            {general?.activite && (
              <p className="text-base text-zinc-400 flex items-center justify-center gap-2">
                <Car className="w-4 h-4 text-red-500" /> {general.activite}
              </p>
            )}
            {general?.ville && (
              <p className="text-sm text-zinc-600 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {general.ville}
              </p>
            )}
          </motion.div>
        )}

        {/* â”€â”€ Description â”€â”€ */}
        {general?.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center text-zinc-500 text-sm leading-relaxed border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-sm rounded-2xl px-6 py-4 w-full"
          >
            {general.description}
          </motion.p>
        )}

        {/* ── Contact ── */}
        {(hasPhone || hasWhatsApp || hasEmail) && (
          <div className="w-full flex flex-col gap-3">
            <SectionLabel delay={nextDelay(0.05)}>Contact</SectionLabel>

            {hasPhone && (
              <AnimatedLinkRow
                href={`tel:${coordonnees.telephone.replace(/\s+/g, '')}`}
                icon={<Phone className="w-4 h-4 text-blue-400" />}
                label="Téléphone"
                value={coordonnees.telephone}
                accent="border-blue-500/40"
                delay={nextDelay(0.08)}
              />
            )}
            {hasWhatsApp && (
              <AnimatedLinkRow
                href={`https://wa.me/${coordonnees.whatsapp.replace(/[\s+\-]/g, '')}`}
                icon={<WhatsAppIcon className="w-5 h-5 text-[#25D366]" />}
                label="WhatsApp"
                value={coordonnees.whatsapp}
                accent="border-[#25D366]/40"
                delay={nextDelay(0.08)}
                external
              />
            )}
            {hasEmail && (
              <AnimatedLinkRow
                href={`mailto:${coordonnees.email}`}
                icon={<Mail className="w-4 h-4 text-red-400" />}
                label="E-mail"
                value={coordonnees.email}
                accent="border-red-500/40"
                delay={nextDelay(0.08)}
              />
            )}
          </div>
        )}

        {/* ── Liens ── */}
        {(hasSiteWeb || hasInstagram || hasGoogleMaps) && (
          <div className="w-full flex flex-col gap-3">
            <SectionLabel delay={nextDelay(0.05)}>Liens Officiels</SectionLabel>

            {hasSiteWeb && (
              <AnimatedLinkRow
                href={liens.siteWeb}
                icon={<Globe className="w-4 h-4 text-red-400" />}
                label="Site Web"
                value="mariocars.ma"
                accent="border-red-500/40"
                delay={nextDelay(0.08)}
                external
              />
            )}
            {hasInstagram && (
              <AnimatedLinkRow
                href={liens.instagram}
                icon={<Instagram className="w-4 h-4 text-pink-400" />}
                label="Instagram"
                value={general?.instagramHandle || "Instagram"}
                accent="border-pink-500/40"
                delay={nextDelay(0.08)}
                external
              />
            )}
            {hasGoogleMaps && (
              <AnimatedLinkRow
                href={liens.googleMaps}
                icon={<MapPin className="w-4 h-4 text-blue-400" />}
                label="Google Maps"
                value="Avis & Localisation"
                accent="border-blue-500/40"
                delay={nextDelay(0.08)}
                external
              />
            )}
          </div>
        )}

        {/* ── Liens Personnalisés ── */}
        {customLinks.length > 0 && (
          <div className="w-full flex flex-col gap-3">
            <SectionLabel delay={nextDelay(0.05)}>Liens</SectionLabel>
            {customLinks.map((link, idx) => (
              <AnimatedLinkRow
                key={idx}
                href={link.url}
                icon={<Navigation className="w-4 h-4 text-zinc-400" />}
                label={link.label}
                value={link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                accent="border-zinc-600/50"
                delay={nextDelay(0.08)}
                external
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

