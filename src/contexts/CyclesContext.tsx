import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCurrentCycleAction, markCurrentCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

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
        },
        (initialArgs) => {
            const storedStateAsJSON = localStorage.getItem("@ignite-timer:cycles-state-1.0.0");
            if(storedStateAsJSON){
                return JSON.parse(storedStateAsJSON);
            }
            return initialArgs;
        }
    );

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON)
    }, [cyclesState])

    const { cycles, activeCycleId} = cyclesState;
    //const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            );
        }
        return 0;
    });

    function markCurrentCycleAsFinished(){
        //Por que nao mandar setCycles direto pelo contexto?
        //Porque ele só existe aqui e para nao precisar tipar esta funcao
        //na interface, podemos fazer desta maneira tbm.
        
       dispatch(markCurrentCurrentCycleAsFinishedAction());
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
        
        dispatch(addNewCycleAction(newCycle));
        
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
        dispatch(interruptCurrentCurrentCycleAction());
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