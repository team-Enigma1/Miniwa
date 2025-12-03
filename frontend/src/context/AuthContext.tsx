import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
    session: Session | null;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ session, setSession ] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
};
