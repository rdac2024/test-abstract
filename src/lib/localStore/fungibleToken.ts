import config from "../../../package.json";
import { Dictionaries, expire, StorageData, StorageResult } from "@/lib/localStore/index";
import { PerDayPickIntervals } from "@/common/statement/common";
import { FungibleTokenItem } from "@/service/forecastooorPlay/interface";

// Define constants for prefix and expiration times
const PREFIX = `${ config.name }_`;
const DEFAULT_EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export enum FungibleTokenKeyType {
    TodayTokens = "TodayTokens",
    PickTokens = "PickTokens",
}

export interface FungibleTodayPick {
    LastBetAt: number;
    TokenId: string;
    Risk: boolean;
    Super: boolean;
    TokenInfo: {
        Name: string,
        Avatar: string,
    };
    PredictedAt: string,
    currentPrice?: number;
    quote?: {
        fdv: string,
        lastUpdated: number,
        marketCap: string,
        marketCapDominance: string,
        price: string,
        volume7d: string,
        volume7dUSD: string,
        volume24h: string,
        volume24hUSD: string,
    },
    submit?: boolean;
}

export interface FungibleSkip {
    TokenId: string;
    TokenInfo: {
        Name: string,
        Avatar: string,
    };
}

interface FungibleSkipId {
    values: Array<string>
    skips: Array<string>
    expire: number
}

interface TokenListCache {
    expire: number,
    lists: Array<FungibleTokenItem>
}

class FungibleTokenPlayStorage {
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

    private synthesisKey(key: FungibleTokenKeyType, wallets?: string): string {
        return wallets ? `${ this.prefix }${ key }:${ wallets }` : `${ this.prefix }${ key }`;
    }

    set(key: FungibleTokenKeyType, value: FungibleTodayPick[], lastBetAt: number, wallet?: string, expire?: expire): void {
        let data: any = {
            value: [],
            [Dictionaries.expire]: expire || 0
        };

        try {
            const cachedStorage = this.storage.getItem(this.synthesisKey(key, wallet));
            if (cachedStorage) {
                const obj: StorageData<FungibleTodayPick[]> = JSON.parse(cachedStorage);
                const filterTodayPick = obj.value.filter(item => item.LastBetAt >= lastBetAt && item.TokenId !== value[0].TokenId);

                data.value = [ ...filterTodayPick, ...value ];
                data[Dictionaries.expire] = obj[Dictionaries.expire];
                if (filterTodayPick.length <= 0) {
                    data[Dictionaries.expire] = Date.now() + DEFAULT_EXPIRATION_TIME; // today first pick, set expire
                }
            } else {
                data.value = [ ...value ];
                data[Dictionaries.expire] = Date.now() + DEFAULT_EXPIRATION_TIME; // today first pick, set expire
            }
            this.storage.setItem(this.synthesisKey(key, wallet), JSON.stringify(data));
        } catch (error) {
            console.error("Error setting item in storage:", error);
        }
    }

    updateValue(key: FungibleTokenKeyType, wallet: string, value: FungibleTodayPick[]): boolean {
        const cachedStorage = this.storage.getItem(this.synthesisKey(key, wallet));
        if (cachedStorage) {
            const obj: StorageData<FungibleTodayPick[]> = JSON.parse(cachedStorage);
            const newObj = {
                ...obj,
                value: value
            }
            this.storage.setItem(this.synthesisKey(key, wallet), JSON.stringify(newObj));
            return true
        }
        return  false
    }

