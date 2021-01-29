// init the state and change the state
const Reducer =(state={
	errRegInfo:'',
	errLogInfo:'',
	errUpdateInfo:'',
    	errProfileInfo:'',
    	errLinkInfo:'',
	location:'',
	user:{},
	followerList: [],
	articles: [],
	articlesFilt: []
},action)=>{
	switch (action.type){
		case 'TO_OUT':
			return {...state,
					location:"LANDING_PAGE",
					user:{},
					articles:[],
					articlesFilt:[],
					followerList:[],
					errRegInfo:'',
					errLogInfo:'',
					errUpdateInfo:'',
					errProfileInfo:''}
		case 'TO_MAIN_PAGE':
		    window.alert("mainpage")
			return {...state,
					location:"MAIN_PAGE"}
        	case 'TO_PROFILE_PAGE': 
			return {...state,
					location:"PROFILE_PAGE",
					errUpdateInfo:''}
        	case 'CLEAN':
                	return {...state,
                    			followerList: [],
                    			articles: []}
		case 'IS_REG_ERROR':
			return {...state,
					errRegInfo: action.errRegInfo}
		case 'IS_LOG_ERROR':
			return {...state,
					errLogInfo:action.errLogInfo}
		case 'IS_UPDATE_ERROR':
			return {...state,
					errUpdateInfo:action.errUpdateInfo}
        	case 'IS_PROFILE_ERROR':
			return {...state,
					errProfileInfo:action.errProfileInfo}
        	case 'IS_LINK_ERROR':
			return {...state,
					errLinkInfo:action.errLinkInfo}
		case 'UPDATE_HEADLINE':
			window.alert(JSON.stringify(action.headline))
			return {...state,
					user:{
						...state.user,
						name:action.username,
					    headline:action.headline
					}
			}
		case 'UPDATE_ARTICLES': 
            		return {...state,
                			articles: action.articles,
                			articlesFilt: action.articles}
        	case 'UPDATE_AVATAR':
            		return {...state,
              				user:{
						...state.user,
						avatar:action.avatar}
        		}
		case 'REGISTER':
			return {...state,
					user: action.user}
		case 'LOG_IN':  
			window.alert(JSON.stringify(action.user))
			return {...state,
					user: action.user}
		case 'ADD_ARTICLE':
			 return {...state,
					articles: [...state.articles,
						{
							author:'',
							text: action.articles.text,
							timestamp:'',
							picture:action.articles.img
						}]
			}
		case 'ADD_FOLLOWING': 
			return {...state,
					followerList: [ 
					    ...state.followerList,
					    action.followerList]
			}
		case 'INIT_PROFILE':
            		return {...state,
                			user: {
					    ...state.user,
					    email: action.newuser.email,
					    zipcode: action.newuser.zipcode,
					    dob: action.newuser.dob,
					    avatar: action.newuser.avatar
					}
			}
		case 'RESUME_ARTICLES':
			return {...state,
					articlesFilt: state.articles}
        	case 'FILTER_ARTICLES':
            		return {
				...state,
				articlesFilt: state.articles.filter((article) => {
				    if(article.author.indexOf(action.keyWord) == -1 && article.text.indexOf(action.keyWord) == -1) {
					return false;
				    }
				    return true;
				})
            		}
		default:
			return state
	}
}
export default Reducer
