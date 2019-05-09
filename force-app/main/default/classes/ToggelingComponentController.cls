public class ToggelingComponentController {
	@AuraEnabled
    public static List<Case> getCases(){
        return [SELECT Id, Subject FROM CASE LIMIT 20];
    }
}