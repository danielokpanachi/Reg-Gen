// src/store.js
import { reactive } from 'vue';

export const store = reactive({
  testOrganizations: [
    { name: 'Test Org 1', referenceNumber: '', date: '', subject: '', recipientTitle: '', senderDepartment: '' },
    { name: 'Test Org 2', referenceNumber: '', date: '', subject: '', recipientTitle: '', senderDepartment: '' },
    { name: 'Test Org 3', referenceNumber: '', date: '', subject: '', recipientTitle: '', senderDepartment: '' },
    { name: 'Test Org 4', referenceNumber: '', date: '', subject: '', recipientTitle: '', senderDepartment: '' },
    { name: 'Test Org 5', referenceNumber: '', date: '', subject: '', recipientTitle: '', senderDepartment: '' },
    { name: 'Test Org 6', referenceNumber: '', date: '', subject: '', recipientTitle: '', senderDepartment: '' }
  ]
});
