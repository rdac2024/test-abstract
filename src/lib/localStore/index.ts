export enum Dictionaries {
    expire = "__expire__",
    permanent = "permanent"
}

export type expire = Dictionaries.permanent | number

export interface StorageData<T> {
    value: T;
    [Dictionaries.expire]: Dictionaries.expire | expire;
}

export interface StorageResult<T> {
    value: T | null;
    expire?: Dictionaries.expire | expire;
}