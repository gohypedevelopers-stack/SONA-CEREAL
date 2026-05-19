import { randomBytes, randomInt, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);

export async function hashSecret(secret: string) {
  const salt = randomBytes(16).toString('hex');
  const derived = await scrypt(secret, salt, 64);
  return `${salt}:${Buffer.from(derived as Buffer).toString('hex')}`;
}

export async function verifySecret(secret: string, storedHash?: string | null) {
  if (!storedHash) return false;

  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const derived = await scrypt(secret, salt, 64);
  const stored = Buffer.from(hash, 'hex');
  const actual = Buffer.from(derived as Buffer);

  if (stored.length !== actual.length) return false;
  return timingSafeEqual(stored, actual);
}

export function generateOtpCode() {
  return String(randomInt(100000, 1000000));
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}
