import * as actions from "./actionTypes"
import "firebase/auth";
import firebase from "firebase/app"


const registerUser = (credentials) => {
    return (dispatch) => {

        dispatch(registerUserStart());
        firebase.default.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
            var db = firebase.firestore();
            db.collection("users").doc(credentials.email).set({
                username : "",
                photoUrl : "",
            })
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(() => {
                    const newUser = firebase.auth().currentUser;
                    newUser.sendEmailVerification()
                    .then(res => {
                        firebase.auth().signOut().then(() => {
                            dispatch(registerUserSuccess("Success"));
                        })
                    })
                })
            })    
        })
        .catch(err => {
            dispatch(registerUserFailure(err.message));
        });
    };
};



const getCurrentUser = () => {
    return (dispatch) => {

        dispatch(getCurrentUserStart());
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null && user !== undefined) {
                const email = user.email;
                const emailVerified = user.emailVerified;
                const uid = user.uid;
                var db = firebase.firestore();
                var docRef = db.collection("users").doc(email);

                docRef.get().then((doc) => {
                    if (doc.exists && emailVerified) {
                        const userClean = {'name': doc.data().username, 'email' : email, 'photoUrl' : doc.data().photoUrl, 'emailVerified' : emailVerified, 'uid' : uid};
                        dispatch(updateCurrentUser(userClean));
                        return true;
                    }
                    else{
                            firebase.auth().signOut().then(function() {
                                dispatch(noCurrentUser());
                                return false;
                            })
                    }
                }) 
            } 
            else {
                dispatch(noCurrentUser());
                return false;
            }
          });
        
    };
};





const loginUser = (credentials) => {
    return async (dispatch) => {
    
      dispatch(loginUserStart());
      firebase.default.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
            const user = firebase.auth().currentUser;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const uid = user.uid;
            var db = firebase.firestore();
            var docRef = db.collection("users").doc(email);

            docRef.get().then(doc => {
                if(doc.exists && emailVerified)
                {
                    const userClean = {'name': doc.data().username, 'email' : email, 'photoUrl' : doc.data().photoUrl, 'emailVerified' : emailVerified, 'uid' : uid};
                    dispatch(loginUserSuccess(userClean));
                }
                else{
                        firebase.auth().signOut().then(function() {
                            dispatch(loginUserFailure("Verify Email"));
                        })
                }
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(loginUserFailure(err.message));
        })
    };
};





const signoutUser = () => {
    return async (dispatch) => {

        dispatch(signoutUserStart());
        firebase.auth().signOut()
        .then(() => {
            dispatch(signoutUserSuccess());
        })
        .catch((err) => {
            dispatch(signoutUserFailure(err.message));
          });
    }
}





const loginUserStart = () => ({
    type : actions.LOGIN_USER_START
});

const loginUserSuccess = (data) => ({
    type : actions.LOGIN_USER_SUCCESS,
    payload : data
});

const loginUserFailure = (error) => ({
    type : actions.LOGIN_USER_FAILURE,
    payload : error
});





const registerUserStart = () => ({
    type : actions.REGISTER_USER_START
});


const registerUserSuccess = (data) => ({
    type : actions.REGISTER_USER_SUCCESS,
    payload : data
});


const registerUserFailure = (error) => ({
    type : actions.REGISTER_USER_FAILURE,
    payload : error
});





const getCurrentUserStart = () => ({
    type : actions.GET_CURRENT_USER_START
});



const updateCurrentUser = (data) => ({
    type : actions.UPDATE_CURRENT_USER,
    payload : data
});



const noCurrentUser = () => ({
    type : actions.NO_CURRENT_USER,
    payload : "No logged in user"
});



const signoutUserStart = () => ({
    type : actions.SIGNOUT_USER_START
});



const signoutUserSuccess = () => ({
    type : actions.SIGNOUT_USER_SUCCESS,
});


const signoutUserFailure = (error) => ({
    type : actions.SIGNOUT_USER_FAILURE,
    payload : error
});




export {registerUser, loginUser, getCurrentUser, signoutUser};


  
 