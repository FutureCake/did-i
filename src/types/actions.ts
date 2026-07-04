
export interface Action {
    id: string;
    title: string;
    color: string;
}

export type CompletedAction = Action & {
    completedAt: string;
};