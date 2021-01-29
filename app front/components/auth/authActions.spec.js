import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Authentication (involves mocked requests)', () => {

    let url, resource, login, logout, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
            }
            url = require('../../actions').url
            resource = require('../../actions').default
            login = require('./authActions').login
            logout = require('./authActions').logout
            Reducer = require('../../reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

  //check if you are log in as a correct user
   it('should log in a user', (done)=>{
       const username = 'jj54'
       const password = 'remember-cover-october'
       const user={
            name:username,
            password:password
        }
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result: 'success' }
        })

        let callCount = true, state
        login({user})(
            (action) => {
                if(callCount) {
                    expect(action).to.eql({ type:'LOG_IN', user })
                    state = Reducer({}, action)
                    expect(state.user.name).to.eql(username)
                    callCount = !callCount
                } else {
                    done()
                }
            })
    })

    //check if you are log in as an invalid user
    it('should not log in an invalid user', (done) => {
        const username = 'unknown'
        const password = 'unknown'
        const user={
            name:username,
            password:password
        }
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

        login({user})(
            (action) => {
                expect(action).to.eql({ type:'IS_LOG_ERROR',  errLogInfo: 'Error log in as '+user.name+'!' })
                done()
            }
        )
    })
    //check if you have clear all the content when you log out
    it('should log out a user (state should be cleared)', (done) => {
        mock(`${url}/logout`, {
            method: 'PUT',
            headers: {'Content-Type': 'text/plain'}
        })

        let state = {user: {username: 'test'}}

        logout()(
            (action) => {
                expect(action).to.eql({ type:'TO_OUT'})
                state = Reducer(state, action)
                expect(state.user).to.eql({})
                done()
        })
    })

})