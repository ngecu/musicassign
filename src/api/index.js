
// api key
const apiKey = `2izT6jiZ`

// read locations
var x = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=locations`


// read samples
var x = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples`


// samples to locations
var x =`http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples_to_locations`


// create samples
var x =`http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples&sampleType=&sampleName=`



// create samples to location 
var x = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples_to_locations&sampleID=&locationID=`


// update samples
var x = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=update&endpoint=samples&sampleType=&sampleName=&id=`


// delete samples 
var x = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=delete&endpoint=samples&id=`


// delete samples to location 
var x = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=delete&endpoint=samples_to_locations&id=`


const url = 'http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples';




export const fetchData = async () => {
  let changeableUrl = url;


  try {

    fetch(
        changeableUrl)
                    .then((res) => res.json())
                    .then((json) => {
                        return json
                        
                      
                    })
  } catch (error) {
    return error;
  }
};