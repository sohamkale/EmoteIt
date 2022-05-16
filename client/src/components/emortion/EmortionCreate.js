import React,{useState, useEffect} from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'

export default function EmortionCreate(props){

    const [secret, setSecret] = useState("");
    const [messageEmojis, setMessageEmojis] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        setCurrentIndex(messageEmojis.length)
    },[messageEmojis])

    function _OnEmojiSelected(e){
        setMessageEmojis([...messageEmojis, e.id]);
    }

    function _PopMessage(){
        var _tmp = [...messageEmojis];
        _tmp.pop();
        setMessageEmojis(_tmp)
    }

    function _OnSecretChange(e){
        var _value = e.target.value.trim();
        var wordCount = _value.split(/\s+/).length;
        if(wordCount>6)
            return;
        _value = _value;
        setSecret(_value)
    }

    return (
        <div>
            <div className="card mb-3 emortionCreate">
                <div className="card-title bg-light  p-3">TELL US AN EMORTION!</div>
                <div className="card-body">
                    <div className="row">
                                <div className="col-3">
                                    <label className='form-label'>Category</label>
                                    <select id="postType" name='type' className='form-control-sm'>
                                        <option>Timer</option>
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label className='form-label'>Expires</label>
                                    <select id="postType" name='type' className='form-control-sm'>
                                        <option>Timer</option>
                                    </select>
                                </div>

                                <div className="col-4">
                                    <label className='form-label'>Privacy</label>
                                </div>
                            </div>
                    <div className={"row m-2"}>
                        <div className="alert alert-warning">
                            Tip: Click on the row of your emojis for backspace functionality!
                        </div>
                    </div>
                    <div className="row m-2" onClick={_PopMessage}>
                            {
                                messageEmojis.map((item, index)=>
                                    <EmojiDiv eId={item} setMessageEmojis={setMessageEmojis} index={index}
                                              currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                                )
                            }
                        <EmojiInputCaret index={messageEmojis.length} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                   {/*     <div className="col-2">
                            <div className="btn btn-danger" onClick={_PopMessage}>X</div>
                        </div>*/}
                        {/*<div>{emojiValue}</div>
                        <textarea
                            ref={emojiInput}
                            className="form-control"
                            onChange={(e)=>{
                                //restrict typing but only backspaces
                                if(e.target.value.length>emojiValue.length)
                                    return;
                                setEmojiValue(e.target.value);
                            }}
                            value={emojiValue}
                            type="text"
                            placeholder="Pick you emojis that resembles your emotions..."
                        />*/}

                    </div>
                    <div className={"row"}>
                        <Picker style={{width:"100%"}} set={"google"} title={"Powered by EmojiMart"}
                                i18n={{ search: 'Search...', categories: { search: 'Searches', recent: 'Recents' }}}
                                onSelect={_OnEmojiSelected}
                        />
                    </div>
                    <div className="row m-1">
                        <div className="col-2">Perfect Insight</div>
                        <div className="col-7">
                            <input style={{fontFamily:'Ink Free', fontWeight: 'bold'}}
                                   required id="" name="secretAnswer" value={secret} onChange={_OnSecretChange}
                                   className="form-control" placeholder="Six word max..."/>
                        </div>
                        <div className="col-2">
                            <div className={"btn btn-warning m-1"}>Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmojiDiv(props){


    if(props.eId === null)
        return (<EmojiInputCaret/>);

    return (
        <div className="col-xl-1 col-md-2 col-sm-2 col-2  emojiInput">
            <div>
                <Emoji className={"m-auto"} emoji={props.eId} set='apple' size={16}/>
            </div>
        </div>
    );
}

function EmojiInputCaret(props){
    const [show, setShow] = useState(true);
    useEffect(()=>{
        const timedFunction = setTimeout(()=>{setShow(!show)},500);
        // const timedFunction = setInterval(()=>{setShow(!show)},500);
        //
        return () => clearInterval(timedFunction);
    },[show]);
    return (
        <div className="col-xl-1 col-md-2 col-sm-2 col-2  emojiInput">
            <div>
                {props.index === props.currentIndex &&show?"l":""}
            </div>
        </div>
    );
}