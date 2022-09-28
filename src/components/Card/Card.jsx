import React,{useState} from 'react'

import { Routes, Route, Outlet, Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as Tone from 'tone'
import './Card.css'


function Card(props) {
    const {name,datetime,id} = props.sample_details

    const [playing,play] = useState(false)
    

    const playHandler = () => {

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