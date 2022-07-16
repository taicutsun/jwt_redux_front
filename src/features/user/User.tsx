import React from 'react';
import '../../App.css';
import axios from 'axios';
import  {useEffect,useState}  from 'react';
import { Link, Navigate } from "react-router-dom";
//redux imports
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
  CheckUserPass,
  createUser,
  selectUserName,
 } from './userSlice';
//redux imports


export let tokens={
  accessToken:'',
  refreshToken:''
}

//for logged user
function UserMenu(){
const username = useAppSelector(selectUserName);
  const [status, setStatus] = useState(true);
 useEffect(() => {
    axios.post('http://localhost:3001/posts',{},{
      headers:{
        "Authorization": `Bearer ${tokens.accessToken}`
        }
    })
    .then((res) =>{
        console.log(res); 
        setTimeout(()=>{setStatus(false);},10000);
    })
    .catch(err=>{
        if (err.response) { console.log(err.response);}
         else if (err.request) { console.log('req')} 
         else { console.log('me')} 
    });
  });
if(status===true){
return(
<div id='menu'>
  Здраствуйте {username}
  <div id='menu'><button className='backButt'><Link className='Link' to="/">Назад</Link></button></div>
</div>
);}
else{
axios.post('http://localhost:3001/token',{
  token:`${tokens.refreshToken}`
},{})
.then((res) =>{
    console.log(res.data);
    setStatus(true);
})
.catch(err=>{
    if (err.response) { 
    console.log('whyrrr');
      } else if (err.request) { 
        console.log('req')
      } else { 
        console.log('me')
      } 
});
return( 
  <>
   {username} wait a second
    <div className='linkButt'><button><Link to="/">Back</Link></button></div>
  </>
    );
  }

}
//for logged user

//for new User
function CreateUser() {
const dispatch = useAppDispatch();
  const[status,setStatus] = useState(false);
  const [newuser, setNewUsername] = useState('');
  const [newpass, setNewPass] = useState('');
  const [secpass, setSecPass] = useState('');
  const [click, setClick] = useState(0);
  
  const user: CheckUserPass = {
    username:newuser,
    password:newpass,
    secPass:secpass
  }

useEffect(() => {
   if(newuser!=='' && newpass===secpass && newpass!==''){ setStatus(true); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[click]);

if(status){ return ( <Navigate to="/" /> ); }
else{
   return (
<>
  <div id='createWrap'>
    <div className='greating'>Введите данные для создания пользователя</div>
      <form>
          <label>Имя</label>
          <input 
          type="text" 
          name="username"
          id="username" 
          onChange={(e) => setNewUsername(e.target.value)}
          />
          <label>пароль</label>
          <input 
          type="text" 
          name="password" 
          id="addPass" 
          onChange={(e) => setNewPass(e.target.value)}
          />
          <label>подтвердите пароль</label>
          <input 
          type="text" 
          name="password" 
          id="addPass" 
          onChange={(e) => setSecPass(e.target.value)}
          />
      </form>
     <div> <button className='loginButt' onClick={ () =>{ dispatch(createUser(user)); setClick(click+1) } }>Создать пользователя</button></div>
      <div className='errorMass'> {secpass===newpass ? '' : 'проверте поля : подтверждения пароля и пароль'}</div>
      <div ><button className='backButt'><Link className='Link' to="/">Назад</Link></button></div>
  </div>
</>
  );
   }
}
//for new User

export { UserMenu, CreateUser };