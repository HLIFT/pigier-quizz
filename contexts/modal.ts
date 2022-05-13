import {createContext} from "react";
import {ModalContextType, TimerContextType} from "../services/types";

export const ModalContext = createContext<ModalContextType>({
    visible: false,
    setVisible: () => {},
})
