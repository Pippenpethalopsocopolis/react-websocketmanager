import { useState } from 'react';

class WebSocketManager {
    constructor(url) {
        this.socket = new WebSocket(url); // Establish the WebSocket connection.
        this.listeners = {}; // Object to hold listeners for different message types.
        
        // Handle incoming messages.
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data); // Parse the incoming message.
            if (message.serverMessageType && this.listeners[message.serverMessageType]) {
                // Dispatch the message to all registered listeners for its type.
                this.listeners[message.serverMessageType].forEach(callback => callback(message));
            }
        };
    }

    // Add a listener for a specific message type.
    addListener(messageType, callback) {
        if (!this.listeners[messageType]) {
            this.listeners[messageType] = [];
        }
        this.listeners[messageType].push(callback);
    }

    // Remove a listener for a specific message type.
    removeListener(messageType, callback) {
        if (this.listeners[messageType]) {
            this.listeners[messageType] = this.listeners[messageType].filter(cb => cb !== callback);
        }
    }

    // Send a message through the WebSocket connection.
    sendMessage(message) {
        this.socket.send(JSON.stringify(message));
    }
}

// Custom hook to create and use the WebSocket manager in components.
export const useWebSocketManager = (url) => {
    const [manager] = useState(() => new WebSocketManager(url));
    return manager;
};

// Made by, Berk Ocal
// Linkedin: https://www.linkedin.com/in/berkocall/
// Github: https://github.com/Pippenpethalopsocopolis