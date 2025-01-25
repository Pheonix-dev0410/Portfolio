import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/src/models/message';

export async function POST(req: Request) {
  let connection;
  try {
    // Connect to database
    console.log('Attempting to connect to database...');
    connection = await dbConnect();
    console.log('Database connection successful');
    
    // Parse request body
    const body = await req.json();
    const { name, email, message } = body;

    console.log('Received message:', { name, email, message: message?.substring(0, 50) + '...' });

    // Validate input
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Create new message
    console.log('Creating new message in database...');
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    if (!newMessage) {
      throw new Error('Failed to create message in database');
    }

    console.log('Message created successfully:', newMessage._id);

    return NextResponse.json(
      { 
        message: 'Message sent successfully', 
        id: newMessage._id,
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in contact API:', error);
    
    // Check for MongoDB validation errors
    if (error instanceof Error) {
      if ('name' in error && error.name === 'ValidationError') {
        return NextResponse.json(
          { error: 'Invalid data provided', details: error.message },
          { status: 400 }
        );
      }

      // Check for MongoDB connection errors
      if (error.message.includes('ECONNREFUSED') || error.message.includes('connect ETIMEDOUT')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please try again later.' },
          { status: 503 }
        );
      }

      // Check for MongoDB operation errors
      if (error.message.includes('operation') || error.message.includes('topology')) {
        return NextResponse.json(
          { error: 'Database operation failed. Please try again later.' },
          { status: 503 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  } finally {
    // Log connection state
    if (connection?.connection?.readyState) {
      console.log('MongoDB connection state:', connection.connection.readyState);
    }
  }
} 