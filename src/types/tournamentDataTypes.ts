export interface ITournamentData {
  [key: string]: ITournament;
}

export interface ITournament {
  tournamentName: string;
  tournamentHostName: string;
  tournamentDate: Date;
  tournamentStartTime?: string;
  tournamentRegion?: string;
  tournamentLink: string;
  platform: "PC" | "PLAYSTATION" | "XBOX";
  prizePool?: string;
  assignedBadge: string;
  notes?: string;
}
