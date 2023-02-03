const presidentStore = {   
    state: {
       PresidentDetails:{},
       categories:[],
       PresidentClaims:[],
       selectedClaim:{},
       teamClaims:[]
   
    },
    mutations: {
   
        setPresidentInfo(state,data){
            state.PresidentDetails = data
        },
        setCategories(state,data){
            state.categories = data
        },
        setPresidentClaims(state,data){
            state.PresidentClaims=data
        },
        setSelectedClaim(state,data){
            state.selectedClaim=data
        },
        setPresidentTeamClaims(state,data){
           state.teamClaims = data
        }
   
   
    },
    actions:{
        getPresidentInfo({commit},data){
            commit('setPresidentInfo',data)
         },
         getCategories({commit},data){
            commit('setCategories',data)
         },
         getPresidentClaims({commit},data){
            commit('setPresidentClaims',data)
         },
         getSelectedClaim({commit},data){
            commit('setSelectedClaim',data)
         },
         getPresidentTeamClaims({commit},data){
           commit('setPresidentTeamClaims',data)
         }
    },
    getters: {
       retrievePresidentInfo(state){
        return state.PresidentDetails
       },
       retrieveCategories(state){
        return state.categories
       },
       retrievePresidentClaims(state){
        return  state.PresidentClaims
       },
       retrieveSelectedClaim(state){
        return state.selectedClaim
       },
       retrievePresidentTeamClaims(state){
           return state.teamClaims
       }
       
    },
    namespaced: true
   
   }
   
   export default presidentStore