trigger TotaFamilyMemberTrigger on Contact (after insert, after update,after delete) {
    if(trigger.isInsert){
        TotalFamilyMemberTriggerHandler.calculateFamilyMember(Trigger.New);
    }
    if(trigger.isDelete){
        TotalFamilyMemberTriggerHandler.calculateFamilyMember(Trigger.old);
    }
    if(Trigger.isUpdate){
        if(TotalFamilyMemberTriggerHandler.isFirstTime){
            TotalFamilyMemberTriggerHandler.isFirstTime = false;
            TotalFamilyMemberTriggerHandler.calculateFamilyMemberwhileUpdate(Trigger.New, Trigger.OldMap);
        }
        
    }
	
}