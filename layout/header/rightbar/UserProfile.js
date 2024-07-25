import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FileText, LogIn, User } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import {  deleteCookie } from "cookies-next";
import {getTokenFromCookie } from '../../../pages/api/tokenUtils.js'

const UserProfile = () => {
  const router = useRouter();

  const [UserProfile, setUserProfile] = useState({});

  useEffect(() => {
    const token = getTokenFromCookie();

    axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser', {
      headers: {
        Authorization: token,
      }
    })
      .then((response) => {
        const newUserProfile = response.data;
        setUserProfile(newUserProfile);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Xử lý lỗi nếu cần thiết
      });
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu GET đến API đăng xuất
    //   const response = await axios.get(
    //     "https://ehouseapi20230817222213.azurewebsites.net/api/User/Logout",
    //     {
    //       headers: {
    //         Authorization: getCookie("token"),
    //       },
    //     }
    //   );
      deleteCookie("token2");
      deleteCookie("currentUser");
      deleteCookie('hoId')
      deleteCookie("lessorId");
      localStorage.removeItem("value");
      localStorage.removeItem("dataHouse");
      localStorage.removeItem("dataHouseList");
      localStorage.removeItem("dataHouseBan");
      localStorage.removeItem("contractData");

      router.push("/authentication/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="profile-avatar onhover-dropdown">
      <div>
        <img src={UserProfile.avatar} className="img-fluid" alt="" />
      </div>
      <ul className="profile-dropdown onhover-show-div">
        <li>
          <Link href="/agents/profile">
            <span>Account </span>
            <User />
          </Link>
        </li>
        <li>
          <Link href='/dashboard'> {/* "/myproperties/propertylist"> */}
            <span>Tài sản</span>
            <FileText />
          </Link>
        </li>
        <li>
          <Link href="#">
            <span>Log out</span>
            <LogIn onClick={handleLogout} />
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default UserProfile;
