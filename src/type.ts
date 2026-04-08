export interface User{
    uid:string;
    email:string;
    displayName:string
}

export interface Message{
    id:string;
    text:string;
    senderId:string;
    senderName:string;
    timestamp:number;
}

export interface ChatRoom{
    id:string;
    name: string;
    lastMessage:string
    lastMessageTimestamp:number
}