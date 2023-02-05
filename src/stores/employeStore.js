import reimbursementService from "@/services/reimbursementService"
const employeStore = {
    state: {
       employeeDetails:{},
       categories:[],
       employeeClaims:[],
       selectedClaim:{}

    },
    mutations: {

        setEmployeeInfo(state,data){
            state.employeeDetails = data
        },
        setCategories(state,data){
            state.categories = data
        },
        setEmployeeClaims(state,data){
            state.employeeClaims=data
        },
        setSelectedClaim(state,data){
            state.selectedClaim=data
        }


    },
    actions:{
        getEmployeeInfo({commit},data){
            commit('setEmployeeInfo',data)
         },
         getCategories({commit},data){
            commit('setCategories',data)
         },
         getEmployeeClaims({commit},{success,employeeId}){
            reimbursementService.getOwnClaims({
     
                    success:(data)=>{
                        console.log(success)
                        commit('setEmployeeClaims',data)

                },
                employeeId


            })
         },
         getEmployeeClaimsStatus({commit},data){
            commit('setEmployeeClaims',data)

         },
         getSelectedClaim({commit},data){
            commit('setSelectedClaim',data)
         }
    },
    getters: {
       retrieveEmployeeInfo(state){
        return state.employeeDetails
       },
       retrieveCategories(state){
        return state.categories
       },
       retrieveEmployeeClaims(state){
        return  state.employeeClaims
       },
       retrieveSelectedClaim(state){
        return state.selectedClaim
       }
       
    },
    namespaced: true

}

export default employeStore