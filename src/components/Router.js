import React, {useState} from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import { authService } from "myFirebase";

const AppRouter = ({ isLoggedIn }) => {

    return (
        <Router>
            {/* 로그인한 경우에만 Navigation을 보여주도록 */}
            {isLoggedIn && <Navigation />} 
            <Switch>
                {isLoggedIn? (
                    <>
                        <Route exact path = "/">
                            <Home/>
                        </Route>
                        <Route exact path = "/profile">
                            <Profile/>
                        </Route>
                        {/* "/" route에 있으면 상관없고 그 이외의 route에 있으면 "/"로 redirect! 따라서 profile로 갔다가 refresh하면 /로 돌아오게됨 */}
                        <Redirect from="*" to="/" /> 
                    </>
                ) : (
                    <>
                    <Route exact path = "/">
                        <Auth/>
                    </Route>
                    <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>   
    );
}

export default AppRouter;