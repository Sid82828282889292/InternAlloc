"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  Star,
  BookOpen,
  Target,
  Award,
  Eye,
  ArrowUpDown,
  Grid3X3,
  List,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockProjects, mockInterns, getProjectsForIntern, matchProjectsToIntern, Project } from "@/lib/mock-data";

export default function InternProjectsPage() {
  // For demo purposes, we'll use the first intern
  const currentIntern = mockInterns[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());

  const currentProjects = getProjectsForIntern(currentIntern.id);
  const availableProjects = matchProjectsToIntern(currentIntern);
  const allProjects = [...currentProjects, ...availableProjects];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesCategory = true;
      if (categoryFilter === "current") {
        matchesCategory = currentProjects.some(p => p.id === project.id);
      } else if (categoryFilter === "available") {
        matchesCategory = availableProjects.some(p => p.id === project.id);
      } else if (categoryFilter === "matched") {
        matchesCategory = availableProjects.some(p => p.id === project.id);
      }
      
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case "hours":
          return a.estimatedHours - b.estimatedHours;
        case "progress":
          return (b.progress || 0) - (a.progress || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [allProjects, searchTerm, categoryFilter, sortBy, currentProjects, availableProjects]);

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
      case "assigned": return BookOpen;
      case "in-progress": return Play;
      case "completed": return Award;
      default: return AlertCircle;
    }
  };

  const isCurrentProject = (projectId: string) => {
    return currentProjects.some(p => p.id === projectId);
  };

  const isMatchedProject = (projectId: string) => {
    return availableProjects.some(p => p.id === projectId);
  };

  const getSkillMatch = (project: Project) => {
    const internSkills = currentIntern.skills.map(s => s.name.toLowerCase());
    const matchedSkills = project.requiredSkills.filter(skill => 
      internSkills.includes(skill.toLowerCase())
    );
    return (matchedSkills.length / project.requiredSkills.length) * 100;
  };

  const toggleLike = (projectId: string) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const handleRequestAssignment = (projectId: string) => {
    // Implementation for requesting project assignment
    console.log(`Requesting assignment for project ${projectId}`);
  };

  const stats = [
    {
      title: "Current Projects",
      value: currentProjects.length,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Available Projects",
      value: availableProjects.length,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Hours",
      value: `${currentProjects.reduce((sum, p) => sum + p.estimatedHours, 0)}h`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Avg Progress",
      value: `${Math.round(currentProjects.reduce((sum, p) => sum + (p.progress || 0), 0) / currentProjects.length || 0)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar userRole="intern" />
      
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
                My Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your current projects and discover new opportunities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="group">
                <Share2 className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Share Portfolio
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
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 lg:p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${stat.color}`} />
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
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="matched">Matched</SelectItem>
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
              const skillMatch = getSkillMatch(project);
              const isCurrent = isCurrentProject(project.id);
              const isMatched = isMatchedProject(project.id);
              const isLiked = likedProjects.has(project.id);

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
                    className={`p-6 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      viewMode === "list" ? "flex items-center gap-6" : ""
                    } ${isCurrent ? "ring-2 ring-blue-500/50" : ""} ${isMatched ? "ring-2 ring-green-500/50" : ""}`}
                    glow
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Background Pattern for Matched Projects */}
                    {isMatched && (
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
                    )}

                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(project.status)}/10 relative`}>
                            <StatusIcon className={`h-5 w-5 ${getStatusColor(project.status).replace('bg-', 'text-')}`} />
                            {isCurrent && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {project.status}
                              </Badge>
                              {isCurrent && (
                                <Badge className="text-xs bg-blue-500">Current</Badge>
                              )}
                              {isMatched && (
                                <Badge className="text-xs bg-green-500">Matched</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(project.id);
                            }}
                            className={`opacity-0 group-hover:opacity-100 transition-all ${isLiked ? 'text-red-500 opacity-100' : ''}`}
                          >
                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Skill Match Indicator */}
                      {isMatched && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-green-600">Skill Match</span>
                            <span className="text-sm text-green-600 font-semibold">
                              {Math.round(skillMatch)}%
                            </span>
                          </div>
                          <Progress value={skillMatch} className="h-2" />
                        </div>
                      )}

                      {/* Progress for Current Projects */}
                      {isCurrent && project.progress !== undefined && (
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
                        {project.requiredSkills.slice(0, 3).map((skill) => {
                          const hasSkill = currentIntern.skills.some(s => 
                            s.name.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <Badge 
                              key={skill} 
                              variant={hasSkill ? "default" : "outline"} 
                              className={`text-xs ${hasSkill ? 'bg-green-500' : ''}`}
                            >
                              {skill}
                              {hasSkill && <Star className="ml-1 h-3 w-3" />}
                            </Badge>
                          );
                        })}
                        {project.requiredSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.requiredSkills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                            <Clock className="h-4 w-4" />
                            {project.estimatedHours}h
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                            <Calendar className="h-4 w-4" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {isMatched && !isCurrent && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAssignment(project.id);
                            }}
                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                          >
                            Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Project Details Dialog */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedProject.title}
                  {isCurrentProject(selectedProject.id) && (
                    <Badge className="bg-blue-500">Current Project</Badge>
                  )}
                  {isMatchedProject(selectedProject.id) && (
                    <Badge className="bg-green-500">Matched Project</Badge>
                  )}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {selectedProject.requiredSkills.map((skill) => {
                        const hasSkill = currentIntern.skills.some(s => 
                          s.name.toLowerCase() === skill.toLowerCase()
                        );
                        return (
                          <Badge 
                            key={skill} 
                            variant={hasSkill ? "default" : "outline"} 
                            className={`text-xs ${hasSkill ? 'bg-green-500' : ''}`}
                          >
                            {skill}
                            {hasSkill && <Star className="ml-1 h-3 w-3" />}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {isMatchedProject(selectedProject.id) && (
                  <div>
                    <h4 className="font-semibold mb-2">Skill Match Analysis</h4>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Match</span>
                        <span className="text-sm font-semibold text-green-600">
                          {Math.round(getSkillMatch(selectedProject))}%
                        </span>
                      </div>
                      <Progress value={getSkillMatch(selectedProject)} className="h-2 mb-3" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        This project matches your skill set and fits within your current capacity goals.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                  {isMatchedProject(selectedProject.id) && !isCurrentProject(selectedProject.id) && (
                    <Button 
                      onClick={() => handleRequestAssignment(selectedProject.id)}
                      className="bg-gradient-to-r from-green-500 to-blue-500"
                    >
                      Request Assignment
                    </Button>
                  )}
                  {isCurrentProject(selectedProject.id) && (
                    <Button>
                      View Progress
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <Footer />
    </div>
  );
}