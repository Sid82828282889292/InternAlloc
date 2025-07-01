"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-6 py-12 flex items-center justify-center">
      <motion.div
        className="w-full max-w-3xl bg-white/90 dark:bg-gray-900/80 rounded-lg shadow-lg p-8 backdrop-blur-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Terms & Conditions
        </h1>

        <div className="text-gray-700 dark:text-gray-300 space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to <strong>InternAlloc</strong>. By using this platform, you agree to abide
            by the following terms and conditions. Please read them carefully.
          </p>

          <section>
            <h2 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
              1. Usage of Platform
            </h2>
            <p>
              This platform is intended to assist with intern project allocations and tracking.
              Misuse of the system, tampering with data, or unauthorized access is strictly
              prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
              2. Account Responsibility
            </h2>
            <p>
              Users are responsible for maintaining the confidentiality of their accounts and
              passwords. Activities conducted under your account are your responsibility.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
              3. Data Accuracy
            </h2>
            <p>
              Interns and admins are responsible for ensuring that data entered (including skills,
              goals, and project completions) is accurate and up to date.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
              4. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate access if users violate these terms or
              engage in harmful behavior toward the platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
              5. Updates
            </h2>
            <p>
              These terms may be updated occasionally. Continued use of the platform constitutes
              acceptance of the updated terms.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => router.push("/dashboard/admin")} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
