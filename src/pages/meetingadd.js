import Helmet from 'react-helmet'
import "./css/style.css"
import "./css/meetingadd.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import {useAuth} from "../hooks/useAuth"
import configData from "../config.json"

function MeetingAdd(socket){
    const {logout} = useAuth()
    const {user} = useAuth()
    const soc = socket.socket
    const navigate = useNavigate();
    const [dropdown, setDropDown] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const mounted = useRef();
    const handlelogout = ()=>{
        logout(soc)
    };
    const fetchData = ()=>{
        const requestOptions = {
			headers: { 'Authorization': 'Bearer ' +  user.token},
		};
        console.log(requestOptions)
        fetch('http://' + configData.ip + ':3000/api/ranks/all', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setDropDown(data);
                console.log(data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(()=>{
        if (!mounted.current){ 
        fetchData();
        mounted.current = true
        }
      }, []);
      const handleSubmit = (e) => {
        e.preventDefault()
        
        var {name, org, visit_reason, notes, rank} = document.forms[0]
        var data = {name:name.value, org:org.value, visit_reason:visit_reason.value, notes:notes.value, rank:rank.value}
        const requestOptions = {
            method: 'POST',
			headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' +  user.token },
            body: JSON.stringify(data)
		};
        fetch('http://' + configData.ip + ':3000/api/meetings/add', requestOptions)
            .then(response => {var re = response.json(); if (response.ok == false){throw new Error("برجاء مراجعة البيانات المدخلة")}else{alert("تم اضافة الزائر بنجاح");navigate("/clienthome")}}).catch((error)=>alert(error))
            // .then(data => alert(JSON.stringify(data)));
        
      };
    return (
        <>
        {loaded?(
            <div>
            <Helmet>
            {/* <title>Contact Form </title> */}
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            
            </Helmet>
    <div className="righttol" >
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5" >

<div className="container-fluid row" >
    <div className="col-md-6">
            <button className="btn btn-dark styledbtn"  onClick={handlelogout}>تسجيل خروج</button>
    </div>
    <div className="col-md-6 " id="navbarTogglerDemo03" >
        
        <button className="btn btn-dark styledbtn" onClick={()=>navigate("/")}>الصفحة الرئيسية</button>
          
    </div>
    
</div>
</nav>
<div className="container">

<div className="row justify-content-center" style={{direction:'ltr'}}>
    <div className="col-lg-10">
        <div className="wrapper img bgim">
            <div className="row">
                <div className="col-md-9 col-lg-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                        <h2 className="mb-4 text-center" style={{fontWeight:'bold'}}>بيانات الزائر</h2>
                        <form onSubmit={(e)=>handleSubmit(e)} id="contactForm" name="contactForm" className="contactForm">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label" for="name">الرتبة</label>
                                        <select name="rank" id="cars" type="text" className="form-control" >
                                        
                                                {dropdown.map((li)=>{
                                                    return <option value={li.id}>{li.name}</option>
                                                })}
                                        </select>
                                        
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label" for="name">الاسم</label>
                                        <input type="text" className="form-control" name="name" id="name" placeholder="الاسم"/>
                                    </div>
                                </div>
                                <div className="col-md-12"> 
                                    <div className="form-group">
                                        <label className="label" for="text">الجهة</label>
                                        <input type="text" className="form-control" name="org" id="subjec" placeholder="الجهة"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label" for="subject">سبب الزياره</label>
                                        <input type="text" className="form-control" name="visit_reason" id="subject" placeholder="سبب الزيارة"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label" for="#">اضافة ملاحظات</label>
                                        <textarea name="notes" className="form-control" id="message" cols="30" rows="4" placeholder="الملاحظات"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="submit" value="ادخل البيانات" className="btn btn-primary"/>
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
	</div>
    
    </div>):<h1>Loading</h1>}
    </>
    )

}

export default MeetingAdd