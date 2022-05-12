import {createContext} from "react";
import {TeamsContextType} from "../services/types";

export const TeamsContext = createContext<TeamsContextType>({
    teams: [],
    setTeams: () => {}
})
