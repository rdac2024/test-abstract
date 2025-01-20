export interface PageSetting {
    page: number;
    pageSize: number;
    total: number;
    pageOver: boolean;
    isLoaded: boolean;
}

export interface DailyLoginBonusResult {
    canClaim: boolean;
    rewardDay: number | null;
    prizeList: string[],
    nextTime: number;
}

export type QuestType = 'day' | 'week';