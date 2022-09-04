import {useState} from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config'

const Register = () => {
  const [member, setMember] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    photo: '',
  });

function handleChange(e) {
    let newMember = {...member};
    // newMember[e.target.name] -> 複製後 newMember 裡的 ['name'] newMember['password'].....
    newMember[e.target.name] = e.target.value;
    setMember(newMember);

    // 比較潮的寫法
    // setMember({ ...member, [e.target.name]: e.target.value });
  }


  function handUpload(e) {
    // type=file 的 input
    // 選好的檔案在 e.target.files[0]
    setMember({ ...member, photo: e.target.files[0] })
  }

  async function handleSubmit(e) {
    e.preventDefault(); // 阻止預設行為，阻止送出後會跳頁
    try {
      // 方法1: 沒有圖片上傳、單純 post 一個 json 物件
      // 沒有二進位資料, 例如上傳圖片等等, 就能使用以下寫法
      // let response = await axios.post(`${API_URL}/auth/register`, member);
      // console.log(response.data);

      // 方法2: 若要上傳圖片 FormData
      let formData = new FormData();
      formData.append('email', member.email);
      formData.append('name', member.name);
      formData.append('password', member.password);
      formData.append('confirmPassword', member.confirmPassword);
      formData.append('photo', member.photo);
      let response = await axios.post(`${API_URL}/auth/register`, formData);
      console.log(response.data);

    } catch (e) {
      console.error('register', e);
    }
  }

  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">註冊帳戶</h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" 
        type="text" 
        id="email" 
        name="email" 
        value={member.email}
          // onChange={(e) => {
          //   // 不能直接使用 state
          //   // (錯誤寫法) member.email = e.target.value 
          //   let newMember = {...member}; //先複製出來
          //   newMember.email = e.target.value;
          //   setMember(newMember);
          // }}
          onChange = {handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="text" 
        id="name" 
        name="name" 
        value={member.name}
        onChange = {handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="password" 
        id="password" 
        name="password" 
        value={member.password}
        onChange = {handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange = {handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="file" id="photo" name="photo" onChange={handUpload}/>
      </div>
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
      onClick={handleSubmit}>註冊</button>
    </form>
  );
};

export default Register;
