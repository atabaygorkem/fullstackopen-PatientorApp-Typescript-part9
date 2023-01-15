interface exerciseRating {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises1 = (
  exerciseHours: Array<number>,
  target: number
): exerciseRating => {
  const average =
    exerciseHours.reduce((initial, h) => initial + h, 0) / exerciseHours.length;
  const fixedAverage = Math.ceil(average * 10) / 10;
  console.log(fixedAverage);

  const rating =
    fixedAverage < target
      ? 1
      : fixedAverage >= target && fixedAverage < target + target / 4
      ? 2
      : 3;
  const ratingDescription =
    rating === 1
      ? "Too bad"
      : rating === 2
      ? "Not too bad but could be better"
      : "Excellent";
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((h) => h !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const inputArr1 = [3, 0, 2, 4.5, 0, 3, 1];
console.log(calculateExercises1(inputArr1, 2));
