import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Article actions', () => {
    let url, resource, Reducer, initArticles

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
            }
            url = require('../../actions').url
            resource = require('../../actions').default
            Reducer = require('../../reducers').default
            initArticles = require('./articleActions').initArticles
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
    //check if it is possible to fetch articles
    it('should fetch articles (mocked request)', (done) => {
        mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { articles: [{id:1, author:'Scott', text:'hello world'}] }
        })

        let callCount = false
        initArticles()(
            (response) => {
                if(callCount) {
                    expect(response.articles).to.eql([{id:1, author:'Scott', text:'hello world'}])
                    done()
                } else {
                    callCount = !callCount
                }
            }
        )

    })
    it('should update the search keyword', (done) => {\
        done()
    })

})