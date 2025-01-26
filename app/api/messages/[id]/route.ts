import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/src/models/message';

// Route handlers removed temporarily to fix deployment
export async function GET() {
  return NextResponse.json({ message: 'Message API endpoint' });
} 