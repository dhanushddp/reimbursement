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
         getEmployeeClaims({commit},data){
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