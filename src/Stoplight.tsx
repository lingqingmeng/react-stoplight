import { useEffect, useState } from 'react';

const Stoplight = () => {
  return (
    <div className="stoplight-container">
      <div className="light red"></div>
      <div className="light yellow"></div>
      <div className="light green"></div>
    </div>
  );
};

export default Stoplight;