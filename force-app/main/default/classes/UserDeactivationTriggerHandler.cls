public class UserDeactivationTriggerHandler {
    @future
    public static void deactivateUser(Set<String> usersIdsSet){
        List<User> usersList = new List<User>();
        for(User u : [SELECT IsActive FROM User where Id IN : usersIdsSet]){
            If(u.IsActive != false){
                u.IsActive = false;                
            }
            usersList.add(u);
        }
        if(usersList.size() > 0){
            update usersList;
        }
    }
}