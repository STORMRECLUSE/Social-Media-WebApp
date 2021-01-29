import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Profile actions (mocked requests)', () => {

    let url, resource, initProfile, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
            }
            url = require('../../actions').url
            resource = require('../../actions').default
            initProfile = require('./profileFormActions').initProfile
            Reducer = require('../../reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
    //check if we can fetch the user's profile
    it('should fetch the user\'s proile information', (done) => {

        mock(`${url}/email`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { email: 'test@test.com' }
        })
        mock(`${url}/zipcode`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { zipcode: 77005 }
        })
        mock(`${url}/dob`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { dob: '1990-01-01' }
        })
        mock(`${url}/avatars`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { avatars: [{avatar: 'avatar'}] }
        })

        let callCount = 0
        initProfile()(
            (response) => {
                expect(response.newuser.email).to.eql('test@test.com')
                expect(response.newuser.zipcode).to.eql(77005)
                expect(response.newuser.dob).to.eql('12/31/1989')
                expect(response.newuser.avatar).to.eql('avatar')
                done()
            }
        )
    })
  //check if we can update the headline
    it('should update headline', (done) => {
        let state = { user: {
            headline: 'previous headline'
        }}
        const action = {
            type: 'UPDATE_HEADLINE',
            username: 'username',
            headline: 'new headline'
        }
        state = Reducer(state, action)
        expect(state.user.headline).to.eql('new headline')
        done()
    })

})