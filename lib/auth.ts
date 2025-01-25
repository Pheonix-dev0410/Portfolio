import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { compare, hash } from 'bcryptjs';
import type { User } from '@/models/user';

interface JWTPayload {
  userId: string;
  email: string;
  exp?: number;
}

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export async function login(token: string) {
  const cookieStore = cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400, // 24 hours
    path: '/',
  });
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete('auth_token');
}

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  if (!token) return null;

  try {
    return await decrypt(token.value);
  } catch {
    return null;
  }
}

export async function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  if (!token) return null;

  try {
    return await decrypt(token.value);
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await compare(password, hashedPassword);
  } catch {
    return false;
  }
}

export async function createUser(email: string, password: string): Promise<User | null> {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return null;
    }

    // Here you would typically create a new user in your database
    // For now, we'll return null as the database integration is not implemented
    return null;
  } catch {
    return null;
  }
}

export async function findUserByEmail(_email: string): Promise<User | null> {
  try {
    // Here you would typically query your database for the user
    // For now, we'll return null as the database integration is not implemented
    return null;
  } catch {
    return null;
  }
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await verifyPassword(password, user.password);
    return isValid ? user : null;
  } catch {
    return null;
  }
} 