export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const MAX_PICK_NUMS = 7

export const HomeTabRouterPath = {
  SHOP: "/shop",
  PLAY: "/play",
  PROFILE: "/profile",
  
  FORECATOOOR_PROFILE: '/forecastooor/profile',
  FORECATOOOR_PLAY: '/forecastooor/play',
  FORECATOOOR_QUEST: '/forecastooor/quest',
};

export const PerDayPickIntervals = 1 * 60 * 60 * 1000 // 1 hour

export const TodayMaxPickNums = 10

export const SUPER_PICK_GOLD_FEE = 100

export const SKIP_PICK_GOLD_FEE = 100

export type netWorkType = 'abs' | 'eth'

export const SwipePassValue = 1