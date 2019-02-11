trigger UserDeactivationTrigger on UserDeactivation__c (after insert) {
    if(Trigger.isInsert){
        Set<String> usersIdsSet = new Set<String>();
        for(UserDeactivation__c u : Trigger.New){
            usersIdsSet.add(u.UserToDeactivate__c);
        }
        UserDeactivationTriggerHandler.deactivateUser(usersIdsSet);
    }
}