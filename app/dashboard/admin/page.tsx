"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FolderOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import dynamic from "next/dynamic";
import AuthGuard from "@/lib/authGuard";

const AdminCharts = dynamic(() => import("@/components/AdminCharts"), {
  ssr: false,
});

export default function AdminDashboard() {
  const [message, setMessage] = useState("");
  const [interns, setInterns] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [report, setReport] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [internProjects, setInternProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchInterns();
    fetchSkills();
    fetchProjects();
    fetchReport();
    fetchInternProjects();
  }, []);

  async function fetchInterns() {
    const { data } = await supabase
      .from("users")
      .select("id, email, goal_hours")
      .eq("role", "intern");
    if (data) setInterns(data);
  }

  async function fetchSkills() {
    const { data } = await supabase.from("skills").select("*");
    if (data) setSkills(data);
  }

  async function fetchProjects() {
    const { data } = await supabase.from("projects").select("*");
    if (data) setProjects(data);
  }

  async function fetchReport() {
    const { data } = await supabase
      .from("completed_projects")
      .select("id, project_id, intern_id, completed_at, projects(name), users(email)");
    if (data) setReport(data);
  }

  async function fetchInternProjects() {
    const { data } = await supabase.from("intern_projects").select("*");
    if (data) setInternProjects(data);
  }

  const stats = [
    {
      title: "Total Interns",
      value: interns.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Unassigned Projects",
      value: projects.filter((p) => !p.assigned).length,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Completed",
      value: report.length,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <AuthGuard role="admin">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar userRole="admin" />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track performance and manage interns
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6" glow>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={async () => {
                const res = await fetch("/api/allocate", { method: "POST" });
                const result = await res.json();
                alert(result.success ? "✅ Auto-allocation complete!" : `❌ ${result.error}`);
                fetchInternProjects();
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 mb-10"
            >
              Auto Allocate Projects
            </Button>
          </div>

          {/* ✅ Updated Assigned Projects Table */}
          <GlassCard className="p-6 mt-10" glow>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Current Project Assignments
            </h2>
            <div className="overflow-auto rounded-lg shadow">
              <table className="min-w-full text-sm text-left text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Project</th>
                    <th className="px-4 py-2 border">Assigned To</th>
                    <th className="px-4 py-2 border">Estimated Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.filter(p => p.assigned).map(p => {
                    const internProject = internProjects.find(ip => ip.project_id === p.id);
                    const intern = interns.find(i => i.id === internProject?.intern_id);
                    const assignedIntern =
                      intern?.email ||
                      (internProject?.intern_id === "none" ? "Not enough hours" : "Unknown");

                    return (
                      <tr
                        key={p.id}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="border px-4 py-2">{p.name}</td>
                        <td className="border px-4 py-2">{assignedIntern}</td>
                        <td className="border px-4 py-2">{p.estimated_hours}h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Completed Projects Report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard className="p-6 mt-10" glow>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Completed Projects Report
              </h2>
              <div className="overflow-auto rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Intern</th>
                      <th className="px-4 py-2 border">Project</th>
                      <th className="px-4 py-2 border">Completed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((r) => (
                      <tr
                        key={r.id}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="border px-4 py-2">
                          {r.users?.email || r.intern_id}
                        </td>
                        <td className="border px-4 py-2">
                          {r.projects?.name || r.project_id}
                        </td>
                        <td className="border px-4 py-2">
                          {new Date(r.completed_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {report.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                        >
                          No completed projects found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <AdminCharts internsData={interns} reportData={report} />
          </motion.section>
        </main>
        <Footer />
        {message && (
          <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-white px-4 py-2 rounded shadow">
            {message}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
