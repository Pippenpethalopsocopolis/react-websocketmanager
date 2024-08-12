# react-websocketmanager

`react-websocketmanager` is a lightweight react component for mananing websocket connections.

## Installation and Usage

### Installing

```
npm install react-websocketmanager
```

### Usage

```js
import React, { useState, useEffect, useCallback } from 'react';
import { useWebSocketManager } from 'react-websocketmanager';

const webSocketManager = useWebSocketManager("ws://localhost:8080"); // Get the WebSocket manager instance

const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== '') {
        const message = { text: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setNewMessage('');
        if (webSocketManager) {
            webSocketManager.sendMessage({ message, messageType: 'chat' }); // You can send your message like this to your websocket server. Describing message like this, messageType: 'chat' is important because when you send it back to the frontend from websocket server it will be needed when you want to use other functions like addListener, removeListener
        }
    }
}, [newMessage, webSocketManager]);
useEffect(() => {
    const handleMessage = (messageDataFromServer) => {
        if (messageDataFromServer.serverMessageType === 'chat') {
            setMessages((prevMessages) => [...prevMessages, messageDataFromServer.serverChatMessage]);
        }
    };
    if (webSocketManager) {
        webSocketManager.addListener('chat', handleMessage); // Write the messageType you wrote when you sended message to the websocket server through sendMessage function
        return () => {
            webSocketManager.removeListener('chat', handleMessage); // You can use this function for cleanups.
            webSocketManager.closeConnection();
        };
    }
}, [webSocketManager]);
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
};
```

### Functions

`useWebSocketManager("ws://localhost:3000")` Create a websocket connection. Edit the string part as whatever your localhost is.

`sendMessage({message, messageType})` With this function, you can send message to your WebSocket server. Remember to specify what kind of message you send through messageType

`addListener(messageType, callback)` With this function, add your messageType when you used sendMessage function and add callback(The function to be called when a message of the specified type is received.). Goal of this function is to add a listener for a specific message type.

`removeListener(messageType, callback)` Same rules applied to addListener applies to removeListener. Goal of this function is to remove a listener for a specific message type. It is usually used for cleanups of effect hooks.

`closeConnection()` Simply close the connection. It is usually used for cleanups of effect hooks.