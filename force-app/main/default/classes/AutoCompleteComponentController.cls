public class AutoCompleteComponentController {
	
    public String searchTerm {get;set;}
    
    @RemoteAction
    public static list<AccountWrapper> getSearchSuggestions(String searchString){
        List<AccountWrapper> accountWrappers = new list<AccountWrapper>();
        List<List<sObject>> searchObjects = [Find :searchString + '*' in all fields
                                            returning Account (Id, Name)];
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