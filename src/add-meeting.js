import { useEffect, useState, useRef } from 'react';
import { useForm ,} from 'react-hook-form';
// import { Field } from "./Field.js";
import configData from "./config.json"
function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dropdown, setDropDown] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const mounted = useRef();

  const fetchData = ()=>{
    fetch('http://' + configData.ip + ':3000/api/ranks/all')
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
  const onSubmit = (data) => {
    
    data.userId = 4
    data.rank = (data.rank);
    console.log(data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('http://' + configData.ip + ':3000/user/add', requestOptions)
        .then(response => response.json())
        // .then(data => alert(JSON.stringify(data)));
    
  };

  return (
    <div>
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
        {
        loaded?(
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>الاسم</label>
        <input {...register("name", { required: true})} />
        {errors.name && <p>يجب ادخال اسم الزائر</p>}
        <br/>
        <label>سبب الزيارة</label>
        <input  {...register("visit_reason", { required: true })} />
        {errors.visit_reason && <p>يجب ادخال سبب الزيارة</p>}
        <br/>
        <label>ملاحظات</label>
            <textarea {...register("notes")} id="notes" rows={10} />
            <br/>
            <select {...register("rank")}>
            {dropdown.map((li)=>{
                return <option value={li.id}>{li.name}</option>
        })}
        {/* <option value={dropdown[0].name}></option> */}
        </select>
        <br/>
            <button type="submit">Submit</button>
        </form>
    ):(<h1>loading</h1>)}
    </div>
  );
}

export default LoginForm;
