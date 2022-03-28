import React from 'react';
import type { IChatHeaderProps } from './types/Chatty.types';
declare function _Header(props: IChatHeaderProps): JSX.Element;
export declare const styles: {
    container: {
        backgroundColor: string;
        alignItems: "center";
        justifyContent: "center";
        flexDirection: "row";
        padding: number;
        zIndex: number;
    };
    avatar: {
        width: number;
        height: number;
        borderRadius: number;
    };
    username: {
        marginLeft: number;
        textAlign: "justify";
    };
};
export declare const Header: React.MemoExoticComponent<typeof _Header>;
export {};
