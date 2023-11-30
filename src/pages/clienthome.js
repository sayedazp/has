import Helmet from 'react-helmet'
import "./css/style.css"
import "./css/clienthome.css"
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import RefusedMeetings from '../refused';
import RunningMeetings from '../active';
import { useEffect, useRef } from 'react';
import MeetingsNeedsAction from '../homepage';
// import "bootstrap/dist/js/bootstrap.bundle"
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
// import { Alert, Button, Collapse, Tooltip, Popover, Toast } from 'bootstrap'
// window.bootstrap = {
//     Alert, Button, Collapse, Tooltip, Popover, Toast
// }
 import {Toast} from 'bootstrap';
function ClientHome(socket){
	const toastRef = useRef();
	const {logout, user} = useAuth()
	const navigate = useNavigate();
	const soc = socket.socket

	// alert({{socket}})
	const handlelogout = ()=>{
		console.log(soc)
        logout(soc)
    }
	useEffect(() => {
        soc.on('notify', (msg)=>{
			
			var element = document.getElementById("toast");
			if (msg.state == "end"){
				document.getElementById("me-auto").innerHTML = `تم انهاء المقابلة الخاصة بالزائر ${msg.name}`

			}else if (msg.state == "wait"){
				document.getElementById("me-auto").innerHTML = `المقابلة الخاصة بالزائر ${msg.name} قيد الانتظار`

			}
			else if(msg.state == "reject"){
				document.getElementById("me-auto").innerHTML = `تم رفض المقابلة الخاصة بالزائر  ${msg.name}`

			}
			else{
				document.getElementById("me-auto").innerHTML = `تم قبول المقابلة الخاصة بالزائر ${msg.name}`

			}
			var myToast = new Toast(element, {autohide:false});
			myToast.show();
		});
            }, [soc]);
    return (
        <>
        <Helmet>
        {/* <title>client Home Page</title> */}
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </Helmet>
	<div class = "toast-container">  
				<div class = "toast p-2" id = "toast" ref={toastRef} >  
					<div class = "toast-header">  
						<strong className = "me-auto" id='me-auto'> Heading Toast </strong>  
						<button type = "button" class = "btn-close" data-bs-dismiss = "toast"> </button>  
					</div>  
					{/* <div class = "toast-body">  
						<p> Bootstrap 5 Toast Function </p>  
					</div> */}
				</div>  
			</div> 
    <div className="righttol" >
		<nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">

			<div class="container-fluid row" >
				<div class="col-md-4">
					<button className="btn btn-dark styledbtn"  onClick={handlelogout}>تسجيل خروج</button>
				</div>
				
				
				<div class="col-md-4 " id="navbarTogglerDemo03" >
					
					<button class="btn btn-dark styledbtn"onClick={()=>navigate("/")} >الصفحة الرئيسية</button>
					  
				</div>
				<div class="col-md-4">
					<button class="btn btn-dark styledbtn" onClick={()=>navigate("/meetingadd")}>تسجيل زائر</button>
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
				<div class="col-md-4" >
				<h3 class="text-center font-weight-bold ">المقابلات الجارية</h3>
					<RunningMeetings socket={socket}/>
				</div>
				<div class="col-md-4" >
				<h3 class="text-center font-weight-bold">المقابلات المرفوضة</h3>
					<RefusedMeetings socket={socket}/>
				</div>
				<div class="col-md-4" >
				<h3 class="text-center font-weight-bold">المقابلات الجديده</h3>
					<MeetingsNeedsAction socket={socket}/>
				</div>
			</div>

			 

		</div>

	</div>
    
    </>
    )
}

export default ClientHome