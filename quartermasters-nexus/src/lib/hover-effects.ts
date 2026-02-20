/**
 * Coastal Premium — Hover effects utility classes.
 * Light mode, subtle shadows and lifts.
 */

// Card lift effect with shadow
export const cardLiftEffect = `
  transition-all duration-300 ease-out
  hover:-translate-y-1
  hover:shadow-[0_8px_30px_rgba(27,58,75,0.12)]
  active:translate-y-0
  active:shadow-[0_4px_15px_rgba(27,58,75,0.08)]
`;

// Text shimmer effect
export const textShimmerEffect = `
  bg-gradient-to-r from-[#1B3A4B] via-[#2A9D8F] to-[#1B3A4B]
  bg-[length:200%_100%]
  bg-clip-text text-transparent
  animate-shimmer
`;

// Glass card with hover glow (light mode)
export const glassCardHoverEffect = `
  backdrop-blur-xl
  bg-white/70
  border border-[rgba(27,58,75,0.08)]
  transition-all duration-300
  hover:bg-white/85
  hover:border-[rgba(27,58,75,0.15)]
  hover:shadow-[0_4px_20px_rgba(27,58,75,0.1)]
`;

// Button with scale and glow
export const buttonHoverEffect = `
  transition-all duration-200
  hover:scale-105
  hover:shadow-[0_4px_20px_rgba(200,135,46,0.25)]
  active:scale-95
`;

// Icon rotate on hover
export const iconRotateEffect = `
  transition-transform duration-300
  hover:rotate-12
`;

// Magnetic cursor effect placeholder
export const magneticEffect = 'cursor-pointer';

// Stagger children animation (use with Framer Motion)
export const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
