"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, BarChart3, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Smart Allocation",
      description: "Automatically match interns with projects based on skills and preferences"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Real-time monitoring of project progress and intern development"
    },
    {
      icon: Zap,
      title: "Efficient Management",
      description: "Streamlined workflow for admins to manage interns and projects"
    },
    {
      icon: Shield,
      title: "Goal-Oriented",
      description: "Ensure projects align with intern's learning goals and capacity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InternAlloc
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              A modern intern project allocation portal that intelligently matches interns with projects
              based on their skills, goals, and capacity. Streamline your internship management with
              our advanced allocation system.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/login">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose InternAlloc?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover the features that make intern management effortless
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center" glow>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <GlassCard className="p-8 text-center" glow>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Transform Your Internship Program?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of organizations already using InternAlloc to optimize their intern allocation process.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg">
                  Login as Admin
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Login as Intern
                </Button>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </div>
  );
}