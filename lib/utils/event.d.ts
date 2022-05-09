export declare type Listener = ((...payload: any[]) => void) & {
    isOnce?: boolean;
};
export default class ZnuEvent {
    private _listenersMap;
    constructor();
    on(eventName: string, listener: Listener): ZnuEvent;
    once(eventName: string, listener: Listener): ZnuEvent;
    off(eventName: string, listener?: Listener): ZnuEvent;
    offAll(): void;
    emit(eventName: string, ...payload: any[]): boolean;
    has(eventName: string): boolean;
    eventNames(): string[];
    destroy(): void;
}
