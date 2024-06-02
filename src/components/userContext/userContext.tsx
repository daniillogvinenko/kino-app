import { MockApi } from "@/shared/mock-server/server";
import { User } from "@/types/types";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserContext {
    user: User | undefined;
    signOut: () => void;
    login: (value: User) => void;
    updateUser: (value: User) => void;
}

export const UserContext = createContext<UserContext | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>();

    const signOut = () => {
        setUser(undefined);
    };

    const login = (newUser: User) => {
        setUser(newUser);
    };

    const updateUser = (newUser: User) => {
        setUser(newUser);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await MockApi.getUserById("1");
            return data;
        };

        fetchData().then((data) => setUser(data));
    }, []);

    return <UserContext.Provider value={{ user, signOut, login, updateUser }}>{children}</UserContext.Provider>;
};
