import { useState, useEffect } from "react";
import Loader from "./components/Loader.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import LogoSlider from "./components/LogoSlider.jsx";
import Featured from "./components/Featured.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoLoaded) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      const maxWait = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(maxWait);
    }
  }, [videoLoaded]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <Hero setVideoLoaded={setVideoLoaded} />
          <LogoSlider />
          <Featured />
        </div>
      )}
    </div>
  );
}

export default App;
