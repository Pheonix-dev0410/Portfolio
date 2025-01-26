import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/src/models/message';

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = context.params;
    const body = await request.json();

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
} 