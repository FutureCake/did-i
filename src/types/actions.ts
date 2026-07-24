
export interface ActionData {
    id: string;
    title: string;
    color: string;
}

export type CompletedActionData = ActionData & {
    completedAt: string;
};