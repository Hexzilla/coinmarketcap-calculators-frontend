import React, { useEffect, useState } from "react";
import { InputNumber as AntInputNumber } from "antd";
import "./index.css";

function InputNumber(props) {
  const [loaded, setLoaded] = useState(false);
  const [number, setNumber] = useState(props.defaultValue || 0);

  useEffect(() => {
    if (!loaded) {
      const element = document.querySelector(".ant-input-number-handler-wrap");
      if (element) {
        const parent1 = element.firstChild.firstChild;
        const button1 = parent1?.firstChild;
        if (button1) {
          button1.remove();

          const image = document.createElement("img");
          image.src = "/images/arrow-up.png";
          image.width = 18;
          parent1.appendChild(image);

          setLoaded(true);
        }

        const parent2 = element.children[1].firstChild;
        const button2 = parent2?.firstChild;
        if (button2) {
          button2.remove();

          const image = document.createElement("img");
          image.src = "/images/arrow-down.png";
          image.width = 18;
          parent2.appendChild(image);

          setLoaded(true);
        }
      }
    }
  });

  return (
    <AntInputNumber
      {...props}
    />
  );
}

export default InputNumber;
