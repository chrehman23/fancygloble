import axios from "../axios";


let StripeApi = {   
   getStripeAccountInfo: (data) => {
      return axios({
         url: `/api/users/getStripeAccountInfo`,
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },


}
export default StripeApi

