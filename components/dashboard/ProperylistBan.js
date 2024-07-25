import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Media } from "reactstrap";
// import { ProperylistBan1 } from "../../data/dashboard/data";


const Properylist = ({ProperylistBan}) => {
  const nha = [
    "/assets/images/property/nha1.jpg",
    "/assets/images/property/nha22.png",
    "/assets/images/property/nha3.jpg",
    "/assets/images/property/nha22.png",
    "/assets/images/property/nha5.jpg",    
  ];
  return (
    <div className="col-xl-4 xl-6 col-lg-12 col-md-6">
      <div className="card">
        <div className="card-header pb-0">
          <div className="d-flex">
            <h5>Tài sản đã cho thuê</h5>
          </div>
        </div>
        <div className="card-body properties-list">
          {ProperylistBan && ProperylistBan.slice(0, 5).map((item, i) => {
            return(
                <Media key={i}>
                  <img src={nha[i]} className="img-fluid" alt="" />
                  <Media body>
                    <Link href="/myproperties/propertylist">
                      <h6>{item.houseRentName}</h6>
                    </Link>
                    <ul>
                      {item.bed !== 0 && (
                        <li>
                          <img
                            src="/assets/images/svg/icon/double-bed.svg"
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                      )}
                      {item.restroom !== 0 && (
                        <li>
                          <img
                            src="/assets/images/svg/icon/restroom.png"
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                      )}

                      <li>
                        <img
                          src="/assets/images/svg/icon/coin.png"
                          className="img-fluid"
                          alt=""
                        />
                        <span>{`${item.rentPrice.toLocaleString()} VND`}</span>
                      </li>
                    </ul>
                    <div>
                      <span className="light-font">Trạng thái: </span>
                      {item.houseStatus ? (
                        <span className={`label label-light-ban`}>{"Nhà đã thuê"}</span>
                      ) : (
                        <span className={`label label-light-ranh`}>{"Nhà chưa thuê"}</span>
                      )}
                    </div>
                  </Media>
                </Media>
                )
                })}
        </div>
      </div>
    </div>
  );
};

export default Properylist;
