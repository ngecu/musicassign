import React,{useState} from 'react'

import { Routes, Route, Outlet, Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as Tone from 'tone'


function Instrument(props) {
    const recording_data = props.recording_data
    // console.log(recording_data)
    const tone_array = []
    

    recording_data.map((obje,k)=> {
        console.log("object",obje)
    

        for (const x in obje) {
            if (Object.hasOwnProperty.call(obje, x)) {
                const element = obje[x];
                tone_array.push(Object.keys(obje)[0])
                
            }
        }

        
        
    })

 
  
    
    return (
        


<>
{recording_data.map((obj)=>(
     <div class="row" id="row-one">
               <div id="column1">
               <h5 ></h5>  <div>
        {Object.entries(obj).map(([key, value]) => (
              <div class="row" id="row-one">
              <div id="column1"><h5 >{key}</h5></div>


              
              
            
              </div>
        ))}
      </div>
                </div>
                </div>
               
))}
</>
      
       

        

    );
  }
export default Instrument


function ObjectRow(props) {
    const object  = props.obj
    const i = props.key
    return(<>
    {object[i]}
    </>

    )
    
}