import React, { useEffect, useState } from "react";
import img from "./img.jpg";

const Square = ({ top, left, img,imgSize, iKey, show, mode, onClick }) => {
  let isTest;

  if (mode) {
    if (show) isTest = true;
    else isTest = false;
  } else {
    if (show) isTest = false;
    else isTest = true;
  }

  return (
    <div
      onClick={() => onClick(iKey)}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 20,
        background: "red",
        overflow: "hidden",
        filter: `${isTest ? "brightness(80%)" : "brightness(60%)"}`,
      }}
    >
      <img
        src={img}
        alt="квадрат"
        style={{
          // height: "98vh",
          // width: imgSize.width,
          position: "absolute",
          top: `${-top}px`,
          left: `${-left}px`,
        }}
      />
    </div>
  );
};

const MainContainer = () => {
  const [selectedSquare, setSelectedSquare] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickSquare = (key) => {
    if (selectedSquare.includes(key)) {
      setSelectedSquare((old) => old.filter((item) => item !== key));
    } else {
      setSelectedSquare((old) => [...old, key]);
    }
  };

  // const childContainerTop = 50; 
  // const childContainerLeft = 50; 

  return (
    <React.Fragment>
      <div
        style={{
          height: "98vh",
          width: "99vw",
          position: "absolute",
          backgroundImage: `url(${img})`,
          zIndex: 10,
          filter: `${
            selectedSquare.length ? "brightness(50%)" : "brightness(100%)"
          }`,
        }}
      />

      <Square
        top={100}
        left={400}
        img={img}
        // imgSize={windowSize}
        iKey={1}
        show={selectedSquare.includes(1)}
        mode={!!selectedSquare.length}
        onClick={handleClickSquare}
      />
      <Square
        top={200}
        left={800}
        img={img}
        // imgSize={windowSize}
        iKey={2}
        show={selectedSquare.includes(2)}
        mode={!!selectedSquare.length}
        onClick={handleClickSquare}
      />
      <Square
        top={400}
        left={900}
        img={img}
        // imgSize={windowSize}
        iKey={3}
        show={selectedSquare.includes(3)}
        mode={!!selectedSquare.length}
        onClick={handleClickSquare}
      />
    </React.Fragment>
  );
};

export { MainContainer };
