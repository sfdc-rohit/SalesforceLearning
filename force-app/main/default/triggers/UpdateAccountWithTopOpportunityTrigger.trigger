trigger UpdateAccountWithTopOpportunityTrigger on Opportunity (after insert, after update) {
    if(Trigger.isAfter){
        Set<String> accountIdsSet = new Set<String>();
        if(Trigger.isInsert || Trigger.isUpdate){
            for(Opportunity opp: Trigger.New){
                if(opp.AccountId != Null && opp.Amount != Null && opp.StageName == 'Closed Won'){
                    accountIdsSet.add(opp.AccountId);
                }
                else if(Trigger.isUpdate){
                    if(opp.AccountId != Null && opp.Amount != Null && opp.StageName == 'Closed Won' && (opp.StageName != Trigger.oldMap.get(opp.Id).StageName || opp.Amount != Trigger.oldMap.get(opp.Id).Amount )){
                        if(Trigger.oldmap.get(opp.Id).AccountId != opp.AccountId){
                            accountIdsSet.add(Trigger.oldMap.get(opp.Id).AccountId);
                        }
                        accountIdsSet.add(opp.AccountId);
                    }
                }
            }
            AccountWithTopOpportunityTriggerHandler.updateAccountWithTopOpportunity(accountIdsSet);
        }
    }

}