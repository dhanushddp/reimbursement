<template>
  <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="../assets/expense-reimbursement-fraud.jpeg"
          class="img-fluid" alt="Phone image">
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form1Example13" class="form-control form-control-lg" v-model="user.email" />
            <label class="form-label" for="form1Example13">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" v-model="user.password" />
            <label class="form-label" for="form1Example23" >Password</label>
          </div>
          <p v-if="isCorrect" style="color:red;font-size: 14px;">Please fill all details</p>
          <p v-if="isMatched" style="color:red;font-size: 14px;">User Not found</p>

          <div class="d-flex justify-content-around align-items-center mb-4">
            <!-- Checkbox -->
            <div class="form-check">
            </div>
          </div>

          <b-button style="margin-right: 10px"   @click="userAuth()" class="btn btn-primary btn-lg btn-block"
            >Sign in</b-button>
          <b-button style="margin-right: 10px" v-b-modal.modal-center class="btn btn-primary btn-lg btn-block"
            >Sign Up</b-button>



        </form>
      </div>

    </div>
  </div>
  
  <div class="container mt-5">
            <div>
              <b-modal id="modal-center" centered title="Add Employee here">
                <form>
                  <div class="form-group">
                    <label>Email</label>
                    <b-form-input type="email" v-model="registerUser.email" placeholder="Enter your email"></b-form-input>
                  </div>
                  <div class="form-group">
                    <label>Name</label>
                    <b-form-input type="text" v-model="registerUser.userName" placeholder="Enter your user Name"></b-form-input>
                  </div>
                  <div class="form-group">
                    <label>Phone number</label>
                    <b-form-input type="number" v-model="registerUser.contact" placeholder="Enter your 10 digit mobile number"></b-form-input>
                  </div>
                  <div class="form-group">
                    <label>Job Title</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="validationDefault01"
                      required
                      v-model="registerUser.jobTitle"
                      
                    >
                      <option value="SDE1">SDE1</option>
                      <option value="SDE2">SDE2</option>
                      <option value="QA">QA</option>
                      <option value="SDET1">SDET1</option>
                      <option value="SDET2">SDET2</option>

                    </select>                  </div>
                    <div class="form-group">
                    <label>ManagerId</label>
                    <b-form-input type="number" v-model="registerUser.managerId" placeholder="Enter your manager's id"></b-form-input>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <b-form-input type="password" v-model="registerUser.password"></b-form-input>
                  </div>
                  <div class="form-group">
                    <label>Confirm Password</label>
                    <b-form-input type="password" v-model="registerUser.confirmPassword"></b-form-input>
                    <p v-if="isPasswordMismatched" style="color:red;font-size:14px">Password Mismatched</p>
                  </div>
                  <div class="form-group">
                    <label>Role</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="validationDefault01"
                      required
                      v-model="registerUser.role"
                      
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="MANAGER">Manager</option>
                      <option value="FINANCE">Finance</option>
                      <option value="DIRECTOR">Director</option>
                      <option value="PRESIDENT">President</option>

                    </select>
                  </div>
                  <div class="form-group" v-show="registerUser.role!='EMPLOYEE'">
                    <label>Approvable Claim Threshold</label>
                    <b-form-input type="number" v-model="registerUser.claim"></b-form-input>
                    <p v-if="isClaim" style="color:red;font-size:14px">Please fill the claim</p>
                  </div>
                  <p v-if="isAllFields" style="color:red;font-size:14px">* Please fill all fields</p>
                  

                  <div class="col-12">
                    <button class="Submit" @click="Register()" type="button">Submit form</button>
                  </div>
                </form>
              </b-modal>
            </div>
          </div>
</section>
</template>

<script src='../scripts/loginComponent.js'>

</script>

<style scoped>
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}</style>