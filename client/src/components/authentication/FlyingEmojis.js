import React,{useEffect, useState} from 'react'
import './snowflakes.css'
export default function FlyingEmojis({count}) {
    var emojis = [
        '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜',
        '😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭',
        '😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤',
        '😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈',
        '👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳',
        '👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼',
        '👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺',
        '🙈','🙉','🙊','💀','👽','💩','🔥'
    ];
    const [rows,setRows] = useState([]);


    useEffect(()=>{
        var i =0;
        var tmp = [];
        while (++i <= count) tmp.push(i);
        setRows(tmp);
    },[])
    return (
        <div className="snowflakes">
            {rows.map((i) =>
                <div className="snowflake">
                    {emojis[Math.floor(Math.random() * emojis.length)]}
                </div>
            )}
        </div>
    )
}