interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average === 0) {
        rating = 1;
        ratingDescription = 'You did not train at all';
    } else if (average < target) {
        rating = 2;
        ratingDescription = 'You could do better';
    } else {
        rating = 3;
        ratingDescription = 'You are doing great!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}

if (require.main === module) {
    const args = process.argv.slice(2).map(Number);
  
    if (args.length < 2 || args.some(isNaN)) {
      console.error('Usage: npm run calculateExercises <target> <day1> <day2> ...');
      process.exit(1);
    }
  
    const [target, ...dailyHours] = args;
  
    try {
      const result = calculateExercises(dailyHours, target);
      console.log(result);
    } catch (error: unknown) {
      console.error('Something went wrong:', error);
    }
  }