<template>
  <div class = "container">
  <div>
   
    <h2 class="title">Reference Number Generator</h2>
    
    <div class="content">
      <!-- Left Sidebar -->
      <div class="left-sidebar">
        <h3>Add Organisation</h3>
        <div class="sidebar-search">
          <input v-model="sidebarSearch" type="text" placeholder=" Add organisation" class="sidebar-search-input" />
          <button @click="addOrganization" class="add-btn">Add</button>
          <button @click="deleteOrganization" class="delete-btn">Delete</button>
        </div>

        <div class="generator-container">
    <h2>Reference Number Generator</h2>
    <div class="input-group">
      <label>Name of Organization</label>
      <input v-model="orgName" type="text" placeholder="Enter organization name" />
    </div>
    <div class="input-group">
      <label>Reference Date</label>
      <input v-model="date" type="date" />
    </div>
    <button @click="generateReference" class="generate-btn">Generate Reference</button>
    <div v-if="referenceNumber" class="generated-result">
      <h4>Generated Reference</h4>
      <p>{{ RecipientTitle }}</p>
    </div>
    <button class = "vtest" @click="goToTestOrganizations">View Test Organizations</button>
  </div>





<!-- Add Popup Div -->
<div v-if="showAddPopup" class="add-popup">
          <div class="input-group">
            <label>Organisation Code</label>
            <input v-model="newOrgCode" type="text" placeholder="Enter organisation code" />
          </div>
          <div class="input-group">
            <label>Drop down 1</label>
            <select v-model="dropdown1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="input-group">
            <label>Drop down 2</label>
            <select v-model="dropdown2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="input-group">
            <label>Drop down 3</label>
            <select v-model="dropdown3">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <button @click="confirmAddPopup" class="confirm-btn">Confirm</button>
          <button @click="cancelAddPopup" class="cancel-btn">Cancel</button>
        </div>
        
    

        <div class="test-organizations">
          <h4>Test Organizations</h4>
          <div class="org-list">
            <ul>
              <li v-for="org in testOrganizations" :key="org">
                {{ org }}
                <button class="view-btn" @click="goToTestOrganizations">View</button>
              </li>
            </ul>
          </div>
        </div>
        <!-- Display Generated Reference if exists -->
        <div class="generated-result" v-if="referenceNumber">
          <h4>Generated Reference</h4>
          <p>{{ referenceNumber }}</p>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="main-content">
        <div class="form-container">
          <div class="form-box">
            <div class="input-group">
              <label>Name of Organisation</label>
              <input v-model="orgName" type="text" placeholder="Enter organization name" class="org-input" />
            </div>
            
            <div class="input-group">
              <label>Recipient Title</label>
              <input v-model="recipientTitle" type="text" placeholder="Enter recipient title" />
            </div>
            
            <div class="input-group">
              <label>Subject</label>
              <input v-model="subject" type="text" placeholder="Enter subject" />
            </div>
            
            <div class="input-group">
              <label>Recipient Name</label>
              <input v-model="recipientName" type="text" placeholder="Enter recipient name" />
            </div>
            
            <div class="input-group">
              <label>Sender Department</label>
              <select v-model="senderDepartment">
                <option>Company Secretariat/legal</option>
                <option>Corporate Services</option>
                <option>Corporate Services - IT</option>
                <option>Finance - Finance and Accounts</option>
                <option>Finance - Budget and Performance Mgt</option>
                <option>Finance - Treasury and Investments</option>
                <option>Human resources</option>
                <option>Internal Audit</option>
                <option>Office of the MD</option>
                <option>Office of the Chief Economist</option>
                <option>Operations -BDRM</option>
                <option>Operations -Credit Ops</option>
                <option>Operations - Product Dev</option>
                <option>Risk Mgt - ERM</option>
                <option>Risk Mgt - Internal Control</option>
                <option>Risk Mgt - Risk Assesment</option>

              </select>
            </div>
            
            <div class="input-group">
              <label>Reference Date</label>
              <input v-model="date" type="date" />
            </div>
            
            <button @click="generateReference" class="generate-btn">Generate Reference</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
 </div>
</template>




<script>
import { store } from '@/store';

