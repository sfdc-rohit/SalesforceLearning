public class AccountWithTopOpportunityTriggerHandler {
    public static void updateAccountWithTopOpportunity(Set<String> accountIdsSet){
        List<Account> accountList = new List<Account>();
        for(Account obj: [Select topOpportunity__c, (Select id from Opportunities order by Amount DESC LIMIT 1) From Account WHERE Id IN :accountIdsSet]){
            Account acc = new Account(Id = obj.Id);
            if(!obj.Opportunities.isEmpty()){
                acc.topOpportunity__c = obj.Opportunities[0].Id;
            }else{
                acc.topOpportunity__c = Null;
            }
            accountList.add(acc);    
        }
        if(accountList.size() > 0 ){
            try{
                update accountList;
            }catch(Exception ex){
                System.debug('ERROR: '+ex.getMessage());
            }
        }
    }
}