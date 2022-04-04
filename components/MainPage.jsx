import React, { useState } from 'react';
import { Button } from 'primereact/button';
import "primeflex/primeflex.css";
import North from "../src/images/North.png";
import LearnMore from './LearnMore';
import { Dialog } from 'primereact/dialog';
import BG from "../src/images/shipMate.webp"
import Demo from "./WatchkeepingDemo.webm"


const MainPage = () => {

  const [displayLearnMore, setDisplayLearnMore] = useState(false);
  const [displayDemo, setDisplayDemo] = useState(false);


  const onHide = () => {
    setDisplayLearnMore(false);
    setDisplayDemo(false);
  }

  const oStyle = {

    marginRight: "0.1ch",
    maxHeight: "2.5rem",
    zIndex: 9999,


  }

  return (
    <div className="grid grid-nogutter surface-0 text-800 App">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <span className="block text-6xl font-bold mb-1"><img src={North} style={oStyle} alt="compass-logo" className="logo"></img>nline timesheet for Seafarers</span>
          <div className="text-6xl text-primary font-bold mb-3">Create report effortlessly</div>
          <p className="mt-0 mb-4 text-700 line-height-3">A modern website template with user-friendly tools, perfect for creating seafarer reports that comply with STCW</p>

          <Button label="Learn More" type="button" className="mr-3 p-button-raised" onClick={() => setDisplayLearnMore(true)} />
          <Dialog visible={displayLearnMore} maximizable modal style={{ width: '90vw' }} onHide={() => onHide()}>
            <LearnMore />
          </Dialog>


          <Button label="Live Demo" type="button" className="p-button-outlined p-button-warning p-button-raised" onClick={() => setDisplayDemo(true)} />
          <Dialog visible={displayDemo} maximizable modal onHide={() => onHide()}>
            <video src={Demo} height="700" controls="controls" autoplay="true" />
          </Dialog>
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
        <img src={BG} alt="hero1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>

      <p className="ml-5 border-round-bottom text-white font-bold flex align-items-center justify-content-center">Bảng chấm công đặc biệt cho thuyền viên Việt Nam  với giao diện đơn giản từ tập tin bảng tính 
        <a  href='components\ChuongTrinhChamCongSTCW_V2.2.xlsm' download >
          ➡ Tải về tại đây 📠
        </a>
      </p>
    </div>
  );
}
export default MainPage;