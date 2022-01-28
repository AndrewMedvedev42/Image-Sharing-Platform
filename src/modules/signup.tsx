import {Link} from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export const SignUpPage = () => {

//COMPONENT'S STATES
            const [userFirstName, setUserFirstName] = useState("")
            const [userLastName, setUserLastName] = useState("")
            const [userName, setUserName] = useState("")
            const [userEmail, setUserEmail] = useState("")
            const [userPassword, setUserPassword] = useState("")
//USE NAVIGATE TO MOVE BETWEEN PAGES
                const history = useNavigate();
//VAILDATION SYMBOLS TO CHECK IF TYPED EMAIL OR PASSWORD CAN BE USED AS REAL EMAIL AND PASSWORD
                const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                const passwordValidation = /^\S+$/
//PROCESS OF DEPLOYING REGISTER INFO INTO DATABASE
            const startRegisterProcess = (e:React.ChangeEvent<any>) => {
                e.preventDefault();
                const ifEmptyUserData = (i:string) => {
                        if (!Boolean(i) && !isNaN(Number(i))) {
                            return "--"
                        }else{
                            return i
                        }
                }
//FINDS IF EMAIL ALREADY EXISTS AND CHECKS IF TYPED EMAIL OR PASSWORD CAN BE USED AS REAL EMAIL OR PASSWORD
                if (userEmail.match(emailValidation)) {
                    if(userPassword.match(passwordValidation)){
                            axios
                            .get(`https://localhost:5000/api/v1/login_register?email=${userEmail}`)
                            .then(res => alert("Sorry, account with this email already exists."))
                            .catch(err => {
                                //IF EMAIL NOT FOUND, CREATES NEW USER ACCOUNT
                                const bodyData = {
                                    firstName:ifEmptyUserData(userFirstName),
                                    lastName:ifEmptyUserData(userLastName),
                                    userName:ifEmptyUserData(userName),
                                    email:userEmail,
                                    password:userPassword,
                                    toDoList:[]
                                }
                                //POSTS NEW USER INFO INTO DATABASE
                                axios
                                    .post(`http://localhost:5000/api/v1/login_register`, bodyData)
                                    .then(res => {
                                        alert("Account successfully registered");
                                        history(`/login`)
                                    })
                                    .catch(err => {
                                        alert("Please, type your details correctly")
                                    });
                        })
                    }else{
                        alert("Password is typed incorrectly, please try again.")
                    }
                } else {
                    alert("Email is typed incorrectly, please try again.")
                }
            } 

    return (
        <div onSubmit={startRegisterProcess} className="page-container sign-up-page-container">
            <form action="" className="user-form">
                <h2>Sign up</h2>
                <input type="name" className="form-control" placeholder="First name" onChange={(e)=>setUserFirstName(e.target.value)}/>
                <input type="name" className="form-control" placeholder="Last name" onChange={(e)=>setUserLastName(e.target.value)}/>
                <input type="username" className="form-control" placeholder="Username" onChange={(e)=>setUserName(e.target.value)}/>
                <input type="email" className="form-control" placeholder="Email" defaultValue="" onChange={(e)=>setUserEmail(e.target.value)}/>
                <input type="password" className="form-control" placeholder="Password" defaultValue="" onChange={(e)=>setUserPassword(e.target.value)}/>
                <input type="submit" value="Sign up"/>
                <Link to="/login">Log in</Link>
            </form>
        </div>
    )
}