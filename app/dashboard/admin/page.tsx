// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Users,
//   FolderOpen,
//   AlertTriangle,
//   TrendingUp,
//   Clock,
//   CheckCircle,
//   UserPlus,
//   Settings,
// } from "lucide-react";
// import { Navbar } from "@/components/ui/navbar";
// import { Footer } from "@/components/ui/footer";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { GlassCard } from "@/components/ui/glass-card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { mockInterns, mockProjects, getProjectsForIntern, matchProjectsToIntern } from "@/lib/mock-data";

// export default function AdminDashboard() {
//   const [selectedIntern, setSelectedIntern] = useState<string | null>(null);

//   const totalInterns = mockInterns.length;
//   const totalProjects = mockProjects.length;
//   const activeProjects = mockProjects.filter(p => p.status === "in-progress").length;
//   const completedProjects = mockProjects.filter(p => p.status === "completed").length;

//   const stats = [
//     {
//       title: "Total Interns",
//       value: totalInterns,
//       icon: Users,
//       color: "text-blue-600",
//       bgColor: "bg-blue-500/10",
//     },
//     {
//       title: "Total Projects",
//       value: totalProjects,
//       icon: FolderOpen,
//       color: "text-green-600",
//       bgColor: "bg-green-500/10",
//     },
//     {
//       title: "Active Projects",
//       value: activeProjects,
//       icon: Clock,
//       color: "text-orange-600",
//       bgColor: "bg-orange-500/10",
//     },
//     {
//       title: "Completed",
//       value: completedProjects,
//       icon: CheckCircle,
//       color: "text-purple-600",
//       bgColor: "bg-purple-500/10",
//     },
//   ];

//   const handleAutoAllocate = (internId: string) => {
//     const intern = mockInterns.find(i => i.id === internId);
//     if (!intern) return;

//     const matchedProjects = matchProjectsToIntern(intern);
//     console.log(`Auto-allocating projects for ${intern.name}:`, matchedProjects);
//     // Here you would typically update the state/database
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <Navbar userRole="admin" />
      
//       <main className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Manage interns, projects, and allocations
//           </p>
//         </motion.div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <GlassCard className="p-6" glow>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                       {stat.title}
//                     </p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {stat.value}
//                     </p>
//                   </div>
//                   <div className={`p-3 rounded-lg ${stat.bgColor}`}>
//                     <stat.icon className={`h-6 w-6 ${stat.color}`} />
//                   </div>
//                 </div>
//               </GlassCard>
//             </motion.div>
//           ))}
//         </div>

//         {/* Alerts Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mb-8"
//         >
//           <GlassCard className="p-6" glow>
//             <div className="flex items-center gap-3 mb-4">
//               <AlertTriangle className="h-5 w-5 text-orange-500" />
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Alerts & Notifications
//               </h2>
//             </div>
//             <div className="space-y-3">
//               {mockProjects
//                 .filter(p => p.estimatedHours > 25)
//                 .map(project => (
//                   <div
//                     key={project.id}
//                     className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-900 dark:text-white">
//                         {project.title}
//                       </p>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">
//                         Estimated hours ({project.estimatedHours}h) exceed recommended limit
//                       </p>
//                     </div>
//                     <Badge variant="destructive">High Hours</Badge>
//                   </div>
//                 ))}
//             </div>
//           </GlassCard>
//         </motion.div>

//         {/* Interns Management */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <GlassCard className="p-6" glow>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Intern Management
//               </h2>
//               <Button>
//                 <UserPlus className="mr-2 h-4 w-4" />
//                 Add Intern
//               </Button>
//             </div>

//             <div className="space-y-4">
//               {mockInterns.map((intern) => {
//                 const internProjects = getProjectsForIntern(intern.id);
//                 const hoursUtilization = (intern.goals.currentHours / intern.goals.maxHours) * 100;
                
