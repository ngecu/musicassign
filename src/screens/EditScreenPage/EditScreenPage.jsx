
import React,{useState, useEffect} from 'react';
import { fetchData } from '../../api/';
import Card from '../../components/Card/Card'
import { Routes, Route, useLocation, Link } from "react-router-dom";
import * as Tone from 'tone'
import Instrument from '../../components/Instrument/Instrument'


const EditpageScreen = ({ match}) => {

    const { state } = useLocation();


    


    const [playing,play] = useState(false)
    const [sample_name,setName] = useState(state.name)
    const [sample_type,setType] = useState(state.type)


    var myJSONString = state.recording_data;
    var myObject = JSON.parse(myJSONString);
    var myArray = [];
    for(var i in myObject) {
        myArray.push(myObject[i]);
    }

    const [recording_data,setRecordingdata] = useState(myArray)




    const sample_id = match.params.id


    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
 

    
    const playHandler = () => {
        play(true)
        synth.triggerAttack("D4", now);
        synth.triggerAttack("F4", now + 0.5);
        synth.triggerAttack("A4", now + 1);
        synth.triggerAttack("C5", now + 1.5);
        synth.triggerAttack("E5", now + 2);
        synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
    }
    


return (
    <div class="major-container">
          <div class="below-header">
            <h1>
                Samples you've created
            </h1>
            </div>
  
        <div class="container-cont">

        <div class="left-items">
           <input
           className="w-100"
           type="text"
           value={sample_name}
            onChange={(e) => setName(e.target.value)}

            />
        </div>

        <div class="right-items">
            <button class="one-of-three" onClick={playHandler} id="two1">{playing ? 'Stop Previewing' : 'Preview'}</button>
            <button class="one-of-three" id="three1"><Link to={`/save/${sample_id}`}> Save </Link></button>
        </div>
    </div>

<Instrument recording_data={recording_data} />
    



    </div>

)
}


export default EditpageScreen