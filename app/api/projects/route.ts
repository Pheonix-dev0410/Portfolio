import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

// GET all projects
export async function GET() {
  try {
    await dbConnect();
    
    // Project fetching logic here

    return NextResponse.json({ projects: [] });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const data = await request.json() as ProjectData;
    await dbConnect();

    // Project creation logic here

    return NextResponse.json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 