//                 return (
//                   <motion.div
//                     key={intern.id}
//                     whileHover={{ scale: 1.01 }}
//                     className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <Avatar>
//                           <AvatarImage src={intern.avatar} />
//                           <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                             {intern.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 dark:text-white">
//                             {intern.name}
//                           </h3>
//                           <p className="text-sm text-gray-600 dark:text-gray-300">
//                             {intern.email}
//                           </p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <span className="text-xs text-gray-500">
//                               {intern.goals.currentHours}h / {intern.goals.maxHours}h
//                             </span>
//                             <Progress value={hoursUtilization} className="w-20 h-2" />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-4">
//                         <div className="text-right">
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {internProjects.length} Projects
//                           </p>
//                           <div className="flex gap-1 mt-1">
//                             {intern.skills.slice(0, 3).map((skill) => (
//                               <Badge key={skill.name} variant="secondary" className="text-xs">
//                                 {skill.name}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="flex gap-2">
//                           <Dialog>
//                             <DialogTrigger asChild>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => setSelectedIntern(intern.id)}
//                               >
//                                 View Details
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent className="max-w-2xl">
//                               <DialogHeader>
//                                 <DialogTitle>{intern.name} - Details</DialogTitle>
//                               </DialogHeader>
//                               <div className="space-y-4">
//                                 <div>
//                                   <h4 className="font-semibold mb-2">Skills</h4>
//                                   <div className="grid grid-cols-2 gap-2">
//                                     {intern.skills.map((skill) => (
//                                       <div key={skill.name} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
//                                         <span className="text-sm">{skill.name}</span>
//                                         <div className="flex items-center gap-2">
//                                           <span className="text-xs text-gray-500">P{skill.priority}</span>
//                                           <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded">
//                                             <div 
//                                               className="h-full bg-blue-500 rounded"
//                                               style={{ width: `${skill.level * 10}%` }}
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <h4 className="font-semibold mb-2">Current Projects</h4>
//                                   <div className="space-y-2">
//                                     {internProjects.map((project) => (
//                                       <div key={project.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
//                                         <div className="flex justify-between items-center">
//                                           <span className="font-medium">{project.title}</span>
//                                           <Progress value={project.progress || 0} className="w-20" />
//                                         </div>
//                                         <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                                           {project.estimatedHours}h • Due: {new Date(project.deadline).toLocaleDateString()}
//                                         </p>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 </div>
//                               </div>
//                             </DialogContent>
//                           </Dialog>

//                           <Button
//                             size="sm"
//                             onClick={() => handleAutoAllocate(intern.id)}
//                             className="bg-gradient-to-r from-blue-500 to-purple-600"
//                           >
//                             Auto Allocate
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </GlassCard>
//         </motion.div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [selectedIntern, setSelectedIntern] = useState<string | null>(null);

  useEffect(() => {
    fetchInterns();
    fetchSkills();
    fetchProjects();
    fetchReport();
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
    const { data } = await supabase
      .from("projects")
      .select("*");
    if (data) setProjects(data);
  }

  async function fetchReport() {
    const { data } = await supabase
      .from("completed_projects")
      .select("id, project_id, intern_id, completed_at, projects(name), users(email)");
    if (data) setReport(data);
  }

  const totalInterns = interns.length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => !p.assigned).length;
  const completedProjects = report.length;

  const stats = [
    {
      title: "Total Interns",
      value: totalInterns,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Unassigned Projects",
      value: activeProjects,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Completed",
      value: completedProjects,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  const InternSkills = ({ internId }: { internId: string }) => {
    const [ratings, setRatings] = useState<any[]>([]);

    useEffect(() => {
      async function fetchRatings() {
        const { data } = await supabase
          .from("intern_skills")
          .select("*")
          .eq("intern_id", internId);
        if (data) setRatings(data);
      }
      fetchRatings();
    }, [internId]);

    return (
      <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
        {ratings.map((r) => {
          const skillName = skills.find((s) => s.id === r.skill_id)?.name;
          return (
            <li key={r.skill_id}>
              {skillName}: {r.rating}/5
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <AuthGuard role="admin">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar userRole="admin" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Stats Grid */}
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

        {/*Auto allocation*/}
        <div className="flex justify-center">
          <Button
            onClick={async () => {
              const res = await fetch('/api/allocate', { method: 'POST' });
              const result = await res.json();
              alert(result.success ? '✅ Auto-allocation complete!' : `❌ ${result.error}`);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 mb-10"
          >
            Auto Allocate Projects
          </Button>
        </div>


        {/* Interns Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <GlassCard className="p-6" glow>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Interns Overview
              </h2>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Intern
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {interns.map((intern) => (
                <motion.div
                  key={intern.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/60 dark:bg-gray-800/40"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {intern.email}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Goal: {intern.goal_hours} hrs/month
                      </p>
                      <InternSkills internId={intern.id} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        {/* Assigned Projects Table */}
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
          const intern = interns.find(i =>
            report.find(r => r.project_id === p.id && r.intern_id === i.id)
          );
          const assignedIntern = intern?.email || 'Unknown';
          return (
            <tr key={p.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
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
          <GlassCard className="p-6" glow>
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

        {/* Charts */}
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
