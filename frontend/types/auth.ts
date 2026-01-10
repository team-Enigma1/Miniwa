import type { User, Session } from "@supabase/supabase-js";

export type AuthData = {
    email: string;
    password: string;
    username?: string;
}

export type SignupResult =
    | { user: User }
    | { error: any };

export type LoginResult =
    | {
        session: Session;
        user: User;
        accessToken: string;
        }
    | {
        error: any;
        };