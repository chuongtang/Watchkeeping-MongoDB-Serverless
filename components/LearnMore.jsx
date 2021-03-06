
import React, { useState } from 'react';
import "primeflex/primeflex.css";

const LearnMore = () => {

  return (
  
    <div className="surface-0  text-center gradient-background">
      <div className="mb-3 font-bold text-2xl p-p-sm-2 p-p-md-3 p-p-lg-4">
        <span className="text-3xl">User-friendly interface, </span>
        <span className="text-blue-600">Access anywhere</span>
      </div>
      <div className="text-xl text-sm mb-6">Built with modern technologies for cloud storage. Visual tools with dynamic components. </div>
      <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-desktop text-4xl text-blue-500"></i>
          </span>
          <div className="text-900 mb-3 font-medium">Built for Maritime professionals</div>
          <span className="text-700 text-sm line-height-3">
            UI Simplicity delivers seamless experience for end users.</span>
        </div>
        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-shield text-4xl text-blue-500"></i>
          </span>
          <div className="text-900 mb-3 font-medium">Trusted Securitty</div>
          <span className="text-700 text-sm line-height-3">Built-in security feature for users identification and access.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-check-circle text-4xl text-blue-500"></i>
          </span>
          <div className="text-900 mb-3 font-medium">Easy to Use</div>
          <span className="text-700 text-sm line-height-3">Just click and select visual components for your report. </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-globe text-4xl text-blue-500"></i>
          </span>
          <div className="text-900 mb-3 font-medium">Fast & Global Support</div>
          <span className="text-700 text-sm line-height-3">Light-weight and multi-language options.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-github text-4xl text-blue-500"></i>
          </span>
          <div className="text-900 mb-3 font-medium">Open Source</div>
          <span className="text-700 text-sm line-height-3">Customisable components with all source code stored on cloud.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-lock text-4xl text-blue-500"></i>
          </span>
          <div className="text-900 mb-3 font-medium">End-to-End Encryption*</div>
          <span className="text-700 text-sm line-height-3">User private data storage with encryption for access control.</span>
        </div>
      </div>
        <p className="text-700 p-p-4 p-text-right p-text-italic text-sm line-height-2"> * Paid subcription plan only</p>
    </div>
    
  );
}
export default LearnMore;