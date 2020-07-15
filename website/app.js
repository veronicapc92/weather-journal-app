// Personal API Key for OpenWeatherMap API
const apiKey = "27e19826b42b32c4a4ee8ad80c179ebf";

const button = document.getElementById("generate");
// Event listener to add function to existing HTML DOM element
button.addEventListener("click", (e) => handleClick(e));

/* Function called by event listener */
function handleClick(e) {
  e.preventDefault();
  const url = "http://localhost:8000/all";
  getApiData().then((data) => postData(url, data).then(updateUI(url)));
}

/* Function to GET Web API Data*/
async function getApiData() {
  const zipCode = document.getElementById("zip").value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
  );

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
async function postData(url, data) {
  const feelings = document.getElementById("feelings").value;
  const date = getCurrentDate();
  const dataToPost = { date, temp: data.main.temp, feelings };
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dataToPost),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to GET Project Data and update UI dynamically*/
async function updateUI(url) {
  const response = await fetch(url);

  try {
    const data = await response.json();
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temp;
    document.getElementById("content").innerHTML = data.feelings;
  } catch (error) {
    console.log("error", error);
  }
}

/* Helper functions*/
function getCurrentDate() {
  const today = new Date();
  const dd = today.getDate().toString().padStart(2, "0");
  const mm = (today.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = today.getFullYear().toString();

  return `${dd}/${mm}/${yyyy}`;
}
