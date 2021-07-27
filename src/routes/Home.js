import Nweet from "components/Nweets";
import { dbService } from "myFirebase";
import React, {useEffect, useState} from "react";

const Home = ({userObj}) => {
    //console.log(userObj)
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

    //mount될 때 트윗 목록 가져오기
    useEffect( () => {
        dbService.collection("nweets").onSnapshot(snapshot => { //onSnapShot: realtime update
            //console.log("something happened!")      //뭔가 변화가 생기면 무조건 something happened라는 메세지를 띄우도록.
            console.log(snapshot.docs) // returns tweet list (means array)
            //nweetArr는 우리한테 필요한 데이터만 거르는 용도로 사용했음. onSubmit 함수에서 정의한 text, createdAt, creatorId를 doc.data()로 가져오고, id의 값으로 doc.id를 만들어줌
            const nweetArr = snapshot.docs.map(doc => ({    //forEach로 할 수도 있지만 re-rendering 하지 않기 때문에 조금 더 빠르다.
                id: doc.id,
                ...doc.data()
            }))
            console.log(nweetArr)
            setNweets(nweetArr)
        })
    }, []) 
    //Whenever we submit, we create a document.
    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.collection("nweets").add({      //this returns a promise and async/await required. 
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        
        setNweet(""); //데이터 저장 후 칸 비우기
    };
    
    const onChange = e => {
        const {
            target : {value},
        } = e;
        setNweet(value);
    }; 
    // 이미지 썸네일 미리보기
    const onFileChange =(e) => {    //onChange 일 때 이 함수를 실행하는데 함수의 target의 타입이 file임
        console.log(e.target) // e.target까지만 하면 <input type = "file" accept = "image/*"> 이렇게 나오게 됨                      
        const {target : {files}} = e;
        const imgFile = files[0]; // 첫번째 파일만 받도록
        console.log(imgFile)
        const reader = new FileReader(); // we create a reader
        reader.onloadend = (finishedEvent) => { //add an event listener to the reader.  
            console.log(finishedEvent)
            const {
                currentTarget : { result } 
            } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(imgFile);
    }
    const onClearAttachmentClick = () => setAttachment(null)
        return (
        <div>
            <form onSubmit = {onSubmit}>
                <input 
                value = {nweet}
                onChange = {onChange}
                type = "text" 
                placeholder="What's on your mind?" 
                maxLength={120} />
                <input type = "file" accept = "image/*"  onChange = {onFileChange}/> {/* image/* 이라고 하면 이미지만 선택가능하게 함. 그리고 타입이 file인 경우 버튼 이름 안 적어도 자동으로 생성*/}
                <input type = "submit" value = "Nweet" />
                {attachment && (
                <div>
                    <img src={attachment} width = "50px" height = "50px" />  {/* // attachment가 있다면!! */}
                    <button onClick = {onClearAttachmentClick}> Clear</button>  {/* 이미지 파일 삭제하기 */}
                </div>
                )}
            </form>
            <div>
                {nweets.map(nweet => (
                    <Nweet 
                    key = {nweet.id} 
                    nweetObj={nweet} 
                    isOwner = {nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
}


export default Home;