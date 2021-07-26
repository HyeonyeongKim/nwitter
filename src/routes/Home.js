import { dbService } from "myFirebase";
import React, {useState} from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    //Whenever we submit, we create a document.
    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.collection("nweets").add({      //this returns a promise and async/await required.
            nweet,
            createdAt: Date.now()
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
        </div>
    )
}


export default Home;