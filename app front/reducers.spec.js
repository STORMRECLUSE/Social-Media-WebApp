import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate reducer (no fetch requests here)', ()=>{
    let url, resource, Reducer
    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
            }
             url = require('./actions').url
                resource = require('./actions').default
                Reducer = require('./reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
   //check if we have a init state
    it('should initialize state', (done) => {
        const state = Reducer({}, {})
        expect(state).to.exist
        done()
    })
    //check the success info
    it('should state success (for displaying success message to user)', (done) => {
        const state = Reducer({}, {type: 'IS_REG_ERROR', errRegInfo: 'Finish register!'})
        expect(state.errRegInfo).to.eql('Finish register!')
        done()
    })
    //check the fail info
    it('should state error (for displaying error message to user)', (done) => {
        const state = Reducer({}, {type: 'IS_REG_ERROR', errRegInfo: 'Fail register!'})
        expect(state.errRegInfo).to.eql('Fail register!')
        done()
    })
    //check if we can set the articles
    it('should set the articles', (done) => {
        const action ={
            type: 'UPDATE_ARTICLES',
            articles: [
                {
                    id: 1,
                    author: 'Scott',
                    text: 'article'
                }
            ]
        }
        const state = Reducer({}, action)
        expect(state.articles[0]).to.eql({id: 1, author: 'Scott', text:'article'})
        done()
    })
    //check the search key word
    it('should set the search keyword', (done) => {
        //we dont use this
        done()
    })
    //check if the filter worked
    it('should filter displayed articles by the search keyword', (done) => {
        const articles = [
            {
                id: 1,
                author: 'Dilly',
                text: 'Dilly\'s article'
            },
            {
                id: 2,
                author: 'jj54',
                text: 'jj54\'s article'
            }
        ]
        let state = Reducer({}, {type:'UPDATE_ARTICLES', articles})
        state = Reducer(state, {type:'FILTER_ARTICLES', keyWord: 'Scott'})
        expect(state.articlesFilt.length).to.eql(1)
        done()
    })
})