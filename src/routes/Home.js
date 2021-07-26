import { dbService } from "myFirebase";
import React, {useEffect, useState} from "react";

const Home = ({userObj}) => {
    //console.log(userObj)
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    //mount될 때 트윗 목록 가져오기
    useEffect( () => {
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArr = snapshot.docs.map(doc => ({    //forEach로 할 수도 있지만 re-rendering 하지 않기 때문에 조금 더 빠르다.
                id: doc.id,
                ...doc.data()
            }))
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
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input 
                value = {nweet}
                onChange = {onChange}
                type = "text" 
                placeholder="What's on your mind?" 
                maxLength={120} />
                <input type = "submit" value = "Nweet" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <div key = {nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Home;