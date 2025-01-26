import { NextResponse } from 'next/server';

// Route handlers removed temporarily to fix deployment
export async function GET() {
  return NextResponse.json({ message: 'Message API endpoint' });
} 