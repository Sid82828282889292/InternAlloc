"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  skills: any[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProjectStepper({ skills, onClose, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(0);
  const [requirements, setRequirements] = useState([
    { skill_id: "", priority: 1 },
    { skill_id: "", priority: 2 },
    { skill_id: "", priority: 3 },
  ]);

  const handleSubmit = async () => {
    const { data: project, error: projectErr } = await supabase
      .from("projects")
      .insert([{ name, description, estimated_hours: hours, assigned: false }])
      .select()
      .single();

    if (projectErr || !project) return alert("Error adding project");

    for (const req of requirements) {
      await supabase.from("project_requirements").insert({
        project_id: project.id,
        skill_id: req.skill_id,
        priority: req.priority,
      });
    }

    alert("✅ Project added!");
    onSuccess();
    onClose();
  };

  return (
    <div className="space-y-4">
      {step === 1 && (
        <>
          <div>
            <Label>Project Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label>Estimated Hours</Label>
            <Input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!name || !description || !hours}>
              Next
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <Label>Assign Skills and Priority</Label>
          {requirements.map((r, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Select
                value={r.skill_id}
                onValueChange={(val) => {
                  const updated = [...requirements];
                  updated[i].skill_id = val;
                  setRequirements(updated);
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                className="w-20"
                min={1}
                max={3}
                value={r.priority}
                onChange={(e) => {
                  const updated = [...requirements];
                  updated[i].priority = Number(e.target.value);
                  setRequirements(updated);
                }}
              />
            </div>
          ))}

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={requirements.some((r) => !r.skill_id)}>
              Submit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
