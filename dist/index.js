!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.MyReactLibrary=t(require("react")):e.MyReactLibrary=t(e.React)}(self,(e=>(()=>{"use strict";var t={12:t=>{t.exports=e}},s={};function r(e){var o=s[e];if(void 0!==o)return o.exports;var i=s[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};r.r(o),r.d(o,{useWebSocketManager:()=>a});var i=r(12);class n{constructor(e){this.socket=new WebSocket(e),this.listeners={},this.socket.onmessage=e=>{const t=JSON.parse(e.data);t.serverMessageType&&this.listeners[t.serverMessageType]&&this.listeners[t.serverMessageType].forEach((e=>e(t)))}}addListener(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}removeListener(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter((e=>e!==t)))}sendMessage(e){this.socket.send(JSON.stringify(e))}closeConnection(){this.socket.close()}}const a=e=>{const[t]=(0,i.useState)((()=>new n(e)));return t};return o})()));