import { useEffect, useState, useRef,useContext } from "react";
import axios from "axios";
import './Navbar.css';
import { myContext } from "../../App";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const [pincode, setPincode] = useState();
  const[loader, setLoader]=useState(false);
  const [post, setPost] = useState([]);
  const inp = useRef();
  const cntnr=useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (response.data[0].Status === "Success") {
        setPost(response.data[0].PostOffice);
        setLoader(false);
      } else if (response.data[0].Status === "Error") {
        alert("Enter the correct pincode");
        inp.current.value = "";
        setPost('');
        setLoader(false);
        return;
      }
      // if(response.data[0].PostOffice.length<5){
      //   cntnr.current.style.gridTemplateColumns=`repeat(${response.data[0].PostOffice.length},290px)`;
      // }
      // else {
      //   cntnr.current.style.gridTemplateColumns=`repeat(5,290px)`;
      // }
      
    }

    fetchData();
    
  }, [pincode]);

  function onChangeHandler() {
    if (inp.current.value.length !== 6) {
      alert("Enter the correct Pincode");
      inp.current.value = "";
      return;
    }
    setPincode(inp.current.value);
    if(inp.current.value!==pincode){
      setLoader(true);
    }
    
  }

  const {setState, state} = useContext(myContext);
// const{theme, setTheme}=useState(false);
  
  
  function changeThemeHandler() {
    if (state === "light") {
      setState("dark");
    } else {
      setState("light");
      
    }
  }
  

  return (

    <>
    <div className="nav">
    <div id="heading">
    <h1>Indian Post Office Pin Code Locator</h1>
    </div>
   
      <div className="search">
        <input type={"number"} ref={inp} placeholder="Enter Pincode" id="input"/>
        <button onClick={onChangeHandler} className="searchBtn">Search</button>
        <button onClick={changeThemeHandler}>{state==="dark" ? "Day" :"Night"}</button>
      </div>
      </div>
      {loader?(
        <div id="loader">{<Loader/>}</div>
      ):(
        <div ref={cntnr} className="details">
        {post &&
          post.map((obj, index) => (
            <div className={state==="light" ? "post" :"apost"} key={index}>
              <div className={state==="light"? "aboutPost" :"aboutaPost"}>Post Office Name: {obj.Name}</div>
              <div className={state==="light"? "aboutPost" :"aboutaPost"}>Region: {obj.Region}</div>
              <div className={state==="light"? "aboutPost" :"aboutaPost"}>District: {obj.District}</div>
              <div className={state==="light"? "aboutPost" :"aboutaPost"}>Block: {obj.Block}</div>
              <div className={state==="light"? "aboutPost" :"aboutaPost"}>State: {obj.State}</div>
            </div>
          ))}
      </div>
      
      )

      }
      
    
     
    </>
  );
};

export default Navbar;