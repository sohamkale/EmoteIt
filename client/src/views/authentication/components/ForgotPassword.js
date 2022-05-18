import React from 'react'

export default function ForgotPassword({modalActive, setModalActive}){
    return (
        <div className={"bg-warning " + modalActive?"modal":""} id="exampleModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">RESET PASSWORD</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <a>Email Address</a><input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=>{
                            setModalActive(false)
                        }} type="button" className="btn btn-primary" data-dismiss="modal">Reset Password</button>

                    </div>
                </div>
            </div>
        </div>
    );
}