export default {
  name: 'ReferenceGenerator',

  data() {
    return {
      sidebarSearch: '',
      orgName: '',
      recipientTitle: '',
      subject: '',
      recipientName: '',
      senderDepartment: '',
      date: '',
      referenceNumber: '',
      testOrganizations: Array.from({ length: 20 }, (_, i) => `Test Org ${i + 1}`),
      organizations: ["Org A", "Org B", "Org C", "Org D"],
      showAddPopup: false,
      newOrgCode: '',
      dropdown1: '1',
      dropdown2: '1',
      dropdown3: '1'
    };
  },
  computed: {
    filteredOrgs() {
      return this.organizations.filter(org =>
        org.toLowerCase().includes(this.sidebarSearch.toLowerCase())
      );
    }
  },
  methods: {
    generateReference() {
      if (!this.orgName || !this.date) {
        alert('Please fill all fields');
        return;
      }
      const formattedDate = this.date.replace(/-/g, '');
      this.referenceNumber = `${this.orgName.replace(/\s+/g, '').toUpperCase()}-${formattedDate}`;
    

 // Update the organization in the global store if found
 const org = store.testOrganizations.find(
        (o) => o.name.toLowerCase() === this.orgName.toLowerCase()
      );
      if (org) {
        org.referenceNumber = this.referenceNumber;
        org.date = this.date;
        org.recipientTitle = this.recipientTitle;
        org.Subject = this.subject;
        org.recipientName = this.recipientName;
        org.senderDepartment = this.senderDepartment;

      } else {
        alert('Organization not found in Test Organizations');
      }
    },
    goToTestOrganizations() {
      this.$router.push({ name: 'TestOrganizations' });
    }
  
  },

    addOrganization() {
      this.showAddPopup = true;
    },

    confirmAddPopup() {
      const newOrg = `${this.newOrgCode} (Drop1:${this.dropdown1}, Drop2:${this.dropdown2}, Drop3:${this.dropdown3})`;
      this.testOrganizations.push(newOrg);
      this.showAddPopup = false;
      // Reset fields
      this.newOrgCode = '';
      this.dropdown1 = '1';
      this.dropdown2 = '1';
      this.dropdown3 = '1';
    },
    cancelAddPopup() {
      this.showAddPopup = false;
      this.newOrgCode = '';
      this.dropdown1 = '1';
      this.dropdown2 = '1';
      this.dropdown3 = '1';
    },



    deleteOrganization() {
      this.testOrganizations.pop();
    },
    viewOrganization(org) {
      // Navigate to the view page using Vue Router
      this.$router.push({ name: 'ViewOrganization', params: { orgName: org } });
    }
  }

</script>


<style scoped>
body, html {
  margin: 8;
  padding: 0;
  font-family: Arial, sans-serif;
  background: blue;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
 padding :20px;
 margin :20px;
  background-image: url('@/assets/peaks-pic.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 8px;
}
.title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
  padding: 10px;
  background: darkblue;
  color: white;
  padding:10px;
  border-radius: 8px;
}
.translucent-panel {
background: rgba(255,255,255,0.6);
backdrop-filter: blur(10px);
border-radius:10px;
padding : 20px;
box-shadow:0 4px 8px  rgba(0,0,0,0.1) ;
transition: transform 0.3 ease;


}
.translucent-panel:hover{
transform: translateY(-10px);

}


.content {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.left-sidebar {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
  max-width: 300px;
}
.sidebar-search {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}
.sidebar-search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.add-btn, .delete-btn {
  padding: 8px 12px;
  border:1px solid #fff;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.add-btn {
  background: green;
}
.delete-btn {
  background: red;
}
.add-popup {
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
}
.add-popup .input-group {
  margin-bottom: 10px;
}
.add-popup label {
  font-weight: bold;
}
.add-popup input, .add-popup select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9em;
}
.confirm-btn, .cancel-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-right: 5px;
}
.confirm-btn {
  background: blue;
}
.cancel-btn {
  background: gray;
}

.test-organizations {
  margin-top: 20px;
}
.org-list {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
}
.org-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.org-list li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  display:flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}
.org-list li:hover {
  background: #d3eaff;
  cursor: pointer;
  margin-bottom: 0.2in;
}
.view-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background: purple;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.generated-result {
  margin-top: 20px;
  padding: 10px;
  background: #e9e9e9;
  border-radius: 5px;
}
.main-content {
  flex: 2;
  min-width:300px ;
}
.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.form-box {
  width: 100%;
  background: rgba(255,255,255,0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow:0 2px 6px rgba(0,0,0,0.15) ;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-group {
  width: 100%;
  display:flex;
  flex-direction: column;
}
.input-group label {
  font-weight: bold;
  margin-bottom: 5px;
}
.input-group input, .input-group select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9em;
}
.generate-btn {
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 20px;
  text-align: center;
  transition: background 0.3s;
}
.generate-btn:hover{ 
  background:darkblue;
}
.generator-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  
}
.input-group {
  margin-bottom: 10px;
}
.generate-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.generated-result {
  margin-top: 15px;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}



</style>
