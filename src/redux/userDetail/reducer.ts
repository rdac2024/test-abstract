"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "@/service/user/interface";
export interface IUserDetailsState {
    login: boolean;
    userInfo: UserInfo
}

export interface RewardInfo{
    basic: number;
    basicTotal: number;
    pass: number;
    passTotal: number;
}

const initialState: IUserDetailsState = {
    login: false,
    userInfo: {
        swipoor: {
            lastBetAt: 0,
            correct: 0,
            gold: 0,
            gem: 0,
            wrong: 0
        }
    } as UserInfo
};

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        setUserDetails: (state: any, action: PayloadAction<UserInfo>) => {
            state.login = !!action.payload?.wallet;
            state.userInfo = action.payload;
        },
        incUserGold: (state: any, action: PayloadAction<number>) => {
            if (state?.userInfo?.swipoor) {
                if (state.userInfo.swipoor.gold + action.payload >= 0) {
                    state.userInfo.swipoor.gold += action.payload
                }
            }
        },
        incUserGem: (state: any, action: PayloadAction<number>) => {
            if (state?.userInfo?.swipoor) {
                state.userInfo.swipoor.gem += action.payload
            }
        },
        updateRewardStatus: (state: any, action: PayloadAction<RewardInfo>) => {
            state.userInfo.swipoor.claim = action.payload
        },
        updatePassStatus: (state: any, action: PayloadAction<boolean>) => {
            state.userInfo.swipoor.pass = action.payload
        },
    },
});

export const { setUserDetails, incUserGold, incUserGem, updateRewardStatus, updatePassStatus } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
