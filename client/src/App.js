import React,{useState, useEffect} from 'react'
import './App.css';
import '../src/assets/scss/style.scss'
import EmoteItRouter from "./Routes";
import {user} from "./FakeData";

function App() {

    const [appUser, setAppUser] = useState();


  useEffect(()=>{
    //TODO:: get app user from backend with authentication token!
      //backend will tell me who is logged in
      setAppUser(user);


  },[])

    return (
    <div id="emoteit-app-top" className="">
        {/*loader start */}
        {/*<div className={`loading-text ${isLoading?'':'d-none'}`}>*/}
        {/*    <div>*/}
        {/*        <h1 className="animate">Loading</h1>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*loader end*/}
        <EmoteItRouter appUser={appUser}/>

    </div>
  );
}

export default App;
