
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { Camera, Heart } from "react-feather";
import ImageSlider from "../../myproperties/ImageSlider";
import PropertyLabel from "./PropertyLabel";
import { useRouter } from "next/router";
import axios from "axios"; 



const PropertyBox = ({ data }) => {

    const symbol = '$';
    const router = useRouter();

    const date ="08/08/2023"

    const handleClick = (data) => {
        router.push(`/myproperties/edit-property?id=${data.hoId}`);
    }

    const [value, setValue] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "https://ehouseapi20230817222213.azurewebsites.net/api/HouseImage/GetHouseImageByHoId/" + data.hoId);
            setValue(response.data); // Thêm .data vào response
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [data]);

      console.log(value);
      const aImg = value.map((value) => value.houseImageCode);
      console.log(aImg);

      const numberWithCommas = (number) => {
        return number.toLocaleString();
      };

    return (
        <>
            <div className="property-box">
                <div className="property-image">
                    <ImageSlider images={aImg} />
                    <div className="labels-left">
                        <PropertyLabel labels={data.houseStatus} />
                    </div> 
                    <div className="seen-data">
                        <Camera />
                        <span>{aImg.length || 5}</span>
                    </div>
                </div>
                <div className="property-details">
                    {/* <span className="font-roboto">{data.country || "USA"} </span> */}
                    <Link href={`https://ehomesystem.vercel.app/property/image-slider?id=${data.hoId}`} target="_blank" rel="noopener noreferrer">
                        <h3>{data.houseRentName}</h3>
                    </Link>
                    <h6>
                        {numberWithCommas(data.rentPrice)} VND
                    </h6>
                    <p className="font-roboto">{data.detail || "Đây là thông tin ngôi nhà"} </p>
                    <ul>
                        <li>
                            <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                            Giường : {data.bed || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                            Vệ sinh : {data.restroom || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                            Diện tích : {data.area || 5}
                        </li>
                    </ul>
                    <div className="property-btn d-flex">
                        <span>{date}</span>
                            <button type="button" className="btn btn-dashed btn-pill" onClick={() => handleClick(data)}>
                                Chỉnh sửa
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyBox;
