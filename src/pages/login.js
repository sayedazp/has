import React, {useEffect} from "react";
import Helmet from 'react-helmet'
import { useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
import "./css/style.css"
import "./css/login.css"
import configData from "../config.json"
function Login(){
	const navigate = useNavigate();
    const {user, login, navigator}  = useAuth();
	// alert("logged in")
    // login();
	const handleLogin = (e)=>{
		e.preventDefault()
		var {email, password} = document.forms[0]
		const data = {email:email.value, "password":password.value}
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		fetch('http://' + configData.ip + ':3000/api/login', requestOptions)
			.then(response => response.json()).then((response) => {
				// console.log(response);
				var {token, user_type} = response
				console.log(user_type)
				if (token) {login({token:token, role:user_type})} else {alert("خطأ في البيانات")}
			}).catch((err)=>alert("خطأ في البيانات"))
	}
	useEffect(()=>{
		if(user)navigator(user)})
    return (
		
        <>
<Helmet>
{/* <title>منظومة المقابلات الشخصية</title> */}
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	
	<link rel="stylesheet" href="css/style.css"/>

		
	</Helmet>
	<body>
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5" >

			<div className="container-fluid" >

					<button className="btn btn-dark styledbtn" onClick={()=> navigate("/")}> رجوع</button>
					  
                </div>
            </nav>
		<div className="container">
			
			<div className="row justify-content-center">
				<div className="col-lg-10">
					<div className="wrapper img styledbg" >
						<div className="row">
							<div className="col-md-9 col-lg-7">
								<div className="contact-wrap w-100 p-md-5 p-4">
									<h2 className="mb-4 text-center " >تسجيل الدخول</h2>
									<form id="contactForm" name="contactForm" className="contactForm" onSubmit={handleLogin}>
										<div className="row">
											<div className="col-md-12"> 
												<div className="form-group">
													<label className="label" for="email">البرد الالكتروني</label>
													<input type="email" className="form-control" name="email" id="email" placeholder="البريد الالكتروني"/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<label className="label" for="subject">كلمة السر</label>
													<input type="password" className="form-control" name="password" id="password" placeholder="كلمة السر"/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="submit" value="تسجيل الدخول" className="btn btn-primary" />
													<div className="submitting"></div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</body>
    </>
        )
}

export default Login