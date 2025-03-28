import React, { useState } from "react";
import ChatScreen, { Message } from "../../components/ChatScreen";

export default function ConversationScreen() {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);

        // simulate incoming message after 2s
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    content: "Réponse auto à : " + msg.content,
                    fromSelf: false,
                    replyTo: msg,
                    author: "Bot"
                },
            ]);
        }, 2000);
    };

    return <ChatScreen author={"jerem"} messages={messages} onSend={handleSendMessage} />;
}
