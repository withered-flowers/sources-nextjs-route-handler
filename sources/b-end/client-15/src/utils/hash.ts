import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const salt = randomBytes(16).toString("hex");

export const generateHash = (plaintext: string) =>
	scryptSync(plaintext, salt, 32).toString("hex");

export const verifyHash = (plaintext: string, hash: string) =>
	timingSafeEqual(scryptSync(plaintext, salt, 32), Buffer.from(hash, "hex"));
