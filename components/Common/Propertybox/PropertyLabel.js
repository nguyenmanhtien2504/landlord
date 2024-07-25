import React, { Fragment } from "react";

const PropertyLabel = ({ labels }) => {
    return (
        <>
                        <Fragment>
                            {labels === false && (
                                <div>
                                    <span className='label label-success'>Nhà chưa thuê</span>
                                </div>
                            )}
                            {labels === true && (
                                <div>
                                    <span className='label label-shadow'>Nhà đã thuê</span>
                                </div>
                            )}
                        </Fragment>
        </>
    );
};

export default PropertyLabel;
