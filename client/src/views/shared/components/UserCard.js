import React, {useContext} from 'react'
import {DisplayPicture} from "./DisplayPicture";
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";
import {Link} from "react-router-dom";


export default function UserCard({user, relationship, getList,profile}) {

    const {user: appUser, accessToken} = useContext(AuthenticationContext);

    function SendRequest() {
        const req = {
            requesteeUserId: user._id,
            typeId: 1
        }
        axios.post('/api/friendship/request', req, {
            headers: {"access-token": accessToken}
        }).then((res) => {
            getList();
        })
    }

    function AcceptRequest(_relationship) {
        _relationship.statusId = 1;
        axios.put('/api/friendship/request', _relationship, {
            headers: {"access-token": accessToken}
        }).then((res) => {
            // console.log(res.data);
            getList();
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="card m-2">
            <div className="card-body m-auto">
                <div className="row text-align-center m-auto">
                    <DisplayPicture width={50} user={user}/>
                </div>
                <div className="row text-align-center m-auto h-25">
                    <Link to={`/app/profile/${user?._id}`}>
                        <h5>{user?.name}</h5>
                    </Link>
                </div>
                <div className="row">
                    <div className="col border-right text-align-center ">
                        <h3>{user?.score}</h3>
                        <div className="small">Score</div>
                    </div>
                    <div className="col border-right text-align-center ">
                        <h3>{profile?.insightCount}</h3>
                        <div className="small">Emortions</div>
                    </div>
                    <div className="col text-align-center">
                        <h3>{profile?.emortionLikes+profile?.insightLikes}</h3>
                        <div className="small">Likes</div>
                    </div>
                </div>

                {/*    Friend Request?  */}
                <div className="row text-align-center mt-2">
                    {
                        user?._id === appUser._id ?
                            <></> :
                            relationship?.statusId == 1 ?
                                <div>You share emotions</div> :
                                relationship?.requesterUserId?._id === appUser._id ?
                                    <div className="btn disabled btn-outline-dark">REQUESTED</div> :
                                    relationship?.statusId == 0 ?
                                        <button className="btn btn-success m-1"
                                                onClick={() => AcceptRequest(relationship)}>ACCEPT</button> :
                                        <button className="btn btn-success m-1" onClick={SendRequest}>FOLLOW</button>


                    }
                    {/*{relationship?.some(x => x._id === user._id) ?
                           :

                        }*/}

                </div>
            </div>
        </div>
        /*  <div className="col-12 col-md-4 col-lg-3 mb-2">

          </div>*/
    )
}