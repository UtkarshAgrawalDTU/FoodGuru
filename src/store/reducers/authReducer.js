import * as actions from "../actions/actionTypes"


const initState = {
    currentUser : null,
    error : null,
    loading : true,
    success : null
}

const authReducer = (state = initState, action) => {

    switch(action.type){
        
        case actions.GET_CURRENT_USER_START:
            return{
                ...state,
                loading : true,
            }


        case actions.UPDATE_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload,
                error : null,
                loading : false,
                success : true,
            }


        case actions.NO_CURRENT_USER:
            return{
                ...state,
                currentUser: null,
                error : action.payload,
                loading : false,
                success : false,
            }

        case actions.REGISTER_USER_START:
            return{
                ...state,
                error : null,
                loading : true,
                success : null
            }

        case actions.REGISTER_USER_SUCCESS:
            return{
                ...state,
                error : null,
                loading : false,
                success : "Registration Successful",
            }

        case actions.REGISTER_USER_FAILURE:
            return{
                ...state,
                loading : false,
                error: action.payload,
                success : false,
            }

            case actions.LOGIN_USER_SUCCESS:
                return{
                    ...state,
                    currentUser : action.payload,
                    error : null,
                    loading : false,
                    success : true,
                }
            case actions.LOGIN_USER_FAILURE:
                return{
                    ...state,
                    loading : false,
                    error: action.payload,
                    success : false,
                }

            case actions.LOGIN_USER_START:
            return{
                ...state,
                error : null,
                loading : true,
                success : null,
            }


            case actions.SIGNOUT_USER_SUCCESS:
                return{
                    ...state,
                    currentUser : null,
                    error : null,
                    loading : false,
                    success : true,
                }
            case actions.SIGNOUT_USER_START:
                return{
                    ...state,   
                    loading : true,
                    success : null,
                }

            case actions.SIGNOUT_USER_FAILURE:
            return{
                ...state,
                error : action.payload,
                loading : false,
                success : false,
            }
            
        default:
            return state;
        }
}

export default authReducer