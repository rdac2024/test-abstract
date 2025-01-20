import { prefixZero } from "@/common/utils/general";

export interface TimeInfo {
    day: number;
    hours: number;
    hoursStr: string;
    minutes: number;
    minutesStr: string;
    seconds: number;
    secondsStr: string;
    milliseconds?: number;
    millisecondsStr?: string;
    status: "pending" | "runing" | "end";
}

export function computeRemainTime(deadlineTime: number) {
    const nowTime = Date.now();
    return (deadlineTime - nowTime) / 1000;
}

export function clearCountdownInfo(showMillisecond = false, status?: TimeInfo["status"]): TimeInfo {
    const timeInfo: TimeInfo = {
        day: 0,
        hours: 0,
        hoursStr: "00",
        minutes: 0,
        minutesStr: "00",
        seconds: 0,
        secondsStr: "00",
        status: status || "end",
    };

    if (showMillisecond) {
        timeInfo.milliseconds = 0;
        timeInfo.millisecondsStr = "0";
    }

    return timeInfo;
}

export function computeCountdownInfo(
    remainTime: number,
    showMillisecond = false
): TimeInfo {
    if (remainTime < 0) {
        return clearCountdownInfo(showMillisecond);
    }

    const day = Math.floor(remainTime / (24 * 60 * 60));
    const hours = Math.floor((remainTime / (60 * 60)) % 24);
    const hoursStr = prefixZero(hours, 2);
    const minutes = Math.floor((remainTime / 60) % 60);
    const minutesStr = prefixZero(minutes,2 );
    const seconds = Math.floor(remainTime % 60);
    const secondsStr = prefixZero(seconds, 2);

    const timeInfo: TimeInfo = {
        day,
        hours,
        hoursStr,
        minutes,
        minutesStr,
        seconds,
        secondsStr,
        status: "runing",
    };

    if (showMillisecond) {
        const milliseconds = Math.floor(remainTime * 1000);
        const millisecondsStr = String(milliseconds).slice(-3);
        timeInfo.milliseconds = milliseconds;
        timeInfo.millisecondsStr = millisecondsStr;
    }

    return timeInfo;
}