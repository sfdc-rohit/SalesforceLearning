public class AccountRelatedContacts {
    public List<AccountRelatedContactsWrapper> accountContactList {get;set;}
    public String searchkeyword {get;set;}
    public String str{get;set;}
    
    public String searchTerm {get;set;}
    
    public AccountRelatedContacts(){
        accountContactList = new List<AccountRelatedContactsWrapper>();
    }
    public void searchAccountContacts(){
        String query = 'Select Name, (Select firstname, lastname,accountID, Email, Phone from Contacts) From Account where  id = \''+searchkeyword +'\'';
        system.debug('@@ '+query);
        accountContactList.clear();
        for(Account accObj : Database.query(query)){
            accountContactList.add(new AccountRelatedContactsWrapper(accObj, accObj.Contacts));                 
        }
        System.debug('hi '+ accountContactList);  
    }
    public class AccountRelatedContactsWrapper {
        public Account acc {get;set;}
        public List<Contact> conList {get;set;}
        public AccountRelatedContactsWrapper(Account acc, List<Contact> conList){
            this.acc = acc;
            this.conList = conList;
        }
    }
    
    @RemoteAction
    public static list<AccountWrapper> getSearchSuggestions(String searchString){
        List<AccountWrapper> accountWrappers = new list<AccountWrapper>();
        List<List<sObject>> searchObjects = [Find :searchString + '*' in all fields
                                            returning Account (Id, Name)];
        System.debug('## '+searchObjects);
        if(!searchObjects.isEmpty()){
            for(List<sObject> objects : searchObjects){
                for(sObject obj: objects){
                    if(obj.getsobjecttype().getdescribe().getName().equals('Account')){
                        Account acct = (Account)obj;
                        accountWrappers.add(new AccountWrapper(acct.name,acct.Id));
                    }
                }
            }
        }
        return accountWrappers;
    }
    
    public class AccountWrapper {
        public String label {get;set;}
        public String value {get;set;}
        public AccountWrapper (String label,String value){
            this.label = label;
            this.value = value;
        }
    }
}