import axios from "../axios";


let PaymentsApi = {

   allPayments: (data) => {
      return axios({
         url: `/api/users/allPayments`,
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },


}
export default PaymentsApi

