import { ActionTypes } from "./actions";
import { produce } from "immer";

export interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesState{
    cycles: Cycle[],
    activeCycleId: string | null
}

export function cyclesReducer (state: CyclesState, action: any) {
        
    console.log(state);
    console.log(action);

    switch(action.type){
        case ActionTypes.ADD_NEW_CYCLE:
            // return {
            //     ...state,
            //     cycles: [...state.cycles, action.payload.newCycle],
            //     activeCycleId: action.payload.newCycle.id,
            // }
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            // return{
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if(cycle.id === state.activeCycleId){
            //             return{...cycle, interruptedDate: new Date()}
            //         }else{
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null
            // }
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            });
            return produce(state, draft => {
                if(currentCycleIndex < 0){
                    return state;
                }
                draft.cycles[currentCycleIndex].interruptedDate = new Date();
                draft.activeCycleId = null;
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            // return{
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if(cycle.id === state.activeCycleId){
            //             return{...cycle, finishedDate: new Date()}
            //         }else{
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null
            // }
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            });
            return produce(state, draft => {
                if(currentCycleIndex < 0){
                    return state;
                }
                draft.cycles[currentCycleIndex].finishedDate = new Date();
                draft.activeCycleId = null;
            })
        }
        default:
            return state;
    }
}