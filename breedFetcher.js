const needle  = require('needle');

const inputArguments = process.argv.slice(2);
const breed = inputArguments[0];
const catSearch = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;

const options = {
  headers: { 'x-api-key': '79d094a2-72f4-4dc3-86a8-780a0951a6bc' }
};

needle.get(catSearch, options, function(error, response) {
  if (!error && response.statusCode === 200) {
    //Note needle returns the body as an object for CatAPI
    //so no need to JSON.parse here
    const dataObject = response.body;
    //console.log(typeof dataObject)
    if (dataObject.length === 0) {
      console.log(`Breed Search Error: ${breed} not found!`);
    } else {
      console.log(dataObject[0].description);
    }
  } else {
    console.log("statusCode:", response && response.statusCode);
    console.log("error", error);
  }
});