export interface IBadgeData {
  [key: string]: IBadge;
}

export interface IBadge {
  name: string;
  pcOwner?: string;
  psOwner?: string;
  xboxOwner?: string;
  pcLastChallenged?: Date;
  psLastChallenged?: Date;
  xboxLastChallenged?: Date;
}
