import { LightningElement,track } from 'lwc';

export default class BmiCalculator extends LightningElement {
    cardTitle = 'BMI Calculator';
    @track bmi;
    weight;
    height;

    weightChangeHandler(event){
        this.weight = parseFloat(event.target.value);
    }
    heightChangeHandler(event){
        this.height = parseFloat(event.target.value);
    }
    calculateBMIHandler(){
        this.cardTitle = 'Changed value';
        console.log(this.cardTitle);
        try{
            this.bmi = this.weight/(this.weight*this.height);
        }catch(error){
            this.bmi = undefined;
        }                
    }
    get BMIValue(){
        if(this.bmi === undefined){
            return "";
        }
        return `Your bmi is ${this.bmi}`
    }
}