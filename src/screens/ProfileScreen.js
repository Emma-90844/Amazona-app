
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';


export default function ProfileScreen() {
    // To get the user id , we can use the redux store
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    // Getting user details from redux store
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id])


    // submithandler
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div> <h1>User Profile</h1></div>
                {
                    loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger"></MessageBox>
                        :

                        <>
                            {/* name */}
                            <div>
                                <label html="name">Name</label>
                                <input id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={user.name}>
                                </input>
                            </div>

                            {/* email */}
                            <div>
                                <label html="email">Email</label>
                                <input id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={user.email}>
                                </input>
                            </div>
                            {/* password */}
                            <div>
                                <label html="password">Password</label>
                                <input id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={user.password}>
                                </input>
                            </div>
                             {/* Confirm password */}
                             <div>
                                <label html="confirmPassword"> Confirm Password</label>
                                <input id="confirmPassword"
                                    type="password"
                                    placeholder="Enter confirm password"
                                    >
                                </input>
                            </div>

                            {/* update button */}
                           <div>
                               <label/>
                               <button className="primary" type="submit" >Update Profile</button>
                           </div>
                        </>
                }

            </form>

        </div>
    );
}
