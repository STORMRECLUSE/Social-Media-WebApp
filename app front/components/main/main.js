import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeadLine from './headline'
import Nav from './nav'
import Following from './following'
import Article from '../article/article'
//basic structure for main page
export const Main = ({}) => (
     <div>
        <header>
        	<Nav />
        </header>
        <h1>Welcome to Main Page</h1>
        <table className="main">
		    <tbody>
				<tr>
					<td className='up'>
						<div className="card1">
							<HeadLine/>
						</div>
						<div className="card1">
							<Following followerList=
								{require('../../data/followers.json').followings}/>
						</div>
					</td>
					<td className='up'>
						<div className="card1">
							<Article/>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
    </div>
)

export default connect(
)(Main)