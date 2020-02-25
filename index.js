var http = require("http");
const axios = require("axios").default;

//create a server object:
http
  .createServer(function(req, res) {
    persons.forEach ((person)=> {
        res.write(person.username.concat("\n \n")); //write a response to the client
    })
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080

let axiosConfig = {
  headers: {
        'Content-Type': 'application/json'
    }
  };

let persons = [];

(async function getNames() {
  try {
    const { data } = await axios.post(
      "https://search.torre.co/people/_search?size=5", {}, axiosConfig
    );
    data.results.forEach( (element)=> {
        var person = {};
        person.subjectId = element.subjectId;
        person.username = element.username;
        person.name = element.name;
        person.locationName = element.locationName;
        person.profesionalHeadline = element.profesionalHeadline;
        person.weight = element.weight;
        person.verified = element.verified;
        person.remoter = element.remoter;
        person.picture = element.picture;
        persons.push (person);
    })
    console.log (persons);
  } catch (error) {
    console.log(error);
  }
})();