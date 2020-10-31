import React, { useRef, useState } from 'react'
import Lolly from '../components/lolly';
import "./style.css";

export default function Home() {
  const [c1, setC1] = useState("#deaa43");
  const [c2, setC2] = useState("#e95946");
  const [c3, setC3] = useState("#d52358");

  const handleSubmit = () => {

  }
  const sendF = useRef();
  const recF = useRef();
  const msgF = useRef();

  return (
    <>
      <div className="heading">
        <h2>Virtual Lolly</h2>
      </div>
      <div className="main-container">
        <div className="lolly-container">
          <Lolly top={c1} middle={c2} bottom={c3} />
          <div className="colors-selections">
            <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} />
            <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} />
            <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} />
          </div>
        </div>

        <div className="form-container">
          <input type="text" placeholder="To" ref={recF} />
          <textarea placeholder="please enter message" ref={msgF}></textarea>
          <input type="text" placeholder="From" ref={sendF} />
          <input type="button" value="submit" onClick={handleSubmit} />
        </div>

      </div>
    </>
  )
}
