import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Playerchat.module.css";

const Playerchat = () => {

    const { cid } = useParams();   // coach id
    const playerId = sessionStorage.getItem("pid");

    const [message,setMessage] = useState("");
    const [chat,setChat] = useState([]);

    // Load messages
    const loadChat = () => {

        axios.get(`http://127.0.0.1:8000/GetMessages/${cid}/${playerId}/`)
        .then((res)=>{
            setChat(res.data.chat);
        })
        .catch((err)=>{
            console.log(err);
        });

    };

    useEffect(()=>{

        loadChat();

        // Auto refresh every 2 seconds
        const interval = setInterval(loadChat,2000);

        return () => clearInterval(interval);

    },[]);


    // Send message
    const sendMessage = () => {

        if(!message){
            alert("Enter message");
            return;
        }

        const formData = new FormData();

        formData.append("player_id",playerId);
        formData.append("coach_id",cid);
        formData.append("message",message);

        axios.post("http://127.0.0.1:8000/SendChatPlayer/",formData)

        .then(()=>{
            setMessage("");
            loadChat();
        })

        .catch((err)=>{
            console.log(err);
        });

    };


    return (
        <div className={styles.chatContainer}>

            <div className={styles.chatHeader}>
                Chat With Coach
            </div>

            <div className={styles.chatMessages}>

                {chat.length > 0 ? (

                    chat.map((item,index)=>(

                        <div
                            key={index}
                            className={
                                item.sender === "player"
                                ? styles.sentMessage
                                : styles.receivedMessage
                            }
                        >
                            {item.message}
                        </div>

                    ))

                ) : (

                    <div>No messages yet</div>

                )}

            </div>

            <div className={styles.chatInput}>

                <input
                    type="text"
                    placeholder="Type message..."
                    className={styles.inputBox}
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />

                <button
                    className={styles.sendBtn}
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default Playerchat;