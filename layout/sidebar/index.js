import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronsLeft } from "react-feather";
import { Media } from "reactstrap";
import SidebarMenu from "./SidebarMenu";
import axios from 'axios';
import {getTokenFromCookie } from '../../pages/api/tokenUtils.js';
import {  setCookie  } from 'cookies-next';


const Sidebar = ({ toggle, setToggle }) => {


  const [AgentAbout, setAgentAbout] = useState({});
  const [RoleNameId, setRoleNameId] = useState({});

  const token = getTokenFromCookie();

  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

    useEffect(() => {
  
      axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser', {
        headers: {
          Authorization: token,
        }
      })
        .then((response) => {
          const newAgentAbout = response.data;
          setAgentAbout(newAgentAbout);
        })
        .catch((error) => {
          console.error('Error:', error);
          // Xử lý lỗi nếu cần thiết
        });
    }, []);

    setCookie('currentUser', AgentAbout.uId, {expires})

    useEffect(() => {
      axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/GetRoleByUserId/' +  AgentAbout.uId, {
          headers: {
            Authorization: token,
          }
        })
      .then((response) => {
          const newRoleNameId = response.data;
          setRoleNameId(newRoleNameId);
      })
      .catch((error) => {
          console.error('Error:', error);
          // Xử lý lỗi nếu cần thiết
      });
  }, [AgentAbout.uId]);

      setCookie('lessorId', RoleNameId.leId, {expires});

  return (
    <div className={`page-sidebar ${!toggle ? 'close_icon' : ''}`}>
      <div className="logo-wrap">
        <Link href='/dashboard'>
          <img src="/assets/images/logo/4.png" className="img-fluid for-light" alt='' />
          <img src="/assets/images/logo/9.png" className="img-fluid for-dark" alt='' />
        </Link>
        <div className="back-btn d-lg-none d-inline-block">
          <ChevronsLeft onClick={() => { setToggle(!toggle) }} />
        </div>
      </div>
      <div className="main-sidebar">
        <div className="user-profile">
          <Media className="media">
            <div className="change-pic">
              <img src={AgentAbout.avatar} className="img-fluid" alt='' />
            </div>
            <Media body className="media-body">
              <Link href='/agents/profile'>
                <h6>{AgentAbout.fullName}</h6>
              </Link>
              <span className="font-roboto">{AgentAbout.gmail}</span>
            </Media>
          </Media>
        </div>
        <div id="mainsidebar">
          <SidebarMenu />
        </div >
      </div >
    </div >
  );
};

export default Sidebar;
