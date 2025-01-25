import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/src/models/message';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

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

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
} 