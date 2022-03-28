import type { IPatternShape } from 'src/types/Chatty.types';
export declare function loadParsedText(): any;
export declare const HASHTAG_PATTERN_SHAPE: IPatternShape;
export declare const MENTION_PATTERN_SHAPE: IPatternShape;
export declare const URL_PATTERN_SHAPE: IPatternShape;
export declare const ALL_PATERNS_SHAPES: IPatternShape[];
/**
 * Load all the patterns and set the onPress function
 * @param onPress - (pattern: string, index: number) => void
 */
export declare function LoadAllPaternShapes(onPress: (pattern: string, index: number) => void): void;
