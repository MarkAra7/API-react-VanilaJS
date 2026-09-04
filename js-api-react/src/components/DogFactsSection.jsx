import { useState } from "react";

function DogFactsSection({ setLoading }) {
  const [facts, setFacts] = useState([]);
  const [limit, setLimit] = useState(2);

  function renderDogFacts(dataArray) {
    setFacts(dataArray.map((el) => el.attributes.body));
  }

  function dogFactsXHR() {
    setLoading(true);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://dogapi.dog/api/v2/facts?limit=${limit}`, true);
    xhr.onload = function () {
      setLoading(false);
      if (xhr.status === 200) renderDogFacts(JSON.parse(xhr.responseText).data);
    };
    xhr.onerror = () => setLoading(false);
    xhr.send();
  }

  function dogFactsPromise() {
    setLoading(true);
    fetch(`https://dogapi.dog/api/v2/facts?limit=${limit}`)
      .then((res) => res.json())
      .then((jsondata) => { setLoading(false); renderDogFacts(jsondata.data); })
      .catch((err) => { setLoading(false); console.error(err); });
  }

  async function dogFactsAsync() {
    setLoading(true);
    try {
      const res = await fetch(`https://dogapi.dog/api/v2/facts?limit=${limit}`);
      const jsondata = await res.json();
      renderDogFacts(jsondata.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  return (
    <section>
      <h2>2. Suņu Fakti (3 metodes)</h2>
      <label>
        Limits:{" "}
        <input
          type="number"
          value={limit}
          min={1}
          max={5}
          onChange={(e) => setLimit(Number(e.target.value) || 2)}
        />
      </label>
      <div className="button-group">
        <button onClick={dogFactsXHR}>XHR</button>
        <button onClick={dogFactsPromise}>Promise</button>
        <button onClick={dogFactsAsync}>Async/Await</button>
      </div>
      <ul>
        {facts.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
    </section>
  );
}

export default DogFactsSection;
