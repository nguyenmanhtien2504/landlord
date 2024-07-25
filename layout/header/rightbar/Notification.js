import Link from 'next/link'
import React from 'react'
import { Bell } from 'react-feather'
import { Media } from 'reactstrap'

const Notification = () => {
    return (
        <li className="onhover-dropdown notification-box">
            <Bell />
            <span className="label label-shadow label-pill notification-badge">3</span>
            <div className="notification-dropdown onhover-show-div">
                <div className="dropdown-title">
                    <h6>Notifications</h6>
                    <Link href='/myproperties/favourites'>Show all</Link>
                </div>
                <ul>
                    <li>
                        <Media className="media">
                            <div className="icon-notification bg-primary-light">
                                <i className="fab fa-xbox" />
                            </div>
                            <Media body className="media-body">
                                <h6>Hợp đồng bị hủy</h6>
                                <span>8 giờ trước</span>
                                <p className="mb-0">Hợp đồng bị hủy:</p>
                                <ul className="user-group">
                                    <li>
                                        <img src="/assets/images/about/4.jpg" className="img-fluid" alt='' />
                                    </li>
                                    <li className="reply">
                                        <a href="#">Trả lời</a>
                                    </li>
                                </ul>
                            </Media>
                        </Media>
                    </li>
                    <li>
                        <Media className="media">
                            <div className="icon-notification bg-success-light">
                                <i className="fas fa-file-invoice-dollar" />
                            </div>
                            <Media body className="media-body">
                                <h6>Thanh toán thành công</h6>
                                <span>12 giờ trước</span>
                                <ul className="user-group">
                                    <li>
                                        <img src="/assets/images/about/1.jpg" className="img-fluid" alt='' />
                                    </li>
                                    <li>
                                        <img src="/assets/images/about/2.jpg" className="img-fluid" alt='' />
                                    </li>
                                    <li>
                                        <img src="/assets/images/about/3.jpg" className="img-fluid" alt='' />
                                    </li>
                                </ul>
                            </Media>
                        </Media>
                    </li>
                    <li>
                        <Media className="media">
                            <div className="icon-notification bg-warning-light">
                                <i className="fas fa-comment-dots" />
                            </div>
                            <Media body className="media-body">
                                <h6>Thông báo</h6>
                                <span>1 ngày trước</span>
                                <p className="mb-0">Còn phòng trống không bạn ?</p>
                                <ul className="user-group">
                                    <li>
                                        <img src="/assets/images/about/2.jpg" className="img-fluid" alt='' />
                                    </li>
                                    <li>
                                        <img src="/assets/images/about/3.jpg" className="img-fluid" alt='' />
                                    </li>
                                    <li className="reply">Trả lời</li>
                                </ul>
                            </Media>
                        </Media>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default Notification