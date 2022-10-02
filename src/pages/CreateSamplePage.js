
import React,{useState,useCallback, useEffect} from 'react';
import * as Tone from 'tone'
import Sequencer from "../components/Seq";



const CreateScreen = ({ match,history}) => {

    //states
    const [playing,setPlay] = useState(false)
    const [sample_name,setName] = useState("")
    const [sample_type,setType] = useState("Piano")    
    const [checkeffect,setCheckEffect] = useState(true)
    const [playState, setPlayState] = useState(false);

 
    //instrument types
    const types = ['piano','french_horn','guitar','drums']




    const initial_recording = [
        {"B": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"C": [false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false]}
    ]

    const [recording_data,setRecordingdata] = useState(initial_recording)

    const playHandler = () => {
        setPlay(true)

        setPlay(false)



        
    }



    function createGist() {
        console.log("sumitting ",sample_type);
        console.log("sumitting ",sample_name);

        const url =`http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples&sampleType=${sample_type}&sampleName=${sample_name}`
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(initial_recording) 
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
    
    function handleStart() {
        setPlayState((prevPlayState) => !prevPlayState);
        //setSelectSpeaker(!playState ? speaker.speakerPlay : speaker.speakerStop)
      }

    const handleOnChange = (objectoo,indexoo) => {
        
        var our_array = []
        var that_bj = {}
        var new_value = true
        initial_recording.forEach((element,i) => {

            // element is object
        
            if(Object.keys(element)[0]  === objectoo ){
                our_array = Object.values(element)[0]
                that_bj = recording_data[i]
                console.log("before change ",our_array[indexoo])
                new_value = !(our_array[indexoo])
                console.log("after change",new_value)
            }
            
        }
        );
        our_array[indexoo] = new_value

        console.log("recoord ",recording_data)
        setRecordingdata(recording_data)
        setCheckEffect(!checkeffect)
    }


    useEffect(() => {
        
        console.log("updateing music sample")
       
      }, [checkeffect])
  
      const toggle = useCallback(() => {
        Tone.Transport.toggle();
        Tone.start();
      }, []);


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
                     <button class="one-of-three" type="button" onClick={()=>{toggle(); handleStart()}}>{playing ? 'Stop Previewing' : 'Preview'}</button>
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
                <Sequencer sample_type={sample_type}  />



                 

                  
             </div>
             </div>
                
   </form>
   </>
)
}


export default CreateScreen