
export interface Action {
    id: string;
    name: string;
}

export type CompletedAction = Action & {
    completedAt: string;
};