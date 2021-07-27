import { dbService, storageService } from "myFirebase";
import React, {useState} from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false); // edit 모드인지 아닌지 (true or false) => 수정한다고 하면 edit 모드로 바꿔야하니까.
    const [newNweet, setNewNweet] = useState(nweetObj.text); // 헷갈리니까 이 부분을 나중에는 [inputText, setInputText]로 바꿔도 될 듯.


    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete thie nweet?");
        console.log(ok); // for now, it returns boolean.

        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete(); // delete the photo 
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false); // editing모드에서 나가도록 false로 셋팅
    };
    const onChange = e => {
        const {
            target: {value}
        } = e;
        setNewNweet(value);
    };
    return (
        <div>
            {editing? (
                <>
                    <form onSubmit = {onSubmit}>
                        <input
                        type = "text"
                        placeholder = "Edit your nweet"
                        value = {newNweet}
                        required
                        onChange = {onChange}
                        />
                        <input type = "submit" value = "update Nweet" />
                    </form>
                    <button onClick = {toggleEditing}>Cancel</button>
                </>
            ):(
                <>
                     <h4> {nweetObj.text}</h4>
                     {nweetObj.attachmentUrl && <img src = {nweetObj.attachmentUrl} width="50px" height = "50px" />}
                    {/* 본인이 작성한 트윗에만 버튼이 보이도록 */}
                    {isOwner && (
                    <>
                        <button onClick = {onDeleteClick}>delete Nweet</button>
                        <button onClick = {toggleEditing}>Edit Nweet</button>
                    </>
                    )}
                </>
            )}
        </div>

    )
}


export default Nweet;