import Helmet from 'react-helmet'
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import "./css/style.css"
import "./css/styles.css"
function Home(){
    const toastRef = useRef();
    const navigate = useNavigate();

    return (
        <div>

        <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>منظومة المقابلات الشخصية</title>
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
    <div>
       <div class = "toast-container">  
				<div class = "toast p-2" id = "toast" ref={toastRef} >  
					<div class = "toast-header">  
						<strong className = "me-auto" id='me-auto'> Heading Toast </strong>  
						<button type = "button" class = "btn-close" data-bs-dismiss = "toast"> </button>  
					</div>  
					<div class = "toast-body" id='met-bod'>  
						<p></p>  
					</div>
				</div>  
			</div> 
            </div>
    <div id="page-top">
        <header className="masthead d-flex align-items-center">
            <div className="container px-4 px-lg-5 text-center">
                <h2 className="m-3">منظومة المقابلات الشخصية لرئيس الفرع المالى</h2>
                <p ><em> هى منظومة لتنظيم كل المقابلات التى تخص رئيس الفرع المالى</em></p>
                   <p> <em>لتسهيل ادارة الوقت وجدولة مواعيده بشكل احترافى</em></p>
                <button className="btn btn-dark p-3"  onClick={()=>navigate("/login")}> <span >هيا نبدأ</span>  </button>
                
            </div>
        </header>
    </div>
    </div>
    )
}

export default Home