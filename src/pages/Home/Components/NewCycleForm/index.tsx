import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

/* interface CountdownProps{
    activeCycle: any;
} */


export function NewCycleForm(){
    const {activeCycle} = useContext(CyclesContext);
    const { register } = useFormContext();

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
                min={5}
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