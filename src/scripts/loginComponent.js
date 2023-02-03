import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default{
    name:"loginComponent",
    data(){
        return{
            user: {
                email: "",
                password: ""
            },
            registerUser:{
                email:"",
                password:"",
                confirmPassword:"",
                role:"",
                userName:"",
                claim:0,
                contact:91,
                jobTitle:"",
                managerId:1,
            },
            isOk : true,
            isCorrect : false,
            isAllFields:false,
            isPasswordMismatched : false,
            isClaim:false,
            isNotEmployee:false,
            isContact:false,
            isMatched:false
        }
    },
    computed:{
       ...mapGetters('employeStore',['retrieveEmployeeInfo'])
    },
    methods:{
        ...mapActions('employeStore',['getEmployeeInfo']),
        userAuth(){
         if(this.user.email &&  this.user.password){
            axios.post(`/two/employee/api/auth`,{email:this.user.email,password:this.user.password}).then(()=>{
                
                    axios.get(`/two/employee/api/getEmployeeDetailsByEmail?emailId=${this.user.email}`).then((response)=>{
                        this.getEmployeeInfo(response.data.data)
                        if(response.data.data.role=="EMPLOYEE"){
                            this.$router.push({ path: "/employeePortal" })
                            localStorage.setItem("employee", JSON.stringify(this.user.email));
    
                        }
                        else if(response.data.data.role=="MANAGER"){
                            this.$router.push({ path: "/managerPortal"})
                            localStorage.setItem("manager", JSON.stringify(this.user.email));
    
    
                        }else if(response.data.data.role=="FINANCIER"){
                            this.$router.push({ path: "/financePortal"})
                            localStorage.setItem("finance", JSON.stringify(this.user.email));
    
    
    
                        }else if(response.data.data.role=="DIRECTOR"){
                            this.$router.push({ path: "/directorPortal"})
                            localStorage.setItem("director", JSON.stringify(this.user.email));
    
                        }else if(response.data.data.role=="PRESIDENT"){
                            this.$router.push({ path: "/presidentPortal"})
                            localStorage.setItem("president", JSON.stringify(this.user.email));
                        }
        
                        
                    })

                  
                
              
            }).catch(()=>{
                this.isMatched=true
                setTimeout(() => {
                    this.isMatched=false

                }, 2000);
            })
            console.log(this.user)
         }else{
            this.isCorrect = true
            setTimeout(() => {
                this.isCorrect = false

            }, 2000);
         }
        },
        Register(){
          if(this.registerUser.email && this.registerUser.password &&
             this.registerUser.confirmPassword && this.registerUser.role &&
              this.registerUser.userName && this.registerUser.contact && 
            this.registerUser.jobTitle && this.registerUser.managerId){
          
            if(this.registerUser.password==this.registerUser.confirmPassword){
                
                if(this.registerUser.role==="MANAGER"){
                    this.isNotEmployee=true

                    if((this.registerUser.claim<3000)){
                        this.isClaim=true
                        this.isOk=false

                        setTimeout(() => {
                            this.isClaim=false

                        }, 2000);
                    }else{
                        this.isOk=true

                    }
                }
                if(this.registerUser.role=="FINANCE"){
                    this.isNotEmployee=true

                    if(this.registerUser.claim<10000){
                        this.isClaim=true
                        this.isOk=false

                        setTimeout(() => {
                            this.isClaim=false

                        }, 2000);                       
                    }else{
                        this.isOk=true

                    }
                }
            }else{
                this.isOk=false
                this.isPasswordMismatched= true,
                setTimeout(() => {
                    this.isPasswordMismatched= false

                }, 2000);



            }
          }else{
            this.isOk=false
            this.isAllFields=true

            setTimeout(() => {
                this.isAllFields=false

            }, 2000);


          }

          if(this.isOk){
                axios.post(`/two/employee/api/addEmployee`,{name:this.registerUser.userName,phone:this.registerUser.contact,
                    email:this.registerUser.email,jobTitle:this.registerUser.jobTitle,role:this.registerUser.role,
                    managerId:this.registerUser.managerId,password:this.registerUser.password})
                
                console.log(this.registerUser)
            
          }
        }
    }
}