"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  CheckCircle,
  Play,
  AlertCircle,
  UserPlus,
  Grid3X3,
  List,
  Download,
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { supabase } from "@/lib/supabaseClient";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [interns, setInterns] = useState<any[]>([]);
  const [requirements, setRequirements] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    const { data: internData } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("role", "intern");

    const { data: projectData } = await supabase.from("projects").select("*");

    const { data: reqData } = await supabase.from("project_requirements").select("*");

    setInterns(internData || []);
    setProjects(projectData || []);
    setRequirements(reqData || []);
  }

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((p) => {
      const matchText = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchText && matchStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title": return a.name.localeCompare(b.name);
        case "hours": return b.estimated_hours - a.estimated_hours;
        default: return 0;
      }
    });
  }, [projects, searchTerm, statusFilter, sortBy]);

  const getInternName = (id: string) => interns.find((i) => i.id === id)?.email || "Unassigned";

  const getProjectSkills = (projectId: string) =>
    requirements
      .filter((r) => r.project_id === projectId)
      .sort((a, b) => a.priority - b.priority)
      .map((r) => {
        switch (r.skill_id) {
          case "python": return "Python";
          case "sql": return "SQL";
          case "viz": return "Data Viz";
          default: return "Skill";
        }
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar userRole="admin" />
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Projects Overview
            </h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="hours">Estimated Hours</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} onClick={() => setViewMode("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Project Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredAndSortedProjects.map((p) => (
  <div
    key={p.id}
    className="cursor-pointer"
    onClick={() => setSelectedProject(p)}
  >
    <GlassCard className="p-6">
      <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                  <Badge variant="secondary">{p.assigned ? "Assigned" : "Available"}</Badge>
                </div>
                <div className="mb-3 text-sm">
                  Est. Hours: <strong>{p.estimated_hours}</strong>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {getProjectSkills(p.id).map((skill, idx) => (
                    <Badge key={idx} variant="outline">{skill}</Badge>
                  ))}
                </div>
    </GlassCard>
  </div>
))}
          </motion.div>
        </AnimatePresence>

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>{selectedProject.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p>{selectedProject.description}</p>
                <p><strong>Hours:</strong> {selectedProject.estimated_hours}</p>
                <p><strong>Assigned:</strong> {selectedProject.assigned ? "Yes" : "No"}</p>
                <p><strong>Skills Required:</strong></p>
                <ul className="list-disc ml-5">
                  {getProjectSkills(selectedProject.id).map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
      <Footer />
    </div>
  );
}
