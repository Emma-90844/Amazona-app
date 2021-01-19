
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import { updateUserProfile } from './../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


export default function ProfileScreen() {
    // Update user info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    // To get the user id , we can use the redux store
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    // Getting user details from redux store
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    // Data from the redux store
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);

        }
    }, [dispatch, userInfo._id, user]);



    // submithandler
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert("Password donot match")
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password
            }));
        }
    };



    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div> <h1>User Profile</h1></div>
                {
                    loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            {/*  */}
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                            {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                            
                            {/* name */}
                            <div>
                                <label html="name">Name</label>
                                <input id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                                </input>
                            </div>

                            {/* email */}
                            <div>
                                <label html="email">Email</label>
                                <input id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                            </div>
                            {/* password */}
                            <div>
                                <label html="password">Password</label>
                                <input id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}>

                                </input>
                            </div>
                            {/* Confirm password */}
                            <div>
                                <label html="confirmPassword"> Confirm Password</label>
                                <input id="confirmPassword"
                                    type="password"
                                    placeholder="Enter confirm password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </input>
                            </div>

                            {/* update button */}
                            <div>
                                <label />
                                <button className="primary" type="submit" >Update Profile</button>
                            </div>
                        </>
                }

            </form>

        </div>
    );
}









