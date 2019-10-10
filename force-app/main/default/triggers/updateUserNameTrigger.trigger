trigger updateUserNameTrigger on Account (before update) {
    if(Trigger.isBefore){
        if(Trigger.isUpdate){
            updateUserNameTrigger.updateOldOwnerName(Trigger.New, Trigger.oldmap);                   
        }
    }
}