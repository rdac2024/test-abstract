export interface SwipeItem {
    lastBetAt: number;
    correct: number;
    gold: number;
    gem: number;
    wrong: number;
    pass?: boolean;
    claim: {
        pass?: number;
        basic?: number;
        passTotal?: number;
        basicTotal?: number
    }
}

export interface DailyLoginBonus {
    index: number;
    type: string;
    value: number;
}

interface LinkedChainItem {
    chain: 'ethereum' | 'solana' | 'abstract';
    _id: string;
}

export interface UserInfo {
    avatar?: string;
    code: string;
    referredBy: string;
    name: string;
    twitter: string;
    email?: string;
    wallet: string;
    _id: string;
    dailyLogin: string;
    dailyLoginBonus: Array<DailyLoginBonus>,
    swipoor: SwipeItem;
    role?: string;
    solana?: string;
    referred: number;
    eventBonus: string;
    ethEventBouns: string;
    linked?: LinkedChainItem[];
}

interface LeaderBoardRange {
    score: number;
    value: string;
}

export interface UserRank {
    rank: number;
    range: Array<LeaderBoardRange>;
    profile: Array<UserInfo>;
}

export interface LeaderboardData {
    rank: number;
    name: string;
    win: number;
    gems: number;
    wallet: string;
    _id?: string;
}

interface InvitedSwipoor {
    upGold: number;
    lastBetAt: number;
    correct: number;
    wrong: number;
    gold: number;
    gem: number;
    gemEarned: number;
    goldEarned: number;
}

export interface UserInvitedItem {
    swipoor: InvitedSwipoor;
    _id: string;
    wallet: string;
    name: string;
    code: string;
    referredBy: string;
    createAt: number;
    updateAt: number;
    __v: number;
}

export interface SquadMemberLeaderboardItem {
    _id: string;
    name: string;
    rank: number;
    count: number;
}

export interface SquadMemberLeaderboard {
    rank: number;
    count: number;
    data: SquadMemberLeaderboardItem[]
} 