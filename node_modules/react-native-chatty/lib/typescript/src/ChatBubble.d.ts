import React from 'react';
import { IChatBubble } from './types/Chatty.types';
declare function _ChatBubble(props: IChatBubble): JSX.Element;
export declare const ChatBubble: React.MemoExoticComponent<typeof _ChatBubble>;
export declare const styles: {
    wrapper: {
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "space-between";
    };
    container: {
        margin: number;
        maxWidth: number;
        borderRadius: number;
    };
    rightArrow: {
        position: "absolute";
        width: number;
        height: number;
        bottom: number;
        borderBottomLeftRadius: number;
        right: number;
    };
    rightArrowOverlap: {
        position: "absolute";
        width: number;
        height: number;
        bottom: number;
        borderBottomLeftRadius: number;
        right: number;
    };
    leftArrow: {
        position: "absolute";
        width: number;
        height: number;
        bottom: number;
        borderBottomRightRadius: number;
        left: number;
    };
    leftArrowOverlap: {
        position: "absolute";
        width: number;
        height: number;
        bottom: number;
        borderBottomRightRadius: number;
        left: number;
    };
    date: {
        color: string;
        fontSize: number;
    };
    avatar: {
        marginLeft: number;
    };
    avatarMe: {
        marginRight: number;
    };
    bubbleFooter: {
        justifyContent: "flex-end";
        flexDirection: "row";
        marginTop: number;
    };
    moreMedia: {
        width: number;
        height: number;
        borderWidth: number;
        borderStyle: "dashed";
        borderRadius: number;
        justifyContent: "center";
        alignItems: "center";
        borderColor: string;
    };
    media: {
        width: number;
        height: number;
        borderRadius: number;
        marginRight: number;
        marginBottom: number;
    };
    backgroundOverlay: {
        width: number;
        height: number;
        backgroundColor: string;
        borderRadius: number;
        justifyContent: "center";
        alignContent: "center";
        alignItems: "center";
    };
};
export {};
