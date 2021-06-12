/* 
BMI Categories: 
Underweight = <18.5
Normal weight = 18.5–24.9 
Overweight = 25–29.9 
Obesity = BMI of 30 or greater
*/
const bmis = ['underweight', 'Normal (healthy weight)', 'overweight', 'obesity'];

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / Math.pow(height / 100, 2);
    if(bmi < 18.5){
        return bmis[0];
    }
    if(bmi < 25){
        return bmis[1];
    }
    if(bmi < 30){
        return bmis[2];
    }
    else{
        return bmis[3];
    }
};
export const parseAndGetBmi = (arg1: any, arg2: any) => {
    if(!arg1 || !arg2) {
        throw "Height and weight must both be provided";
    }
    const heightToNumber = parseFloat(arg1);
    const weightToNumber = parseFloat(arg2);

    if (Number.isNaN(heightToNumber) || Number.isNaN(weightToNumber)) {
        throw "Both height and weight must be numbers";
    }
    return calculateBmi(heightToNumber, weightToNumber);

};

if (process.argv.length > 2) {
    console.log(parseAndGetBmi(process.argv[2], process.argv[3]));
} else {
    console.log(calculateBmi(180, 74));
}