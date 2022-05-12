import {Team} from "../models/Team";

export type TeamsContextType = {
    teams: Team[],
    setTeams: Function
}
