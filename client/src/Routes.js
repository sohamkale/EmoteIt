import React, {useState} from 'react'
import {Route, Switch} from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/home/Home";
import Profile from "./views/profile/Profile";
import Leaderboard from "./views/leaderboard/Leaderboard";
import Friends from "./views/friendship/Friends";
import Emortion from "./views/emortion/Emortion";
import Error from "./views/Error";
import Feedbacks from "./views/admin/Feedbacks";
import Translations from "./views/admin/Translation";
import {Login} from "./views/authentication/Login";
import {MainLayout} from "./views/shared/MainLayout";

const pageLinks = [
    {
        name: "Profile",
        link: "/app/profile",
        icon: "fas fa-user"
    },
    {
        name: "Friendships",
        link: "/app/friends",
        icon: "fas fa-users",
        count: 10
    },
    {
        name: "Leaderboard",
        link: "/app/leaderboard",
        icon: "fas fa-trophy"
    },
    {
        name: "Info",
        link: "/app/info",
        icon: "fas fa-info-circle"
    }
];
const adminLinks = [
    {
        name: "Translations",
        link: "/admin/translations",
        icon: "fas fa-users-cog"
    },
    {
        name: "Feedback",
        link: "/admin/feedbacks",
        icon: "fas fa-comment"
    }
];

export default function EmoteItRouter(props, {appUser}){

    const [isLoading, setLoading] = useState(true);

    return (
        <Switch>
            <Route path={["/app"]}>
                <MainLayout pageLinks={pageLinks} adminLinks={adminLinks} appUser={appUser} setLoading={setLoading}>
                    <Switch>
                        <Route exact path={'/app/home'} component={()=>
                            <Home appUser={appUser} setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/profile'} component={()=>
                            <Profile appUser={appUser} setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/leaderboard'} component={()=>
                            <Leaderboard appUser={appUser} setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/friends'} component={()=>
                            <Friends/>
                        }/>
                        <Route exact path={'/app/emortion/:id'} component={()=>
                            <Emortion appUser={appUser} setLoading={setLoading}/>
                        }/>
                        <Route>
                            <Error/>
                        </Route>
                    </Switch>

                </MainLayout>
            </Route>
            <Route path={["/admin"]}>
                <MainLayout pageLinks={pageLinks} adminLinks={adminLinks} appUser={appUser} setLoading={setLoading}>
                    <Switch>
                        <Route exact path={'/admin/feedbacks'} component={()=>
                            <Feedbacks appUser={appUser} setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/admin/translations'} component={()=>
                            <Translations appUser={appUser} setLoading={setLoading}/>
                        }/>

                        <Route>
                            <Error/>
                        </Route>
                    </Switch>

                </MainLayout>
            </Route>
            <Route exact path={'/'} component={()=>
                <Login/>
            }/>
        </Switch>
    )
}