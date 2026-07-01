/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Navbar from "../layout/nav/Navbar";
import Footer from "../layout/Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (error) {
      console.log("Error has occurred:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
