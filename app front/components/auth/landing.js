import React from 'react'
import { connect } from 'react-redux'

import Register from './register'
import Login from './login'

//Basic structure of the landing page
export const Landing = () => (
    <div>
    	<h1>Welcome to Landing Page</h1>
    	<table id='landingpage' className="main">
		    <tbody>
				<tr>
					<td>
						<Register />
					</td>
					<td>
						<Login />
					</td>
				</tr>
			</tbody>
		</table>
    </div>
)

export default connect(
)(Landing)