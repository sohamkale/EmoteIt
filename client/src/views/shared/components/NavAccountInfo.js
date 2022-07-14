import React, {useContext} from 'react'
import {AuthenticationContext} from "../../../components/contexts/AuthenticationProvider";
import {DisplayPicture} from "./DisplayPicture";

export const NavAccountInfo = (props) => {

    const {user, SignOut} = useContext(AuthenticationContext);

    return (
        <>
            <div className="col-12">
                <div className="dropdown">
                    <button className="btn btn-dark w-100" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="row">
                            <div className="col-2 p-0">

                                <DisplayPicture width={50}/>
                            </div>
                            <div className="col p-0">
                                <h5 className="text-truncate ml-2">{user?.name}</h5>
                                <h5>{user?.score}</h5>
                            </div>
                        </div>

                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={SignOut}>Logout</button>
                    </div>
                </div>
            </div>


        </>
    )
}