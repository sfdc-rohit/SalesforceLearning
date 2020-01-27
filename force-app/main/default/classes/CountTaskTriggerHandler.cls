public class CountTaskTriggerHandler {
    public static void countTasks(List<Task> tasks){
        Set<Id> accountIdSet = new Set<Id>();
        
        for(Task task :tasks){
            if(task.WhatId != null){
                accountIdSet.add(task.WhatId);
            }
        }
        if(accountIdSet.size() > 0){
            commonMethod(accountIdSet);
        }
    }
    public static void countTasks(List<Task> newTasks, Map<Id, Task> oldTasksMap){
        Set<Id> accountIdSet = new Set<Id>();
        
        for(Task task: newTasks){
            if(oldTasksMap.get(task.Id).WhatId != task.WhatId){
                accountIdSet.add(oldTasksMap.get(task.Id).WhatId);
            }
            accountIdSet.add(task.WhatId);
        }
        if(accountIdSet.size() > 0){
            commonMethod(accountIdSet);
        }
    }
    private static void commonMethod(Set<Id> accountIdSet){
        // one way to do it
     /* Map<Id, List<Task>> openTasksMap = new Map<Id, List<Task>>();
        Map<Id, List<Task>> closedTasksMap = new Map<Id, List<Task>>();
        
        List<Account> accountList = new List<Account>();
        
        for(Task task : [SELECT id, WhatId, Status FROM Task WHERE WhatId IN : accountIdSet]){
            if(task.Status == 'Not Started'){
                if(openTasksMap.containsKey(task.WhatId)){
                    List<Task> localTaskList = openTasksMap.get(task.WhatId);
                    localTaskList.add(task);
                    openTasksMap.put(task.WhatId, localTaskList);
                }else {
                    openTasksMap.put(task.WhatId, new List<Task>{task});
                }
            }else if(task.Status == 'Completed'){
                if(closedTasksMap.containsKey(task.WhatId)){
                    List<Task> localTaskList = closedTasksMap.get(task.WhatId);
                    localTaskList.add(task);
                    closedTasksMap.put(task.WhatId, localTaskList);
                }else {
                    closedTasksMap.put(task.WhatId, new List<Task>{task});
                }
            }
        }
        for(Account account: [SELECT Id, Numbe_of_Open_Tasks__c, Number_of_Closed_Tasks__c FROM Account WHERE Id IN: accountIdSet]){
            if(openTasksMap.containsKey(account.Id)){
                account.Numbe_of_Open_Tasks__c = String.valueOf(openTasksMap.get(account.Id).size());
            }else {
                account.Numbe_of_Open_Tasks__c = '0';
            }
            if(closedTasksMap.containsKey(account.Id)){
                account.Number_of_Closed_Tasks__c = String.valueOf(closedTasksMap.get(account.Id).size());
            }else {
                account.Number_of_Closed_Tasks__c = '0';
            }
            accountList.add(account);
        }
        if(accountList.size() > 0){
            update accountList;
        }*/
        
        Map<String, String> openTasksMap = new Map<String, String>();
        Map<String, String> closedTasksMap = new Map<String, String>();
        List<Account> accountList = new List<Account>();
        
        for(AggregateResult aggRes: [SELECT WhatId, count(id) totalTask FROM Task WHERE Status = 'Not Started' GROUP BY WhatId]){
            openTasksMap.put(String.valueOf(aggRes.get('WhatId')), String.valueOf(aggRes.get('totalTask')));
        }
        
        for(AggregateResult aggRes: [SELECT WhatId, count(id) totalTasks FROM Task WHERE Status = 'Completed' GROUP BY WhatId]){
            closedTasksMap.put(String.valueOf(aggRes.get('WhatId')), String.valueOf(aggRes.get('totalTasks')));
        }
        
        for(Account account: [SELECT Id, Numbe_of_Open_Tasks__c, Number_of_Closed_Tasks__c FROM Account WHERE Id IN: accountIdSet]){
            if(openTasksMap.containsKey(account.Id)){
                account.Numbe_of_Open_Tasks__c = String.valueOf(openTasksMap.get(account.Id));
            }else {
                account.Numbe_of_Open_Tasks__c = '0';
            }
            if(closedTasksMap.containsKey(account.Id)){
                account.Number_of_Closed_Tasks__c = String.valueOf(closedTasksMap.get(account.Id));
            }else {
                account.Number_of_Closed_Tasks__c = '0';
            }
            accountList.add(account);
        }
        
        if(accountList.size() > 0){
            update accountList;
        }
    }
}