import { QuestType } from "@/common/statement/interface";
import { QuestItem } from "@/service/quest/interface";

export function isCompletedQuest(quest: QuestItem, period: QuestType | Number) {
  if (typeof period === "number") period = period == 86400 ? 'day' : 'week'

  if (period === 'day') {
    if (!quest?.log) return false

    const currentDate = new Date();
    const utcYear = currentDate.getUTCFullYear();
    const utcMonth = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const utcDay = String(currentDate.getUTCDate()).padStart(2, "0");
    const currentDateString = `${utcYear}${utcMonth}${utcDay}`;
    return currentDateString <= quest.log.time
  } else if (period === 'week') {
    if (!quest?.log) return false

    const lastDate = new Date(quest.log.createAt);
    const now = new Date();
    const getWeekNumber = (date: Date): number => {
      const startOfYear = new Date(date.getFullYear(), 0, 1).getTime();
      const dateTimestamp = date.getTime();
      const dayOfYear = ((dateTimestamp - startOfYear) / 86400000) + 1;
      return Math.ceil(dayOfYear / 7);
    }

    const lastWeekNumber = getWeekNumber(lastDate);
    const currentWeekNumber = getWeekNumber(now);
    return now.getFullYear() > lastDate.getFullYear() || currentWeekNumber <= lastWeekNumber;
  } else {
    return false
  }
}