public class LightningPaginationController {

    @AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> accList = [SELECT Id, Name, Phone, Rating
               FROM Account ORDER BY CreatedDate LIMIT 2000];
        return accList;
    }
}