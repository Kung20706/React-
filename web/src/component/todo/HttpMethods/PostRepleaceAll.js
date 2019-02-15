export default function PostRepleaceAll(token, data, callback){
    let url =  'http://localhost:8080/todo-list/repleaceAll?token='+token+'&jsoninfo='+encodeURIComponent(data);
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
    }).then(function(data) {// XXX
        console.log('request successful ', data); 
        var obj = JSON.parse(data);
        callback(obj)
    }).catch(function(error) {// TODO
        console.log('request failed status', error);
        callback(null)
    });
} 