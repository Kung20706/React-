export default function PostSignIn(username, pwd, callback){
    let url = 'http://localhost:8080/todo-list/login?username='+username+'&pwd='+pwd; // XXX
    fetch(url,{
        method: 'POST',
    }).then(function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }else {
            var error = new Error(response.statusText)
            error.response = response;
            throw error;
        }
    }).then(function(data) {
        console.log('request successful', data); 
        var dataStr = JSON.stringify(data)
        var obj = JSON.parse(dataStr);
        callback(obj.token)
    }).catch(function(error) {
        console.log('request failed status', error);
        callback('')
    });
} 