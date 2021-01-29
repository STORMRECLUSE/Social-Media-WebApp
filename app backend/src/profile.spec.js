const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const resource = (method, endpoint, payload) => {
	const url = `http://localhost:3000/${endpoint}`
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


describe('validate PUT /headline', ()=>{

    it('should GET headline for hx12', done=>{
        resource('GET', 'headlines/hx12')
        .then(body=>{
            expect(body.headlines).to.be.ok
			expect(body.headlines.length).to.be.at.least(1)
			const headline = body.headlines[0]
			expect(headline.username).to.be.eql('hx12')
			expect(headline.headline).to.be.ok
        })
        .then(done).catch(done)
    })

    it('should PUT headline for hx12', done=>{
        const headline = "something different"
        resource('PUT','headline',{headline})
        .then(body=>{
			expect(body.username).to.be.eql('hx12')
			expect(body.headline).to.be.eql(headline)
        })
        .then(done).catch(done)
    })

})