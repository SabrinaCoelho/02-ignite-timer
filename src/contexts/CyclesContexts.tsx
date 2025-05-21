import { createContext, ReactNode, useState } from "react";

export interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

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
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished(){
        //Por que nao mandar setCycles direto pelo contexto?
        //Porque ele só existe aqui e para nao precisar tipar esta funcao
        //na interface, podemos fazer desta maneira tbm.
        setCycles((prev) => prev.map((cycle) => {
            if(cycle.id === activeCycleId){
                return{...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }))
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
            
            setCycles(prev => [...prev, newCycle]);
            setActiveCycleId(newCycle.id);
    
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
            setActiveCycleId(null);
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