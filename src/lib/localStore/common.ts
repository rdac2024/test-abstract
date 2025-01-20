import config from "../../../package.json";
import { Dictionaries, expire, StorageData, StorageResult } from "@/lib/localStore/index";

const PREFIX = `${ config.name }_${ config.version }_`;
const DEFAULT_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

class CommonSessionStorageClass {
    private readonly prefix: string;

    constructor(options: { prefix: string }) {
        this.prefix = `${ PREFIX }${ options.prefix }_`;
    }

    private get storage(): Storage {
        if (typeof window === "undefined") {
            throw new Error("LocalStorage is not available on the server");
        }
        return window.localStorage;
    }

    // key is Squad Code
    private synthesisKey(key: string): string {
        return `${ this.prefix }${ key }`;
    }

    set(key: string, value: any, expire?: expire): void {
        if (key === "") return;

        let data: any = {
            value: value,
            [Dictionaries.expire]: expire || new Date().getTime() + DEFAULT_EXPIRATION_TIME
        };

        try {
            this.storage.setItem(this.synthesisKey(key), JSON.stringify(data));
        } catch (error) {
            console.error("Error setting item in storage:", error);
        }
    }

    get<T = any>(key: string): StorageResult<T | null> {
        if (key === "") return { value: null };

        try {
            const cachedStorage = this.storage.getItem(this.synthesisKey(key));
            if (cachedStorage) {
                const obj: StorageData<any> = JSON.parse(cachedStorage);
                const now = Date.now();
                if (typeof obj[Dictionaries.expire] === "number" && obj[Dictionaries.expire] < now) {
                    this.storage.removeItem(this.synthesisKey(key));
                    return { value: null };
                } else {
                    return {
                        value: obj.value as T,
                        expire: obj[Dictionaries.expire]
                    };
                }
            }
            return { value: null };
        } catch (error) {
            console.error("Error getting item from storage:", error);
            return { value: null };
        }
    }

    delete(key: string): void {
        if (key === "") return;

        try {
            this.storage.removeItem(this.synthesisKey(key));
        } catch (error) {
            console.error("Error removing item from storage");
        }
    }
}

const CommonSessionStorage = new CommonSessionStorageClass({ prefix: "commonSession" });

const CommStorageType = {
    userGlobalRank: "userGlobalRank",
    userClaimTipCache: "userClaimTipCache",
    questPoolResult: "questPoolResult",
    playBetData: 'playBetData',
};

class CommonLocalStorageClass {
    private readonly prefix: string;

    constructor(options: { prefix: string }) {
        this.prefix = `${ PREFIX }${ options.prefix }_`;
    }

    private get storage(): Storage {
        if (typeof window === "undefined") {
            throw new Error("LocalStorage is not available on the server");
        }
        return window.localStorage;
    }

    // key is Squad Code
    private synthesisKey(key: string): string {
        return `${ this.prefix }${ key }`;
    }

    set(key: string, value: any): void {
        if (key === "") return;
        try {
            this.storage.setItem(this.synthesisKey(key), JSON.stringify(value));
        } catch (error) {
            console.error("Error setting item in storage:", error);
        }
    }

    get(key: string): any {
        if (key === "") return null;

        try {
            const cachedStorage = this.storage.getItem(this.synthesisKey(key));
            if (cachedStorage) {
                const obj: StorageData<any> = JSON.parse(cachedStorage);
                return obj
            }
            return null;
        } catch (error) {
            console.error("Error getting item from storage:", error);
            return null;
        }
    }

    delete(key: string): void {
        if (key === "") return;

        try {
            this.storage.removeItem(this.synthesisKey(key));
        } catch (error) {
            console.error("Error removing item from storage");
        }
    }
}

const CommonLocalStorage = new CommonLocalStorageClass({ prefix: "commonLocal" });

export {
    CommonSessionStorage,
    CommStorageType,
    CommonLocalStorage
};