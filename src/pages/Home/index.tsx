import { HandPalm, Play } from "@phosphor-icons/react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

//zod.object -> estou validando um objeto
const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z.number()
                    .min(1, "O ciclo precisa ser de no mínimo 5 minutos.")
                    .max(60, "O ciclo precisa ser de no máximo 60 minutos.")
});

// interface NewCycleFormData{
//     task: string;
//     minutesAmount: number;
// }

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

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
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: "",
            minutesAmount: 0,

        }
    });
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
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;
        
        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);
                
                if(secondsDifference >= totalSeconds){
                    setCycles((prev) => 
                        prev.map((cycle) =>{
                            if(cycle.id === activeCycleId){
                                return{...cycle, finishedDate: new Date()}
                            }else{
                                return cycle
                            }
                        })
                    );
                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                }else{
                    setAmountSecondsPassed(secondsDifference);
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval);
        }

    }, [activeCycle, totalSeconds, activeCycleId]);
    
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
                <FormContainer>
                    <label htmlFor="task">
                        Vou trabalhar em
                    </label>
                    <TaskInput
                        id="task"
                        list="task-sugestions"
                        type="text"
                        placeholder="dê um nome para seu projeto"
                        disabled={!!activeCycle}
                        {...register("task")}/*param -> nome do input */
                    />
                    <datalist id="task-sugestions">
                        <option value="projeto 1" />
                        <option value="projeto 2" />
                        <option value="projeto 3" />
                    </datalist>
                    <label htmlFor="minutesAmount">
                        durante
                    </label>
                    <MinutesAmountInput
                        step={5}
                        id="minutesAmount"
                        type="number"
                        placeholder="00"
                        min={1}
                        max={60}
                        disabled={!!activeCycle}
                        {...register("minutesAmount", {valueAsNumber: true})}
                    />
                    <span>
                        minutos
                    </span>
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>
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