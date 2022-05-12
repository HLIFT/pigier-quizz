import {createContext} from "react";
import {TimerContextType} from "../services/types";

export const TimerContext = createContext<TimerContextType>({
    timer: 3000,
    setTimer: () => {},
    startTimer: () => {},
})
