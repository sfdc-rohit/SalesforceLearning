trigger CountTaskTrigger on Task (after insert, after update, after delete) {
    if(trigger.isInsert){
        CountTaskTriggerHandler.countTasks(Trigger.New);
    }
    if(trigger.isUpdate){
        CountTaskTriggerHandler.countTasks(Trigger.New, Trigger.oldMap);
    }
    if(trigger.isDelete){
        CountTaskTriggerHandler.countTasks(Trigger.old);
    }
}