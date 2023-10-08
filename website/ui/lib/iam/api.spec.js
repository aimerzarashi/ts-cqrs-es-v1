import { getAdminToken, createUser, getToken } from "@/lib/iam/api";

const date = new Date();
const email = date.getFullYear().toString()
      + ("00" + ( date.getMonth() + 1 )).slice(-2)
      + ("00" + date.getDate()).slice(-2)
      + ("00" + date.getHours()).slice(-2)
      + ("00" + date.getMinutes()).slice(-2)
      + ("00" + date.getSeconds()).slice(-2)
      + ("00" + date.getMilliseconds()).slice(-3)
      + '@example.com';
console.log(email);
const clientUsername = email;
const clientPassword = 'password';

await getAdminToken().then(
  accessToken => {
    createUser(accessToken, clientUsername, email, clientPassword).then(
      () => {
        getToken(clientUsername, clientPassword).then(
          accessToken => {
            console.log(accessToken);    
          }
        );
      }
    );
  }
);