interface exerciseRating {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface inputs {
  exerciseHours: Array<number>;
  targetValue: number;
}

export const calculateExercises = (
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

const parseExerciseArguments = (args: Array<string>): inputs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  // if(args.length>4) throw new Error("Too many arguments")

  // if (isNaN(+args[2])) throw new Error("Values are not numbers!");
  for (let index = 2; index < args.length; index++) {
    if (isNaN(+args[index])) {
      throw new Error("Values are not numbers!");
    }
    
  }

  const exerciseHours: Array<number> = [];

  for (let index = 3; index < args.length; index++) {
    exerciseHours.push(+args[index]);
  }

  return {
    exerciseHours,
    targetValue: +args[2],
  };
};

try {
  const { exerciseHours, targetValue } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetValue));
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}

// let inputArr = [3,0,2,4.5,0,3,1];
