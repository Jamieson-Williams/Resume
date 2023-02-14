async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

const data = await getData('https://jamfunction.azurewebsites.net/api/HttpTrigger1');

console.log({ data })

document.getElementById("apiResponse").innerHTML = data

/*fetch('https://jamfunction.azurewebsites.net/api/HttpTrigger1')
.then((response) => response.json())
.then ((data) => console.log(data))
*/
