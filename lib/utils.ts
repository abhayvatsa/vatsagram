// Infer type from Promise
export declare type PromiseValue<T> = T extends Promise<infer U> ? U : T;
