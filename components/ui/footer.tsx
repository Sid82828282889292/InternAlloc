"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Sid82828282889292", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/siddhant-gupta-aa9044320", icon: Linkedin },
    { name: "Email", href: "mailto:fabulous.siddhant@gmail.com", icon: Mail },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t border-gray-200/20 dark:border-gray-800/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-12"
    >
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700 dark:text-gray-300">
        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
            >
              <span className="text-sm font-bold text-white">IA</span>
            </motion.div>
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                InternAlloc
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Smart Intern Project Allocation
              </p>
            </div>
          </div>
          <p className="text-xs mt-10">
            &copy; {currentYear} Made with{" "}
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="inline-block h-3 w-3 text-red-500 fill-current" />
            </motion.span>{" "}
            by Siddhant Gupta
          </p>
        </div>

        {/* Sections */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Explore</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/contact-me" className="hover:underline">Contact Me</Link>
            </li>
            <li>
              <a href="https://my-portfolio-lemon-gamma-92.vercel.app/" target="_blank" className="flex items-center gap-1 hover:underline">
                Portfolio <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Socials</h3>
          <div className="flex space-x-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
