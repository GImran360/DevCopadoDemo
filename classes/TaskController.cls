/*
public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [SELECT Id, Description__c, Time_Tracker__c FROM Task LIMIT 50];
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        Task taskToDelete = [SELECT Id FROM Task WHERE Id = :taskId LIMIT 1];
        delete taskToDelete;
    }

    @AuraEnabled
    public static void updateTask(Task updatedTask) {
        update updatedTask;
    }
} */

public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [SELECT Id, Description__c, Time_Tracker__c FROM Task];
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        Task taskToDelete = [SELECT Id FROM Task WHERE Id = :taskId LIMIT 1];
        delete taskToDelete;
    }

    @AuraEnabled
    public static void updateTask(Task updatedTask) {
        update updatedTask;
    }
    public static List<SObject> searchRecords(String searchKey) {
        String searchQuery = '%' + searchKey + '%';
        return [
           SELECT Id, Description__c, Time_Tracker__c FROM Task
            WHERE Description__c LIKE :searchQuery
        ];
    }
}