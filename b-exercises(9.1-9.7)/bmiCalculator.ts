export const calculateBmi = (height: number, weight: number): string => {
  if (weight === 0 || height === 0)
    throw new Error("Weight or height cannot be 0!");
  if (height.toString().includes("."))
    throw new Error("Please enter your height as centimeters and decimals!");

  const bmi = weight / (height / 100) ** 2;
  const roundedBmi = Math.round(bmi * 10) / 10;
  console.log(roundedBmi);

  if (roundedBmi < 16) {
    return "Underweight (Severe)";
  } else if (roundedBmi >= 16 && roundedBmi <= 16.9) {
    return "Underweight (Moderate)";
  } else if (roundedBmi >= 17 && roundedBmi <= 18.4) {
    return "Underweight (Mild)";
  } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
    return "Normal (Healthy)";
  } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (roundedBmi >= 30 && roundedBmi <= 34.9) {
    return "Obese (Class I)";
  } else if (roundedBmi >= 35 && roundedBmi <= 39.9) {
    return "Obese (Class II)";
  } else if (roundedBmi >= 40) {
    return "Obese (Class III)";
  } else return "undefined";
};

interface heightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): heightWeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(+args[2]) || isNaN(+args[3]))
    throw new Error("Values are not numbers!");

  return {
    height: +args[2],
    weight: +args[3],
  };
};

// console.log(calculateBmi(height, weight));
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
