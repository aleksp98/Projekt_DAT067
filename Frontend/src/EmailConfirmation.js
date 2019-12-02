//if good respons return 1
//if bad response return -1
export function sendHTTP (n){
   const token= n;
const url = 'https://localhost:5001/api/User/ConfirmMail/' + token;
const headers = new Headers();
headers.append('Content-Type', 'application/json');
const requestOptions = {
    method: 'GET'
};
const request = new Request(url, requestOptions);

return fetch(request);

}