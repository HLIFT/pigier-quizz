import {Team} from "../models/Team";

export type TeamsContextType = {
    teams: Team[],
    setTeams: Function
}

export type TimerContextType = {
    timer: number,
    setTimer: Function,
    startTimer: Function,
    stopTimer: Function
}

export type ModalContextType = {
    visible: boolean,
    setVisible: Function,
}

export enum ActionType {
    BELL,
    CHECK,
    GEM,
    DICE
}
