import { useContext } from "react";
import { Cycle, CyclesContext } from "../../contexts/CyclesContexts";
import { HistoryConatiner, HistoryList, Status } from "./styles";

export function History(){

    const {cycles} = useContext(CyclesContext);
    return(
        <HistoryConatiner>
            <h1>Meu Histórico</h1>
            <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre>
            <HistoryList>
                <table>
                    <thead>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            cycles.map((cycle: Cycle) => {
                                return(
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{cycle.startDate.toISOString()}</td>
                                        <td>
                                            {
                                                cycle.finishedDate && <Status statusColor="green">Concluído</Status>
                                            }
                                            {
                                                cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>
                                            }
                                            {
                                                (!cycle.finishedDate && !cycle.interruptedDate) && <Status statusColor="yellow">Em andamento</Status>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryConatiner>
    )
}