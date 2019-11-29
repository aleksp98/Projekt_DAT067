
export const sendHTTP = (n)=>{
   const token= n;
const url = 'https://localhost:5001/api/User/ConfirmMail/' + token;
const headers = new Headers();
headers.append('Content-Type', 'application/json');
const requestOptions = {
    method: 'GET'
};
const request = new Request(url, requestOptions);

fetch(request).then();
}