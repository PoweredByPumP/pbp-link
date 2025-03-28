import React, { useState } from "react";
import ChatScreen, { Message } from "../../components/ChatScreen";

export default function GroupsHome() {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
    };

    return <ChatScreen author="jerem" messages={messages} onSend={handleSendMessage} />;
}
