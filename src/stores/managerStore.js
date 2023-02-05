import reimbursementService from "@/services/reimbursementService"
const managerStore = {   
 state: {
    ManagerDetails:{},
    categories:[],
    ManagerClaims:[],
    selectedClaim:{},
    teamClaims:[]

 },
 mutations: {

     setManagerInfo(state,data){
         state.ManagerDetails = data
     },
     setCategories(state,data){
         state.categories = data
     },
     setManagerClaims(state,data){
         state.ManagerClaims=data
     },
     setSelectedClaim(state,data){
         state.selectedClaim=data
     },
     setTeamClaims(state,data){
        state.teamClaims = data
     }


 },
 actions:{
     getManagerInfo({commit},data){
         commit('setManagerInfo',data)
      },
      getCategories({commit},data){
         commit('setCategories',data)
      },
      getManagerClaims({commit},{success,fail,employeeId}){
            reimbursementService.getOwnClaims({
     
                    success:(myClaims,employeeClaims)=>{
                        console.log(success)
                        commit('setManagerClaims',myClaims),
                        commit('setTeamClaims',employeeClaims)


                },
                fail,
                employeeId


            })
        
      },
      getSelectedClaim({commit},data){
         commit('setSelectedClaim',data)
      },
      getTeamClaims({commit},data){
        commit('setTeamClaims',data)
      },
      getManagerClaimsStatus({commit},data){
        commit('setManagerClaims',data)
      },
 },
 getters: {
    retrieveManagerInfo(state){
     return state.ManagerDetails
    },
    retrieveCategories(state){
     return state.categories
    },
    retrieveManagerClaims(state){
     return  state.ManagerClaims
    },
    retrieveSelectedClaim(state){
     return state.selectedClaim
    },
    retrieveTeamClaims(state){
        return state.teamClaims
    }
    
 },
 namespaced: true

}

export default managerStore