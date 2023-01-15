const calculateBmi1 = (height: number, weight: number): string => {
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

console.log(calculateBmi1(180, 74));
