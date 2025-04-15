export type Platform = "PC" | "PLAYSTATION" | "XBOX";

export interface IRawTournament {
  tournamentName: string;
  tournamentHostName: string;
  tournamentRegion?: string | null;
  tournamentDate: string;
  tournamentStartTime?: string | null;
  tournamentLink: string;
  platform: Platform;
  prizePool?: string | null;
  assignedBadge?: string;
  notes?: string | null;
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
  tournamentStartTime?: string | null;
  tournamentLink: string;
  platform: Platform;
  prizePool?: string | null;
  assignedBadge?: string;
  notes?: string | null;
}
