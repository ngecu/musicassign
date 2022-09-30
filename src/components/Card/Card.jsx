import React,{useState} from 'react'

import { Routes, Route, Outlet, Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as Tone from 'tone'
import './Card.css'
import x from '../../samples/piano/A1.mp3'

function Card(props) {
    const {name,datetime,id} = props.sample_details

    const [playing,play] = useState(false)

    var myJSONString = props.sample_details.recording_data;
    var myObject = JSON.parse(myJSONString);

    console.log(myObject);
    const player = new Tone.Player(x).toDestination();
   

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
 




    

    const playHandler = () => {
        play(true)
Tone.loaded().then(() => {
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);


});
        play(false)
       
        
    }
    return (
      
        <div class="container-cont">
        <div class="left-items">
            <h3>{name}</h3>
            <p class="date-text">{datetime}</p>
        </div>

        <div class="right-items">
            <button class="one-of-three" id="one1"><Link 
            to={{pathname:`/share/${id}`,
                state:props.sample_details
                }}>Share </Link></button>
            <button class="one-of-three" onClick={playHandler} id="two1">{playing ? 'Stop Previewing' : 'Preview'}</button>
            <button class="one-of-three" id="three1"><Link 
            to={{
                pathname:`/edit/${id}`,
                state: props.sample_details
            }}  > Edit </Link></button>
        </div>
    </div>

        

    );
  }
export default Card