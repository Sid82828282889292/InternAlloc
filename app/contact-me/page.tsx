"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ContactMePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
    suggestion: "n/a",
  });
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      label: "Enter your name",
      input: (
        <Input
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      ),
    },
    {
      label: "Enter your email",
      input: (
        <Input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      ),
    },
    {
      label: "What is your query?",
      input: (
        <Textarea
          placeholder="Describe your query"
          value={formData.query}
          onChange={(e) => setFormData({ ...formData, query: e.target.value })}
          required
        />
      ),
    },
    {
      label: "Any suggestions? (Optional)",
      input: (
        <Textarea
          placeholder="Suggestions (optional)"
          value={formData.suggestion}
          onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://formspree.io/f/mblywowz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          query: formData.query,
          suggestion: formData.suggestion,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", query: "", suggestion: "n/a" });
        setStep(0);
      } else {
        alert("❌ Failed to send message. Try again.");
      }
    } catch (e) {
      console.error(e);
      alert("❌ Error while submitting.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <motion.div
        className="w-full max-w-xl p-8 bg-white/80 dark:bg-gray-900/70 rounded-lg shadow-md backdrop-blur-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Contact Me
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-300 mb-4">
          I'd love to hear from you. Fill out the form below.
        </p>

        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-semibold">✅ Message sent successfully!</p>
            <Button onClick={() => router.push("/dashboard/admin")}>Return to Dashboard</Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <p className="font-medium text-gray-800 dark:text-gray-200">
                Step {step + 1} of {steps.length}: {steps[step].label}
              </p>
              {steps[step].input}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                disabled={step === 0}
              >
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
            <div className="pt-4 text-center">
              <Button variant="ghost" onClick={() => router.push("/dashboard/admin")}>
                ← Return to Dashboard
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
}
