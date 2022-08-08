import React, {useState} from 'react'
import {Route, Switch} from "react-router-dom";
import Home from "./views/home/Home";
import Profile from "./views/profile/Profile";
import Leaderboard from "./views/leaderboard/Leaderboard";
import Friends from "./views/friendship/Friends";
import Emortion from "./views/emortion/Emortion";
import Error from "./views/shared/Error";
import Feedbacks from "./views/admin/Feedbacks";
import Translations from "./views/admin/Translation";
import {Login} from "./views/authentication/Login";
import {MainLayout} from "./views/shared/MainLayout";
import Insight from "./views/emortion/Insight";
import Info from "./views/info/Info";
import Daily from "./views/emortion/Daily";

const pageLinks = [
    {
        name: "Home",
        link: "/app/home",
        icon: "fas fa-home"
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
        name: "Daily Emortion",
        link: "/app/daily",
        icon: "fas fa-calendar-days"
    },
    {
        name: "Info",
        link: "/app/info",
        icon: "fas fa-info-circle"
    },
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
                <MainLayout pageLinks={pageLinks} adminLinks={adminLinks} setLoading={setLoading}>
                {/*<MainLayout pageLinks={pageLinks}  setLoading={setLoading}>*/}
                    <Switch>
                        <Route exact path={'/app/home'} component={()=>
                            <Home setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/profile'} component={()=>
                            <Profile setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/info'} component={()=>
                            <Info setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/profile/:id'} component={()=>
                            <Profile setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/leaderboard'} component={()=>
                            <Leaderboard setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/friends'} component={()=>
                            <Friends/>
                        }/>
                        <Route exact path={'/app/emortion/:id'} component={()=>
                            <Emortion setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/daily'} component={()=>
                            <Daily setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/app/insight/:id'} component={()=>
                            <Insight setLoading={setLoading}/>
                        }/>
                        <Route>
                            <Error/>
                        </Route>
                    </Switch>

                </MainLayout>
            </Route>
            <Route path={["/admin"]}>
                <MainLayout pageLinks={pageLinks} adminLinks={adminLinks} setLoading={setLoading}>
                    <Switch>
                        <Route exact path={'/admin/feedbacks'} component={()=>
                            <Feedbacks setLoading={setLoading}/>
                        }/>
                        <Route exact path={'/admin/translations'} component={()=>
                            <Translations setLoading={setLoading}/>
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