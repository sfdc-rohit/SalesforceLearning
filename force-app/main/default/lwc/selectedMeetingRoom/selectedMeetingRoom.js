/*import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class SelectedMeetingRoom extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    @track selectedMeetingRoom = {};
    connectedCallback(){
        registerListener('pubsubtileclick', this.onMeetingSelectHandler, this.selectedMeetingRoom);
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    onMeetingSelectHandler(payload){
        this.selectedMeetingRoom = payload;
    }
}*/
import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class SelectedMeetingRoom extends LightningElement {
    @wire(CurrentPageReference) pageReference;

    @track selectedMeetingRoom = {};
    connectedCallback(){
        if(!this.pageReference){
            registerListener('pubsubtileclick', this.onMeetingSelectHandler, this.selectedMeetingRoom);
            console.log('inside');
        }
        console.log('out');
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    onMeetingSelectHandler(payload){
        this.selectedMeetingRoom = payload;
    }
}