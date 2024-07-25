
import Link from "next/link";
import React from "react";
import { Camera, Heart } from "react-feather";
import ImageSlider from "../../myproperties/ImageSlider";
import AddToCompareProducts from "./AddToCompareProducts";
import PropertyLabel from "./PropertyLabel";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Img from "../../utils/Img";


const PropertyBox = ({ data }) => {
    const symbol = '$';
    const currencyValue = 1
    const router = useRouter();
    // const NavigateFavourit = () => {
    //     toast.success('Add Favourites Successful..');
    //     router.push('/myproperties/favourites')
    // }

    const img = '/assets/images/property/nha1.jpg';

    const handleClick = (data) => {
        console.log(data.sqft);
    }

    return (
        <>
            <div className="property-box">
                <div className="property-image">
                    <Img src={img} className="bg-img" alt="" />
                    <div className="labels-left">
                        <PropertyLabel labels={data.label} />
                    </div>
                </div>
                <div className="property-details">
                    {/* <span className="font-roboto">{data.country || "USA"} </span> */}
                    <Link href={`/property/image-slider/?id=${data.id}`}>
                        <h3>{data.title}</h3>
                    </Link>
                    <h6>
                        {symbol}
                        {data.price}
                    </h6>
                    <p className="font-roboto">{data.details || "Đây là thông tin ngôi nhà"} </p>
                    <ul>
                        <li>
                            <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                            Bed : {data.bed || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                            Baths : {data.bath || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                            Sq Ft : {data.sqft || 5}
                        </li>
                    </ul>
                    <div className="property-btn d-flex">
                        <span>{data.date}</span>
                            <button type="button" className="btn btn-dashed btn-pill" onClick={() => handleClick(data)}>
                                Details
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyBox;
