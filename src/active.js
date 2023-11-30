import React, { useState, useEffect, useRef } from 'react';
import {useAuth} from "./hooks/useAuth"
import configData from "./config.json"

function RunningMeetings({socket}) {
    var {socket} = socket
    const [waitingMeetings, setWaitingMeetings] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isChanged, setisChanged] = useState(false);
    const mounted = useRef();
    const {user} = useAuth()
    const listItems = () => waitingMeetings.map(meeting => {
        <li>{meeting}</li>
    })
    const changeState = () =>{
         setisChanged(!isChanged);
    }
    const fetchData = ()=>{
      const requestOptions = {
        headers: { 'Authorization': 'Bearer ' +  user.token},
      };
        fetch('http://' + configData.ip + ':3000/api/meetings/running', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setWaitingMeetings(data);
                setLoaded(true)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(() => {

        socket.on('update-state', (data) => changeState());
        if (!mounted.current) {
            console.log(loaded)
            socket.emit("client");
            fetchData();
            mounted.current = true;
          } else {
            if (loaded){
                console.log("lol")
                setLoaded(false);
                fetchData();
            }
          }
    }, [isChanged, socket]);
    const end_meeting = (id)=>{
      const requestOptions = {
        method: 'GET',
        headers: {'Authorization':'Bearer ' +  user.token},
      };
      fetch(`http://${configData.ip}:3000/api/meetings/end/${id}`, requestOptions)
        .then(response => response.json()).then((response) => {
          if (response.ok == false) alert("نعتذر عن حدوث خطأ");
        }).catch((err)=>alert("نعتذر عن حدوث خطأ"))
    }
    return (
      <div style={{padding:0, margin:0}}>
        {!loaded ? (
          <h1>loading   </h1>
        ) : (
            <ul style={{padding:0}}>
                {waitingMeetings.map((meeting)=>{
                    return (<div class="card card-body mb-4 bg-success">
                    <p class="card-text-1 alignedcard text-white"><label style={{fontWeight:'bold'}}>الرتبة :  &nbsp;</label><label>{meeting.rank.name}</label></p><hr></hr>
                    <p class="card-text-1 alignedcard text-white" ><label style={{fontWeight:'bold'}}>الاسم :  &nbsp;</label><label> {meeting.name}</label></p><hr></hr>
                    <p class="card-text-1 alignedcard text-white"><label style={{fontWeight:'bold'}}> الجهة : &nbsp;</label><label> {meeting.org}</label></p><hr></hr>
                    <p class="card-text-1 alignedcard text-white" ><label style={{fontWeight:'bold'}}>سبب الزيارة :  &nbsp;<span> </span></label><label> {meeting.visit_reason}</label></p><hr></hr>
                    <p class="card-text-1 alignedcard text-white" ><label style={{fontWeight:'bold'}}>الملاحظات :   &nbsp; </label><label> {meeting.notes?meeting.notes:"بدون ملاحظات"}</label></p>
                    {user.role=="admin"?<div class=" row">
            
                      <button href="#" class="btn btn-dark col-md-6" style={{margin:"0 auto"}} onClick={()=>end_meeting(meeting.id)}>انهاء</button>
							
						      </div>:(<></>)}
                  </div>)
                })}
          </ul>
        )}
      </div>
    );
  }
  function Example() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  export default RunningMeetings;