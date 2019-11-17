const request = require('request');
module.exports = {

    //Phương thức get
    API_Call_Get : function(url){
        return new Promise((resolve, reject) => {
            request.get(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    },
    //Phương thức post
    API_Call_Post : function(url){
        return new Promise((resolve, reject) => {
            request.post(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    },
    //Phương thức put
    API_Call_Put : function(url){
        return new Promise((resolve, reject) => {
            request.put(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    },
    //Phương thức delete
    API_Call_Delete : function(url){
        return new Promise((resolve, reject) => {
            request.delete(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    }

}