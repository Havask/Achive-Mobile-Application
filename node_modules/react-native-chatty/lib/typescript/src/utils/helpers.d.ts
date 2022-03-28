import type { IUrlPreviewBubble } from 'src/types/Chatty.types';
/**
 * `wait` is a function that returns a promise that resolves after a given number of milliseconds
 * @param {number} ms - number
 */
export declare const wait: (ms: number) => Promise<unknown>;
/**
 * It takes a string and returns the first URL found in the string
 * @param {string} string - The string to extract the URL from.
 * @returns The first match of the regex.
 */
export declare const extractUrlFromString: (string: string) => string | null;
/**
 * It takes a URL, fetches the HTML from that URL, and then parses the HTML for the og:image, og:title,
 * and og:description meta tags. If all three of these meta tags are found, it returns a
 * UrlPreviewBubble object with the image, title, and description. If any of these meta tags are
 * missing, it returns null
 * @param {string} url - The URL of the page to fetch.
 * @returns An object with the following properties:
 */
export declare const fetchMetaData: (url: string) => Promise<IUrlPreviewBubble | null>;
