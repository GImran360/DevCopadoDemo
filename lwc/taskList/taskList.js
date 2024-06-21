/*
import { LightningElement, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';
import updateTask from '@salesforce/apex/TaskController.updateTask';
import deleteTask from '@salesforce/apex/TaskController.deleteTask';

import { updateRecord, deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Description', fieldName: 'Description__c', type: 'text', editable: true },
    { label: 'Time Tracker', fieldName: 'Time_Tracker__c', type: 'number', editable: true },
    {
        type: 'button-icon',
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete',
            title: 'Delete'
        } 
    }
];

export default class TaskList extends LightningElement {
    @track tasks;
    @track columns = COLUMNS;
    @track draftValues = [];
    @track showViewMore = false;
    searchKey = '';
    visibleTaskLimit = 4;

    @wire(getTasks, { searchKey: '$searchKey', limit: '$visibleTaskLimit' })
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data;
            this.showViewMore = data.length === this.visibleTaskLimit;
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleSearch(event) {
        this.searchKey = event.target.value;
    }

    handleSave(event) {
        const fields = event.detail.draftValues[0];
        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.showToast('Success', 'Task updated', 'success');
                this.draftValues = [];
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            deleteRecord(row.Id)
                .then(() => {
                    this.showToast('Success', 'Task deleted', 'success');
                })
                .catch(error => {
                    this.showToast('Error', error.body.message, 'error');
                });
        }
    }

    handleViewMore() {
        window.open('/lightning/o/Task/home', '_blank');
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}
*/ 

/*
import { LightningElement, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';
import updateTask from '@salesforce/apex/TaskController.updateTask';
import deleteTask from '@salesforce/apex/TaskController.deleteTask';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Description', fieldName: 'Description__c', type: 'text', editable: true },
    { label: 'Time Tracker', fieldName: 'Time_Tracker__c', type: 'number', editable: true },
    {
        type: 'button-icon',
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete',
            title: 'Delete'
        } 
    }
];

export default class TaskList extends LightningElement {
    @track tasks;
    @track columns = COLUMNS;
    @track draftValues = [];
    @track showViewMore = false;
    searchKey = '';
    visibleTaskLimit = 4;

    @wire(getTasks, { searchKey: '$searchKey', limit: '$visibleTaskLimit' })
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data;
            this.showViewMore = data.length === this.visibleTaskLimit;
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleSearch(event) {
        this.searchKey = event.target.value;
    }

    handleSave(event) {
        const fields = event.detail.draftValues[0];
        updateTask({ updatedTask: fields })
            .then(() => {
                this.showToast('Success', 'Task updated', 'success');
                this.draftValues = [];
                return refreshApex(this.wiredTasks);
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            deleteTask({ taskId: row.Id })
                .then(() => {
                    this.showToast('Success', 'Task deleted', 'success');
                    return refreshApex(this.wiredTasks);
                })
                .catch(error => {
                    this.showToast('Error', error.body.message, 'error');
                });
        }
    }

    handleViewMore() {
        window.open('/lightning/o/Task/home', '_blank');
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }please follow 
}
*/
import { LightningElement, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';
import updateTask from '@salesforce/apex/TaskController.updateTask';
import deleteTask from '@salesforce/apex/TaskController.deleteTask';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    { label: 'Description', fieldName: 'Description__c', type: 'text', editable: true },
    { label: 'Time Tracker', fieldName: 'Time_Tracker__c', type: 'number', editable: true },
    {
        type: 'button-icon',
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete',
            title: 'Delete'
        } 
    }
];

export default class TaskList extends LightningElement {
    @track tasks;
    @track columns = COLUMNS;
    @track draftValues = [];
    @track showViewMore = false;
    @track getTasks;
    @track filteredTask=[];

    searchKey = '';
    visibleTaskLimit = 4;
    wiredTasksResult;

    @wire(getTasks, { searchKey: '$searchKey', limit: '$visibleTaskLimit' })
    wiredTasks(result) {
        this.wiredTasksResult = result;
        const { error, data } = result;
        if (data) {
            this.tasks = data;
            this.showViewMore = data.length === this.visibleTaskLimit;
        } else if (error) {
            this.showToast('Error', error.body ? error.body.message : error.message, 'error');
        }
    }

    handleSearch(event) {
       this.searchKey = event.target.value;

      /*  this.searchKey  = event.target.value.toLowerCase();
        if (searchKey) {
            this.filteredTasks = this.tasks.filter(task => 
                task.Subject.toLowerCase().includes(searchKey) ||
                (task.Description && task.Description.toLowerCase().includes(searchKey))
            );
            this.tasks=this.filteredTask;
        } else {
            this.filteredTasks = this.tasks;
        }*/
    }

    handleSave(event) {
        const fields = event.detail.draftValues[0];
        updateTask({ updatedTask: fields })
            .then(() => {
                this.showToast('Success', 'Task updated', 'success');
                this.draftValues = [];
                return refreshApex(this.wiredTasksResult);
            })
            .catch(error => {
                this.showToast('Error', error.body ? error.body.message : error.message, 'error');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            deleteTask({ taskId: row.Id })
                .then(() => {
                    this.showToast('Success', 'Task deleted', 'success');
                    return refreshApex(this.wiredTasksResult);
                })
                .catch(error => {
                    this.showToast('Error', error.body ? error.body.message : error.message, 'error');
                });
        }
    }


connectedCallback() {
        this.loadTasks();
    }

    loadTasks() {
        getTasks()
            .then(result => {
                this.tasks = result;
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    handleViewMore() {
        this.loadTasks();
    }
/*
    handleViewMore() {
        //window.open('/lightning/o/Task/home', '_blank');

    }
*/
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}