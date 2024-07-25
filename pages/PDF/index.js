import React, { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import listBase64 from '../../components/listBase64/listBase64p'; // Đường dẫn đến hình ảnh template
import imgBase64 from '../../components/listBase64/imgBase64'; // Đường dẫn đến hình ảnh template
import axios from "axios"; // Thêm import này
import { useRouter } from "next/router";
import {getTokenFromCookie } from '../../pages/api/tokenUtils.js'
import customFont from '../../public/assets/fonts/NotoSans-Regular.ttf'

const PdfPage = () => {

    const router = useRouter();

    const { id } = router.query;

    const [contractData, setcontractData] = useState({});
    const [contractData1, setcontractData1] = useState({});

    const token = getTokenFromCookie();

    const numberWithCommas = (number) => {
        return number.toLocaleString();
      };

      const today = new Date();

    const day = today.getDate(); // Ngày trong tháng (1 đến 31)
    const month = today.getMonth() + 1; // Tháng trong năm (0 - 11), cần +1 để chuyển sang 1-12
    const year = today.getFullYear(); // Năm

    useEffect(() => {
    
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://ehouseapi20230817222213.azurewebsites.net/api/Contract/GetContractsById/${id}`
                    , {
                      headers: {
                        Authorization: token,
                      }
                    });
                setcontractData(response.data); // Thêm .data vào response

                const response1 = await axios.get(
                    `https://ehouseapi20230817222213.azurewebsites.net/api/Contract/GetInformationContractById/${id}`
                    , {
                      headers: {
                        Authorization: token,
                      }
                    });
                setcontractData1(response1.data); // Thêm .data vào response

                console.log('thành công')
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
      }, [id]);

  const generatePdf = async () => {

    const doc = new jsPDF();
    const text = 'Đà Nẵng';
    const date = `${day}             ${month}           ${year}`
    const date2 = `${day}             ${month}           ${year}`
    const money = numberWithCommas(contractData?.rentPrice);
    const lessee = contractData1?.fullName2;
    const citizenIdentificationLessee = contractData1?.citizenIdentification2;
    const Lessor = contractData1?.fullName1;
    const citizenIdentificationLessor = contractData1?.citizenIdentification1;   
    const area = contractData1?.area.toString(); 
    const tenancyPeriod = contractData?.tenancyPeriod;
    const approve = imgBase64;

    const pageSize = doc.internal.pageSize;
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

    //address,dd-mm-yyyy
    const x1 = (pageSize.width - textWidth) / 1.57;
    const y1 = pageSize.height / 5.9;

    const x3 = (pageSize.width - textWidth) / 1.24;
    const y3 = pageSize.height / 5.9;

    //date2
    const x8 = (pageSize.width - textWidth) / 3.23;
    const y8 = pageSize.height / 3.05;

    //money
    const x2 = (pageSize.width - textWidth) / 1.5;
    const y2 = pageSize.height / 3.6;

    const x10 = (pageSize.width - textWidth) / 1.18;
    const y10 = pageSize.height / 1.42;

    //name lessee
    const x4 = (pageSize.width - textWidth) / 3.8;
    const y4 = pageSize.height / 2.08;

    //citizenIdentification lessee
    const x5 = (pageSize.width - textWidth) / 3.7;
    const y5 = pageSize.height / 1.95;

    //name lessor
    const x6 = (pageSize.width - textWidth) / 3.8;
    const y6 = pageSize.height / 2.57;

    //citizenIdentification lessor
    const x7 = (pageSize.width - textWidth) / 3.7;
    const y7 = pageSize.height / 2.38;

    //area
    const x9 = (pageSize.width - textWidth) / 2.7;
    const y9 = pageSize.height / 1.39;

    //tenancyPeriod
    const x11 = (pageSize.width - textWidth) / 1.17;
    const y11 = pageSize.height / 7.2;

    //approve lessee
    const x12 = (pageSize.width - textWidth) / 1.2;
    const y12 = pageSize.height / 1.15;

    //approve lessor
    const x13 = (pageSize.width - textWidth) / 1.9;
    const y13 = pageSize.height / 1.15;

    //approve admin
    const x14 = (pageSize.width - textWidth) / 4.7;
    const y14 = pageSize.height / 1.15;

    const imageWidth = pageSize.width; // Độ rộng của hình ảnh là toàn bộ trang

    // get base64
    const templateDataUris = listBase64;

      doc.addFont(customFont, "NotoSans", "normal");

      doc.setFont("NotoSans");   
      doc.setFontSize(12);

    for (let i = 0; i < templateDataUris.length; i++) {
        const templateDataUri = templateDataUris[i];
        const imageHeight = (imageWidth * pageSize.height) / pageSize.width;
        
        doc.addImage(templateDataUri, 'PNG', 0, 0, imageWidth, imageHeight);
        if (i === 0) {
            doc.text(text, x1, y1);
            doc.text(date, x3, y3);
            doc.text(date2, x8, y8);
            doc.text(lessee, x4, y4);
            doc.text(citizenIdentificationLessee, x5, y5);
            doc.text(Lessor, x6, y6);
            doc.text(citizenIdentificationLessor, x7, y7);
            doc.text(area, x9, y9);
          }
        if(i === 1) {
            doc.text(money, x2, y2);
            doc.text(money, x10, y10);
            doc.text(tenancyPeriod, x11, y11);
        }          
        if(i === 3){
            doc.addImage(approve, 'PNG', x12, y12, 25, 25);
            if(contractData?.statusLessorId){
                doc.addImage(approve, 'PNG', x13, y13, 25, 25);
            }
            if(contractData?.statusAdminId){
                doc.addImage(approve, 'PNG', x14, y14, 25, 25);
            }
        }
        doc.addPage();
      }

    doc.save('HopDongDienTu.pdf');
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={generatePdf} className="btn btn-gradient btn-lg">Tải hợp đồng</button>
    </div>
  );
};

export default PdfPage;
