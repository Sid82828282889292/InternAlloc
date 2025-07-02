// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// interface GlassCardProps {
//   children: React.ReactNode;
//   className?: string;
//   hover?: boolean;
//   glow?: boolean;
// }

// export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
//   return (
//     <motion.div
//       whileHover={hover ? { scale: 1.02, y: -2 } : {}}
//       transition={{ duration: 0.2 }}
//       className={cn(
//         "relative rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl dark:bg-black/10 dark:border-white/10",
//         glow && "shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/20",
//         className
//       )}
//     >
//       {glow && (
//         <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
//       )}
//       <div className="relative z-10">{children}</div>
//     </motion.div>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void; // <-- added optional onClick
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl dark:bg-black/10 dark:border-white/10",
        glow && "shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/20",
        onClick && "cursor-pointer hover:shadow-lg", // 🟢 only if clickable
        className
      )}
    >
      {glow && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
