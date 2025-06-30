export interface Skill {
  name: string;
  level: number;
  priority: number;
}

export interface Goal {
  maxHours: number;
  currentHours: number;
  monthlyTarget: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  estimatedHours: number;
  deadline: string;
  status: "available" | "assigned" | "in-progress" | "completed";
  assignedTo?: string;
  progress?: number;
}

export interface Intern {
  id: string;
  name: string;
  email: string;
  skills: Skill[];
  goals: Goal;
  currentProjects: string[];
  avatar?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
}

// Mock data
export const mockInterns: Intern[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    skills: [
      { name: "React", level: 8, priority: 1 },
      { name: "TypeScript", level: 7, priority: 2 },
      { name: "Node.js", level: 6, priority: 3 },
      { name: "Python", level: 5, priority: 4 },
    ],
    goals: {
      maxHours: 40,
      currentHours: 25,
      monthlyTarget: 160,
    },
    currentProjects: ["1", "2"],
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    skills: [
      { name: "Python", level: 9, priority: 1 },
      { name: "Machine Learning", level: 8, priority: 2 },
      { name: "Data Analysis", level: 7, priority: 3 },
      { name: "SQL", level: 6, priority: 4 },
    ],
    goals: {
      maxHours: 35,
      currentHours: 30,
      monthlyTarget: 140,
    },
    currentProjects: ["3"],
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    skills: [
      { name: "UI/UX Design", level: 9, priority: 1 },
      { name: "Figma", level: 8, priority: 2 },
      { name: "React", level: 7, priority: 3 },
      { name: "CSS", level: 8, priority: 4 },
    ],
    goals: {
      maxHours: 30,
      currentHours: 20,
      monthlyTarget: 120,
    },
    currentProjects: ["4"],
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description: "Build a modern dashboard for e-commerce analytics with real-time data visualization.",
    requiredSkills: ["React", "TypeScript", "Chart.js"],
    estimatedHours: 25,
    deadline: "2025-02-15",
    status: "in-progress",
    assignedTo: "1",
    progress: 60,
  },
  {
    id: "2",
    title: "Mobile App API",
    description: "Develop RESTful API for a mobile application with authentication and data management.",
    requiredSkills: ["Node.js", "Express", "MongoDB"],
    estimatedHours: 30,
    deadline: "2025-02-20",
    status: "in-progress",
    assignedTo: "1",
    progress: 40,
  },
  {
    id: "3",
    title: "ML Recommendation System",
    description: "Create a machine learning model for product recommendations using collaborative filtering.",
    requiredSkills: ["Python", "Machine Learning", "TensorFlow"],
    estimatedHours: 35,
    deadline: "2025-02-25",
    status: "in-progress",
    assignedTo: "2",
    progress: 70,
  },
  {
    id: "4",
    title: "Design System Library",
    description: "Design and implement a comprehensive design system with reusable components.",
    requiredSkills: ["UI/UX Design", "Figma", "CSS", "React"],
    estimatedHours: 20,
    deadline: "2025-02-10",
    status: "in-progress",
    assignedTo: "3",
    progress: 80,
  },
  {
    id: "5",
    title: "Data Visualization Tool",
    description: "Build an interactive data visualization tool for business intelligence.",
    requiredSkills: ["Python", "Data Analysis", "D3.js"],
    estimatedHours: 28,
    deadline: "2025-03-01",
    status: "available",
  },
  {
    id: "6",
    title: "Social Media Analytics",
    description: "Develop a tool to analyze social media engagement and trends.",
    requiredSkills: ["React", "Node.js", "API Integration"],
    estimatedHours: 32,
    deadline: "2025-03-05",
    status: "available",
  },
];

export const mockAdmin: Admin = {
  id: "admin1",
  name: "John Admin",
  email: "admin@example.com",
};

// Utility functions
export function getInternById(id: string): Intern | undefined {
  return mockInterns.find(intern => intern.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find(project => project.id === id);
}

export function getProjectsForIntern(internId: string): Project[] {
  return mockProjects.filter(project => project.assignedTo === internId);
}

export function getAvailableProjects(): Project[] {
  return mockProjects.filter(project => project.status === "available");
}

export function matchProjectsToIntern(intern: Intern): Project[] {
  const availableProjects = getAvailableProjects();
  const internSkills = intern.skills.map(s => s.name.toLowerCase());
  
  return availableProjects.filter(project => {
    const hasRequiredSkills = project.requiredSkills.some(skill => 
      internSkills.includes(skill.toLowerCase())
    );
    const fitsInGoals = (intern.goals.currentHours + project.estimatedHours) <= intern.goals.maxHours;
    
    return hasRequiredSkills && fitsInGoals;
  });
}