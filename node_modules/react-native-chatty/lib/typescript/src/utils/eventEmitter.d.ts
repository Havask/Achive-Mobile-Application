import type { IMessage } from '../types/Chatty.types';
import type TypedEmitter from 'typed-emitter';
export declare type EventMap = {
    [key: string]: (...args: any[]) => void;
};
declare type ChatEvents = {
    patternPressed: (pattern: string, index: number, message: IMessage) => void;
    actionPressed: (index: number, message: IMessage) => void;
};
declare type ChatBubbleEvents = {
    replyBubblePressed: (messageId: number) => void;
};
declare const ChatEmitter: TypedEmitter<ChatEvents>;
declare const ChatBubbleEmitter: TypedEmitter<ChatBubbleEvents>;
export { ChatEmitter, ChatBubbleEmitter };
