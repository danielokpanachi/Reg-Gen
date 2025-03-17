<template>
  <div class="view-container">
    <h2>View Organization</h2>
    <table v-if="organization">
      <thead>
        <tr>
          <th>Name of Organization</th>
          <th>Date</th>
          <th>Reference Number</th>
          <th>Subject</th>
          <th>RecipientTitle</th>
          <th>RecipientName</th>
          <th>SenderDepartment</th>


        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ organization.name }}</td>
          <td>{{ organization.date }}</td>
          <td>{{ organization.referenceNumber }}</td>
          <td>{{ organization.subject}}</td>
          <td>{{ organization.recipientTitle}}</td>
          <td>{{ organization.recipientName}}</td>
          <td>{{ organization.senderDepartment}}</td>



        </tr>
      </tbody>
    </table>
    <p v-else>Organization not found.</p>
    <button @click= "goBack" >Back</button>
    


  </div>
</template>

<script>
import { store } from '@/store';

export default {
  name: "ViewOrganization",
  computed: {
    orgName() {
      return this.$route.params.orgName;
    },
    orgDate() {
      return this.$route.params.orgDate;
    },
    orgReferenceNumber() {
      return this.$route.params.orgReferenceNumber;
    },
    orgSubject() {
      return this.$route.params.orgSubject;
    },
    orgRecipientTitle() {
      return this.$route.params.orgRecipientTitle;
    },

    orgRecipientName() {
      return this.$route.params.orgRecipientTitle;
    },

    orgSenderDepartment() {
      return this.$route.params.orgSenderDepartment;
    },
   

    organization() {
// Find the organization in the store by matching the name from the route params
return store.testOrganizations.find(
        (org) => org.name.toLowerCase() === this.$route.params.orgName.toLowerCase()
      )
    }

  },

  methods: {
  goBack() {
      this.$router.push({ name: 'TestOrganizations' });
    },
    viewOrganization(org) {
      // Navigate to the ViewOrganization route with the orgName in the URL
      this.$router.push({ name: 'ViewOrganization', params: { orgName: org.name } });
    }
  }
};

</script>

<style scoped>

.view-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-image: url('@/assets/Tree-pic.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 8px;
}

/*.translucent-panel {
background: rgba(255,255,255,0.6);
backdrop-filter: blur(10px);
border-radius:10px;
padding : 20px;
box-shadow:0 4px 8px  rgba(0,0,0,0.1) ;
transition: transform 0.3 ease;

}


.translucent-panel:hover{
transform: translateY(-100px);

}*/


.button {
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
  background-color: #ffffff;
}




</style> 