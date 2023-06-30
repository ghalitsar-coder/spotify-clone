"use client";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { ReactNode, useState } from "react";

interface SupabaseProviderProps {
  children: ReactNode;
}
const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
