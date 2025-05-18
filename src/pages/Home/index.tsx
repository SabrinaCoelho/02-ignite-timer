import { HandPalm, Play } from "@phosphor-icons/react";
import {HomeContainer } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { StartCountdownButton, StopCountdownButton } from "./Components/NewCycleForm/styles";
import { Countdown } from "./Components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";

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
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

//zod.object -> estou validando um objeto
const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z.number()
                    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
                    .max(60, "O ciclo precisa ser de no máximo 60 minutos.")
});

// interface NewCycleFormData{
//     task: string;
//     minutesAmount: number;
// }

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

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

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: "",
            minutesAmount: 0,

        }
    });
    
    const { handleSubmit, watch, reset} = newCycleForm;
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

        setAmountSecondsPassed(0);
        reset();
    }
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

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

    const isSubmitDisabled = watch("task");
   
    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider value={
                    {
                        activeCycle,
                        activeCycleId,
                        markCurrentCycleAsFinished,
                        amountSecondsPassed,
                        setSecondsPassed
                    }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>
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