    submitTodayPick(wallets: string): void {
        try {
            const cachedStorage = this.storage.getItem(this.synthesisKey(FungibleTokenKeyType.PickTokens, wallets));
            if (cachedStorage) {
                const obj: StorageData<FungibleTodayPick[]> = JSON.parse(cachedStorage);
                const data: StorageData<FungibleTodayPick[]> = {
                    value: obj.value.map(item => { return { ...item, submit: true }; }),
                    [Dictionaries.expire]: Dictionaries.permanent
                };
                this.storage.setItem(this.synthesisKey(FungibleTokenKeyType.PickTokens, wallets), JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error setting item in storage:", error);
        }
    }

    get<T = FungibleTodayPick[]>(key: FungibleTokenKeyType, lastBetAt: number, wallet?: string, filterSubmit: boolean = true): StorageResult<T | null> {
        try {
            const cachedStorage = this.storage.getItem(this.synthesisKey(key, wallet));
            if (cachedStorage) {
                const obj: StorageData<FungibleTodayPick[]> = JSON.parse(cachedStorage);
                const now = Date.now();
                if (typeof obj[Dictionaries.expire] === "number" && obj[Dictionaries.expire] < now) {
                    this.storage.removeItem(this.synthesisKey(key, wallet));
                    return { value: null };
                } else if (typeof obj[Dictionaries.expire] === "string" && obj[Dictionaries.expire] === "permanent" && new Date().getTime() - lastBetAt > PerDayPickIntervals) {
                    return { value: null };
                } else {
                    return {
                        value: filterSubmit ? obj.value.filter(item => item.LastBetAt >= lastBetAt) as T : obj.value as T,
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


    // --------------skip-----------------
    getFungibleIds<T = FungibleTodayPick[]>(key: FungibleTokenKeyType, lastBetAt: number, wallet?: string): Array<string> {
        try {
            const localKey = this.synthesisKey(key, wallet)
            const cachedStorage = this.storage.getItem(localKey);
            if (cachedStorage) {
                const obj: FungibleSkipId  = JSON.parse(cachedStorage);
                const {values = [], expire = 0, skips =  []} = obj;
                if (lastBetAt !== expire) {
                    this.storage.removeItem(localKey)
                } else {
                    return values
                }
            }
            return []
        } catch (error) {
            console.error("Error getting item from storage:", error);
            return []
        }
    }

    setFungibleIds(key: FungibleTokenKeyType, lastBetAt: number, wallet: string, ids: Array<string>) {
        if (ids.length <= 0) return
        const localKey = this.synthesisKey(key, wallet)
        const data = {
            values: ids,
            skips: [],
            expire: lastBetAt,
        }
        this.storage.setItem(localKey, JSON.stringify(data))
    }

    getSkips<T = FungibleTodayPick[]>(key: FungibleTokenKeyType, wallet?: string): any {
        const localKey = this.synthesisKey(key, wallet)
        const currentStr = this.storage.getItem(localKey)
        if (currentStr) {
            const localObj = JSON.parse(currentStr)
            return localObj.skips || []
        }
        return []
    }

    setSkipItem(key: FungibleTokenKeyType, wallet: string, id: string) {
        const localKey = this.synthesisKey(key, wallet)
        const currentStr = this.storage.getItem(localKey)
        if (currentStr) {
            const localObj = JSON.parse(currentStr)
            const currentObj = {
                ...localObj,
                skips: [...(localObj.skips || []), id]
            }
            this.storage.setItem(localKey, JSON.stringify(currentObj))
        }
    }
}

class FungibleTokenListCache{
    public readonly key = "fungible_token_manage_cache"

    private get storage(): Storage {
        if (typeof window === "undefined") {
            throw new Error("LocalStorage is not available on the server");
        }
        return window.localStorage;
    }

    get(wallet: string): Array<FungibleTokenItem> {
        const strObj = this.storage.getItem(`${this.key}_${wallet.toLowerCase()}`)
        if (strObj) {
            const now = new Date().getTime()
            const {lists = [], expire = 0} = JSON.parse(strObj) as TokenListCache
            if (now > Number(expire)) {
                 this.remove(wallet)
            } else {
                return lists
            }
        }
        return []
    }


    remove(wallet: string) {
        this.storage.removeItem(`${this.key}_${wallet.toLowerCase()}`)
    }

    set(wallet: string, lists: Array<FungibleTokenItem>) {
        if (!wallet || lists.length === 0) return
        const cKey = `${this.key}_${wallet.toLowerCase()}`
        const strObj = this.storage.getItem(cKey)
        if (strObj) {
            const {expire, lists: localList} = JSON.parse(strObj) as TokenListCache
            if (
                Number(expire) > new Date().getTime() &&
                lists[0]._id === localList[0]._id
            ) return
        }

        const now = new Date().getTime() + 1000 * 60 * 3
        const obj = {
            expire: now,
            lists: lists
        } as TokenListCache

        this.storage.setItem(`${cKey}`, JSON.stringify(obj))
        return lists
    }
}

const FungibleStorage = new FungibleTokenPlayStorage({ prefix: "fungibleTokens" });

const todayFungibleStorage = new FungibleTokenPlayStorage({ prefix: "todaySkipFungibleTokens" });

const fungibleTokenListCache = new FungibleTokenListCache();

export { FungibleStorage, todayFungibleStorage, fungibleTokenListCache };
