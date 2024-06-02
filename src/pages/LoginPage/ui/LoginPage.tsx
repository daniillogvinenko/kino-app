import { Layout } from "@/components/Layout";
import cls from "./LoginPage.module.scss";
import { ChangeEvent, useContext, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MockApi } from "@/shared/mock-server/server";
import { UserContext } from "@/components/userContext/userContext";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const authData = useContext(UserContext);

    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const fetchData = async () => {
            const data = await MockApi.login(username, password);
            return data;
        };

        setIsLoading(true);
        fetchData()
            .then((data) => {
                setIsLoading(false);
                authData?.login(data);
                navigate("/");
            })
            .catch((data) => {
                setError(data.message);
                setIsLoading(false);
            });
    };

    if (authData?.user) {
        return <Navigate to="/" />;
    }

    return (
        <Layout>
            <div className={cls.LoginPage}>
                <div className="container">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div>{error}</div>
                            <input placeholder="username" type="text" value={username} onChange={onChangeUsername} />
                            <br />
                            <input placeholder="password" type="text" value={password} onChange={onChangePassword} />
                            <br />
                            <Button onClick={handleLogin}>Продолжить</Button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};
