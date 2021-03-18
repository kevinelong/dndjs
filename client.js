fetch("http://localhost:8080/?command=DOWN").then((response) => {
    return response.json();
}).then((jsonData) => {
    console.log(jsonData);
});