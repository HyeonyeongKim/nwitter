import React, {useState} from "react";
// import AppRouter from "./Router";
import AppRouter from "components/Router"; //absolute import 방식 (이를 위해 jsconfig.json 파일 생성함)
import {authService} from "myFirebase";

function App() {

  const [isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  // Auth의 메소드 중 currentUser : The currently signed-in user (or null)
  return (
    <>
      <AppRouter isLoggedIn = {isLoggedIn} />;
      <footer> &copy; Nwitter {new Date().getFullYear()}</footer>
    
    </>
  );
}

export default App;
