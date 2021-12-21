import './styles/App.css';
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  collection,
  setDoc 
} from "firebase/firestore";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Levels from "./components/Levels";
import Level from "./components/Level";
import Scoreboard from "./components/Scoreboard";
import Navbar from "./components/Navbar";

const firebaseConfig = {
  apiKey: "AIzaSyAkvBGr7qeHc8gXIUjFVJPKrQ5ez6qUKMc",
  authDomain: "waldo-729ba.firebaseapp.com",
  projectId: "waldo-729ba",
  storageBucket: "waldo-729ba.appspot.com",
  messagingSenderId: "1097082687800",
  appId: "1:1097082687800:web:ac916e42bfffcfc6ca71cd"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage();
const db = getFirestore();


function App() {

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [waldoImg, setWaldoImg] = useState();
  const [wendaImg, setWendaImg] = useState();
  const [wizardImg, setWizardImg] = useState();
  const [odlawImg, setOdlawImg] = useState();
  const [measures, setMeasures] = useState();

  const images = {image1, image2, image3};
  const pngs = {waldoImg, wendaImg, wizardImg, odlawImg};

  const [image, setImage] = useState();
  const [chars, setChars] = useState();
  const [measure, setMeasure] = useState();
  const [start, setStart] = useState(false);
  const [level, setLevel] = useState();

  const [getScores, setgetScores] = useState(false);
  const [easyScores, seteasyScores] = useState();
  const [mediumScores, setmediumScores]= useState();
  const [hardScores, sethardScores] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getDownloadURL(ref(storage, "images/waldo1.jpeg"))
      .then((url) => setImage1(url))
      .catch((err) => console.error(err));

    getDownloadURL(ref(storage, "images/waldo2.jpg"))
      .then((url) => setImage2(url))
      .catch((err) => console.error(err));

    getDownloadURL(ref(storage, "images/waldo3.jpg"))
      .then((url) => setImage3(url))
      .catch((err) => console.error(err));

    getDownloadURL(ref(storage, "pngs/waldo.png"))
      .then((url) => setWaldoImg(url))
      .catch((err) => console.error(err));

    getDownloadURL(ref(storage, "pngs/wenda.png"))
      .then((url) => setWendaImg(url))
      .catch((err) => console.error(err));

    getDownloadURL(ref(storage, "pngs/wizard.png"))
      .then((url) => setWizardImg(url))
      .catch((err) => console.error(err));

    getDownloadURL(ref(storage, "pngs/odlaw.png"))
      .then((url) => setOdlawImg(url))
      .catch((err) => console.error(err))

    const fetchMeasures = async() => {
        const docRef = doc(db, "waldo", "measures");
        const measures = await getDoc(docRef);
        setMeasures(measures.data());
    };

    fetchMeasures();
  }, []);

  const getData = (image, chars, measure) => {
    setImage(image);
    setChars(chars);
    setMeasure(measure);
  };

  const getScoreboardData = async() => {
    const easyRef = collection(db, "easyScores");
    const mediumRef = collection(db, "mediumScores");
    const hardRef = collection(db, "hardScores");

    const easyQ = query(easyRef, orderBy("time"));
    const mediumQ = query(mediumRef, orderBy("time"));
    const hardQ = query(hardRef, orderBy("time"));

    const easySnapshot = await getDocs(easyQ);
    const mediumSnapshot = await getDocs(mediumQ);
    const hardSnapshot = await getDocs(hardQ);

    let easyData = [];
    let mediumData = [];
    let hardData = [];
    easySnapshot.forEach(doc => easyData.push(doc.data()));
    mediumSnapshot.forEach(doc => mediumData.push(doc.data()));
    hardSnapshot.forEach(doc => hardData.push(doc.data()));
    
    seteasyScores(easyData);
    setmediumScores(mediumData);
    sethardScores(hardData);
  };

  const submitScore = async(name, time) => {
    const getTime = () => {
      const convertStringToNumbers = (str) => {
        let string = str;
        let h = parseInt(string.slice(0, 2));
        let m = parseInt(string.slice(3, 5));
        let s = parseInt(string.slice(6, 8));
        return [h, m, s];
      };

      let timeArray = convertStringToNumbers(time);
      let timeInSeconds = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2];
      return timeInSeconds;
    };
    let convertedTime = getTime();
    let nameFinal;
    if(name === "" || !name){nameFinal = " "}
    else{nameFinal = name};  
    await setDoc(doc(db, `${level}Scores`, `${nameFinal}`), {
      name: nameFinal,
      time: convertedTime
    });
  };
  
  const getLevel = (level) => {
    setLevel(level);
  }

  useEffect(() => {
    if(getScores){
      getScoreboardData();
      setgetScores(false)
    }
  }, [getScores]);

  useEffect(() => {
    if(image && chars && measure){
      setStart(true);
    };
  }, [image, chars, measure]);

  useEffect(() => {
    if(start){
      navigate("/game")
      setStart(false)
    };
  }, [start]);

  return (
    <div className="App">
      <Navbar getScoreboard={getScoreboardData}/>
      <Routes>
        <Route path="/" element={<Levels 
          images={images} 
          pngs={pngs} 
          measures={measures} 
          getData={getData} 
          getLevel={getLevel}
        />} />
        <Route path="/game" element={<Level 
          image={image} 
          chars={chars} 
          measure={measure} 
          handleSubmit={submitScore}
          getScoreboard={getScoreboardData} 
        />}/>
        <Route path="/scoreboard" element={<Scoreboard 
          easy={easyScores} 
          medium={mediumScores} 
          hard={hardScores}
          level={level}
          getScoreboardData={getScoreboardData} 
        />}/>
      </Routes>
    </div>
  );
}

export default App;
