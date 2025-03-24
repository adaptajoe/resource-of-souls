export type Platform = "PC" | "PLAYSTATION" | "XBOX";

export interface IRawTournament {
  tournamentName: string;
  tournamentHostName: string;
  tournamentRegion?: string | null;
  tournamentDate: string;
  tournamentStartTime?: string;
  tournamentLink: string;
  platform: string;
  prizePool?: string | null;
  assignedBadge?: string;
  notes?: string;
}

// Tournament data structure
export interface ITournamentData {
  tournaments: IRawTournament[];
}

export interface ITournament {
  tournamentName: string;
  tournamentHostName: string;
  tournamentRegion?: string | null;
  tournamentDate: Date;
  tournamentStartTime?: string;
  tournamentLink: string;
  platform: Platform;
  prizePool?: string | null;
  assignedBadge?: string;
  notes?: string;
}
