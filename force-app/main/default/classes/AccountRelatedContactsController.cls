public class AccountRelatedContactsController {
   
    @AuraEnabled
    public static List<AccountContactWrapper> findAccountRelatedContacts(){
        List<AccountContactWrapper> accountContactWrapperList = new List<AccountContactWrapper>();
        for(Account acc : [Select Id, Name, (Select Id, lastname from Contacts) From Account]){
            accountContactWrapperList.add(new AccountContactWrapper (acc, acc.contacts));
        }
        return accountContactWrapperList;
    }
     public class AccountContactWrapper {
        @AuraEnabled public Account acc;
        @AuraEnabled public List<Contact> contactList;
        public AccountContactWrapper(Account acc, List<Contact> contactList){
            this.acc = acc;
            this.contactList = contactList;
        }
    }

}