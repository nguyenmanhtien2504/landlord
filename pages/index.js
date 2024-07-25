import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import {  getCookie  } from 'cookies-next';


const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if(getCookie('token2')){
      router.push('/map');
    }else{
      router.push('/authentication/login');
    }
   
  }, [])

  return (
    <>
      <Loader />
    </>
  )
};

export default Index;
