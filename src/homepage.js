import React, { useState, useEffect, useRef } from 'react';
import {useAuth} from "./hooks/useAuth"
import configData from "./config.json"
function MeetingsNeedsAction({socket}) {
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
        fetch('http://' + configData.ip + ':3000/api/meetings/needy', requestOptions)
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
    const update_state = (state, id)=>{
      const data = {state:state}
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Authorization':'Bearer ' +  user.token},
        body: JSON.stringify(data)
      };
      fetch(`http://${configData.ip}:3000/api/meetings/update-state/${id}`, requestOptions)
        .then(response => response.json()).then((response) => {
          if (response.ok == false) alert("نعتذر عن حدوث خطأ");
        }).catch((err)=>alert("نعتذر عن حدوث خطأ"))
    }
    return (
      <div>
        {!loaded ? (
          <h1>loading   </h1>
        ) : (
            <ul style={{padding:0}}>
                {waitingMeetings.map((meeting)=>{
                    return (<div className={`card card-body mb-4 ${meeting.state == "wait"?"bg-warning":"bg-light"}`} style={{justifyContent:"center"}}>
                    <p class="card-text-1 alignedcard"><label style={{fontWeight:'bold'}}>الرتبة : &nbsp;</label><label>{meeting.rank.name}</label></p><hr/>
                    <p class="card-text-1 alignedcard" ><label style={{fontWeight:'bold'}}>الاسم : &nbsp;</label><label>{meeting.name}</label></p><hr/>
                    <p class="card-text-1 alignedcard"><label style={{fontWeight:'bold'}}> الجهة : &nbsp; </label><label>{meeting.org}</label></p><hr/>
                    <p class="card-text-1 alignedcard" ><label style={{fontWeight:'bold'}}>سبب الزيارة : &nbsp;</label><label>{meeting.visit_reason}</label></p><hr/>
                    <p class="card-text-1 alignedcard" ><label style={{fontWeight:'bold'}}>الملاحظات : &nbsp;</label><label>{meeting.notes?meeting.notes:"بدون ملاحظات"}</label></p>
                    {user.role=="admin"?<div class="row center" style={{justifyContent:"center"}}>
                      <button href="#" class="btn btn-success col-md-4" onClick={()=>{update_state("accept", meeting.id)}}>قبول</button>
                      {meeting.state != "wait"?<button href="#" class="btn btn-warning col-md-4" onClick={()=>{update_state("wait", meeting.id)}}>انتظار</button>:""}
                      <button href="#" class="btn btn-danger col-md-4" onClick={()=>{update_state("reject", meeting.id)}}>رفض</button>
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
  export default MeetingsNeedsAction;