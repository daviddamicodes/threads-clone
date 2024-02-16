import { Thread } from "@/types/threads";
import { generateThreads } from "@/utils/generate-dummy-data";
import { createContext, useEffect, useState } from "react";
import { PropsWithChildren } from "react";

export const ThreadContext = createContext<Thread[]>([]);

export const ThreadProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([]);
  useEffect(() => {
    setThreads(generateThreads());
  }, []);
  return (
    <ThreadContext.Provider value={threads}>{children}</ThreadContext.Provider>
  );
};
