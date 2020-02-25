const axios = require("axios").default;
const fs = require('fs');

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};
  
let persons = [];
  
function getPersons (size, offset, persons) {
    const url = 'https://search.torre.co/people/_search';
    return axios.post(
        url + '?size=' + size + '&offset=' + offset, {}, axiosConfig
    )
    .then(response => {
        try {
            response.data.results.forEach( (element)=> {
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
            });
            if ((response.data.offset + response.data.size) > response.data.total) return persons;
            console.log (persons.length + ' of ' + response.data.total);
            return getPersons (size, size + offset, persons)
        } catch (error) {
            console.log(error);
        }                
    })
}

// use it to get data
getPersons(100, 0, [])
.then(data => {
    fs.writeFile('./data/persons.js', JSON.stringify(data, null, 2),'utf8' , function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("data written to persons.js");
        }
    });
});


