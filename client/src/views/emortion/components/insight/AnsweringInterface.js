import React, {useState, useRef, useEffect, useContext} from 'react'
import UserTitle from "../../../shared/components/UserTitle";
import axios from "axios";
import {AuthenticationContext} from "../../../../contexts/AuthenticationProvider";
import {useHistory} from "react-router-dom"
import {isMobile} from 'react-device-detect';

export default function AnsweringInterface(props) {
    const {accessToken} = useContext(AuthenticationContext);
    const [insight, setInsight] = useState();
    const messageBreakdown = insight?.secret?.split(' ');

    const letterParent = useRef();
    const [focusOn, setFocusOn] = useState([0, 0]);
    const [timeLeft, setTimeLeft] = useState();

    const [responseString, setResponseString] = useState([]);
    const history = useHistory();
    let lIndex = 0;


    useEffect(() => {

        if (props.emortionId)
            //make call to notify start of answering
            axios.post(`/api/emortion/insight/${props.emortionId}`, null, {
                headers: {"access-token": accessToken}
            }).then((res) => {

                if (res.data) {
                    setInsight(res.data);
                    const startedTime = new Date(res.data?.createdAt);
                    setTimeLeft(60 - (new Date() - startedTime) / 1000);

                    const split = res.data.secret.split(' ');

                    let _responseString = [];
                    // console.log(split.length)

                    for (let sIndex = 0; sIndex < split.length; sIndex++) {
                        let filler = "_";
                        filler = filler.repeat(split[sIndex].length);
                        _responseString.push(filler);
                    }
                    // console.log(_responseString)
                    setResponseString(_responseString);
                }

            })

    }, [props.emortionId]);

    useEffect(() => {
        const timer = timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        // return () => clearInterval(timer);
    }, [timeLeft])

    useEffect(() => {
        if (letterParent.current && focusOn[0] !== 1000 && focusOn[1] !== 1000) {
            letterParent.current?.children[focusOn[0]]?.children[focusOn[1]]?.focus();
        }
    }, [focusOn])

    function _SetFocus(negative) {
        var _focusGroup = focusOn[0];
        var _focusIndex = focusOn[1];

        if (negative) {
            _focusIndex--;
            if (_focusIndex < 0) {
                _focusGroup--;
                if (_focusGroup < 0) {
                    _focusGroup = 0;
                    _focusIndex = 0;
                } else _focusIndex = messageBreakdown[_focusGroup].length - 1
            }
        } else {
            _focusIndex++;
            if (_focusIndex >= messageBreakdown[_focusGroup].length) {
                _focusGroup++
                if (_focusGroup >= messageBreakdown.length) {
                    _focusGroup = messageBreakdown.length - 1
                    _focusIndex = messageBreakdown[_focusGroup].length - 1;
                } else _focusIndex = 0;
            }
        }

        setFocusOn([_focusGroup, _focusIndex]);
    }

    function _Submit() {
        const response = {
            secret: insight?.secret,
            response: responseString,
            deviceId: isMobile ? 0 : 1
        }

        axios.patch(`/api/emortion/insight/${insight?.emortionId}`, response, {
            headers: {
                'access-token': accessToken
            }
        }).then((res) => {
            console.log(res.data);
            history.push(`/app/emortion/${insight?.emortionId}`)

        })
    }

    return (
        <div className="bg-light w-100">
            {/*Clock Row*/}
            <div className="row m-3 text-align-center">
                <div className={"col"}>
                    <h2><span className="badge badge-dark">00:{timeLeft > 0 ? parseInt(timeLeft) : 0}</span></h2>
                </div>
            </div>
            {
                timeLeft > 0 ?
                    <>
                        <div className="row text-align-center m-1" ref={letterParent}>
                            {
                                messageBreakdown?.map((word, index) =>
                                    <React.Fragment key={index}>
                                        <div id={"word"} className={"col-12 row h-25"}
                                             style={{maxWidth: "fit-content"}}>
                                            {
                                                word.split('').map((item, wIndex) =>
                                                    <React.Fragment key={wIndex}>
                                                        {/*{lIndex++}*/}
                                                        <InsightInput key={wIndex} group={index} index={wIndex}
                                                                      letter={item} _SetFocus={_SetFocus}
                                                                      setFocusOn={setFocusOn}
                                                                      responseString={responseString}
                                                                      setResponseString={setResponseString}/>
                                                    </React.Fragment>
                                                )
                                            }
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </React.Fragment>
                                )
                            }

                        </div>
                        <div className="row  m-3 text-align-center">
                            <div className="col">
                                <button type="button" className="btn btn-dark" onClick={_Submit}>
                                    <i className="fa-regular fa-paper-plane m-1"></i>
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <div className="row m-2">
                        <div className="btn btn-outline-danger disabled m-auto">TIME UP &nbsp;
                            <i className="fas fa-sad-tear"></i></div>
                    </div>
            }
            {/* The EmortionInsights Inputs */}


        </div>
    )
}


function InsightInput(iProps) {
    const [color, setColor] = useState("black");

    function _KeyDown(e) {
        if (e.keyCode === 8 || e.keyCode === 37) {
            iProps._SetFocus(true);
        } else if (e.keyCode === 39)
            iProps._SetFocus();
    }

    function _HandleOnChange(e) {
        if (e.target.value === " " || e.target.value === "") {
            e.target.value = ""
            return;
        }
        setColor(e.target.value.toLowerCase() === iProps.letter.toLowerCase() ? "green" : "red");
        iProps._SetFocus();

        let _responseString = iProps.responseString;
        let str = _responseString[iProps.group].split('');
        str[iProps.index] = e.target.value;
        str = str.join('');
        _responseString[iProps.group] = str;
        iProps.setResponseString(_responseString);
    }

    function _HandleClick(e) {
        e.target.select();
        iProps.setFocusOn([iProps.group, iProps.index])
        // iProps.setFocusOn(iProps.index);
    }

    return (
        <input maxLength={1} className="form-control insightInput" onKeyDown={_KeyDown} onInput={_HandleOnChange}
               onFocus={_HandleClick} onClick={_HandleClick}
               style={{color: color}}
        />
    );
}
