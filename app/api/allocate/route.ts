import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST() {
  try {
    const { data: unassignedProjects, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .is('assigned', null);

    if (projectError || !unassignedProjects) {
      return NextResponse.json({ error: 'Failed to fetch unassigned projects.' }, { status: 500 });
    }

    const { data: interns, error: internError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'intern');

    if (internError || !interns) {
      return NextResponse.json({ error: 'Failed to fetch interns.' }, { status: 500 });
    }

    for (const project of unassignedProjects) {
      const { data: projectSkills } = await supabase
        .from('project_skills')
        .select('*')
        .eq('project_id', project.id);

      if (!projectSkills?.length) continue;

      let bestMatch = null;
      let bestScore = -Infinity;

      for (const intern of interns) {
        const { data: internSkills } = await supabase
          .from('intern_skills')
          .select('*')
          .eq('intern_id', intern.id);

        if (!internSkills) continue;

        let score = 0;

        for (const ps of projectSkills) {
          const match = internSkills.find(s => s.skill_id === ps.skill_id);
          if (match) {
            // Score = rating * 2 if match, bonus for higher rating
            score += match.rating * 2;
          }
        }

        const isAvailable = intern.goal_hours >= (intern.current_hours + project.estimated_hours);

        if (!isAvailable) continue;

        // Optional: Penalize if already near max hours
        const utilization = intern.current_hours / intern.goal_hours;
        score -= utilization * 5; // penalize overloaded interns

        if (score > bestScore) {
          bestScore = score;
          bestMatch = intern;
        }
      }

      if (bestMatch) {
        await supabase.from('intern_projects').insert({
          intern_id: bestMatch.id,
          project_id: project.id,
        });

        await supabase
          .from('projects')
          .update({ assigned: true })
          .eq('id', project.id);

        await supabase
          .from('users')
          .update({ current_hours: bestMatch.current_hours + project.estimated_hours })
          .eq('id', bestMatch.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('AI Allocation Error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
