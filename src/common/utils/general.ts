import BigNumber from "bignumber.js";
import Decimal from "decimal.js";
import { QuestItem } from "@/service/quest/interface";
import { getUtcEndTimestamp } from "@/common/utils/date";
import { DailyLoginBonusResult } from "@/common/statement/interface";

// sleep
export function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function useNumberDecimal(value: { $numberDecimal: string }, unit: number = 0, decimal: number = -1) {
    const number = new BigNumber(value.$numberDecimal).dividedBy(Math.pow(10, unit)).toNumber();
    if (decimal === -1) return `${ number }`;
    return `${ number.toFixed(decimal) }`;
}

export function getValueFormat(value: number, decimal = 0) {
    let newValue = new Decimal(value);
    const div = new Decimal(10).pow(decimal);
    return newValue.mul(div).floor().div(div);
}

export function abbreviateNumber(value: number, decimalPlaces = 0) {
    if (!value) return 0;
    let newValue = new Decimal(value);
    const suffixes = [ "", "K", "M", "B", "T" ];
    let suffixNum = 0;

    while (newValue.gte(1000)) {
        if (suffixNum >= 4) break;
        newValue = newValue.div(1000);
        suffixNum++;
    }

    return getValueFormat(newValue.toNumber(), decimalPlaces) + suffixes[suffixNum];
}

// add zero before number
export function prefixZero(num: number, len: number): string {
    return (Array(len).join("0") + Math.floor(num)).slice(-len);
}

export function MathFloor(value: number, decimal: number) {
    return Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export function shortenAddress(address: string, preChars = 4, lastChar = 4): string {
    if (!address) return "";
    return `${ address.slice(0, preChars) }...${ address.slice(-lastChar) }`.toUpperCase();
}

export function formatNumber(num: number) {
    if (num >= 1000000000) {
        return Number((num / 1000000000).toFixed(0) ) + 'B';
    } else if (num >= 1000000) {
        return Number((num / 1000000).toFixed(0) )+ 'M';
    } else if (num >= 1000) {
        return Number((num / 1000).toFixed(0) ) + 'K';
    } else if (num >= 1) {
        return Number(num.toFixed(1) );
    } else if (num >= 0.1) {
        return Number(num.toFixed(2) );
    } else if (num >= 0.01) {
        return Number(num.toFixed(3) );
    } else if (num === 0) {
        return 0
    } else {
        return num.toExponential(2);
    }
}

export function splitIntoZeroToArray(num: number, step: number) {
    const oneStep = num / (step - 1);
    const result = [];
    for (let i = 0; i <= 4; i++) {
        result.push(i * oneStep);
    }
    return result;
}

export function shuffleArray(array: Array<string> | undefined) : Array<any> {
    if (!Array.isArray(array)) return []
    const arrayCopy = [...array];
    let currentIndex = arrayCopy.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [arrayCopy[randomIndex], arrayCopy[currentIndex]];
    }
    return arrayCopy;
}

export function getWinMultiplier(currentRank: number) {
    if (currentRank <= 6) return '5'
    else if (currentRank <= 20) return '4.5'
    else if (currentRank <= 40) return '4'
    else if (currentRank <= 60) return '3'
    else if (currentRank <= 80) return '2'
    else if (currentRank <= 100) return '1.5'
    else return '1'
}

export function splitQuests(totalQuests: Array<QuestItem>) {
    return {
        daily: {
            list: totalQuests.filter(item => item.quest.interval === 86400),
            count: totalQuests.filter(item => item.quest.interval === 86400).length,
            endTime: getUtcEndTimestamp('day')
        },
        weekly: {
            list: totalQuests.filter(item => item.quest.interval === 604800),
            count: totalQuests.filter(item => item.quest.interval === 604800).length,
            endTime: getUtcEndTimestamp('week')
        },
    }
}

export function dailyLoginAnalyze(dailyLogin: string): DailyLoginBonusResult {
    const currentDate: Date = new Date();
    const currentUTCDate: string = currentDate.toISOString().split('T')[0].replace(/-/g, '');

    const loginDate: string = dailyLogin.slice(0, 8);
    const daysReceived: number = parseInt(dailyLogin.slice(-1), 10);

    let canClaim = false, nextRewardDay = 1
    if (daysReceived === 0) {
        canClaim = true
    } else {
        if (loginDate === currentUTCDate) nextRewardDay = daysReceived % 3
        else {
            canClaim = true
            nextRewardDay = (daysReceived % 3) + 1
        }
    }

    // Determine the number of days rewards have been claimed
    return {
        canClaim: canClaim,
        rewardDay: nextRewardDay,
        prizeList: [ ...dailyLogin.substring(8, 11).split("") ],
        nextTime: currentDate.setHours(24, 0, 0, 0)
    };
}

export function formatBonus (bonus: string, isSolana: boolean) {
    let res = '0'
    if (bonus) {
        res = new BigNumber(bonus).dividedBy(isSolana? "1e9" : "1e18").toString();
    }
    return res
}

export const isEthAddress = (address: string) => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
};