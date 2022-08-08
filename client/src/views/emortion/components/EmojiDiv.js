import React from "react";
import {Emoji} from "emoji-mart";

function EmojiInputCaret() {
    return null;
}

export function EmojiDiv(props) {


    if (props.eId === null)
        return (<EmojiInputCaret/>);

    return (
        <div className="col-xl-1 col-md-2 col-sm-2 col-2  emojiInput">
            <div>
                <Emoji className={"m-auto"} emoji={props.eId} set='google' size={16}/>
            </div>
        </div>
    );
}