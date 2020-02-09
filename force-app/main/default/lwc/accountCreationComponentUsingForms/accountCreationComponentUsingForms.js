import { LightningElement, track } from 'lwc';

export default class AccountCreationComponentUsingForms extends LightningElement {
    @track recordId;

    succesHandler(event){
        this.recordId = event.detail.id;
    }
}