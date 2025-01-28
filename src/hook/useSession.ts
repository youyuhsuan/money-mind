import { SessionData } from "@/types/SessionType";
import { useCallback, useEffect, useState } from "react";

interface UseSessionReturn {
  sessionData: SessionData | null;
  isLoading: boolean;
  error: Error | null;
  refreshSession: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSessionData = async () => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      // Handle different response scenarios
      if (!response.ok) {
        if (response.status === 401) {
          setSessionData(null);
          return;
        }
        throw new Error(`Failed to fetch session: ${response.statusText}`);
      }

      const data = await response.json();
      setSessionData(data);
    } catch (error) {
      // Proper error handling
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred while fetching session";
      console.error("Error processing session data:", errorMessage);
      setError(error instanceof Error ? error : new Error(errorMessage));
      setSessionData(null);
    } finally {
      // Always mark loading as complete
      setIsLoading(false);
    }
  };

  // Create a refresh function that can be called manually
  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    await fetchSessionData();
  }, []);

  useEffect(() => {
    fetchSessionData();
  }, []);

  return {
    sessionData,
    isLoading,
    error,
    refreshSession,
  };
}
