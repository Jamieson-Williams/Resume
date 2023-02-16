async function getData(url) {
    const response = await fetch(url);
    return await response.json();
}

getData('https://jamfunction.azurewebsites.net/api/HttpTrigger1')
    .then(data => {
        console.log({ data });
        document.getElementById("apiResponse").innerHTML = JSON.stringify(data);
    })
    .catch(error => {
        console.error(error);
    });

/*console.log({ data })

document.getElementById("apiResponse").innerHTML = data

fetch('https://jamfunction.azurewebsites.net/api/HttpTrigger1')
.then((response) => response.json())
.then ((data) => console.log(data))
*/
