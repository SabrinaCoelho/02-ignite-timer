import { useForm } from "react-hook-form";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface CountdownProps{
    activeCycle: any;
}

export function NewCycleForm({{activeCycle}: CountdownProps}){
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

    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: "",
            minutesAmount: 0,

        }
    });

    return(
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
    )
}