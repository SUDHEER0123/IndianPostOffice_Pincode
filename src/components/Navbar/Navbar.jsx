import { useEffect, useState, useRef,useContext } from "react";
import axios from "axios";
import './Navbar.css';
import { myContext } from "../../App";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const [pincode, setPincode] = useState();
  const[loader, setLoader]=useState(true);
  const [post, setPost] = useState([]);
  const inp = useRef();

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
        return;
      }
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
    <div id="heading">
    <h1>Indian Post Office Pin Code Locator</h1>
    </div>
   
      <div className="search">
        <input type={"number"} ref={inp} placeholder="Enter Pincode" id="input"/>
        <button onClick={onChangeHandler} className="searchBtn">Search</button>
        <button onClick={changeThemeHandler}>{state==="dark" ? "Day" :"Night"}</button>
      </div>
      <div id="loader">{loader && <Loader/>}</div>

      <div className="details">
        {post &&
          post.map((obj, index) => (
            <div className="post" key={index}>
              <div className="aboutPost">Post Office Name: {obj.Name}</div>
              <div className="aboutPost">Region: {obj.Region}</div>
              <div className="aboutPost">District: {obj.District}</div>
              <div className="aboutPost">Block: {obj.Block}</div>
              <div className="aboutPost">State: {obj.State}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Navbar;