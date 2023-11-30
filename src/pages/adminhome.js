import Helmet from 'react-helmet'
import "./css/style.css"
import "./css/adminhome.css"
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import RefusedMeetings from '../refused';
import RunningMeetings from '../active';
import { useEffect, useRef, useState } from 'react';
import MeetingsNeedsAction from '../homepage';
import {Toast} from 'bootstrap';


function AdminHome(socket){
    const toastRef = useRef();
    const {logout} = useAuth()
    const navigate = useNavigate();
    const soc = socket.socket
    const mounted = useRef();
    const handlelogout = ()=>{
        console.log(soc)
        logout(soc)
    }
    useEffect(() => {
        if (!mounted.current) {
            soc.emit("admin")
            mounted.current = true;
          } else {
        
        soc.on('added-meeting', (msg)=>{
			var element = document.getElementById("toast");
				document.getElementById("me-auto").innerHTML = `تم اضافة زائر جديد`
                document.getElementById("met-bod").innerHTML = `بواسطة : ${msg.username}
                <br/>
                اسم الزائر:  ${msg.name}
                `
			var myToast = new Toast(element, {autohide:false});
			myToast.show();
		});}
            }, [soc]);
    return (
        <>
        <Helmet>
        {/* <title>Admin Home Page</title> */}
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	
        {/* <link href="css/styles.css" rel="stylesheet" /> */}
        {/* <style>
            body {
                background-image: url("images/bg-masthead.jpg");
            }
            p{
                color: rgb(22, 22, 25)
            }
        </style> */}
    </Helmet>
    <div class = "toast-container">  
				<div class = "toast p-2" id = "toast" ref={toastRef} >  
					<div class = "toast-header">  
						<strong className = "me-auto" id='me-auto'> Heading Toast </strong>  
						<button type = "button" class = "btn-close" data-bs-dismiss = "toast"> </button>  
					</div>  
					<div class = "toast-body" id='met-bod'>  
						<p> Bootstrap 5 Toast Function </p>  
					</div>
				</div>  
			</div> 
    <div className="righttol" >
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5" >

<div className="container-fluid row" >
<div className="col-md-4">
        <button className="btn btn-dark"  onClick={handlelogout}>تسجيل خروج</button>
    </div>
    
    <div className="col-md-4">
        <button className="btn btn-dark" >ادارة المستخدمين </button>
    </div>
    <div className="col-md-4 " id="navbarTogglerDemo03" >
        
        <button className="btn btn-dark " onClick={()=>navigate("/")}>الصفحة الرئيسية</button>
          
    </div>
   
    
</div>
</nav>


<div class="container ">
			{/* <div class="row">
				<h3 class="col-md-4 text-center font-weight-bold ">المقابلات الجارية</h3>
				<h3 class="col-md-4 text-center font-weight-bold">المقابلات المرفوضة</h3>
				<h3 class="col-md-4 text-center font-weight-bold">المقابلات الجديده</h3>	
			</div> */}

			<div class="card-deck row m-2">
				<div class="col-md-6" >
				<h3 class="text-center font-weight-bold ">المقابلات الجارية</h3>
					<RunningMeetings socket={socket}/>
				</div>
				<div class="col-md-6" >
				<h3 class="text-center font-weight-bold">المقابلات الجديده</h3>
					<MeetingsNeedsAction socket={socket}/>
				</div>
			</div>		

		</div>
	</div>
    
    </>
    )
}

export default AdminHome