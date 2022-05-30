import styled from "styled-components";
import "./App.css";
import React, { useState } from "react";
import Screen from "./component/screen";
import Button from "./component/button";
import Themebutton from "./component/themebutton";

const themeValue = ["PINK", "VIOLET", "PARIS", "ORANGE"];

const matchcolor = {
  PINK: "#333",
  VIOLET: "black",
  PARIS: "#D499C7",
  ORANGE: "#FF8D29",
};

const buttonValue = [
  ["AC", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const removeComma = (num) => num.toString().replace(/\,/g, "");

const App = () => {
  const [cal, setCal] = useState({ sign: "", num: 0, res: 0 });

  const [color, setColor] = useState("PINK");

  const numHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCal({
      ...cal,
      num:
        removeComma(cal.num) % 1 === 0
          ? toLocaleString(Number(removeComma(cal.num + value)))
          : cal.num + value,
      res: !cal.sign ? 0 : cal.res,
    });
  };

  const dotHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCal({
      ...cal,
      num: !cal.num.toString().includes(".") ? cal.num + value : cal.num,
    });
  };

  const signHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCal({
      ...cal,
      sign: value,
      res: !cal.res && cal.num ? cal.num : cal.res,
      num: 0,
    });
  };

  const equalHandler = () => {
    if (cal.sign && cal.num) {
      const calculate = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;

      setCal({
        ...cal,
        res:
          cal.num === "0" && cal.sign === "/"
            ? "Can't devide with 0"
            : cal.sign === "/" || removeComma(cal.num) % 1 !== 0
            ? calculate(
                Number(removeComma(cal.res)),
                Number(removeComma(cal.num)),
                cal.sign
              ).toFixed(2)
            : toLocaleString(
                calculate(
                  Number(removeComma(cal.res)),
                  Number(removeComma(cal.num)),
                  cal.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertHandler = () => {
    setCal({
      ...cal,
      num: cal.num ? toLocaleString(removeComma(cal.num) * -1) : 0,
      res: cal.res ? toLocaleString(removeComma(cal.res) * -1) : 0,
      sign: "",
    });
  };

  const percentHandler = () => {
    setCal({
      ...cal,
      num: (cal.num /= 100),
      res: (cal.res /= 100),
      sign: "",
    });
  };

  const resetHandler = () => {
    setCal({ ...cal, sign: "", num: 0, res: 0 });
  };
  return (
    <Page>
      <Wrapper bgcolor={matchcolor[color]}>
        <Themebox>
          {themeValue.map((btn, i) => {
            return (
              <Themebutton
                key={i}
                classname={btn}
                value={btn}
                onClick={() => {
                  setColor(btn);
                }}
              />
            );
          })}
        </Themebox>
        <Screen value={cal.num ? cal.num : cal.res} />
        <Buttonbox>
          {buttonValue.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                classname={btn === "=" ? `equal ${color}` : `${color}`}
                value={btn}
                onClick={
                  btn === "AC"
                    ? resetHandler
                    : btn === "+-"
                    ? invertHandler
                    : btn === "%"
                    ? percentHandler
                    : btn === "="
                    ? equalHandler
                    : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                    ? signHandler
                    : btn === "."
                    ? dotHandler
                    : numHandler
                }
              />
            );
          })}
        </Buttonbox>
      </Wrapper>
    </Page>
  );
};

export default App;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: grid;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30vw;
  height: 80vh;
  background: ${(props) => props.bgcolor};
  padding: 10px;
  border-radius: 12px;
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;
const Buttonbox = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
`;
const Themebox = styled.div`
  width: 100%;
  height: 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 10px;
`;
