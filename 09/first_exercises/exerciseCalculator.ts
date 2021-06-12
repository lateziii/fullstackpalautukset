/* 
the number of days
the number of training days
the original target value average????
the calculated average time
boolean value describing if the target was reached
a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
a text value explaining the rating
*/
interface Grade {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number; 
    ratingDescription: string;
    target: number;
    average: number;
}

const ratings = ['you can do better', 'not too bad but could be better', 'great'];

const getRate = (rate: number) => {
    if(rate===1) {
        return ratings[0];
    }
    if(rate===2) {
        return ratings[1];
    }
    if(rate===3) {
        return ratings[2];
    }
    else {
        throw "wrong value"
    }
};

const avgVsTarget = (avg:number, target: number) => {
    const diff = target-avg;
    if (diff < 0) {
        return 3;
    }
    if (diff < 1) {
        return 2;
    }
    else {
        return 1;
    }
};
const getSuccess = (rate: number): boolean => {
    if(rate===3) {
        return true
    } 
    return false
}

const calculateExercises = (exc: number[], target: number ) : Grade => {
    const periodLength= exc.length;
    const trainingDays = periodLength - exc.filter(value => value === 0).length;
    const average = exc.reduce((a, b) => a+b, 0)/periodLength;
    const rating = avgVsTarget(average, target);
    const ratingDescription = getRate(rating);
    const success = getSuccess(rating);
    return {
        periodLength, trainingDays, success, rating, 
        ratingDescription, target, average
    };
    
};
export const parseAndCalculateExercises = (arg1: any[], arg2: any) => {
    if(!arg1 || !arg2) {
        throw "parameters missing";
    }
    if(arg1.length === 0) {
        throw "malformatted parameters";
    }
    const exercises = arg1.map(v => parseFloat(v));
    const targetToNumber = parseFloat(arg2);

    if (Number.isNaN(targetToNumber)) {
        throw "malformatted parameters";
    }
    return calculateExercises(exercises, targetToNumber);

};

if (process.argv.length > 2) {
    const exercises = process.argv.slice(2, -1).map(v => parseFloat(v));
    console.log(exercises, "target: ", process.argv[process.argv.length -1] );
    console.log(parseAndCalculateExercises(exercises, process.argv[process.argv.length -1]));
} else {
    console.log(calculateExercises( [3, 0, 2, 4.5, 0, 3, 1], 2));
}