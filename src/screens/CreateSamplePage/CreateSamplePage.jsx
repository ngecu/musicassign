
import React,{useState, useEffect} from 'react';
import { fetchData } from '../../api/';
import Card from '../../components/Card/Card'
import { Routes, Route, useLocation, Link } from "react-router-dom";
import * as Tone from 'tone'
import Instrument from '../../components/Instrument/Instrument'


const Createcreen = ({ match}) => {
    const [playing,play] = useState(false)
    const [sample_name,setName] = useState("")
    const [sample_type,setType] = useState("Piano")


    const [recording_data,setRecordingdata] = useState([])
    
    
    const now = Tone.now()
 
    const types = ['Piano','French Horn','Guitar','Drums']

    switch (sample_type) {
        case "Piano":
            var synth = new Tone.PolySynth(Tone.Synth).toDestination();
            break;
        case "French Horn":
            synth = new Tone.AMSynth(Tone.Synth).toDestination();
            break
        case "Guitar":
            synth = new Tone.PluckSynth(Tone.Synth).toDestination();
            break
        case "Drums":
            synth = new Tone.FMSynth(Tone.Synth).toDestination();
            break
        default:
            synth = new Tone.PolySynth(Tone.Synth).toDestination();
    }



    const init_array = [
        {"B": [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"C": [false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]}
    ]

    


    


    const playHandler = () => {
        play(true)
        Tone.start()
        for (let index = 0; index < init_array.length; index++) {
            // elemment is object
            const element = init_array[index];
            const  first_letter = Object.keys(element)[0];
            const value_array = Object.values(element)[0];


            value_array.forEach(array_el => {
                if (array_el) {
                    var el_pos = value_array.indexOf(array_el)
                    synth.triggerAttackRelease(`${first_letter}${el_pos}`, "8n", now)
                    console.log(array_el)
                }
            });  
            
        }
        
    }




    const handleSubmit= (e) =>{
        e.preventDefault()
        const url = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples&sampleType=${sample_type}&sampleName=${sample_name}`
        
        const rawResponse =  fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(init_array)
          });
          const content =  rawResponse.json();
        
          console.log(content);

    } 
    


return (
   <>
<form onSubmit={handleSubmit} class="major-container">
             <div class="below-header">
               <h1>Create Sample</h1>
             </div>

             <div class="container-cont">
                 <div class="left-items">
                    <h3 id="edit-cream">
                        <input 
                        id="edit-cream-input"
                        type="text" 
                        name=""
                        value={sample_name}
                        onChange={(e) => setName(e.target.value)}

                        />
                    </h3>
                    
                     
                 </div>
                  <div class="right-items" id="share-page-right">
                     <button class="one-of-three" type="button" onClick={playHandler}>{playing ? 'Stop Previewing' : 'Preview'}</button>
                      <button class="one-of-three" type="submit" id="three1">Save</button>
                  </div>
             </div>

             <div class="type-overall-container">
                <div class="type">

                <div class="row" id="row-one">
                <div id="column1"><h5 >Type</h5></div>
                
                <div class="type-sub-cont">

                    {types.map((type)=>(
                             <button 
                             id="column2" 
                             
                             onClick={(e) => setType(type)}

                             className={(sample_type === type ? 'checked-on' : 'checked-off')}
                             ><h5>{type}</h5></button>
                    ))}

                 
            
               
                </div>
                </div>
{init_array.map((array_element)=>(
  <div class="row" id="row-one">
  <div id="column1"><h5 >{Object.keys(array_element)[0]}</h5></div>
  {Object.values(array_element)[0].map((array_key)=>(
      <button class="type-sub-cont"
      id={(array_key === true ? 'checked-on' : 'checked-off')}
      >  {Object.values(array_element)[0].indexOf(array_key)}   </button>
  ))}
     

  </div>
))}
                 

                  
             </div>
             </div>
                
   </form>
   </>
)
}


export default Createcreen