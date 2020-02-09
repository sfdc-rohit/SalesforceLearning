import { LightningElement, track } from 'lwc';

export default class MeetingRooms extends LightningElement {
    @track selectedMeetingRoom;

    meetingRoomsInfo = [
        {roomName:'A-01', roomCapacity:'12'},
        {roomName:'B-01', roomCapacity:'11'},
        {roomName:'C-01', roomCapacity:'10'}
    ];
    onTileSelectHandler(event){
        console.log('panrent' +event.detail)
        const meetingRoomInfo = event.detail;
        this.selectedMeetingRoom = meetingRoomInfo.roomName;
    }
    constructor(){
        super();
        this.template.addEventListener('tileclick', this.onTileSelectHandler.bind(this));
    }
}