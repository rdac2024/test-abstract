import config from "../../../package.json";
import { SquadInfoInterface } from "@/service/squad/interface";
import { Dictionaries, expire, StorageData, StorageResult } from "@/lib/localStore/index";

const PREFIX = `${ config.name }_`;
const DEFAULT_EXPIRATION_TIME = 30 * 60 * 1000; // 30 min in milliseconds

class SquadInfoStorage {
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

    set(key: string, value: SquadInfoInterface, expire?: expire): void {
        if (!key) return

        let data: any = {
            value: value,
            [Dictionaries.expire]: expire || new Date().getTime() + DEFAULT_EXPIRATION_TIME
        };

        try {
            this.storage.setItem(this.synthesisKey(key), JSON.stringify(data))
        } catch (error) {
            console.error("Error setting item in storage:", error);
        }
    }

    get<T = SquadInfoInterface>(key: string): StorageResult<T | null> {
        if (!key) return { value: null };

        try {
            const cachedStorage = this.storage.getItem(this.synthesisKey(key));
            if (cachedStorage) {
                const obj: StorageData<SquadInfoInterface> = JSON.parse(cachedStorage)
                const now = Date.now()
                if (typeof obj[Dictionaries.expire] === "number" && obj[Dictionaries.expire] < now) {
                    this.storage.removeItem(this.synthesisKey(key));
                    return { value: null };
                } else {
                    return {
                        value: obj.value as T,
                        expire: obj[Dictionaries.expire]
                    }
                }
            }
            return { value: null }
        } catch (error) {
            console.error("Error getting item from storage:", error);
            return { value: null };
        }
    }
}

const SquadStorage = new SquadInfoStorage({ prefix: "squad" })

export {
    SquadStorage
}