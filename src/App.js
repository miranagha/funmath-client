import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import Footer from './components/Footer/Footer';
import Practice from "./containers/Practice/Practice";
import Revise from "./containers/Revise/Revise";
import AdminLogin from "./containers/Auth/AdminLogin/AdminLogin";
import AdminLogout from "./containers/Auth/AdminLogout/AdminLogout";
import Cookies from 'universal-cookie';
import Score from "./containers/Score/Score";
import Error404Page from "./containers/Error404Page/Error404Page";
import Profile from "./containers/Profile/Profile";
import Signup from "./containers/Auth/AdminLogin/Signup";

class App extends Component {

    render() {
        let navbarLinks = [
            {title: 'Home', href: '/'},
            {title: 'Score', href: '/score'},
            {title: 'Profile', href: '/profile'},
            {title: 'Logout', href: '/logout'},
        ];

        const cookies = new Cookies();

        console.log(cookies.get('token'))

        return (


            <BrowserRouter>
                <div className="App">
                    {cookies.get('token') != null ?
                        <Navbar links={navbarLinks}/> : null}
                    <Switch>
                        {/*<Route exact path="/" component={Home}/>*/}
                        <Route exact path="/" render={props =>
                            (cookies.get('token') != null ?
                                    <Home {...props}/> :
                                    <AdminLogin/>
                            )}/>
                        <Route exact path="/practice/:level" render={props =>
                            (cookies.get('token') != null ?
                                    <Practice {...props}/> :
                                    <AdminLogin/>
                            )}/>
                        <Route exact path="/score" render={props =>
                            (cookies.get('token') != null ?
                                    <Score {...props}/> :
                                    <AdminLogin/>
                            )}/>
                        <Route exact path="/profile" render={props =>
                            (cookies.get('token') != null ?
                                    <Profile {...props}/> :
                                    <AdminLogin/>
                            )}/>
                        <Route exact path="/revise" component={Revise}/>
                        <Route exact path="/logout" component={AdminLogout}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route component={Error404Page}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App