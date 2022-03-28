import React from 'react';
import type { IChatty, ListRef } from './types/Chatty.types';
export declare const PropsContext: React.Context<IChatty>;
export declare const Chatty: React.ForwardRefExoticComponent<IChatty & React.RefAttributes<ListRef>>;
export declare const styles: {
    loadingContainer: {
        height: string;
        justifyContent: "center";
        alignContent: "center";
        alignItems: "center";
    };
};
