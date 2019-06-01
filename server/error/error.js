const myError = (errMsg) =>{
	new Promise((resolve, reject) => {
    	//这里相当于throw一个异常了
    	reject(errMsg);
 	})
};

module.exports = {
	myError : myError
}