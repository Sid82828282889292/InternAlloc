// import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabaseClient';

// export async function POST(req: NextRequest) {
//   const { project_id } = await req.json();

//   // Get currently signed-in user
//   const {
//     data: { user },
//     error: userError
//   } = await supabase.auth.getUser();

//   if (!user || userError) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   // Update completion status
//   const { error } = await supabase
//     .from('intern_projects')
//     .update({ completed: true })
//     .eq('intern_id', user.id)
//     .eq('project_id', project_id);

//   if (error) {
//     return NextResponse.json({ error: 'Could not mark complete' }, { status: 500 });
//   }

//   return NextResponse.json({ message: 'Marked complete ✅' });
// }


import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { project_id } = await req.json();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: assignment, error: fetchError } = await supabase
    .from('intern_projects')
    .select('*')
    .eq('intern_id', user.id)
    .eq('project_id', project_id)
    .single();

  if (fetchError || !assignment) {
    return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
  }

  const deleteRes = await supabase
    .from('intern_projects')
    .delete()
    .eq('intern_id', user.id)
    .eq('project_id', project_id);

  const insertRes = await supabase
    .from('completed_projects')
    .insert({
      intern_id: user.id,
      project_id,
      completed_at: new Date()
    });

  if (deleteRes.error || insertRes.error) {
    return NextResponse.json({ error: 'Failed to mark as completed' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Marked complete ✅' });
}
