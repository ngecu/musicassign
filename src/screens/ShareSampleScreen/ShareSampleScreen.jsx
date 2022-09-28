
import React,{useState, useEffect,usState} from 'react';
import { fetchData } from '../../api/';
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Card from '../../components/Card/Card'

const ShareSampleScreen = ({match}) => {
    const { state } = useLocation();

    const [sample_name,setName] = useState(state.name)
    const [sample_date,setDate] = useState()
    const [sample_to_locations, updateSampleToLocations] = useState('')
    const [locations, updateLocations] = useState('')
    // const [similarlocations, updateSimilarLocations] = useState('')



    const sample_id = match.params.id

    useEffect(() => {
       
        fetchSampleToLocation()
        fetchLocations()
      }, [])


      const fetchSampleToLocation = () =>{

        fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples_to_locations")
        .then((res) => res.json())
        .then((json) => {
            const samplelocation_array = json.samples_to_locations
            console.log("sample_locations ",samplelocation_array.length)
            updateSampleToLocations(samplelocation_array)
          
        })
        .catch(error => {
            // handle the error
        });
    
    
    
    }

    

    const fetchLocations = () =>{

        fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=locations")
        .then((res) => res.json())
        .then((json) => {
            const samplelocation_array = json.locations
            console.log("sample_locations ",samplelocation_array.length)
            updateLocations(samplelocation_array)
          
        })
        .catch(error => {
            // handle the error
        });
    
    
    
    }

  
    
return (
   <>
<div class="major-container">
             <div class="below-header">
               <h1>Share This Sample</h1>
             </div>

             <div class="container-cont">
                 <div class="left-items">
                    <h3>{sample_name}</h3>
            
                     <p class="date-text">{sample_date}</p>
                 </div>
                  <div class="right-items" id="share-page-right">
                     <button class="one-of-three" id="preview"><a href="preview.htm">Preview</a></button>
                  </div>
             </div>
                
         
             
             {locations.length > 0 && locations.map(l => (
                 <>
                 {
                    sample_to_locations.map(x => (
                        <div class="share-status" >
                        <div class="left-items" id="text-container">
                        <h5>{l.location}</h5>
                        </div>
                        <div class="right-items" id="status-sub-cont">

                        <div class="shared" id={l.id === x.locations_id && l.samples_id === sample_id ? 'checked-on' : 'checked-off'}>
                        <h5>Not Shared</h5>
                        </div>
                         <div class="shared" id={l.id === x.locations_id && l.samples_id === sample_id ? 'checked-on' : 'checked-off'}>
                        <h5>Shared</h5>
                        </div>
                        {/* <div class="shared" id="checked-on">
                        <h5>NOsdasd</h5>
                        </div> */}
                     </div>
                     </div>
                    ))
                 }
                 </>
             
             ))}
           
           
          


           
          
     </div>
   </>
)
}


export default ShareSampleScreen




