import {createContext} from "react";
import {ModalContextType, QuestionsContextType, TimerContextType} from "../services/types";
import {listOfCultureQuestions, listOfQuestions} from "../services/questions";

export const QuestionsContext = createContext<QuestionsContextType>({
    questions: listOfQuestions,
    cultureQuestions: listOfCultureQuestions,
    setQuestions: () => {},
    setCultureQuestions: () => {}
})
