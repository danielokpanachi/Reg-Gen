<template>
  <div class="container">
    <div>
      <h2>Test Organizations</h2>
      <table>
        <thead>
          <tr>
            <th>Name Of Organization</th>
            <th>Reference Number</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Recipient Title</th>
            <th>Sender Department</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="org in store.testOrganizations" :key="org.name">
            <td>{{ org.name }}</td>
            <td>{{ org.referenceNumber }}</td>
            <td>{{ org.date }}</td>
            <td>{{ org.subject }}</td>
            <td>{{ org.recipientTitle }}</td>
            <td>{{ org.senderDepartment }}</td>
            <td>
              <button @click="viewOrganization(org)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import { store } from '@/store';

export default {
  name: 'TestOrganizations',
  setup() {
    return { store };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'ReferenceGenerator' });
    },
    viewOrganization(org) {
      // Navigate to the ViewOrganization route with the orgName as a route parameter
      this.$router.push({ name: 'ViewOrganization', params: { orgName: org.name } });
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('@/assets/bg-pic.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  padding: 5px 10px;
  background: purple;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
