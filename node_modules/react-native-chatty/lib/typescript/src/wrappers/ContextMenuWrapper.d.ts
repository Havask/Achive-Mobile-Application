import type { IMessage } from '../types/Chatty.types';
interface IProps {
    message: IMessage;
    children: JSX.Element;
}
declare function ContextMenuWrapper(props: IProps): JSX.Element;
export { ContextMenuWrapper };
