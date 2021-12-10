import axios from "../axios";


let StripeApi = {   
   create_connect_account: (data) => {
      return axios({
         url: `/api/users/create_connect_account`,
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },


}
export default StripeApi

