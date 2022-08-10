// export function genUniqueId(): string {
//     const dateStr = Date
//       .now()
//       .toString(36); // convert num to base 36 and stringify
  
//     const randomStr = Math
//       .random()
//       .toString(36)
//       .substring(2, 8); // start at index 2 to skip decimal point
  
//     return `${dateStr}-${randomStr}`;
//   }
  
//   export default genUniqueId;

  
  export var ID = function () {
    const numberId = [];
    while (numberId.length < 1) {
      const r = Math.floor(Math.random() * 10000) + 1; //long enough ? 
      if (numberId.indexOf(r) === -1) {
        numberId.push(r);
      }
    }
    console.log("Personal Id: " + numberId);
  };


  const API_BASE_URL = "http://localhost:3000/api/posts";

export async function getAllUsers() {
    try {
        const usersResp = await fetch(API_BASE_URL);
        if(usersResp.status >= 400) {
            return Promise.reject(usersResp.body);
        }
        return usersResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}

export async function addNewUser(user: any) {
    try {
        const userResp = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(userResp.status >= 400) {
            return Promise.reject(userResp.body);
        }
        return userResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}
  