import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import persistentStorage from '../../../libraries/persistent-storage';
import { ActionData, CompletedActionRecord } from '../../../types/actions';

interface ActionsStore {
    actions: ActionData[];
    deletedActions: ActionData[];
    completedActions: CompletedActionRecord[];
    getAction: (actionId: string) => ActionData | null;
    addCompletedAction: (actionId: string) => void;
    addAction: (action: ActionData) => void;
    updateAction: (actionId: string, updatedAction: Partial<ActionData>) => void;
    removeAction: (actionId: string) => void;
}

export const useActionsStore = create<ActionsStore>()(
    persist(
        immer((set, get) => ({
            actions: [{
                title: "Close the door",
                color: "#FF0000",
                id: "1",
            }, {
                title: "Turn the gas off",
                color: "#FFFF00",
                id: "2",
            }],
            deletedActions: [],
            completedActions: [],
            getAction: (actionId: string) =>
                get().actions.find((action) => action.id === actionId) ?? null,
            addCompletedAction: (actionId: string) =>
                set((state: ActionsStore) => {

                    const action = state.actions.find((action) => action.id === actionId);

                    if (!action) {
                        return;
                    }

                    state.completedActions.push({
                        id: actionId,
                        completedAt: new Date().toISOString(),
                    });
                }),
            addAction: (action) =>
                set((state: ActionsStore) => {
                    state.actions.push(action);
                }),
            removeAction: (actionId: string) =>
                set((state: ActionsStore) => {
                    const action = state.actions.find((action) => action.id === actionId);
                    if (!action) {
                        return;
                    }
                    state.actions = state.actions.filter((action) => action.id !== actionId);
                    state.deletedActions.push(action);
                }),
            updateAction: (actionId: string, updatedAction: Partial<ActionData>) =>
                set((state: ActionsStore) => {
                    const action = state.actions.find((action) => action.id === actionId);
                    if (action) {
                        Object.assign(action, updatedAction);
                    }
                }),
        })),
        {
            name: 'actions-storeeeeeee',
            storage: createJSONStorage(() => persistentStorage),
            partialize: (state) => ({
                actions: state.actions,
                completedActions: state.completedActions,
                deletedActions: state.deletedActions,
            }),
        },
    ),
);
