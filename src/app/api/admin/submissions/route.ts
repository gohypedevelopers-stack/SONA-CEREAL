import { NextResponse } from 'next/server';
import { getSubmissions, getUsers, updateSubmission } from '@/lib/data';

export async function GET() {
  try {
    const submissions = await getSubmissions();
    const users = await getUsers();
    
    // Combine submissions with relevant user data
    const result = submissions.map((s: any) => {
      const user = users.find((u: any) => u.phone === s.phone);
      return {
        ...s,
        name: user?.name || s.phone,
        shopName: user?.shopName || 'N/A',
        city: user?.city || 'N/A'
      };
    });
    
    return NextResponse.json(result);
  } catch (error: any) {
     console.error("API Error:", error);
     return NextResponse.json([], { status: 500 }); // Return empty array on error
  }
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  const updated = await updateSubmission(id, { status });
  if (updated) {
    return NextResponse.json({ success: true, submission: updated });
  }
  return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
}
