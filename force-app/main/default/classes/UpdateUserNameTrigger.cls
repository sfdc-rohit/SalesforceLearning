public class UpdateUserNameTrigger {
    public static void updateOldOwnerName(List<Account> newAccountList, Map<Id, Account> oldAccountMap){
        Set<Id> userIdsSet = new Set<Id>();
        Map<String, String> myMap = new Map<String, String>();
        
        for(Account obj: newAccountList){
            if(obj.ownerid != oldAccountMap.get(obj.Id).ownerId){
                userIdsSet.add(oldAccountMap.get(obj.Id).OwnerId);                   
            }
        }
        for(User obj: [SELECT id, Name From User WHERE Id In: userIdsSet]){
            myMap.put(obj.Id, obj.Name);
        }
        for(Account obj: newAccountList){
            if(obj.ownerid != oldAccountMap.get(obj.Id).ownerId){
                obj.Old_Owner_Name__c = myMap.get(oldAccountMap.get(obj.Id).ownerId);
            }
        } 
    }
}