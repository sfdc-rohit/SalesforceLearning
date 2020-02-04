import { LightningElement, track } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    @track currentResult;
    @track previousResults = [];
    @track showPreviousResult = false;

    firstNumber;
    secondNumber;

    numberHandler(event){
        if(event.target.name === 'firstNumber'){
            this.firstNumber = event.target.value;
        }else if(event.target.name = 'secondNumber'){
            this.secondNumber = event.target.value;
        }
    }

    addHandler(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        this.currentResult = `Result of ${firstN}+${secondN} is ${firstN + secondN}`;
        this.previousResults.push( this.currentResult);
    }
    subHandler(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        this.currentResult = `Result of ${firstN}-${secondN} is ${firstN - secondN}`;
        this.previousResults.push( this.currentResult);
    }
    multiplyHandler(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        this.currentResult = `Result of ${firstN}x${secondN} is ${firstN * secondN}`;
        this.previousResults.push( this.currentResult);
    }
    divideHandler(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        this.currentResult = `Result of ${firstN}/${secondN} is ${firstN / secondN}`;
        this.previousResults.push( this.currentResult);
    }
    showPreviousResultToggle(event){
        console.log(event.target.checked)
        this.showPreviousResult = event.target.checked;
    }
}