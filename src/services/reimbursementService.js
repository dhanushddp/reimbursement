import axios from 'axios'

export default {

    getOwnClaims({ success ,employeeId }) {
        axios.get(`/two/claim/api/getClaimsByEmployeeId/${employeeId}`).then(
            (response) => {
                success(response.data.data.myClaims,response.data.data.employeeClaims)
            }
        ).catch(
            
            
        )
    }

}