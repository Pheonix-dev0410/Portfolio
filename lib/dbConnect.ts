import mongoose from 'mongoose';

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: Cached = {
  conn: null,
  promise: null,
};

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('New database connection established');
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

// Handle connection errors
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  cached.conn = null;
  cached.promise = null;
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

export default dbConnect; 