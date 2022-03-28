import { HapticType } from '../types/Chatty.types';
declare let hapticEngine: any;
declare let triggerHaptic: (type: HapticType) => Promise<void>;
export { triggerHaptic, hapticEngine };
