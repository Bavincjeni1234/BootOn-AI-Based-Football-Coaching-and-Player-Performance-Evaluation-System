import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Coachchat.module.css";

const Coachchat = () => {

    // ✅ FIX: get correct param (id → pid)
    const { id: pid } = useParams();

    const coachId = sessionStorage.getItem("cid");

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    // ✅ Load chat safely
    const loadChat = () => {
        if (!coachId || !pid) return;

        axios.get(`http://127.0.0.1:8000/GetMessages/${coachId}/${pid}/`)
            .then((res) => {
                setChat(res.data.chat || []);
            })
            .catch((err) => {
                console.log("LoadChat Error:", err);
            });
    };

    // ✅ FIX: run only when ids available
    useEffect(() => {
        if (!coachId || !pid) return;

        loadChat();

        const interval = setInterval(loadChat, 2000);
        return () => clearInterval(interval);

    }, [coachId, pid]);

    // ✅ Send message safely
    const sendMessage = () => {
        if (!message.trim()) {
            alert("Enter message");
            return;
        }

        if (!pid) {
            alert("Player not selected");
            return;
        }

        const formData = new FormData();
        formData.append("coach_id", coachId);
        formData.append("player_id", pid);
        formData.append("message", message);

        axios.post("http://127.0.0.1:8000/SendChat/", formData)
            .then(() => {
                setMessage("");
                loadChat();
            })
            .catch((err) => {
                console.log("SendChat Error:", err);
            });
    };

    // ✅ Send on Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>

            {/* Header */}
            <div className={styles.chatHeader}>
                <span>Coach Chat</span>
                <em>Live</em>
            </div>

            {/* Messages */}
            <div className={styles.chatMessages}>
                {chat.length > 0 ? (
                    chat.map((item, index) => (
                        <div
                            key={index}
                            className={
                                item.sender === "coach"
                                    ? styles.sentMessage
                                    : styles.receivedMessage
                            }
                        >
                            {item.message}
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>No messages yet</div>
                )}
            </div>

            {/* Input */}
            <div className={styles.chatInput}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles.inputBox}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className={styles.sendBtn} onClick={sendMessage}>
                    Send
                </button>
            </div>

        </div>
    );
};

export default Coachchat;