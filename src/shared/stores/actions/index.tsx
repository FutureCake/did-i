import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import persistentStorage from '../../../libraries/persistent-storage';
import { ActionData, CompletedActionData } from '../../../types/actions';

interface ActionsStore {
    actions: ActionData[];
    completedActions: CompletedActionData[];
    getAction: (actionId: string) => ActionData | null;
    addCompletedAction: (actionId: string) => void;
    addAction: (action: ActionData) => void;
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
                        ...action,
                        completedAt: new Date().toISOString(),
                    });
                }),
            addAction: (action) =>
                set((state: ActionsStore) => {
                    state.actions.push(action);
                }),
            removeAction: (actionId: string) =>
                set((state: ActionsStore) => {
                    state.actions = state.actions.filter((actionType) => actionType.id !== actionId);
                }),
        })),
        {
            name: 'actions-storeeeeee',
            storage: createJSONStorage(() => persistentStorage),
            partialize: (state) => ({
                actions: state.actions,
                completedActions: state.completedActions,
            }),
        },
    ),
);
