import { useState } from "react";

function CatFactSection({ setLoading }) {
  const [fact, setFact] = useState("");

  function catFactXHR() {
    setLoading(true);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://meowfacts.herokuapp.com/", true);
    xhr.onload = function () {
      setLoading(false);
      if (xhr.status === 200) setFact(JSON.parse(xhr.responseText).data[0]);
    };
    xhr.onerror = () => setLoading(false);
    xhr.send();
  }

  function catFactPromise() {
    setLoading(true);
    fetch("https://meowfacts.herokuapp.com/")
      .then((res) => res.json())
      .then((jsondata) => { setLoading(false); setFact(jsondata.data[0]); })
      .catch((err) => { setLoading(false); console.error(err); });
  }

  async function catFactAsync() {
    setLoading(true);
    try {
      const res = await fetch("https://meowfacts.herokuapp.com/");
      const jsondata = await res.json();
      setFact(jsondata.data[0]);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  return (
    <section>
      <h2>3. Kaķa Fakts (3 metodes)</h2>
      <div className="button-group">
        <button onClick={catFactXHR}>XHR</button>
        <button onClick={catFactPromise}>Promise</button>
        <button onClick={catFactAsync}>Async/Await</button>
      </div>
      <p style={{ fontWeight: "bold" }}>{fact}</p>
    </section>
  );
}

export default CatFactSection;
