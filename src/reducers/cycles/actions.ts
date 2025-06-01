import { Cycle } from "./reducer";

export enum ActionTypes{
    ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
    INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
    MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED"
}

export function addNewCycleAction(newCycle: Cycle){
    return {
        type: ActionTypes.ADD_NEW_CYCLE,//acao que quero realizar
        payload: {
            newCycle
        } //objeto da alteracao
    }
}

export function markCurrentCurrentCycleAsFinishedAction(){
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,//acao que quero realizar
    }
}

export function interruptCurrentCurrentCycleAction(){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,//acao que quero realizar
    }
}