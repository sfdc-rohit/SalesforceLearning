public class Custom_Lookup_Controller {
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchKeyWord, String ObjectName) {
        system.debug('ObjectName-->' + ObjectName);
        String searchKey = searchKeyWord + '%';
        
        List < sObject > returnList = new List < sObject > ();
      
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5   
        String sQuery =  'select id, Name from ' +ObjectName + ' where Name LIKE: searchKey order by createdDate DESC limit 5';
        List < sObject > lstOfRecords = Database.query(sQuery);
        
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }
    @AuraEnabled
    public static void saveNewAccountObject(Account accountObj){
        System.debug('$$ '+ accountObj);
        if(accountObj != null){
            insert accountObj;
        }
    }
    
    @AuraEnabled
    public static List<Contact> findContacts (Account accountObj){
       System.debug('%% '+ accountObj);
        return [SELECT firstname, lastname, email, phone FROM CONTACT WHERE accountid =: accountObj.Id];
        
    }
}