
import React,{useState, useEffect} from 'react';
import { fetchData } from '../../api/';
import Card from '../../components/Card/Card'
import { Routes, Route, useLocation, Link } from "react-router-dom";
import * as Tone from 'tone'



const CreateScreen = ({ match,history}) => {

    //states
    const [playing,play] = useState(false)
    const [sample_name,setName] = useState("")
    const [sample_type,setType] = useState("Piano")
    const [final,modifyfinal] = useState([])
    const [recording_data,setRecordingdata] = useState([])
    
    
    var now = Tone.now()
 
    const types = ['piano','french_horn','guitar','drums']




    const asd = [
        {"B": [false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false]},
        {"A": [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false]},
        {"G": [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"F": [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false]},
        {"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"D": [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"C": [false, true, true, false,true, false, false, false, false, false, false, false, false, false, false, false]}
    ]

    
    const final_in =[]
    const modify_data = (init_array) =>{
        
        init_array.forEach((element,i) => {
            // element is object
            var arr = Object.values(element)
           
            for (let index = 0; index < arr.length; index++) {
                const elem = arr[index];
                
                final_in.push(elem)
                return final_in
                
                
                
            }

        });
    }
    
    const p = modify_data(asd)

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();


           const keys_to_sing = []
           const k = []
            var ppapa = []

    const x = (init_array) =>{
        
        init_array.forEach((element,i) => {
            // element is object
            var ind_key =  Object.keys(element)[0]
            k.push(ind_key)
            var arr = Object.values(element)
        
            for (let index = 0; index < arr.length; index++) {
                const elem = arr[index];
                console.log(elem)
                elem.forEach((sad,i) => {
                  
                    if (sad === true) {
                        keys_to_sing.push(`${ind_key}${i+1}`)

                        ppapa = (keys_to_sing.sort((a,b) => {
                            var a1 = a.substring(1,2);
                            var b1 = b.substring(1,2);
                            if (a1 === b1) {
                              return 0;
                            }
                            return a1 > b1 ? 1 : -1;
                          }));

                    }
                });
                // final_in.push(elem)
           
                ppapa.forEach(element => {
                    synth.triggerAttack(element, now+=0.5);
                    
                });
                synth.triggerRelease(keys_to_sing, now + 4);



                
                
            }

        });
    }

    
    const playHandler = () => {
        play(true)
        Tone.start()
   


  
        // sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 0.5);

        // player.start();
        synth.triggerAttack("D4", now);
synth.triggerAttack("F4", now + 0.5);
synth.triggerAttack("A4", now + 1);
synth.triggerAttack("C4", now + 1.5);
synth.triggerAttack("E4", now + 2);
synth.triggerRelease(["D4", "F4", "A4", "C4", "E4"], now + 4);
        // Tone.Transport.stop();
        play(false)



        
    }



    function createGist() {
        console.log("sumitting ",sample_type);
        console.log("sumitting ",sample_name);

        const url =`http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples&sampleType=${sample_type}&sampleName=${sample_name}`
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(asd) 
        }).then(function(response) {
            alert("Success")
            history.push('/')
            return response.json();
        }).then(data => {
            console.log(data);
          }).catch(console.error);
        }
      



    const handleSubmit= (e) =>{
        e.preventDefault()
        createGist()

    } 
    
    console.log(final_in)


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
                            type="button"
                             
                             onClick={(e) => setType(type)}

                             className={(sample_type === type ? 'checked-on' : 'checked-off')}
                             ><h5>{type}</h5></button>
                    ))}

                 
            
               
                </div>
                </div>
{asd.map((array_element)=>(
  <div class="row" id="row-one">
  <div id="column1"><h5 >{Object.keys(array_element)[0]}</h5></div>
  {Object.values(array_element)[0].map((array_key,i)=>(
      <button class="type-sub-cont"
      type="button"
      id={(array_key === true ? 'checked-on' : 'checked-off')}
      >   </button>
  ))}
     

  </div>
))}


                 

                  
             </div>
             </div>
                
   </form>
   </>
)
}


export default CreateScreen