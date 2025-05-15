import { HandPalm, Play } from "@phosphor-icons/react";
import {HomeContainer } from "./styles";
import { createContext, useState } from "react";
// import { NewCycleForm } from "./Components/NewCycleForm";
import { StartCountdownButton, StopCountdownButton } from "./Components/NewCycleForm/styles";
import { Countdown } from "./Components/Countdown";

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    //
    // useEffect(() => {
    //     fetch("https://api.github.com/users/sabrinacoelho/repos")
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log(data)
    //         const x = data.map((item: any) => item.full_name)
    //         console.log(x)
    //     })
    // });
    //

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
    
    // function handleCreateNewCycle(data: NewCycleFormData){
    //     /* data são os dados dos inputs do form */
    //     const newCycle: Cycle = {
    //         id: String(new Date().getTime()),
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date()
    //     }
        
    //     setCycles(prev => [...prev, newCycle]);
    //     setActiveCycleId(newCycle.id);
    //     reset();
    // }

    function handleInterruptCycle(){
        /* setCycles((prev) => prev.map((cycle) => {
            if(cycle.id === activeCycleId){
                return{...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        })) */
        setActiveCycleId(null);
    }

    console.log("->", activeCycle)
    console.log("-->", cycles)

    // const isSubmitDisabled = watch("task");
   
    return(
        <HomeContainer>
            <form action="" /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
                    {/* <NewCycleForm/> */}
                    <Countdown />
                </CyclesContext.Provider>
                {
                    activeCycle ? (
                        <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    ): (
                        <StartCountdownButton type="submit" /* disabled={!isSubmitDisabled} */>
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}