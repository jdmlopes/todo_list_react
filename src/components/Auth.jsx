

function Auth({onLogin,token}){
    return (
        <>
        <Login onLogin={onLogin}
                token={token}/>
        <Register />
        </>
    );
}

export default Auth;