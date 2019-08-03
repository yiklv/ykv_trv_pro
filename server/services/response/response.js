var response = {};

response.errResponse = (message) => {
    return new Promise((resolve, reject) => { reject({ message: message}) });
}

response.emptyResponse = () =>{
    return new Promise((resolve, reject) => { resolve([]) });

}

response.setResponse = (val) =>{
    return new Promise((resolve, reject) => { resolve(val) });
}


module.exports = response;