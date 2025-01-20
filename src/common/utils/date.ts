// get count downtime obj

import { QuestType } from "@/common/statement/interface";

export const getDateObj = (times: number, isLimitHour: any) => {
    const second = times / 1000;
    const leftSecond = ~~(second % 60);
    const leftMinutes = ~~(second / 60 % 60);
    const leftHours = isLimitHour ? ~~(second / 60 / 60) : ~~(second / 60 / 60 % 24);
    const leftDay = ~~(second / 60 / 60 / 24);
    return {
        day: leftDay,
        hours: leftHours,
        minutes: leftMinutes,
        second: leftSecond
    };
};


// get time ago
export const agoTime = (timestamp: number) => {
    const currentTimestamp = Date.now();
    const duration = currentTimestamp - timestamp;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return {
        days: days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
    };
};


export const formatViewTime = (time: any, viewDay: false) => {
    const prefixZero = (num: number) => {
        return (Array(2).join("0") + Math.floor(num)).slice(-2);
    };
    if (time.day > 0 && viewDay) {
        return `${ time.day }d ${ prefixZero(time.hours) }:${ prefixZero(time.minutes) }:${ prefixZero(time.seconds) }`;
    } else {
        return `${ prefixZero(time.hours) }:${ prefixZero(time.minutes) }:${ prefixZero(time.seconds) }`;
    }
};


export function formatDateToEn(timestamp: number): string {
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const time = new Date(timestamp * 1000);
    const year = time.getUTCFullYear();
    const month = time.getUTCMonth() + 1;
    const day = time.getUTCDate();
    const hour = time.getUTCHours();
    const minute = time.getUTCMinutes();
    const second = time.getUTCSeconds();

    // TODO: Add time to the date
    return `${ months[month] } ${ year }`;
}

export function formatTimestampToTime(timestamp: number) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${ hours }:${ minutes }:${ seconds }`;
}

/**
 * Format a timestamp to a date string: 25th Dec
 * @param timestamp
 */
export function formatDateWithSuffix(timestamp: number) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });

    const dayWithSuffix = getDayWithSuffix(day);

    return `${ dayWithSuffix } ${ month }`;
}

/**
 * Format a timestamp to a date string: 25 Dec 2024
 * @param timestamp
 */
export function formatDate(timestamp: number) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();

    return `${ day } ${ month } ${ year }`;
}

function getDayWithSuffix(day: number) {
    if (day > 3 && day < 21) {
        return `${ day }th`;
    }
    switch (day % 10) {
        case 1:
            return `${ day }st`;
        case 2:
            return `${ day }nd`;
        case 3:
            return `${ day }rd`;
        default:
            return `${ day }th`;
    }
}

export function getUtcEndTimestamp(period: QuestType) {
    const currentDate = new Date();

    if (period === 'day') {
        const nextUtcMidnight = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 1));
        return nextUtcMidnight.getTime();
    } else if (period === 'week') {
        const dayOfWeek = currentDate.getUTCDay();
        const daysToEndOfWeek = 6 - dayOfWeek;
        const endOfWeekUtcMidnight = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + daysToEndOfWeek + 1));
        return endOfWeekUtcMidnight.getTime();
    } else {
        throw new Error("Invalid period specified. Use 'day' or 'week'.");
    }
}