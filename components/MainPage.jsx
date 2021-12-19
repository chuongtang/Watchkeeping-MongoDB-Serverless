import React, { useState } from 'react';
import { Button } from 'primereact/button';
import "primeflex/primeflex.css";
import North from "./North.svg";
import LearnMore from './LearnMore';
import { Dialog } from 'primereact/dialog';


const MainPage = () => {

  const [displayLearnMore, setDisplayLearnMore] = useState(false);
  const [displayDemo, setDisplayDemo] = useState(false);


  const onHide = () => {
    setDisplayLearnMore(false);
    setDisplayDemo(false);
  }

  return (
    <div className="grid grid-nogutter surface-0 text-800">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <span className="block text-6xl font-bold mb-1"><object type="image/svg+xml" data={North} style={{ "maxHeight": "4rem" }} className="North" alt="compass-logo"></object>nline timesheet for Seafarers</span>
          <div className="text-6xl text-primary font-bold mb-3">Create report effortlessly</div>
          <p className="mt-0 mb-4 text-700 line-height-3">A modern website template with user-friendly tools, perfect for creating crew reports that Comply with STCW</p>

          <Button label="Learn More" type="button" className="mr-3 p-button-raised" onClick={() => setDisplayLearnMore(true)} />
          <Dialog visible={displayLearnMore} maximizable modal style={{ width: '90vw' }} onHide={() => onHide()}>
            <LearnMore />
          </Dialog>


          <Button label="Live Demo" type="button" className="p-button-outlined" onClick={() => setDisplayDemo(true)} />
          <Dialog visible={displayDemo} maximizable modal style={{ width: '90vw' }} onHide={() => onHide()}>
            <h3>This Component is being built... thanks for your patient!</h3>
          </Dialog>
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
        <img src="../components/shipMate.webp" alt="hero1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>
    </div>
  );
}
export default MainPage;