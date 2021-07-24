import React, {useState} from "react";
import { authService, firebaseInstance } from "myFirebase";

// export default () => <span>Auth</span>;

//아래와 같이 작성하면 Auth component를 활용해야 할 때 <Auth>라고 적으면 그 파일에 자동으로 Auth 가 import됨
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAcount] = useState(true);
    const [error, setError] = useState("");
    const onChange = e => {
        const {
            target: {name, value}
        } = e;

        if(name === "email") {
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email,password); //=> give you a promise that means you need asund and await.
            }else{
                data = await authService.signInWithEmailAndPassword( email, password);
            }
            console.log(data);
        } catch(error){
            setError(error.message)
        }
    };
    const toggleAccount = () => setNewAcount ( (prev) => !prev)
    const onSocialClick = async (e) => {
    //    const {
    //        target : {name}
    //     } = e;
    const name = e.target.name
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
        }
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input
                name = "email"
                type = "email"
                placeholder = "Email"
                required
                value = {email}
                onChange = {onChange}
                />
                <input
                name = "password"
                type="password"
                placeholder = "Password"
                requiredvalue = {password}
                onChange = {onChange}
                />
                <input type = "submit" value = {newAccount? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick = {toggleAccount}>{newAccount? "Sign In": "Create Account"}</span>
            <div>
                <button onClick = {onSocialClick} name = "google">Continue with Google</button>
                <button onClick = {onSocialClick} name = "github">Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;
