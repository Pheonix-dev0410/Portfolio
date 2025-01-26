import { NextResponse } from 'next/server';

// Route handler simplified temporarily to fix deployment
export async function GET() {
  return NextResponse.json({ message: 'Project API endpoint' });
} 