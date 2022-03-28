import React from 'react';
import type { IScrollToBottomProps } from 'src/types/Chatty.types';
export interface IFabRef {
    show: () => void;
    hide: () => void;
}
export declare const FAB: React.MemoExoticComponent<React.ForwardRefExoticComponent<IScrollToBottomProps & React.RefAttributes<IFabRef>>>;
