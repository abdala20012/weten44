import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const DISPLAY_NAME = "وتين";
const SITE_PASSWORD = "5/5/2001";
const ACQUAINTANCE_DATE = "2024-01-11T00:00:00";

function TypingText({ text, speed = 35, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className={className}>{displayed}</p>;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "00:00";
  const total = Math.floor(value);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function App() {
  const musicRef = useRef(null);
  const voiceRef = useRef(null);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showLastWords, setShowLastWords] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const [musicProgress, setMusicProgress] = useState({
    current: 0,
    duration: 0,
  });

  const [voiceProgress, setVoiceProgress] = useState({
    current: 0,
    duration: 0,
  });

  const [counter, setCounter] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const content = useMemo(
    () => ({
      heroName: DISPLAY_NAME,
      heroSub:
        "كل سنة وأنتِ أجمل حاجة في الدنيا، وأحنّ قلب، وألطف روح، وأحلى عيد ميلاد ♥️",
      heroText:
        "النهارده مش يوم عادي أبدًا... النهارده اليوم اللي الدنيا نورت فيه أكتر، واليوم اللي اتولدت فيه أجمل وأرقّ بنت: وتين. حبيت يكون ليكي مكان خاص جدًا، معمول بكل حب، فيه صورك، ذكرياتك، وكلام بسيط من القلب عشان يومك يبقى أحلى، ويليق بيكي وبجمالك.",
      meetTitle: "من أول يوم عرفتك ❤️",
      meetDate: "11 / 1 / 2024",
      timerTitle: "من أول يوم دخلتي حياتي ❤️",
      timerText:
        "من يوم 11 / 1 / 2024، واليوم بقى مختلف، والإحساس بقى أهدى، والحياة بقى فيها تفصيلة حلوة جدًا اسمها وتين. وكل يوم بيعدّي بيثبت أكتر إنكِ شخص مش عادي، وإن حضورك لوحده كفاية يجمّل أي وقت.",
      longMessage:
        "وتين... في يوم ميلادك أحب أقولك إنكِ نعمة جميلة جدًا، وروحك من أجمل الأرواح اللي ممكن الواحد يقابلها في حياته. وجودك فيه راحة، وفيه نور، وفيه إحساس حلو ما بيتكررش. كل سنة وأنتِ مطمنة، سعيدة، ناجحة، ومحققة كل اللي نفسك فيه. وكل سنة وأنتِ قريبة من كل حاجة بتحبيها، وبعيدة عن أي حزن أو تعب. ويارب العمر كله يفضل يضحكلك، وتفضلي دايمًا أحلى من كل الكلام اللي ممكن يتقال.",
      cuteText:
        "هدية صغيرة جدًا... لكن معمول فيها كل حاجة بحب كبير جدًا عشانك يا وتين.",
      finalText:
        "وفي النهاية... أحب أقولك إن يوم ميلادك بالنسبة لي مناسبة جميلة جدًا، لأن وجودك في الدنيا في حد ذاته شيء يستحق الاحتفال. أتمنى من قلبي إن السنة الجديدة من عمرك تكون مليانة رزق، وفرحة، وضحك، ونجاح، وراحة بال، وحاجات حلوة كتير على قد قلبك الجميل. كل سنة وأنتِ بخير يا أجمل وتين في الدنيا ♥️",
      lastWords:
        "ولو كان لازم أختم بكلمة واحدة، فهي: إنكِ جميلة جدًا... في شكلك، وفي روحك، وفي حضورك، وفي طيبتك. وربنا يديم ضحكتك، ويحفظك من كل شر، ويكتبلك أيام أجمل من كل اللي فات، ويفرح قلبك فرح كبير جدًا يليق بيكي. كل سنة وأنتِ عيدي الحلو، وأجمل سبب للفرحة ♥️",
      prayerText:
        "اللهم في يوم ميلاد وتين، اكتب لها سعادة لا تزول، وفرحة تملأ قلبها، وطمأنينة تسكن روحها، وتوفيقًا يلازم خطواتها، ونورًا في أيامها، وراحةً في بالها، وحقق لها كل ما تتمنى، واصرف عنها كل ضيق وحزن، واجعل سنوات عمرها القادمة أجمل وأجمل يا رب العالمين.",
    }),
    []
  );

  const memoryCards = useMemo(
    () => [
      {
        id: 1,
        title: "أول صورة",
        image: "/1.jpg",
        date: "ذكرى جميلة",
        text: "كل صورة ليكي فيها شيء مختلف... لكن الثابت فيها كلها إنكِ جميلة جدًا بشكل يخطف القلب.",
      },
      {
        id: 2,
        title: "الابتسامة",
        image: "/2.jpg",
        date: "أحلى ضحكة",
        text: "ضحكتك من الحاجات اللي تخلي اليوم كله ألطف، وتخلي القلب يهدى من غير سبب واضح غير إنكِ موجودة.",
      },
      {
        id: 3,
        title: "الرقة",
        image: "/3.jpg",
        date: "تفصيلة مميزة",
        text: "فيكي رقة كده تخلي أي حاجة حواليكي أهدى وأجمل وأخف على القلب.",
      },
      {
        id: 4,
        title: "الجمال",
        image: "/4.jpg",
        date: "ملامح لا تُنسى",
        text: "في ملامحك شيء جميل جدًا، مش بس بيتشاف... ده بيتحس كمان.",
      },
      {
        id: 5,
        title: "الهدوء",
        image: "/5.jpg",
        date: "راحة",
        text: "حتى من غير كلام كتير، حضورك فيه هدوء مريح جدًا وراحة كبيرة.",
      },
      {
        id: 6,
        title: "العفوية",
        image: "/6.jpg",
        date: "ألطف حاجة",
        text: "أجمل ما فيكي إنكِ حقيقية، وعفوية، وقريبة للقلب بشكل يخليكي مميزة جدًا.",
      },
      {
        id: 7,
        title: "الونس",
        image: "/7.jpg",
        date: "روح جميلة",
        text: "الونس الحقيقي له شكل... ولو هختاره في كلمة، فغالبًا هيكون اسمها وتين.",
      },
      {
        id: 8,
        title: "التفاصيل",
        image: "/8.jpg",
        date: "أحلى تفصيلة",
        text: "كل التفاصيل اللي فيكي مميزة... طريقة، إحساس، حضور، وكل حاجة فيكي ليها طابع مختلف.",
      },
      {
        id: 9,
        title: "النور",
        image: "/9.jpg",
        date: "إشراقة",
        text: "فيكي نور حقيقي يخلي أي صورة ليكي مش مجرد صورة... لكن إحساس كامل.",
      },
      {
        id: 10,
        title: "السعادة",
        image: "/10.jpg",
        date: "فرحة",
        text: "كل مرة أشوف صورة ليكي، أحس إن الجمال فعلًا ممكن يكون بسيط لكن مؤثر جدًا.",
      },
      {
        id: 11,
        title: "الحكاية",
        image: "/11.jpg",
        date: "ذكرى مميزة",
        text: "وجودك صنع حكاية لطيفة في القلب... وكل صورة هنا جزء جميل منها.",
      },
      {
        id: 12,
        title: "عيد ميلاد سعيد",
        image: "/12.jpg",
        date: "أجمل يوم",
        text: "النهارده يومك... واليوم ده يستحق كل الحب والفرحة والدلع، لأنكِ تستاهلي كل حاجة حلوة.",
      },
    ],
    []
  );

  const videoCards = useMemo(
    () => [
      {
        id: 1,
        title: "الفيديو الأول",
        src: "/video1.mp4",
        text: "لحظة جميلة تستحق تبقى جزء من يومك المميز.",
      },
      {
        id: 2,
        title: "الفيديو الثاني",
        src: "/video2.mp4",
        text: "تفصيلة لطيفة جدًا عشان عيد ميلادك يبقى أحلى.",
      },
      {
        id: 3,
        title: "الفيديو الثالث",
        src: "/video3.mp4",
        text: "ذكرى حلوة تكمل فرحة اليوم الجميل ده.",
      },
    ],
    []
  );

  const timelineItems = useMemo(
    () => [
      {
        title: "أول يوم عرفنا بعض",
        date: "11 / 1 / 2024",
        text: "اليوم اللي بدأت فيه أعرف إن في ناس وجودها يفرق فعلًا، وإنتِ كنتِ من أهمهم.",
      },
      {
        title: "بداية الألفة",
        date: "بعدها بفترة",
        text: "بهدوء بدأت الأحاسيس اللطيفة تزيد، وبدأ وجودك يبقى له معنى خاص جدًا.",
      },
      {
        title: "كل ذكرى حلوة",
        date: "لحظات متفرقة",
        text: "كل وقت حلو، وكل صورة، وكل تفصيلة مرتبطة بيكي، كانت بتسيب أثر جميل.",
      },
      {
        title: "النهارده",
        date: "5 / 5",
        text: "يوم ميلادك... واليوم اللي يستحق كل الحب والدعوات والاهتمام لأنك تستاهلي أجمل فرحة.",
      },
    ],
    []
  );

  const cuteFacts = useMemo(
    () => [
      { title: "اسم أحلى واحدة", value: DISPLAY_NAME },
      { title: "تاريخ ميلادها", value: "5 / 5 / 2001" },
      { title: "عدد الصور", value: "12" },
      { title: "عدد الفيديوهات", value: "3" },
    ],
    []
  );

  const reasons = useMemo(
    () => [
      "ضحكتك",
      "رقتك",
      "طيبتك",
      "هدوءك",
      "ملامحك",
      "تفاصيلك",
      "حضورك",
      "روحك الحلوة",
    ],
    []
  );

  const differentReasons = useMemo(
    () => [
      {
        title: "فيكي طيبة",
        text: "طيبتك واضحة جدًا وبتوصل من غير أي مجهود، وده من أجمل الحاجات فيكي.",
      },
      {
        title: "فيكي رقة",
        text: "في طريقتك كلامًا وشكلًا وإحساسًا رقة جميلة تخليكي مميزة عن أي حد.",
      },
      {
        title: "فيكي هدوء",
        text: "في حضورك هدوء لطيف يخلي القلب يطمن ويهدى.",
      },
      {
        title: "فيكي جمال",
        text: "جمالك مش في شكلك وبس... لكن في روحك، وأسلوبك، وكل تفاصيلك.",
      },
      {
        title: "فيكي خفة",
        text: "خفة روحك بتخلي وجودك محبوب وقريب للقلب بشكل كبير.",
      },
      {
        title: "فيكي شيء مختلف",
        text: "في ناس كتير بنشوفها، لكن قليل جدًا اللي يكون له أثر حقيقي... وإنتِ من القليل ده.",
      },
    ],
    []
  );

  const loveParagraphs = useMemo(
    () => [
      "كل سنة وأنتِ بخير يا وتين، وكل سنة وأنتِ أجمل وألطف وأرقّ واحدة، وكل سنة وقلبك مليان فرحة ورضا وحب.",
      "يوم ميلادك من الأيام اللي فعلًا تستحق احتفال خاص، لأن وجودك نفسه جميل جدًا، ولأنكِ شخص له قيمة كبيرة ومكانة حلوة في القلب.",
      "أتمنى من قلبي إن السنة الجديدة من عمرك تكون مختلفة بكل الخير، وتبدأ معاها أبواب حلوة كتير تتفتح ليكي، وأحلامك كلها تقرب منك أكتر.",
      "وصدقيني... مهما اتقال، هيفضل فيكي جمال أكبر من الكلام نفسه، لأنكِ فعلًا تستاهلي كل حاجة حلوة في الدنيا.",
    ],
    []
  );

  const scatteredMessages = useMemo(
    () => [
      "كل سنة وأنتِ أجمل فرحة في اليوم ده.",
      "عيد ميلادك يستحق كلام كثير... وقلب أكثر.",
      "الجمال لما يتحول لإنسان... غالبًا هيكون اسمه وتين.",
      "في يومك... أتمنى لكِ عمرًا مليئًا بالنور والفرح.",
    ],
    []
  );

  const dreamMoments = useMemo(
    () => [
      "فرحة كبيرة جدًا في يومك",
      "سنة جديدة كلها نجاح وتحقيق أحلام",
      "راحة بال تدوم",
      "ضحكة من القلب طول الوقت",
      "أيام خفيفة وجميلة",
      "كل اللي نفسك فيه يتحقق",
    ],
    []
  );

  const selectedCard =
    selectedIndex !== null ? memoryCards[selectedIndex] : null;

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 2400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const startDate = new Date(ACQUAINTANCE_DATE);

    const updateCounter = () => {
      const now = new Date().getTime();
      const start = startDate.getTime();
      const difference = now - start;

      if (difference <= 0) {
        setCounter({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCounter({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const music = musicRef.current;
    if (!music) return;

    const playMusic = async () => {
      try {
        await music.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playMusic();
  }, [hasStarted]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setShowLastWords(false);
      }

      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") {
          setSelectedIndex((prev) =>
            prev === null
              ? 0
              : (prev - 1 + memoryCards.length) % memoryCards.length
          );
        }
        if (e.key === "ArrowLeft") {
          setSelectedIndex((prev) =>
            prev === null ? 0 : (prev + 1) % memoryCards.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, memoryCards.length]);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (enteredPassword === SITE_PASSWORD) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError(`الباسورد غلط يا ${DISPLAY_NAME} 🤍`);
    }
  };

  const startExperience = () => {
    setHasStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleVoice = async () => {
    const audio = voiceRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsVoicePlaying(true);
      } catch {
        setIsVoicePlaying(false);
      }
    } else {
      audio.pause();
      setIsVoicePlaying(false);
    }
  };

  const openCard = (index) => setSelectedIndex(index);
  const closeCard = () => setSelectedIndex(null);

  const nextCard = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % memoryCards.length
    );
  };

  const prevCard = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + memoryCards.length) % memoryCards.length
    );
  };

  const musicPercent = musicProgress.duration
    ? (musicProgress.current / musicProgress.duration) * 100
    : 0;

  const voicePercent = voiceProgress.duration
    ? (voiceProgress.current / voiceProgress.duration) * 100
    : 0;

  if (showLoader) {
    return (
      <div className="loader-page" dir="rtl">
        <div className="loader-stars" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="loader-circle"></div>
        <h1>جارِ تجهيز أجمل مفاجأة عيد ميلاد مخصوص لـ {DISPLAY_NAME} 👑</h1>
        <p className="loader-subtitle">
          شوية حب... شوية ذكريات... وكلام يليق جدًا بيومها الجميل
        </p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="password-page" dir="rtl">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>

        <div className="floating-hearts" aria-hidden="true">
          <span>✦</span>
          <span>❀</span>
          <span>✿</span>
          <span>✨</span>
          <span>❀</span>
          <span>✦</span>
        </div>

        <div className="password-card glass">
          <div className="password-top-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="password-image-overlay"></div>
          </div>

          <div className="lock-icon">🎂</div>
          <div className="cute-badge">👑 مفاجأة عيد ميلاد مخصوص ليكي</div>

          <h1>اكتبي تاريخ ميلادك يا {DISPLAY_NAME}</h1>

          <p className="password-subtext">
            المكان ده معمول بحب كبير جدًا...
            فيه صورك، ذكرياتك، كلام حلو ليكي،
            وتفاصيل صغيرة معمولة مخصوص عشان يومك يكون مميز
            ويليق بأجمل بنت في الدنيا.
          </p>

          <form onSubmit={handleUnlock} className="password-form">
            <input
              type="password"
              placeholder="اكتبي كلمة السر هنا"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <button type="submit">افتحي المفاجأة 🎁</button>
          </form>

          {error && <div className="error-text">{error}</div>}
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="cinematic-screen" dir="rtl">
        <div className="cinematic-bg"></div>
        <div className="cinematic-overlay"></div>

        <div className="cinematic-card glass">
          <span className="small-badge">✨ افتتاحية المفاجأة</span>
          <h1>{DISPLAY_NAME}</h1>
          <TypingText
            text="كل سنة وأنتِ طيبة يا أجمل وتين... ويا رب تكون سنة كلها فرحة ليكي."
            className="cinematic-typing"
            speed={28}
          />
          <p>
            قبل ما تبدأي...
            خدي نفس هادي،
            واستعدي لمكان صغير جدًا،
            لكن معمول بكل الحب عشانك في يوم ميلادك.
          </p>
          <button className="cinematic-btn" onClick={startExperience}>
            ابدئي المفاجأة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" dir="rtl">
      <audio
        ref={musicRef}
        loop
        preload="auto"
        onTimeUpdate={() =>
          setMusicProgress({
            current: musicRef.current?.currentTime || 0,
            duration: musicRef.current?.duration || 0,
          })
        }
        onLoadedMetadata={() =>
          setMusicProgress({
            current: musicRef.current?.currentTime || 0,
            duration: musicRef.current?.duration || 0,
          })
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/love.mp3" type="audio/mpeg" />
      </audio>

      <audio
        ref={voiceRef}
        preload="auto"
        onTimeUpdate={() =>
          setVoiceProgress({
            current: voiceRef.current?.currentTime || 0,
            duration: voiceRef.current?.duration || 0,
          })
        }
        onLoadedMetadata={() =>
          setVoiceProgress({
            current: voiceRef.current?.currentTime || 0,
            duration: voiceRef.current?.duration || 0,
          })
        }
        onPlay={() => setIsVoicePlaying(true)}
        onPause={() => setIsVoicePlaying(false)}
      >
        <source src="/voice-message.mp3" type="audio/mpeg" />
      </audio>

      <div className="progress-line">
        <span style={{ width: `${scrollProgress}%` }}></span>
      </div>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div className="floating-hearts" aria-hidden="true">
        <span>✦</span>
        <span>❀</span>
        <span>✿</span>
        <span>✨</span>
        <span>❀</span>
        <span>✦</span>
        <span>✿</span>
        <span>✨</span>
      </div>

      <div className="particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <main className="container">
        <section className="opening-note glass fade-up">
          <span className="opening-note-badge">🎂 في البداية</span>
          <h2>كل سنة وأنتِ طيبة يا {DISPLAY_NAME}...</h2>
          <p>
            النهارده يوم جميل جدًا...
            لأنه اليوم اللي اتولدت فيه بنت مميزة جدًا،
            وجودها لوحده سبب كفاية للفرحة.
            حبيت يكون ليكي مكان خاص،
            فيه شوية من الكلام اللي تستاهليه،
            وشوية صور وفيديوهات يخلّوا اليوم ألطف وأجمل.
          </p>
        </section>

        <section className="hero-banner glass fade-up">
          <div className="hero-banner-text">
            <span className="small-badge">👑 عيد ميلاد سعيد يا وتين</span>

            <h1>
              {content.heroName}
              <span>{content.heroSub}</span>
            </h1>

            <TypingText text={content.cuteText} className="typing-line" />
            <p>{content.heroText}</p>

            <div className="top-actions">
              <button className="btn btn-primary" onClick={toggleMusic}>
                {isPlaying ? "إيقاف الأغنية" : "تشغيل الأغنية"}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  document
                    .getElementById("gallerySection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                شوفي الصور
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setShowLastWords(true)}
              >
                آخر كلام
              </button>
            </div>
          </div>

          <div className="hero-banner-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="hero-banner-overlay"></div>
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[0]}</span>
        </div>

        <section className="stats-grid fade-up">
          <div className="stat-card glass">
            <strong>{counter.days}</strong>
            <span>يوم من أول معرفة</span>
          </div>

          <div className="stat-card glass cute-counter-card">
            <div className="pulse-ring"></div>
            <strong>{counter.hours}</strong>
            <span>ساعة من الذكريات</span>
          </div>

          <div className="stat-card glass">
            <strong>{memoryCards.length}</strong>
            <span>صورة</span>
          </div>

          <div className="stat-card glass">
            <strong>{videoCards.length}</strong>
            <span>فيديو</span>
          </div>
        </section>

        <section className="cute-facts-grid fade-up">
          {cuteFacts.map((item, index) => (
            <div className="cute-fact-card glass" key={index}>
              <h4>{item.title}</h4>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="full-cover-section glass fade-up">
          <div className="full-cover-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="full-cover-overlay"></div>
          </div>

          <div className="full-cover-content">
            <div className="scene-pill">{content.meetTitle}</div>
            <div className="scene-date">{content.meetDate}</div>
            <h2>{content.heroName}</h2>
            <h3>{content.heroSub}</h3>
            <p>{content.heroText}</p>
          </div>
        </section>

        <section
          className="huge-counter-section glass fade-up"
          id="counterSection"
        >
          <span className="small-badge">⏳ من أول يوم عرفنا بعض</span>
          <h2>{content.timerTitle}</h2>
          <p>{content.timerText}</p>

          <div className="huge-counter-grid">
            <div className="huge-counter-box animated-counter">
              <strong>{counter.days}</strong>
              <span>يوم</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.hours}</strong>
              <span>ساعة</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.minutes}</strong>
              <span>دقيقة</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.seconds}</strong>
              <span>ثانية</span>
            </div>
          </div>

          <div className="music-player-card">
            <div className="music-head">
              <div className="music-title-wrap">
                <div className={`disc ${isPlaying ? "spin" : ""}`}>🎵</div>
                <div>
                  <strong>أغنية عيد الميلاد</strong>
                  <small>شغلي الأغنية وخلي اليوم ألطف</small>
                </div>
              </div>

              <button className="mini-play-btn" onClick={toggleMusic}>
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>

            <div className="player-bar">
              <span style={{ width: `${musicPercent}%` }}></span>
            </div>

            <div className="player-time">
              <small>{formatTime(musicProgress.current)}</small>
              <small>{formatTime(musicProgress.duration)}</small>
            </div>
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[1]}</span>
        </div>

        <section className="voice-section glass fade-up">
          <div className="voice-left">
            <span className="small-badge">🎙️ رسالة صوتية</span>
            <h2>رسالة خاصة ليكي</h2>
            <p>
              لو حبيت تضيفي تسجيل صوتي مخصوص،
              حطي الملف باسم <strong>/voice-message.mp3</strong>
              وهيظهر هنا بشكل جميل جدًا.
            </p>
          </div>

          <div className="voice-player">
            <div className="voice-top">
              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <button className="voice-btn" onClick={toggleVoice}>
                {isVoicePlaying ? "إيقاف" : "تشغيل"}
              </button>
            </div>

            <div className="player-bar voice-bar">
              <span style={{ width: `${voicePercent}%` }}></span>
            </div>

            <div className="player-time">
              <small>{formatTime(voiceProgress.current)}</small>
              <small>{formatTime(voiceProgress.duration)}</small>
            </div>
          </div>
        </section>

        <section className="different-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>ليه وتين مميزة؟</h3>
              <p>حاجات بسيطة... لكنها كفاية جدًا تخليها مختلفة عن أي حد</p>
            </div>
          </div>

          <div className="different-grid">
            {differentReasons.map((item, index) => (
              <div className="different-card glass" key={index}>
                <span className="different-number">0{index + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wide-message glass fade-up">
          <span className="small-badge">💌 كلام من القلب</span>
          <h2>في يوم ميلادك</h2>
          <p>{content.longMessage}</p>
        </section>

        <section className="extra-love-section fade-up">
          {loveParagraphs.map((paragraph, index) => (
            <div className="extra-love-card glass" key={index}>
              <h3>رسالة {index + 1}</h3>
              <p>{paragraph}</p>
            </div>
          ))}
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[2]}</span>
        </div>

        <section className="love-columns fade-up">
          <div className="love-column-card glass">
            <h3>حاجات جميلة فيكي</h3>
            <ul>
              {reasons.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="love-column-card glass">
            <h3>نفسي لكِ في السنة دي</h3>
            <ul>
              <li>فرحة كبيرة جدًا</li>
              <li>نجاح يبهرك</li>
              <li>راحة بال حقيقية</li>
              <li>ناس صادقة حواليكي</li>
              <li>تحقيق كل حلم نفسك فيه</li>
              <li>وأيام كلها نور ورضا</li>
            </ul>
          </div>
        </section>

        <section className="timeline-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>Timeline الحكاية</h3>
              <p>من أول يوم عرفنا بعض... لغاية يوم عيد ميلادك الجميل</p>
            </div>
          </div>

          <div className="timeline-list">
            {timelineItems.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <small>{item.date}</small>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reels-section glass fade-up" id="gallerySection">
          <div className="section-head slider-head">
            <div>
              <h3>12 صورة... وكل واحدة أجمل من التانية</h3>
              <p>كل صورة شايلة جمال خاص وذكرى وإحساس لطيف جدًا</p>
            </div>

            <div className="slider-buttons">
              <button
                className="slider-btn"
                onClick={() => {
                  const slider = document.getElementById("cardsSlider");
                  slider?.scrollBy({ left: 360, behavior: "smooth" });
                }}
              >
                ←
              </button>
              <button
                className="slider-btn"
                onClick={() => {
                  const slider = document.getElementById("cardsSlider");
                  slider?.scrollBy({ left: -360, behavior: "smooth" });
                }}
              >
                →
              </button>
            </div>
          </div>

          <div className="cards-slider" id="cardsSlider">
            {memoryCards.map((card, index) => (
              <button
                key={card.id}
                className="animated-text-card"
                onClick={() => openCard(index)}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="animated-card-image">
                  <img src={card.image} alt={card.title} />
                </div>

                <div className="animated-card-body">
                  <small>{card.date}</small>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="gallery-grid-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>جاليري {DISPLAY_NAME}</h3>
              <p>12 صورة بشكل أكبر وأوضح وأجمل</p>
            </div>
          </div>

          <div className="big-gallery-grid">
            {memoryCards.map((item, index) => (
              <button
                key={item.id}
                className="big-gallery-card"
                onClick={() => openCard(index)}
              >
                <img src={item.image} alt={item.title} />
                <div className="big-gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="gallery-grid-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>3 فيديوهات مخصوص ليكي</h3>
              <p>لحظات حلوة تكمل فرحة عيد ميلادك</p>
            </div>
          </div>

          <div className="video-gallery-grid">
            {videoCards.map((video) => (
              <div key={video.id} className="big-gallery-card glass">
                <video
                  src={video.src}
                  controls
                  className="birthday-video"
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    display: "block",
                  }}
                />
                <div className="big-gallery-overlay">
                  <h4>{video.title}</h4>
                  <p>{video.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[3]}</span>
        </div>

        <section className="wish-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>أمنيات ليكي</h3>
              <p>حاجات جميلة جدًا أتمنالك تعيشيها السنة دي</p>
            </div>
          </div>

          <div className="wish-grid">
            {dreamMoments.map((item, index) => (
              <div className="wish-card glass" key={index}>
                <span>✦</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="big-quotes-section fade-up">
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>كل سنة وأنتِ أجمل من كل الكلام، وأحلى من كل الأمنيات.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>عيد ميلادك مش يوم عادي... ده يوم ميلاد الجمال واللطف كله.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>ربنا يجعل ضحكتك دايمًا حاضرة، وقلبك دايمًا مطمن، وأيامك كلها فرح.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>وجودك جميل... ويستحق الاحتفال في كل مرة، خصوصًا في يومك.</p>
          </div>
        </section>

        <section className="prayer-section glass fade-up">
          <span className="small-badge">🤲 دعوة من القلب</span>
          <h2>دعاء ليكي في يوم ميلادك</h2>
          <p>{content.prayerText}</p>
        </section>

        <section className="extra-love-section fade-up">
          <div className="extra-love-card glass">
            <h3>كل سنة وأنتِ طيبة</h3>
            <p>
              ويارب كل سنة تعدّي عليكي تكون أحسن من اللي قبلها،
              وتفضلي دايمًا في أحسن حال وأجمل صورة.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>تستاهلي كل خير</h3>
            <p>
              لأنكِ فعلًا شخص جميل جدًا،
              وروحك تستحق كل الحب، وكل الراحة، وكل حاجة حلوة في الدنيا.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>وأسعدك يا رب</h3>
            <p>
              أتمنى من قلبي إن ربنا يفرح قلبك،
              ويحققلك كل حلم، ويبعد عنك أي شيء يزعلك.
            </p>
          </div>
        </section>

        <section className="final-cute-section glass fade-up">
          <span className="small-badge">🤍 الكلمة الأخيرة</span>
          <h2>وفي الآخر…</h2>
          <p>{content.finalText}</p>

          <div className="final-promise">
            <p>
              أتمنى تكون المفاجأة عجبتك،
              وتكون حسّستك قد إيه يومك غالي،
              وقد إيه إنتِ تستحقي الكلام الحلو،
              والاهتمام،
              والفرحة،
              وكل حاجة جميلة جدًا.
            </p>
          </div>

          <div className="final-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowLastWords(true)}
            >
              افتحي آخر كلام
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ارجعي للبداية
            </button>
          </div>
        </section>

        <button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </main>

      {selectedCard && (
        <div className="modal" onClick={closeCard}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeCard}>
              ×
            </button>

            <button className="modal-nav modal-prev" onClick={prevCard}>
              ‹
            </button>
            <button className="modal-nav modal-next" onClick={nextCard}>
              ›
            </button>

            <div className="modal-image">
              <img src={selectedCard.image} alt={selectedCard.title} />
            </div>

            <div className="modal-content">
              <span className="modal-chip">🎁 ذكرى مختارة</span>
              <small>
                {selectedIndex + 1} / {memoryCards.length}
              </small>
              <h3>{selectedCard.title}</h3>
              <p>{selectedCard.text}</p>
            </div>
          </div>
        </div>
      )}

      {showLastWords && (
        <div
          className="last-words-overlay"
          onClick={() => setShowLastWords(false)}
        >
          <div
            className="last-words-card glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowLastWords(false)}
            >
              ×
            </button>
            <span className="small-badge">💌 آخر كلام</span>
            <h2>الكلام اللي حبيت أوصله في النهاية</h2>
            <p>{content.lastWords}</p>
          </div>
        </div>
      )}
    </div>
  );
}