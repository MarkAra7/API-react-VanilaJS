const progressBar = document.getElementById("progressBar");

function showProgress() { 
    progressBar.style.display = "block"; 
}

function hideProgress() { 
    progressBar.style.display = "none"; 
}

// ==========================================
// 1. KAĶA ATTĒLA API
// ==========================================

function catImgXHR() {
    showProgress();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cataas.com/cat?json=true", true);
    xhr.onload = function() {
        hideProgress();
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const imageUrl = data.url.startsWith("http") ? data.url : `https://cataas.com${data.url}`;
            document.getElementById("catImageDisplay").src = imageUrl;
        }
    };
    xhr.onerror = () => { hideProgress(); };
    xhr.send();
}

function catImgPromise() {
    showProgress();
    fetch("https://cataas.com/cat?json=true")
        .then(res => res.json())
        .then(data => {
            hideProgress();
            const imageUrl = data.url.startsWith("http") ? data.url : `https://cataas.com${data.url}`;
            document.getElementById("catImageDisplay").src = imageUrl;
        })
        .catch(err => { hideProgress(); console.error(err); });
}

async function catImgAsync() {
    showProgress();
    try {
        const res = await fetch("https://cataas.com/cat?json=true");
        const data = await res.json();
        const imageUrl = data.url.startsWith("http") ? data.url : `https://cataas.com${data.url}`;
        document.getElementById("catImageDisplay").src = imageUrl;
        return imageUrl;
    } catch (err) {
        console.error(err);
    } finally {
        hideProgress();
    }
}


// ==========================================
// 2. SUŅU FAKTU API
// ==========================================
function getLimit() {
    return document.getElementById("limitInput").value || 2;
}

function dogFactsXHR() {
    showProgress();
    const limit = getLimit();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://dogapi.dog/api/v2/facts?limit=${limit}`, true);
    xhr.onload = function() {
        hideProgress();
        if (xhr.status === 200) {
            const jsondata = JSON.parse(xhr.responseText);
            renderDogFacts(jsondata.data);
        }
    };
    xhr.onerror = () => { hideProgress(); };
    xhr.send();
}

function dogFactsPromise() {
    showProgress();
    const limit = getLimit();
    fetch(`https://dogapi.dog/api/v2/facts?limit=${limit}`)
        .then(res => res.json())
        .then(jsondata => {
            hideProgress();
            renderDogFacts(jsondata.data);
        })
        .catch(err => { hideProgress(); console.error(err); });
}

async function dogFactsAsync() {
    showProgress();
    const limit = getLimit();
    try {
        const res = await fetch(`https://dogapi.dog/api/v2/facts?limit=${limit}`);
        const jsondata = await res.json();
        renderDogFacts(jsondata.data);
    } catch (err) {
        console.error(err);
    } finally {
        hideProgress();
    }
}

function renderDogFacts(dataArray) {
    let listHTML = "";
    dataArray.forEach(el => {
        listHTML += `<li>${el.attributes.body}</li>`;
    });
    document.getElementById("dogFactsList").innerHTML = listHTML;
}


// ==========================================
// 3. KAĶA FAKTU API
// ==========================================

function catFactXHR() {
    showProgress();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://meowfacts.herokuapp.com/", true);
    xhr.onload = function() {
        hideProgress();
        if (xhr.status === 200) {
            const jsondata = JSON.parse(xhr.responseText);
            document.getElementById("catFactDisplay").innerText = jsondata.data[0];
        }
    };
    xhr.onerror = () => { hideProgress(); };
    xhr.send();
}

function catFactPromise() {
    showProgress();
    fetch("https://meowfacts.herokuapp.com/")
        .then(res => res.json())
        .then(jsondata => {
            hideProgress();
            document.getElementById("catFactDisplay").innerText = jsondata.data[0];
        })
        .catch(err => { hideProgress(); console.error(err); });
}

async function catFactAsync() {
    showProgress();
    try {
        const res = await fetch("https://meowfacts.herokuapp.com/");
        const jsondata = await res.json();
        document.getElementById("catFactDisplay").innerText = jsondata.data[0];
    } catch (err) {
        console.error(err);
    } finally {
        hideProgress();
    }
}