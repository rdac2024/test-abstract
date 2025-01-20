import { getAccessToken } from "@privy-io/react-auth";
import { getAxios, postAxios } from "@/lib/axios/axios";
import { APIResponse } from "@/service/utils";
import { UserInfo, UserRank, UserInvitedItem, SquadMemberLeaderboard } from "@/service/user/interface";
import showNotification from "@/lib/utils/notifications";
import { CommonSessionStorage, CommStorageType } from "@/lib/localStore/common";

export const getUserInfo = async (keyword: string): Promise<APIResponse<UserInfo>> => {
    return (await getAxios({ url: `/api/user/get/${ keyword }` })) as APIResponse<UserInfo>;
};

export const registerUser = async (invitationCode?: string) => {
    const accessToken = await getAccessToken();

    const params = {} as any

    if (invitationCode) {
        params.code = invitationCode
    }

    return (await getAxios({
        url: `/api/user/register`,
        params,
        headers: { "Authorization": `Bearer ${ accessToken }` }
    })) as APIResponse<any>
};

export const getRankByGem = async (wallet: string, start: string, end: string) => {
    const { code, data = {} as UserRank } = await postAxios({
        url: `/api/user/leaderboard`,
        data: {
            wallet,
            start,
            end
        }
    }) as APIResponse;

    if (code !== 200 || !data) {
        showNotification("Something went wrong. Please try again later", "error");
        return {
            rank: 0,
            lists: []
        };
    }

    const { rank, range } = data;
    const leaderBoards = [] as any[];
    range.forEach((userBase, index) => {
        leaderBoards.push({
            rank: index + Number(start) + 1,
            gems: userBase.score,
            wallet: userBase.value
        });
    });

    CommonSessionStorage.set(`${ CommStorageType.userGlobalRank }_${ wallet }`, rank, new Date().getTime() + 3 * 60 * 1000)
    return {
        rank,
        lists: leaderBoards
    };
};

export const getUserInvitedList = async (
    page: number,
    pageSize: number
): Promise<APIResponse<Array<UserInvitedItem>>> => {
    const accessToken = await getAccessToken();

    return (await postAxios({
        url: "/api/user/list/invited",
        data: {
            page,
            pageSize
        },
        headers: { "Authorization": `Bearer ${ accessToken }` }
    })) as APIResponse<Array<UserInvitedItem>>
};

export const getSquadMemberLeaderboard = async (
    page: number,
    pageSize: number
): Promise<APIResponse<SquadMemberLeaderboard>> => {
    const accessToken = await getAccessToken();

    return (await getAxios({
        url: `/api/squad/member/leaderboard?page=${page}&size=${pageSize}`,
        headers: { "Authorization": `Bearer ${ accessToken }` }
    })) as APIResponse<SquadMemberLeaderboard>
};

export const claimDailyBonus = async () => {
    const accessToken = await getAccessToken();

    return (await getAxios({
        url: "/api/user/daily/login/bonus/claim",
        headers: { "Authorization": `Bearer ${ accessToken }` }
    })) as APIResponse<any>
}

export const getUserLinkWallet = async () => {
    const accessToken = await getAccessToken();

    return (await getAxios({
        url: "/api/user/link/wallet",
        headers: { "Authorization": `Bearer ${ accessToken }` }
    })) as APIResponse<any>
}