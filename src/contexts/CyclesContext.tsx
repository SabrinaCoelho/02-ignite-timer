import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles";

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps{
    children: ReactNode;
}

export function CyclesContextPorvider({children}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducer, 
        {
            cycles: [],
            activeCycleId: null
        }
    );

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const { cycles, activeCycleId} = cyclesState;
    //const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished(){
        //Por que nao mandar setCycles direto pelo contexto?
        //Porque ele só existe aqui e para nao precisar tipar esta funcao
        //na interface, podemos fazer desta maneira tbm.
        
       dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,//acao que quero realizar
            payload: {
                activeCycleId
            } //objeto da alteracao
        });
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function createNewCycle(data: CreateCycleData){
        /* data são os dados dos inputs do form */
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,//acao que quero realizar
            payload: {
                newCycle
            } //objeto da alteracao
        });
        
        //setActiveCycleId(newCycle.id);

        setAmountSecondsPassed(0);
        
    }
    
    function interruptCurrentCycle(){
        /* setCycles((prev) => prev.map((cycle) => {
            if(cycle.id === activeCycleId){
                return{...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        })) */
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,//acao que quero realizar
            payload: {
                activeCycleId
            } //objeto da alteracao
        });
        //setActiveCycleId(null);
    }

    return(
        <CyclesContext.Provider value={
            {
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>
            {children}
        </CyclesContext.Provider>
    );
}