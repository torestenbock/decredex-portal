import axios from 'axios'



const swrFetcher = url => axios.get(url, { withCredentials: true }).then(res => res.data)

/*
EXAMPLE OF API FUNCTION FOR A TYPICAL LOGIN FUNCTIONALITY
*/
// const login = async (email, password, rememberMe=true) => {
//   return new Promise((resolve, reject) => {
//     axios.post('api/login', {
//       email: email,
//       password: password,
//       persistence: rememberMe
//     })
//
//     .then((result) => resolve(result.data)) // SUCCESS
//     .catch((error) => reject(error.response.data)) // ERROR
//   })
// }



const ApiService = {
  swrFetcher
}
export default ApiService
