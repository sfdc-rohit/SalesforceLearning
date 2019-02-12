public class TotalFamilyMemberTriggerHandler {
    public static boolean isFirstTime = true;
    
    public static void calculateFamilyMember(List<Contact> conList){
        Set<String> accountIdsSet = new Set<String>();
        for(Contact con : conList){
            accountIdsSet.add(con.accountId);
        }
        countFamilyMember(accountIdsSet);
    }
    
    public static void calculateFamilyMemberwhileUpdate(List<Contact> contList, Map<Id,Contact> contactMap){
        Set<String> accountIdsSet = new Set<String>();
        System.debug('1 '+contList[0].accountId);
        System.debug('2 '+contactMap);
        for(Contact con :contList){
            if(con.AccountId != contactMap.get(con.Id).accountId){
                accountIdsSet.add(contactMap.get(con.Id).accountId);
            }
            accountIdsSet.add(con.AccountId);
        }
        countFamilyMember(accountIdsSet);
    }
   
    public static void countFamilyMember(Set<String> accountIdsSet){
        Map<String,Contact> contactMap = new Map<String, Contact>();
        List<Contact> conList = new List<Contact>();
        AggregateResult[] results = [Select count(id) c, accountId From Contact where accountId IN :accountIdsSet GROUP  BY accountId ];
        for(AggregateResult aggRes : results){
            contactMap.put(String.valueOf(aggRes.get('accountId')), 
                           new Contact(Id = aggRes.Id, total_family_members__c = (Decimal)aggRes.get('c')));
        }
       System.debug('map '+contactMap);
        for(Contact con: [Select total_family_members__c, accountId from Contact where accountId In :accountIdsSet]){
            con.total_family_members__c = contactMap.get(con.accountId).total_family_members__c;
            conList.add(con);
        }
        system.debug('% '+conList);
        if(conList.size() > 0){
            update conList;
        }
    }
}