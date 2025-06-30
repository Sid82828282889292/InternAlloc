// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeOff, Mail, Lock, User, UserCheck, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { GlassCard } from "@/components/ui/glass-card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function SignUpPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignUp = async (role: "admin" | "intern") => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsLoading(false);
//     router.push(`/dashboard/${role}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full max-w-md"
//       >
//         <div className="text-center mb-8">
//           <motion.div
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
//           >
//             <span className="text-lg font-bold text-white">IA</span>
//           </motion.div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Create Account
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mt-2">
//             Join InternAlloc today
//           </p>
//         </div>

//         <GlassCard className="p-6" glow>
//           <Tabs defaultValue="intern" className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="intern" className="flex items-center gap-2">
//                 <UserCheck className="h-4 w-4" />
//                 Intern
//               </TabsTrigger>
//               <TabsTrigger value="admin" className="flex items-center gap-2">
//                 <Users className="h-4 w-4" />
//                 Admin
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="intern">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSignUp("intern");
//                 }}
//                 className="space-y-4"
//               >
//                 <div className="space-y-2">
//                   <Label htmlFor="intern-name">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="intern-name"
//                       type="text"
//                       placeholder="John Doe"
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="intern-email">Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="intern-email"
//                       type="email"
//                       placeholder="intern@example.com"
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="intern-password">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="intern-password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Create a password"
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="intern-confirm-password">Confirm Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="intern-confirm-password"
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm your password"
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Creating Account..." : "Create Intern Account"}
//                 </Button>
//               </form>
//             </TabsContent>

//             <TabsContent value="admin">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSignUp("admin");
//                 }}
//                 className="space-y-4"
//               >
//                 <div className="space-y-2">
//                   <Label htmlFor="admin-name">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="admin-name"
//                       type="text"
//                       placeholder="John Admin"
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="admin-email">Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="admin-email"
//                       type="email"
//                       placeholder="admin@example.com"
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="admin-password">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="admin-password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Create a password"
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="admin-confirm-password">Confirm Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="admin-confirm-password"
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm your password"
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Creating Account..." : "Create Admin Account"}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </GlassCard>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<"admin" | "intern">("intern");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (role: "intern" | "admin") => {
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { error: insertError } = await supabase.from("users").insert({
        id: userId,
        email,
        role,
        name,
      });

      if (insertError) {
        setError(insertError.message);
        setIsLoading(false);
        return;
      }

      router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/intern");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
          >
            <span className="text-lg font-bold text-white">IA</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join InternAlloc today
          </p>
        </div>

        <GlassCard className="p-6" glow>
          <Tabs
            defaultValue="intern"
            className="w-full"
            onValueChange={(val) => setActiveRole(val as "intern" | "admin")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="intern" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Intern
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeRole}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp(activeRole);
                }}
                className="space-y-4"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : `Create ${activeRole} Account`}
                </Button>

                {/* Error */}
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
