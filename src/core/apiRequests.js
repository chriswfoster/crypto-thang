// import Axios from 'axios';

// export const getRequest = configObj => {
//     const {
//       params,
//       query 
//     } = configObj;
//     return new Promise(resolve => {
//       Axios.get(`${url}/${params.join("/")}${queryMaker(query)}`)
//         .then(resp => {
//           resolve(resp.data);
//         })
//         .catch(err => {
//           console.error(
//             `[getRequest] Error making ${params[0]} GET request`,
//             err
//           );
//           resolve(false);
//           notificationError(`Error Getting ${params[0]} Data`);
//         });
//     });
//   };
  
//   export const postRequest = configObj => {
//     const {
//       params,
//       data, 
//       query, 
//       errors
//     } = configObj;
//     let dataObj = {};
//     if (
//       configObj.images &&
//       configObj.images.files &&
//       configObj.images.files.length > 0
//     ) {
//       console.log("Images detected! : ", configObj.images);
//       dataObj = new FormData();
//       Object.keys(data).forEach(key => {
//         dataObj.append(key, data[key]);
//       });
//       configObj.images.files.forEach((imFile, i) => {
//         dataObj.append(`image_${i}`, imFile);
//       });
//     } else {
//       dataObj = data;
//     }
//     setSavingStatus(true);
//     return new Promise(resolve => {
//       Axios.post(`${url}/${params.join("/")}${queryMaker(query)}`, dataObj)
//         .then(resp => {
//           console.log(resp)
//           setSavingStatus(false);
//           resolve(resp.data);
//         })
//         .catch(err => {
//           setSavingStatus(false);
//           console.error(
//             `[postRequest] Error making ${params[0]} POST request`,
//             err
//           );
//           if (err && configObj.hasOwnProperty('errors') && errors.hasOwnProperty(err.response.data)) {
//               notificationError(configObj.errors[err.response.data]);
//             } else {
//               notificationError(`Error Sending ${params[0]} Data`);
//             }
//         });
//     });
//   };
  
//   export const deleteRequest = configObj => {
//     const {
//       params,
//       query 
//     } = configObj;
//     return new Promise(resolve => {
//       setSavingStatus(true);
//       Axios.delete(`${url}/${params.join("/")}${queryMaker(query)}`)
//         .then(resp => {
//           setSavingStatus(false);
//           resolve(resp.data);
//         })
//         .catch(err => {
//           setSavingStatus(false);
//           console.error(
//             `[deleteRequest] Error making ${params[0]} DELETE request`,
//             err
//           );
//           notificationError(`Error Deleting ${params[0]} Data`);
//           resolve(false);
//         });
//     });
//   };
  
//   function queryMaker(queryObj) {
//     let queryString = "";
//     if (queryObj) {
//       if (Object.keys(queryObj).length > 0) {
//         queryString += "?";
//         queryString += Object.keys(queryObj)
//           .map(qObj => {
//             return `${qObj}=${queryObj[qObj]}`;
//           })
//           .join("&");
//       }
//     }
//     return queryString;
//   }