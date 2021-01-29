import React, { Component, PropTypes } from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import mockery from 'mockery'
import { ArticlesView } from './articlesView'


describe('ArticlesView (component tests)', ()=>{

    let url, resource, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
            }
            url = require('../../actions').url
            resource = require('../../actions').default
            Reducer = require('../../reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
   //check if it is possible to render the articles
    it('should render articles', ()=>{
        const articles = [{_id: 1, author: 'Scott', date: '2015-08-08T09:39:06.195Z', comments: [] }]
        const node = shallow(
                <ArticlesView articlesFilt={articles} resumeArticles={_=>_} filterArticles={_=>_} />
        )
        expect(node.children().length).to.eql(2)
        expect(node.find('table').children().length).to.eql(1)

    })
    //check if it is possible to create a new article
    it('should dispatch actions to create a new article', ()=>{
        const state = Reducer({articles:[{text: 'article1'}]}, {type: 'ADD_ARTICLE', text: 'article2'})
        const node = shallow(
                <ArticlesView articlesFilt={state.articles} resumeArticles={_=>_} filterArticles={_=>_} />
        )
        expect(node.children().length).to.eql(2)
        expect(node.find('table').children().length).to.eql(2)

    })

})