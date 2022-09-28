
import React,{useState, useEffect} from 'react';
import { fetchData } from '../../api/';
import Card from '../../components/Card/Card'
import { Routes, Route, Outlet, Link,useLocation } from "react-router-dom";


const HomepageScreen = () => {

    const [samples, updateSamples] = useState('')
    const [sample_locations, updateSampleLocations] = useState('')


  


    useEffect(() => {
        fetchSamples()
        fetchSampleLocation()
      }, [])

    

      const fetchSamples = () =>{

        fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples")
        .then((res) => res.json())
        .then((json) => {
            const sample_array = json.samples
            console.log(sample_array.length)
            updateSamples(sample_array)
            // sample_array.forEach(element => {
            //     updateSamples(samples => [...samples,element])
                

            // });

          
        })
        .catch(error => {
            // handle the error
        });
  


}


const fetchSampleLocation = () =>{

    fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples_to_locations")
    .then((res) => res.json())
    .then((json) => {
        const samplelocation_array = json.samples_to_locations
        console.log("sample_locations ",samplelocation_array.length)
        updateSampleLocations(samplelocation_array)
      

      
    })
    .catch(error => {
        // handle the error
    });



}
       
    
    

return (
    <>
         <div class="major-container">
        <div class="below-header">
            <h1>
                Samples you've created
            </h1>
            <div>
                
                {samples.length > 0 && samples.map(item => (
                <Card  sample_details={item}  />
                ))
            }
         

            <div class="container-cont">
                <button class="one-of-three" id="create">
                <Link to={`/create`}>Create Sample </Link>
                     </button>
            </div>

            </div>
            </div>
            </div>
    </>

)
}


export default HomepageScreen