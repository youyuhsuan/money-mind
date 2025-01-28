import { Timestamp } from "firebase/firestore";

export interface SessionData {
  sessionId: string;
  userId: string;
  userEmail: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
}

export interface RawSessionData {
  sessionId: string;
  userId: string;
  userEmail: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  expiresAt: {
    seconds: number;
    nanoseconds: number;
  };
}
