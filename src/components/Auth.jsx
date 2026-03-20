import { useState } from "react";
import Login from "./Login";
import Register from "./Register";


function Auth({ onLogin, token }) {
    const [currentTab, setCurrentTab] = useState("login")

    return (
        <div className="mt-5 w-50">
            <div className="btn-group">
                <button className={`btn rounded-top rounded-bottom-0 ${currentTab == 'login' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setCurrentTab("login")}>Login</button>
                <button className={`btn rounded-top rounded-bottom-0 ${currentTab == 'register' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setCurrentTab("register")}>Cadastro</button>
            </div>
            <div className="container p-5 border shadow bg-light">
                {currentTab == "login" ?
                    <Login onLogin={onLogin}
                        token={token} /> :
                    <Register page={setCurrentTab}/>
                }

            </div>
        </div>
    );
}

export default Auth;