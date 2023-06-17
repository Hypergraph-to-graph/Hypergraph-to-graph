import { request } from "./request";

export function createUser(data){
    return request({
        url:'/identity',
        method: 'post',
        data: data,
        dataType: 'jsonp'

    })
}