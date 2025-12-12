function calculateBmi(heightCm: number, weightKg: number): string {
    const heightInMeters = heightCm / 100;
    const bmi = weightKg / (heightInMeters * heightInMeters);
  
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 25) {
      return 'Normal range';
    } else if (bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
  
  export default calculateBmi;
  
  if (require.main === module) {
    const [, , heightArg, weightArg] = process.argv;
  
    if (!heightArg || !weightArg) {
      console.error('Please provide both height and weight.');
      process.exit(1);
    }
  
    const height = Number(heightArg);
    const weight = Number(weightArg);
  
    if (isNaN(height) || isNaN(weight)) {
      console.error('Provided values must be numbers.');
      process.exit(1);
    }
  
    console.log(calculateBmi(height, weight));
  }