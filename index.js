const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      message: "What's your GitHub username?",
      name: "username",
      validate: function(value){
        var pass = (value !=="");
          if (pass){
              return true
          }
          return 'Please enter a username'    
      }
    },
    {
      message: "What's the name of your project?",
      name: "projectname",
    },
    {
      message: "Description of your project?",
      name: "description",
    },
    {
      message: "What do you need to install to make your program work?",
      name: "installation"
    },
    {
      message: "What kind of usage does your program have?",
      name: "usage"
    },
    {
      message: "Do you have anyone to give credit to?",
      name: "credits"    
    },
    {
      message: "Do you have any license on your project?",
      name: "license"
    }
  ]).then(function(response){
      const queryUrl = `https://api.github.com/users/${response.username}/repos?per_page=100`
      axios
    .get(queryUrl)
    .then(function(userinfo){
      var icon = userinfo.data[0].owner.avatar_url

const READMEtext = 
`# ${response.projectname}<hr><br>
## Description
${response.description}
## Table of content
[#Installation](#Installation)
[#Usage](#Usage)
[#Credits](#Credits)
[#License](#License)
## #Installation
${response.installation}
## #Usage
${response.usage}
## #Credits
${response.credits}
## #License
${response.license}<br>
<img src="${icon}">`

      fs.writeFile("README.md", READMEtext, function(err){
    })
    })
  })

