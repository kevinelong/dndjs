fetch("http://localhost:8080/?command=DOWN&key2=value2").then((response) => {
    return response.json();
}).then((jsonData) => {
    console.log(jsonData);
});

