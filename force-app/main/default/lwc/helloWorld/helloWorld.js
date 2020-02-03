import { LightningElement,track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track greeting = 'World';
    greetingChangeHandler(event){
        this.greeting = event.target.value;
        console.log('@ '+event.target.value);
    }
}