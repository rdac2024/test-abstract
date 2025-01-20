export type APIResponse<D = null> = Readonly<{
    code: number;
    msg: string | null;
    data: D | null;
}>;