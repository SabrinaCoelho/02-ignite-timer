import { HandPalm, Play } from "@phosphor-icons/react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useEffect, useState } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

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

    
    function handleCreateNewCycle(data: NewCycleFormData){
        /* data são os dados dos inputs do form */
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        setCycles(prev => [...prev, newCycle]);
        setActiveCycleId(newCycle.id);
        reset();
    }

    function handleInterruptCycle(){
        setCycles((prev) => prev.map((cycle) => {
            if(cycle.id === activeCycleId){
                return{...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }))
        setActiveCycleId(null);
    }

    console.log("->", activeCycle)
    console.log("-->", cycles)

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    const isSubmitDisabled = watch("task");
    /*
    O que é esse register?!
    function register(nomeDoCampo: string){
        return{
            onChange: () => void,
            onBlur: () => void,
            onFocus: () => void
        }
    }

    */

    useEffect(
        () => {
            document.title = `${minutes}:${seconds}`;
        }, [minutes, seconds]
    );
    
    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm/>
                <CountDownContainer activeCycle={activeCycle}/>
                {
                    activeCycle ? (
                        <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    ): (
                        <StartCountdownButton type="submit" disabled={!isSubmitDisabled}>
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}