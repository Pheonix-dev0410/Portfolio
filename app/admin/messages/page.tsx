'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) throw new Error('Failed to update message');
      
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');
      
      setMessages(messages.filter(msg => msg._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="p-4 text-gray-500">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?._id === msg._id ? 'bg-gray-50' : ''
                  } ${!msg.read ? 'border-l-4 border-accent' : ''}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{msg.name}</h3>
                    <span className="text-xs text-gray-500">
                      {format(new Date(msg.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{msg.email}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{selectedMessage.name}</h2>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                </div>
                <div className="flex gap-2">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => markAsRead(selectedMessage._id)}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {format(new Date(selectedMessage.createdAt), 'MMMM d, yyyy h:mm a')}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 