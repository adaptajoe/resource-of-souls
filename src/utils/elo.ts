// utils/elo.ts
export const calculateElo = (ratingA: number, ratingB: number, winner: "A" | "B", kFactor: number = 32) => {
  const expectedScoreA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedScoreB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  const scoreA = winner === "A" ? 1 : 0;
  const scoreB = winner === "B" ? 1 : 0;

  const newRatingA = ratingA + kFactor * (scoreA - expectedScoreA);
  const newRatingB = ratingB + kFactor * (scoreB - expectedScoreB);

  return {
    newRatingA: Math.round(newRatingA),
    newRatingB: Math.round(newRatingB),
  };
};
