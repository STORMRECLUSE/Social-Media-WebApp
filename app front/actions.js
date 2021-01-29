import fetch from 'isomorphic-fetch'

export const url = 'https://back99.herokuapp.com'

export const resource = (method, endpoint, payload,isJson=true) => {
    const options =  {
        method,
        credentials: 'include',
    }
if (isJson) options.headers = {'Content-type':'application/json'}

  if (payload) options.body = isJson? JSON.stringify(payload) : payload


    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                 throw new Error(r.statusText)
            }
        })
}