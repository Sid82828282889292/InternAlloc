"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  ArrowUpDown,
  Grid3X3,
  List,
  Download,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockProjects, mockInterns, Project, Intern } from "@/lib/mock-data";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case "hours":
          return b.estimatedHours - a.estimatedHours;
        case "progress":
          return (b.progress || 0) - (a.progress || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [projects, searchTerm, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "assigned": return "bg-blue-500";
      case "in-progress": return "bg-orange-500";
      case "completed": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return CheckCircle;
      case "assigned": return UserPlus;
      case "in-progress": return Play;
      case "completed": return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getAssignedIntern = (internId?: string): Intern | undefined => {
    return mockInterns.find(intern => intern.id === internId);
  };

  const handleCreateProject = () => {
    // Implementation for creating new project
    setIsCreateDialogOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: Grid3X3,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "In Progress",
      value: projects.filter(p => p.status === "in-progress").length,
      icon: Play,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Available",
      value: projects.filter(p => p.status === "available").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Completed",
      value: projects.filter(p => p.status === "completed").length,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Project Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage and allocate projects to interns
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsCreateDialogOpen(true)} className="group">
                <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                New Project
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <GlassCard className="p-4 lg:p-6" glow>
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
                    <stat.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.color}`} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard className="p-6" glow>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Projects Grid/List */}
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
            {filteredAndSortedProjects.map((project, index) => {
              const StatusIcon = getStatusIcon(project.status);
              const assignedIntern = getAssignedIntern(project.assignedTo);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <GlassCard 
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      viewMode === "list" ? "flex items-center gap-6" : ""
                    }`}
                    glow
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(project.status)}/10`}>
                            <StatusIcon className={`h-5 w-5 ${getStatusColor(project.status).replace('bg-', 'text-')}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {project.title}
                            </h3>
                            <Badge variant="secondary" className="mt-1">
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Assign Intern
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project.id);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {project.progress !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {project.progress}%
                            </span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.requiredSkills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {project.requiredSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.requiredSkills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                            <Clock className="h-4 w-4" />
                            {project.estimatedHours}h
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                            <Calendar className="h-4 w-4" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {assignedIntern && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={assignedIntern.avatar} />
                              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {assignedIntern.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600 dark:text-gray-300">
                              {assignedIntern.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Create Project Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Enter project title" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter project description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours">Estimated Hours</Label>
                  <Input id="hours" type="number" placeholder="25" />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="skills">Required Skills (comma separated)</Label>
                <Input id="skills" placeholder="React, TypeScript, Node.js" />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Project Details Dialog */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge variant="secondary">{selectedProject.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Hours:</span>
                        <span>{selectedProject.estimatedHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deadline:</span>
                        <span>{new Date(selectedProject.deadline).toLocaleDateString()}</span>
                      </div>
                      {selectedProject.progress !== undefined && (
                        <div className="flex justify-between">
                          <span>Progress:</span>
                          <span>{selectedProject.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedProject.assignedTo && (
                  <div>
                    <h4 className="font-semibold mb-2">Assigned Intern</h4>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar>
                        <AvatarImage src={getAssignedIntern(selectedProject.assignedTo)?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {getAssignedIntern(selectedProject.assignedTo)?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{getAssignedIntern(selectedProject.assignedTo)?.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {getAssignedIntern(selectedProject.assignedTo)?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <Footer />
    </div>
  );
}