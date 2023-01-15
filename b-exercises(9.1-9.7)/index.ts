import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  if (_req.query.weight && _req.query.height) {
    const weight = +_req.query.weight;
    const height = +_req.query.height;
    const bmi = calculateBmi(height, weight);

    const resObject = {
      weight,
      height,
      bmi,
    };
    res.json(resObject);
  } else {
    res.json({ error: "Malformatted parameters." });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // if (isNaN(Number(target))) {
  //   res.status(400).send({ error: "..." });
  // }
  if (!daily_exercises || !target) {
    throw new Error("parameters missing");
  } else if (
    isNaN(+target) ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((n: number) => !isNaN(+n))
  ) {
    throw new Error("malformatted parameters");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const obj = calculateExercises(daily_exercises, +target);
  // console.log(obj);
  res.json(obj);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
