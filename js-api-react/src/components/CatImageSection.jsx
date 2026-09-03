import { useState } from "react";

function CatImageSection({ setLoading }) {
  const [imageUrl, setImageUrl] = useState("");

  function setCatImage(data) {
    const url = data.url.startsWith("http")
      ? data.url
      : `https://cataas.com${data.url}`;
    setImageUrl(url);
  }

  function catImgXHR() {
    setLoading(true);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cataas.com/cat?json=true", true);
    xhr.onload = function () {
      setLoading(false);
      if (xhr.status === 200) setCatImage(JSON.parse(xhr.responseText));
    };
    xhr.onerror = () => setLoading(false);
    xhr.send();
  }

  function catImgPromise() {
    setLoading(true);
    fetch("https://cataas.com/cat?json=true")
      .then((res) => res.json())
      .then((data) => { setLoading(false); setCatImage(data); })
      .catch((err) => { setLoading(false); console.error(err); });
  }

  async function catImgAsync() {
    setLoading(true);
    try {
      const res = await fetch("https://cataas.com/cat?json=true");
      const data = await res.json();
      setCatImage(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  return (
    <section>
      <h2>1. Kaķa Attēls (3 metodes)</h2>
      <div className="button-group">
        <button onClick={catImgXHR}>XHR</button>
        <button onClick={catImgPromise}>Promise</button>
        <button onClick={catImgAsync}>Async/Await</button>
      </div>
      {imageUrl && (
        <img src={imageUrl} alt="Kaķis" style={{ maxWidth: 300, display: "block", marginTop: 10 }} />
      )}
    </section>
  );
}

export default CatImageSection;
