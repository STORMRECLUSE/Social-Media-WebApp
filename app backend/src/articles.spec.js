const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

let len = null

const resource = (method, endpoint, payload) => {
	const url = `http://localhost:3001/${endpoint}`
	const options = { method, headers: { 'Content-Type': 'application/json' }}
	if (payload) options.body = JSON.stringify(payload)
	return fetch(url, options).then(r => {
			if (r.status == 200) {
				return r.json()
			} else {	
				const msg = `ERROR ${method} ${endpoint} returned ${r.status}`
				console.error(msg)
				throw new Error(msg)
			}
		})
}


describe('Validate POST /article', ()=>{

    it('should GET articles', done=>{

        resource('GET','articles')
        .then((response) => {
            expect(response.articles.length).to.be.at.least(1)
            len = response.articles.length
        })
        .then(done)
        .catch(done)
    })

    it('should POST a new articles', done=>{
        const text = 'just for test'
        resource('POST','article', {text})
        .then((response)=>{
            expect(response.text).to.eql(text)
        })
        .then(done).catch(done)
    })

    it('should GET articles with length + 1', done=>{
        resource('GET', 'articles')
        .then(body=>{
            expect(body.articles.length).to.eql(len + 1)
        })
        .then(done).catch(done)
    })
})