import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import persistentStorage from '../../../libraries/persistent-storage';
import { Action, CompletedAction } from '../../../types/actions';

interface ActionsStore {
    actions: Action[];
    completedActions: CompletedAction[];
    addCompletedAction: (actionId: string) => void;
    addActionType: (action: Action) => void;
    removeActionType: (actionId: string) => void;
}

export const useActionsStore = create<ActionsStore>()(
    persist(
        immer((set) => ({
            actions: [{
                title: "Close the door",
                color: "#FF0000",
                id: "1",
            }, {
                title: "Gas is off",
                color: "#FFFF00",
                id: "2",
            }],
            completedActions: [],
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
            addActionType: (action) =>
                set((state: ActionsStore) => {
                    state.actions.push(action);
                }),
            removeActionType: (actionId: string) =>
                set((state: ActionsStore) => {
                    state.actions = state.actions.filter((actionType) => actionType.id !== actionId);
                }),
        })),
        {
            name: 'actions-storeeee',
            storage: createJSONStorage(() => persistentStorage),
            partialize: (state) => ({
                actions: state.actions,
                completedActions: state.completedActions,
            }),
        },
    ),
);
