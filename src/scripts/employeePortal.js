import axios from 'axios'
import Multiselect from 'vue-multiselect'
import { mapActions, mapGetters } from 'vuex'

export default{
    name:"employeePortal",
    data(){
        return{
            email:JSON.parse(localStorage.getItem("employee")),
            employeeInfo:{},
            value: [],
            stationeriesValue:[],
            things:"",
            Comments:"",
            recentClaim:{},
            userComment:"",
            postedComments:[],
            selectedFile:null,
            fillAll:false,
            level1:"",
            level2:"",


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
      allDetails:false,
      employeeClaims:[]

        }
    },
    components: {
        Multiselect
      },
    mounted(){
      axios.get(`/two/employee/api/getEmployeeDetailsByEmail?emailId=${this.email}`).then((res)=>{
        this.getEmployeeInfo(res.data.data)
        this.employeeInfo=res.data.data
        axios.get(`/two/claim/api/getClaimsByEmployeeId/${res.data.data.id}`).then((resp)=>{
          this.getEmployeeClaims(resp.data.data.myClaims)
          this.employeeClaims=resp.data.data.myClaims
          console.log(this.employeeClaims)
        })
        console.log(res.data.data)
        console.log(this.lo,'dgvshj')
      })
    
    },
    computed:{
       ...mapGetters('employeStore',['retrieveEmployeeClaims','retrieveSelectedClaim'])
    },
    methods:{
      ...mapActions('employeStore',['getEmployeeInfo','getEmployeeClaims','getSelectedClaim']),
        submitForm(){
            this.form.stationeries = this.value
            if(this.form.category)
            {          

                
                if(this.form.category==1){
                  if(this.form.startDate && this.form.endDate){
                    if((Date.parse(new Date(this.form.endDate)) >= Date.parse(new Date(this.form.startDate)))&&Date.parse(new Date(this.form.endDate))<Date.parse(new Date())){
                     console.log('ok')
                     if(this.form.claimAmount && this.form.description){
                      axios.post(`/two/claim/api/addClaim`,{employeeId:this.employeeInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:new Date(this.form.startDate),toDate:new Date(this.form.endDate),officeStationeryType:null,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                        console.log(res)
                        axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.employeeInfo.id}`).then((resp)=>{
                          this.getEmployeeClaims(resp.data.data.myClaims)
                          window.location.reload()
                          this.employeeClaims=resp.data.data.myClaims
                          console.log(this.employeeClaims)
                        })
                      })
                     }else{
                      this.allDetails=true
                      setTimeout(() => {
                        this.allDetails=false
                      }, 2000);
                     }
  
                  }else{
                    this.isDateCorrect=false
                  }
                  }
                }else{
                  this.allDetails=true
                  setTimeout(() => {
                    this.allDetails=false

                  }, 2000);

                }

                if(this.form.category==2){
                     if(this.value){
                      for(let i=0;i<this.value.length;i++){
                        console.log(i)
                        this.stationeriesValue.push(this.value[i].name)
                      }
                      if(this.form.claimAmount && this.form.description){
                        axios.post(`/two/claim/api/addClaim`,{employeeId:this.employeeInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:null,toDate:null,officeStationaryType:this.stationeriesValue,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                        console.log(res)
                        axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.employeeInfo.id}`).then((resp)=>{
                          this.getEmployeeClaims(resp.data.data.myClaims)
                           this.employeeClaims=resp.data.data.myClaims
                          window.location.reload()

                          console.log(this.employeeClaims)
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
                    axios.post(`/two/claim/api/addClaim`,{employeeId:this.employeeInfo.id,claimCategoryId:parseInt(this.form.category),imageUrl:null,fromDate:null,toDate:null,officeStationeryType:null,description:this.form.description,claimAmount:this.form.claimAmount}).then((res)=>{
                      console.log(res)
                      axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.employeeInfo.id}`).then((resp)=>{
                        this.getEmployeeClaims(resp.data.data.myClaims)
                        this.$bvToast.toast(`Claim Added`, {
                          title: 'Confirmation',
                        })
                          window.location.reload()


                        this.employeeClaims=resp.data.data.myClaims
                        console.log(this.employeeClaims)
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

              this.fillAll=true;
              setTimeout(() => {
                this.fillAll=false;

              }, 2000);
            }

        },
        calStatus(status){
          if(status=="ALL")
          {
            axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.employeeInfo.id}`).then((resp)=>{
              this.getEmployeeClaims(resp.data.data.myClaims)
              this.employeeClaims=resp.data.data
              console.log(this.employeeClaims)
            })
          }else{
            axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.employeeInfo.id}?status=${status}`).then((resp)=>{
              this.getEmployeeClaims(resp.data.data.myClaims)
              this.employeeClaims=resp.data.data
              console.log(this.employeeClaims)
            })
          }
         
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
            if(res.data.data.statusOfApprovers[0].level==1){
              this.level1=res.data.data.statusOfApprovers[0].status
              this.level2=res.data.data.statusOfApprovers[1].status
              console.log(this.level1 , this.level2)
            }else{
              this.level1=res.data.data.statusOfApprovers[1].status
              this.level2=res.data.data.statusOfApprovers[0].status
              console.log(this.level1 , this.level2)

            }
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
          axios.post(`/two/claim/api/addComment`,{comments:this.userComment,employeeId:this.employeeInfo.id,claimId:this.recentClaim.claimId}).then((res)=>{
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
          localStorage.removeItem("employee");

          this.$router.push('/')
        },
        fileSelect(event){
          this.selectedFile=event.target.files[0]
        },
        deleteRequest(claim){
          axios.get(`/two/claim/api/getClaimDetailsByClaimId/${claim.claimId}`).then((res)=>{
            this.getSelectedClaim(res.data.data)
           
            if(this.retrieveSelectedClaim.statusOfApprovers[0].status=='PENDING' && this.retrieveSelectedClaim.statusOfApprovers[1].status=='PENDING'){
              axios.delete(`/two/claim/api/deleteClaimUsingId/${claim.claimId}`).then(()=>{
                axios.get(`/two/claim/api/getClaimsByEmployeeId/${this.employeeInfo.id}`).then((res)=>{
                  this.getEmployeeClaims(res.data.data.myClaims)
                  this.employeeClaims=res.data.data
                })
              })
            }
            })
         
        
        

    }
  }}