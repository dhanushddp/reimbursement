const directorStore = {   
    state: {
       DirectorDetails:{},
       categories:[],
       DirectorClaims:[],
       selectedClaim:{},
       assignedClaims:[]
   
    },
    mutations: {
   
        setDirectorInfo(state,data){
            state.DirectorDetails = data
        },
        setCategories(state,data){
            state.categories = data
        },
        setDirectorClaims(state,data){
            state.DirectorClaims=data
        },
        setSelectedClaim(state,data){
            state.selectedClaim=data
        },
        setDirectorTeamClaims(state,data){
           state.assignedClaims = data
        }
   
   
    },
    actions:{
        getDirectorInfo({commit},data){
            commit('setDirectorInfo',data)
         },
         getCategories({commit},data){
            commit('setCategories',data)
         },
         getDirectorClaims({commit},data){
            commit('setDirectorClaims',data)
         },
         getSelectedClaim({commit},data){
            commit('setSelectedClaim',data)
         },
         getDirectorTeamClaims({commit},data){
           commit('setDirectorTeamClaims',data)
         }
    },
    getters: {
       retrieveDirectorInfo(state){
        return state.DirectorDetails
       },
       retrieveCategories(state){
        return state.categories
       },
       retrieveDirectorClaims(state){
        return  state.DirectorClaims
       },
       retrieveSelectedClaim(state){
        return state.selectedClaim
       },
       retrieveDirectorTeamClaims(state){
           return state.assignedClaims
       }
       
    },
    namespaced: true
   
   }

export default directorStore