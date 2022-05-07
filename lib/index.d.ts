declare type Avatar = {
    mini?: string;
    small?: string;
    medium?: string;
    large?: string;
};
declare type Person = {
    name: string;
    age?: number;
    sex?: number;
    email: string;
    avatar: Avatar;
};
export declare const getPerson: (id: string) => Person | undefined;
export declare const fibonaci: (i: number) => number;
export default fibonaci;
