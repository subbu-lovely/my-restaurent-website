import { useEffect, useState } from "react";
import "./Introduction.css";

function Introduction() {
  const [typedText, setTypedText] = useState("");
  const fullText = "🍽️ స్వాగతం Subbu Restaurant కి";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // typing speed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="intro-container">
      <div className="intro-content fade-in">
        <h1 className="intro-title gradient-text">{typedText}</h1>
        <p className="intro-text">
          అద్భుతమైన వంటకాలతో, మనసు తేలిక చేసుకునే బిర్యానీలు, కర్రీలు మరియు జ్యూసులతో మీరు రుచిచూసే ప్రతి క్షణం ప్రత్యేకం.
        </p>
        <p className="intro-text">
          At Spicy Treat, we bring you the authentic flavors of Indian cuisine.
          From aromatic biryanis to delicious curries and refreshing juices, 
          we serve happiness in every bite.
        </p>
        <p className="intro-text">
          Visit us today and enjoy a delightful dining experience!
        </p>
      </div>
      <img
        src="https://images.pexels.com/photos/26624678/pexels-photo-26624678.jpeg"
        alt="Restaurant View"
        className="intro-image"
      />
    </div>
  );
}

export default Introduction;
