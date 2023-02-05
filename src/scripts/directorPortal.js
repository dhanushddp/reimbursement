import axios from 'axios'
import { mapGetters,mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'

export default{
    name:"directorPortal",
    data(){
      return{
        email:JSON.parse(localStorage.getItem("director")),
        DirectorInfo:{},
          value: [],
          stationeriesValue:[],
          things:"",
          Comments:"",
          recentClaim:{},
          userComment:"",
          postedComments:[],
  

    options: [
      { name: 'Pen'},
      { name: 'Notebook'},
      { name: 'Paper'},
      { name: 'Duster' },
      { name: 'Board'},
      { name: 'Others'}
    ],
    form:{
      category:"",
      startDate:"",
      endDate:"",
      description:"",
      claimAmount:0,
      stationeries:"",
      managerStatus:"1",
      financeStatus:"1"

    },
    isDateCorrect:true,
    isClaim:false,
    fillAll:false,
    assignedClaims:[]

      }
  },
  components: {
      Multiselect
    },
  mounted(){
    axios.get(`/two/employee/api/getEmployeeDetailsByEmail?emailId=${this.email}`).then((res)=>{
      this.getDirectorInfo(res.data.data)
      this.DirectorInfo=res.data.data
      this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:res.data.data.id})

      console.log(res.data.data)
    })
  
  },
  computed:{
     ...mapGetters('directorStore',['retrieveDirectorClaims','retrieveSelectedClaim','retrieveDirectorTeamClaims'])
  },
  methods:{
    onSuccess(){
      console.log("success")
    },
    onFail(){
      console.log("fail")

    },
    ...mapActions('directorStore',['getDirectorInfo','getDirectorClaims','getSelectedClaim','getDirectorTeamClaims','getDirectorClaimsStatus']),
      submitForm(){
          this.form.stationeries = this.value
          if(this.form.category)
          {
              
              if(this.form.category==1){  
                if(this.form.startDate && this.form.endDate){
                  if((Date.parse(new Date(this.form.endDate)) >= Date.parse(new Date(this.form.startDate)))&&Date.parse(new Date(this.form.endDate))<Date.parse(new Date())){
                   console.log('ok')
                   if(this.form.claimAmount && this.form.description){
                    axios.post(`/two/claim/api/addClaim`,{employeeId:this.DirectorInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:new Date(this.form.startDate),toDate:new Date(this.form.endDate),officeStationeryType:null,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                      console.log(res)
                      this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

                    })
                   }

                }
                }
              
              }

              if(this.form.category==2){
                   if(this.value){
                    for(let i=0;i<this.value.length;i++){
                      console.log(i)
                      this.stationeriesValue.push(this.value[i].name)
                    }
                    if(this.form.claimAmount && this.form.description){
                      axios.post(`/two/claim/api/addClaim`,{employeeId:this.DirectorInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:null,toDate:null,officeStationaryType:this.stationeriesValue,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                      console.log(res)
                      this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

                    })
                     }else{
                      this.allDetails=true
                      setTimeout(() => {
                        this.allDetails=false
                      }, 2000);
                     }
                   }else{
                    this.allDetails=true
                    setTimeout(() => {
                      this.allDetails=false
  
                    }, 2000);
                   }
              }else{
                this.allDetails=true
                setTimeout(() => {
                  this.allDetails=false

                }, 2000);
              }

              if(this.form.category==3){
                if(this.form.claimAmount && this.form.description){
                  axios.post(`/two/claim/api/addClaim`,{employeeId:this.DirectorInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:null,toDate:null,officeStationeryType:null,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                    console.log(res)
                    this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

                  })
                  console.log(this.form)
                 }else{
                  this.allDetails=true
                  setTimeout(() => {
                    this.allDetails=false
                  }, 2000);
                 }
              }
           }
           else{
            this.fillAll=true
            setTimeout(() => {
              this.fillAll=false

            }, 2000);

              console.log("enter all")
          }

      },
      calStatus(status){
        if(status=="ALL")
        {
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.DirectorInfo.id}`).then((resp)=>{
            this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})
            this.assignedClaims=resp.data.data
            console.log(this.assignedClaims)
          })
        }else{
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.DirectorInfo.id}?status=${status}`).then((resp)=>{
            this.getDirectorClaimsStatus(resp.data.data.myClaims)
            this.assignedClaims=resp.data.data
            console.log(this.assignedClaims)
          })
        }
       
      },
      calStatus1(status){
        if(status=="ALL")
        {
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.DirectorInfo.id}`).then((resp)=>{
            this.getDirectorTeamClaims(resp.data.data.employeeClaims)
            this.teamClaims=resp.data.data.employeeClaims
            console.log(this.ManagerClaims)
          })
        }else{
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.DirectorInfo.id}?status=${status}`).then((resp)=>{
            this.getDirectorTeamClaims(resp.data.data.employeeClaims)

            this.ManagerClaims=resp.data.data
            console.log(this.ManagerClaims)
          })
        }
       
      },
      showAll1(){
        this.calStatus1("ALL")
   },
   showPending1(){
     this.calStatus1("PENDING")
   },
   showApproved1(){
     this.calStatus1("APPROVED")
   },
   showRejected1(){
     this.calStatus1("REJECTED")
   },
      showAll(){
           this.calStatus("ALL")
      },
      showPending(){
        this.calStatus("PENDING")
      },
      showApproved(){
        this.calStatus("APPROVED")
      },
      showRejected(){
        this.calStatus("REJECTED")
      },
      viewDetails(data){

        

        axios.get(`/two/claim/api/getClaimDetailsByClaimId/${data.claimId}`).then((res)=>{
          console.log(res.data.data)
          this.things=""

          if(res.data.data.category=="Office stationary")
          {
            
            for(let i=0;i<(res.data.data.officeStationaryType).length;i++){
              this.things += res.data.data.officeStationaryType[i]+" "
            }
          }

          this.managerStatus = res.data.data.statusOfApprovers[0].status
          this.financeStatus = res.data.data.statusOfApprovers[1].status
          

          if(res.data.data.claimCommentsResponses){
            for(let i=0;i<(res.data.data.claimCommentsResponses).length;i++){
              this.Comments += res.data.data.claimCommentsResponses[i]+" "
            }
          }



          
          this.getSelectedClaim(res.data.data)
        })
        
      },
      postComment(){
        axios.post(`/two/claim/api/addComment`,{comments:this.userComment,employeeId:this.DirectorInfo.id,claimId:this.recentClaim.claimId}).then((res)=>{
          console.log(res)

          this.userComment=""
        })
      },
      setClaim(data){
          this.recentClaim=data
          axios.get(`/two/claim/api/getClaimDetailsByClaimId/${data.claimId}`).then((res)=>{
            this.postedComments=[]
            if(res.data.data.claimCommentsResponses){
              for(let j=0;j<res.data.data.claimCommentsResponses.length;j++){
                this.postedComments.push(res.data.data.claimCommentsResponses[j].comments)
              }
            }
            console.log(this.postedComments)
          })


      },
      show(){
        localStorage.removeItem("finance");

        this.$router.push('/')
      },
      deleteDirectorRequest(claim){
        axios.get(`/two/claim/api/getClaimDetailsByClaimId/${claim.claimId}`).then((res)=>{
          this.getSelectedClaim(res.data.data)
         
          if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='PENDING'){
            axios.delete(`/two/claim/api/deleteClaimUsingId/${claim.claimId}`).then(()=>{
              this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

            })
          }
          })
      },
      deleteDirectorTeamRequest(claim){
        axios.get(`/two/claim/api/getClaimDetailsByClaimId/${claim.claimId}`).then((res)=>{
          this.getSelectedClaim(res.data.data)
          if((this.retrieveSelectedClaim.statusOfApprovers[0].status=='REJECTED' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='REJECTED' )||
          (this.retrieveSelectedClaim.statusOfApprovers[0].status=='APPROVED' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='APPROVED' ) ){
            axios.delete(`/two/claim/api/deleteClaimUsingId/${claim.claimId}`).then(()=>{
              this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

            })
          }
      })
      },
      approve(){
        if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING'){

        axios.put('/two/claim/api/updateClaimStatus',{claimId:this.retrieveSelectedClaim.claimId,approvedClaimAmount:this.retrieveSelectedClaim.amount,status:"APPROVED",approverId:this.DirectorInfo.id}).then(()=>{
          this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

        })}
      },
      reject(){
        if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING'){

        axios.put('/two/claim/api/updateClaimStatus',{claimId:this.retrieveSelectedClaim.claimId,approvedClaimAmount:this.retrieveSelectedClaim.amount,status:"REJECTED",approverId:this.DirectorInfo.id}).then(()=>{
          this.getDirectorClaims({success:this.onSuccess,fail:this.onFail,employeeId:this.DirectorInfo.id})

        })}
      }

  }
}