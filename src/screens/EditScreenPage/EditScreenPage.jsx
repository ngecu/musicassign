
import React,{useState, useEffect} from 'react';
import { fetchData } from '../../api/';
import Card from '../../components/Card/Card'
import { Routes, Route, useLocation, Link } from "react-router-dom";
import * as Tone from 'tone'
import Instrument from '../../components/Instrument/Instrument'


const EditpageScreen = ({ match,history}) => {

    const { state } = useLocation();


    


    const [playing,play] = useState(false)
    const [sample_name,setName] = useState(state.name)
    const [sample_type,setType] = useState(state.type)
    const [rerender, setRerender] = useState(false);

    const typess = ['piano','French Horn','Guitar','Drums']

    console.log(typess.length)
    var myJSONString = state.recording_data;
    var myObject = JSON.parse(myJSONString);
    // var myArray = [];
    // for(var i in myObject) {
    //     myArray.push(myObject[i]);
    // }

    const [recording_data,setRecordingdata] = useState(myObject)
    const [new_array,sad] = useState('')

    
    recording_data.map(myFunction)

    function myFunction(num) {
        return num * 10;
      }
    


    const sample_id = match.params.id


    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
 

    function createGist() {
        console.log("sumitting ",sample_type);
        console.log("sumitting ",sample_name);

        const url =`http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=update&endpoint=samples&sampleType=${sample_type}&sampleName${sample_name}=&id=${sample_id}`
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(recording_data) 
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
    
    const playHandler = () => {
        play(true)
        synth.triggerAttack("D4", now);
        synth.triggerAttack("F4", now + 0.5);
        synth.triggerAttack("A4", now + 1);
        synth.triggerAttack("C5", now + 1.5);
        synth.triggerAttack("E5", now + 2);
        synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
        play(false)
    }
    
    const handleOnChange = (objectoo,indexoo) => {
        
        var our_array = []
        var that_bj = {}
        var new_value = true
        recording_data.forEach((element,i) => {

            // element is object
        
            if(Object.keys(element)[0]  === objectoo ){
                our_array = Object.values(element)[0]
                that_bj = recording_data[i]
                
                new_value = !(our_array[indexoo])
                // console.log(new_value)


                
                // console.log(indexoo)
                
                
                // console.log(`objectoo is ${objectoo} of index ${indexoo}`)
    
            }
            
        }
        );
        our_array[indexoo] = new_value
        

        // http://wmp.interaction.courses/api/v1/?apiKey=&mode=update&endpoint=samples&sampleType=&sampleName=&id=
        

        // var objIndex = recording_data.findIndex((obj => Object.keys(obj)[0]  === objectoo ));
        
        sad(recording_data)
    }

    useEffect(() => {
        
        console.log("recording_data")
       
      }, [recording_data])
  


return (
    <form onSubmit={handleSubmit} class="major-container">
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
            <button class="one-of-three" id="three1" type="submit"> Save </button>
        </div>
    </div>

    <div class="type-overall-container">
                <div class="type">

                <div class="row" id="row-one">
                <div id="column1"><h5 >Type</h5></div>
                
                <div class="type-sub-cont">

    {typess.map((type)=>(
                             <button 
                             id="column2"   
                            type="button"
                             
                             onClick={(e) => setType(type)}

                             className={(sample_type === type ? 'checked-on' : 'checked-off')}
                             ><h5>{type}</h5></button>
                    ))}
   </div>
                </div>
    {recording_data.map((array_element)=>(
        // array element is an  object 
  <div class="row" id="row-one">
  <div id="column1"><h5 >{Object.keys(array_element)[0]}</h5></div>
  {Object.values(array_element)[0].map((array_key,i)=>(
      <button 
      type="button"
      onClick={(e) => handleOnChange(Object.keys(array_element)[0],i)}
      class="type-sub-cont"
      id={(array_key === true ? 'checked-on' : 'checked-off')}
      >    </button>
  ))}
     

  </div>
))}
    



    </div>
             </div>
                
   </form>

)
}


export default EditpageScreen