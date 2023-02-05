import reimbursementService from "@/services/reimbursementService"
const financeStore = {   
    state: {
       FinanceDetails:{},
       categories:[],
       FinanceClaims:[],
       selectedClaim:{},
       assignedClaims:[]
   
    },
    mutations: {
   
        setFinanceInfo(state,data){
            state.FinanceDetails = data
        },
        setCategories(state,data){
            state.categories = data
        },
        setFinanceClaims(state,data){
            state.FinanceClaims=data
        },
        setSelectedClaim(state,data){
            state.selectedClaim=data
        },
        setFinanceTeamClaims(state,data){
           state.assignedClaims = data
        }
   
   
    },
    actions:{
        getFinanceInfo({commit},data){
            commit('setFinanceInfo',data)
         },
         getCategories({commit},data){
            commit('setCategories',data)
         },
         getFinanceClaims({commit},{success,fail,employeeId}){
                reimbursementService.getOwnClaims({
         
                        success:(myClaims,employeeClaims)=>{
                            console.log(success)
                            commit('setFinanceClaims',myClaims),
                            commit('setFinanceTeamClaims',employeeClaims)
    
    
                    },
                    fail,
                    employeeId
    
    
                })
            
         },
         getSelectedClaim({commit},data){
            
            commit('setSelectedClaim',data)
         },
         getFinanceTeamClaims({commit},data){
           commit('setFinanceTeamClaims',data)
         },getFinanceClaimsStatus({commit},data){
            commit('setFinanceClaims',data)
          },
    },
    getters: {
       retrieveFinanceInfo(state){
        return state.FinanceDetails
       },
       retrieveCategories(state){
        return state.categories
       },
       retrieveFinanceClaims(state){
        return  state.FinanceClaims
       },
       retrieveSelectedClaim(state){
        return state.selectedClaim
       },
       retrieveFinanceTeamClaims(state){
           return state.assignedClaims
       }
       
    },
    namespaced: true
   
   }
   


export default financeStore