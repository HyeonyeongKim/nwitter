import React, {useEffect, useState} from "react";
// import AppRouter from "./Router";
import AppRouter from "components/Router"; //absolute import 방식 (이를 위해 jsconfig.json 파일 생성함)
import {authService} from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  // Auth의 메소드 중 currentUser : The currently signed-in user (or null)
  useEffect( () => {
    authService.onAuthStateChanged( (user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn} userObj = {userObj} /> : "Initializing..."}
 
    
    </>
  );
}

export default App;
