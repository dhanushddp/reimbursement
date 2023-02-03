import axios from 'axios'
import { mapActions,mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'

export default{
    name:"financePortal",
    data(){
      return{
        email:JSON.parse(localStorage.getItem("finance")),
        FinanceInfo:{},
          value: [],
          stationeriesValue:[],
          things:"",
          Comments:"",
          recentClaim:{},
          userComment:"",
          postedComments:[],
          isPartial:0,
          partialAmount:0,

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
      this.getFinanceInfo(res.data.data)
      this.FinanceInfo=res.data.data
      axios.get(`/two/claim/api/getClaimsByEmployeeId/${res.data.data.id}`).then((resp)=>{
        this.getFinanceClaims(resp.data.data.myClaims)
        this.getFinanceTeamClaims(resp.data.data.employeeClaims)
        this.assignedClaims=resp.data.data.myClaims
        console.log(this.assignedClaims)
      })
      console.log(res.data.data)
    })
  
  },
  computed:{
     ...mapGetters('financeStore',['retrieveFinanceClaims','retrieveSelectedClaim','retrieveFinanceTeamClaims'])
  },
  methods:{
    ...mapActions('financeStore',['getFinanceInfo','getFinanceClaims','getSelectedClaim','getFinanceTeamClaims']),
      submitForm(){
          this.form.stationeries = this.value
          if(this.form.category)
          {
              
              if(this.form.category==1){  
                if(this.form.startDate && this.form.endDate){
                  if((Date.parse(new Date(this.form.endDate)) >= Date.parse(new Date(this.form.startDate)))&&Date.parse(new Date(this.form.endDate))<Date.parse(new Date())){
                   console.log('ok')
                   if(this.form.claimAmount && this.form.description){
                    axios.post(`/two/claim/api/addClaim`,{employeeId:this.FinanceInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:new Date(this.form.startDate),toDate:new Date(this.form.endDate),officeStationeryType:null,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                      console.log(res)
                      axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
                        this.getFinanceClaims(resp.data.data.myClaims)
                        window.location.reload()

                        this.assignedClaims=resp.data.data.myClaims
                        console.log(this.assignedClaims)
                      })
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
                      axios.post(`/two/claim/api/addClaim`,{employeeId:this.FinanceInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:null,toDate:null,officeStationaryType:this.stationeriesValue,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                      console.log(res)
                      axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
                        this.getFinanceClaims(resp.data.data.myClaims)
                        window.location.reload()

                        this.assignedClaims=resp.data.data.myClaims
                        console.log(this.assignedClaims)
                      })
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
                  axios.post(`/two/claim/api/addClaim`,{employeeId:this.FinanceInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:null,toDate:null,officeStationeryType:null,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                    console.log(res)
                    axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
                      this.getFinanceClaims(resp.data.data.myClaims)
                      window.location.reload()

                      this.assignedClaims=resp.data.data.myClaims
                      console.log(this.assignedClaims)
                    })
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
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
            this.getFinanceClaims(resp.data.data.myClaims)
            this.assignedClaims=resp.data.data
            console.log(this.assignedClaims)
          })
        }else{
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}?status=${status}`).then((resp)=>{
            this.getFinanceClaims(resp.data.data.myClaims)
            this.assignedClaims=resp.data.data
            console.log(this.assignedClaims)
          })
        }
       
      },
      calStatus1(status){
        if(status=="ALL")
        {
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
            this.getFinanceTeamClaims(resp.data.data.employeeClaims)
            this.teamClaims=resp.data.data.employeeClaims
            console.log(this.ManagerClaims)
          })
        }else{
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}?status=${status}`).then((resp)=>{
            this.getFinanceTeamClaims(resp.data.data.employeeClaims)

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
        axios.post(`/two/claim/api/addComment`,{comments:this.userComment,employeeId:this.FinanceInfo.id,claimId:this.recentClaim.claimId}).then((res)=>{
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
      approve(){
        if(this.isPartial){
          if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING'){

          if(this.partialAmount && this.partialAmount<=this.retrieveSelectedClaim.amount){
            axios.put('/two/claim/api/updateClaimStatus',{claimId:this.retrieveSelectedClaim.claimId,approvedClaimAmount:this.partialAmount,status:"APPROVED",approverId:this.FinanceInfo.id}).then(()=>{
              axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
                this.getFinanceTeamClaims(resp.data.data.employeeClaims)
  
              })
            })
          }}
        }else{
          if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING'){

          axios.put('/two/claim/api/updateClaimStatus',{claimId:this.retrieveSelectedClaim.claimId,approvedClaimAmount:this.retrieveSelectedClaim.amount,status:"APPROVED",approverId:this.FinanceInfo.id}).then(()=>{
            axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
              this.getFinanceTeamClaims(resp.data.data.employeeClaims)

            })
          })
        }}
      },
      reject(){
        if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING'){

        axios.put('/two/claim/api/updateClaimStatus',{claimId:this.retrieveSelectedClaim.claimId,approvedClaimAmount:this.retrieveSelectedClaim.amount,status:"REJECTED",approverId:this.FinanceInfo.id}).then(()=>{
          axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((resp)=>{
            this.getFinanceTeamClaims(resp.data.data.employeeClaims)
          })
        })
      }
      },
      deleteFinanceRequest(claim){
        axios.get(`/two/claim/api/getClaimDetailsByClaimId/${claim.claimId}`).then((res)=>{
          this.getSelectedClaim(res.data.data)
         
          if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='PENDING'){
            axios.delete(`/two/claim/api/deleteClaimUsingId/${claim.claimId}`).then(()=>{
              axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((res)=>{
                this.getFinanceClaims(res.data.data.myClaims)
              })
            })
          }
          })
      },
      deleteFinanceTeamRequest(claim){
         axios.get(`/two/claim/api/getClaimDetailsByClaimId/${claim.claimId}`).then((res)=>{
          this.getSelectedClaim(res.data.data)
          if((this.retrieveSelectedClaim.statusOfApprovers[0].status=='REJECTED' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='REJECTED' )||
          (this.retrieveSelectedClaim.statusOfApprovers[0].status=='APPROVED' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='APPROVED' ) ){
            axios.delete(`/two/claim/api/deleteClaimUsingId/${claim.claimId}`).then(()=>{
              axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.FinanceInfo.id}`).then((res)=>{
                this.getFinanceTeamClaims(res.data.data.employeeClaims)
              })
            })
          }
      })

    }}
}