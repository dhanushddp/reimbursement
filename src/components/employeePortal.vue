<template>
  <div>
    <div class="userHeadSection">
      <img
        @click="home()"
         style="
          position: absolute;
          left: 20px;
          margin-top: 10px;
           cursor: pointer;
          height: 27px;
          width: 90px;
        "
        src="../assets/bliblilogo.png"
      />

      <div class="userHead">
        <i
          class="fa fa-user"
          aria-hidden="true"
          style="padding-right: 10px; cursor: pointer; color: white"
        ></i>

        <h3 class="userName">Hello {{ employeeInfo.name }}</h3>
        <i
          @click="show()"
          class="fa fa-sign-out" 
          aria-hidden="true"
          style="cursor: pointer; color: white"
        ></i>
      </div>
    </div>
    <div>
      <div class="addClaimContainer">
        <div class="addClaim">
          <b-button style="margin-right: 10px" v-b-modal.modal-center
            >Add Claim</b-button
           >
        </div>
      </div>
      <div class="header">My Claims</div>
      <div class="claimContainer">
        <div class="filter">
          <div class="All" @click="showAll()">ALL</div>
           <div class="Pending" @click="showPending()">PENDING</div>
          <div class="accepted" @click="showApproved()">APPROVED</div>
          <div class="rejected" @click="showRejected()">REJECTED</div>
        </div>
        <hr
           style="
            color: black;
            border: 0.5px solid black;
            width: 98%;
             margin-left: 1%;
          "
        />
        <div class="myClaims">
          <ul class="responsive-table">
            <li class="table-header">
              <div class="col col-1">ClaimId</div>
              <div class="col col-2">Category</div>
              <div class="col col-3">Description</div>
              <div class="col col-4">Amount</div>
              <div class="col col-5">Manager/Approval</div>

              <div class="col col-6">Finance/Approval</div>

              <div class="col col-7">Actions</div>
            </li>
            <li v-if="retrieveEmployeeClaims.length==0" style="justify-content:center" class="table-row">
              No data Found
            </li>
            <li  class="table-row cen" v-for="(claim,index) in retrieveEmployeeClaims" :key="index">
              <div class="col col-1" data-label="ClaimId">{{claim.claimId }}</div>
        <div  class="col col-2" data-label="Category">{{claim.category}}</div>
         <div  class="col col-3" data-label="Description">{{claim.description }}</div>
        

          <div class="col col-4 "  data-label="amount" >{{ claim.amount }}</div> 


        <!--<div  class="col col-5" data-label="manager"  v-bind:class="{
        'red1': level1=='REJECTED',
        'yellow1': level1=='PENDING' ,
        'green1': level1=='APPROVED',}">{{level1}}</div> -->
      
        <div class="col col-6"  data-label="manager"  v-bind:class="{
        'red1': claim.statusOfApprovers[0].status=='REJECTED',
        'yellow1': claim.statusOfApprovers[0].status=='PENDING' ,
        'green1': claim.statusOfApprovers[0].status=='APPROVED',}">{{(claim.statusOfApprovers[0].status)}}</div>
        

        <!-- <div  class="col col-5" data-label="finance"  v-bind:class="{
        'red1': level2=='REJECTED',
        'yellow1': level2=='PENDING' ,
        'green1': level2=='APPROVED',}">{{level2}}</div> -->
        <div  class="col col-6"  data-label="finance"  v-bind:class="{
        'red1': claim.statusOfApprovers[1].status=='REJECTED',
        'yellow1': claim.statusOfApprovers[1].status=='PENDING' ,
        'green1': claim.statusOfApprovers[1].status=='APPROVED',}">{{(claim.statusOfApprovers[1].status)}}</div>
        

          <div class="col col-7" data-label="Actions">
          <i
            style="padding-left: 20px;cursor: pointer;"
            class="fa fa-comment-o fa-2x"
            v-b-modal.modal-center2
            aria-hidden="true"
            @click="setClaim(claim)"
          ></i>
           <i
            @click="viewDetails(claim)"
            style="padding-left: 20px;cursor: pointer;"
            class="fa fa-eye fa-2x"
            v-b-modal.modal-center1
            aria-hidden="true"
          ></i>
          <i
           @click="deleteRequest(claim)"
            style="padding-left: 20px;cursor: pointer;"
            class="fa fa-trash-o fa-2x"
            aria-hidden="true"
          ></i>
        </div>
            </li>
          </ul>
           <div class="container mt-5">
            <div>
              <b-modal id="modal-center" centered title="Add Claim here">
                <form>
                  <div class="form-group">
                    <label>Category</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="validationDefault01"
                      required
                      v-model="form.category"
                    >
                      <option selected>Select category</option>
                      <option value=1>Travel</option>
                      <option value=2>Stationery</option>
                      <option value=3>Others</option>
                    </select>
                  </div>
                  <div v-show="form.category==1" class="form-group">
                    <div>
                      <label for="example-datepicker">Start date</label>
                      <b-form-datepicker
                        v-model="form.startDate"
                        id="example-datepicker"
                        class="mb-2"
                      ></b-form-datepicker>
                    </div>
                  </div>
                  <div v-show="form.category==1" class="form-group">
                    <div>
                      <label for="example-datepicker">End date</label>
                      <b-form-datepicker
                        v-model="form.endDate"
                        id="example-datepicker"
                         class="mb-2"
                      ></b-form-datepicker>
                    </div>
                  </div>
                   <div v-show="form.category==2" class="form-group">
                    <div>
                       <label class="typo__label">Stationeris</label>
                      <multiselect
                         v-model="value"
                        :options="options"
                         :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Pick some"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                      >
                        <template
                          slot="selection"
                          slot-scope="{ values, search: isOpen }"
                          ><span
                            class="multiselect__single"
                            v-if="values.length"
                            v-show="!isOpen"
                            >{{ values.length }} options selected</span
                          ></template
                        >
                      </multiselect>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputAddress">Description</label>
                    <textarea
                    v-model="form.description" 

                      type="text"
                      class="form-control"
                      id="inputAddress"
                      placeholder="About your claim"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="inputAddress2">Claim Amount</label>
                    <input
                    v-model="form.claimAmount"

                      type="number"
                      class="form-control"
                      id="inputAddress2"
                      placeholder="10000"
                    />
                  </div>
                  <p v-if="fillAll" style="color:red;font-size:14px">*Please fill all details</p>
                  <!-- <div class="form-group">
                    <label for="image">Upload Bill</label>
                    <input type="file" @change="fileSelect"/>
                    <button class="Submit" @click="uploadFile()" type="button">upload form</button>

                  </div> -->

                  <div class="col-12">
                    <button class="Submit" @click="submitForm()" type="button">Submit form</button>
                  </div>
                </form>
              </b-modal>


            </div>
          </div>
          
          <div class="container mt-5">
            <div>
               <b-modal id="modal-center2" centered title="Comment Here...">
                <form>
                  <div class="form-group">
                      <label for="Comments">comments</label>
                    <textarea
                    style="width:100%;height: 100px;"
                       v-model="postedComments"
                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      readonly
                     ></textarea>
                  </div>
                  <div class="form-group">
                    <textarea placeholder="post here..." style="width:100%;height: 50px;" v-model="userComment" >
                                            
                    </textarea>
                    
                  </div>

                  <div class="col-12">
                    <button class="Submit" @click="postComment()" type="button">Comment</button>
                  </div>
                </form>
              </b-modal>


            </div>
          </div>


          <div class="container mt-5">
            <div>
              <b-modal id="modal-center1" centered title="View Claim Here...">
                <form>
                  
                  <div class="form-group">
                    <label for="claim">Category</label>
                    <input
                    v-model="retrieveSelectedClaim.category"

                      type="text"
                      class="form-control"
                       id="inputAddress2"
                      readonly
                    />
                  </div>
                  <div v-if="retrieveSelectedClaim.category=='Travel expense'" class="form-group">
                      <label for="start">From Date</label>
                    <input
                    v-model="retrieveSelectedClaim.fromDate"

                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      readonly
                    />
                  </div>
                   
                  <div v-if="retrieveSelectedClaim.category=='Travel expense'" class="form-group">
                    <label for="end">To Date</label>

                    <input
                    v-model="retrieveSelectedClaim.toDate"

                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      readonly
                    />
                  </div>
                  <div v-if="retrieveSelectedClaim.category=='Office stationary'" class="form-group">
                      <label for="stationery">Stationaries</label>
                    <input
                    v-model="things"

                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                      <label for="createDate">Created on</label>
                    <input
                    v-model="retrieveSelectedClaim.claimCreateDate"

                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      readonly
                    />
                  </div>
               
                  <div class="form-group">
                    <label for="inputAddress">Description</label>
                    <textarea
                    v-model="retrieveSelectedClaim.description" 
                    readonly

                      type="text"
                      class="form-control"
                      id="inputAddress"
                    ></textarea>
                  </div>

                  <div class="form-group">
                      <label for="claimAmount">Claim Amount</label>
                    <input
                    v-model="retrieveSelectedClaim.amount"

                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      readonly
                    />
                  </div>
                 
                
                  
                 

            
                </form>
              </b-modal>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/employeePortal.js">
</script>

<style scoped>
@import url("../css/employeePortal.css");
@media all and (max-width:527px) {
    .filter{
      display: block;
      padding: 10px 10px 10px 10px;
    }
  }
  @media all and (max-width:767px) {
    .cen{
      text-align: justify;
    }
  }
</style>

