import { LightningElement, api, wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class MeetingRoom extends LightningElement {
    @api meetingRoomInfo;
    @api showRoomInfo = false;

    @wire(CurrentPageReference) pageReference;

    tileClickHandler(){
        console.log('cheiled')
        const tileClicked = new CustomEvent('tileclick', {detail: this.meetingRoomInfo, bubbles :true});
        this.dispatchEvent(tileClicked);
        console.log('eee')
        // FIRE event through Application Event
        fireEvent(this.pageReference, 'pubsubtileclick', this.meetingRoomInfo);
        console.log('after fireEvent')
    }
}