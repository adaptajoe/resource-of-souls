export interface IBadgeData {
  [key: string]: IBadge;
}

export interface IBadge {
  name: string;
  pcOwner?: string | null;
  psOwner?: string | null;
  xboxOwner?: string | null;
  pcLastChallenged?: Date | null;
  psLastChallenged?: Date | null;
  xboxLastChallenged?: Date | null;
}
