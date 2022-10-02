import React,{useState} from 'react'

import { Routes, Route, Outlet, Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as Tone from 'tone'

function Card(props) {
    const {name,datetime,id} = props.sample_details

    const [playing,play] = useState(false)

    var myJSONString = props.sample_details.recording_data;
    var myObject = JSON.parse(myJSONString);

    console.log(myObject);
   

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
 


    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    

    const playHandler = () => {
        play(true)
        Tone.loaded().then(() => {
            sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 0.5);
        })
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