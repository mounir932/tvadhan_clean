import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { usePrayerTimes } from "../utils/prayerHook";

const verses = [
    { 
        arabic: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ", 
        translation: "Allah et Ses anges prient sur le Prophète",
        color: "#FFD700"
    },
    { 
        arabic: "وَأَقِمِ الصَّلَاةَ لِذِكْرِي", 
        translation: "Et accomplis la prière pour te souvenir de Moi",
        color: "#90CAF9"
    },
    { 
        arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا", 
        translation: "La prière demeure, pour les croyants, une prescription à des temps déterminés",
        color: "#81C784"
    },
    { 
        arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ", 
        translation: "Observez les prières, et la prière médiane",
        color: "#B39DDB"
    },
    { 
        arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", 
        translation: "Et cherchez secours dans la patience et la prière",
        color: "#4FC3F7"
    },
    {
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
        translation: "Notre Seigneur, accepte ceci de notre part. Tu es Celui qui entend tout et qui sait tout",
        color: "#81C784"
    },
    {
        arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
        translation: "Et quand Mes serviteurs t'interrogent sur Moi, Je suis tout proche",
        color: "#64B5F6"
    },
    {
        arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
        translation: "Allah est la Lumière des cieux et de la terre",
        color: "#FFB74D"
    },
    {
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا",
        translation: "Ô vous qui croyez ! Évoquez Allah d'une façon abondante",
        color: "#BA68C8"
    },
    {
        arabic: "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا",
        translation: "Et supporte patiemment le jugement de ton Seigneur, car tu es sous Nos yeux",
        color: "#4DB6AC"
    },
    {
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "En vérité, avec la difficulté il y a une facilité",
        color: "#FF8A65"
    },
    {
        arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
        translation: "Et quiconque place sa confiance en Allah, Il lui suffit",
        color: "#9575CD"
    },
    {
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
        translation: "Seigneur, ouvre-moi ma poitrine",
        color: "#4FC3F7"
    },
    {
        arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
        translation: "Et dis : 'Seigneur, accrois ma science'",
        color: "#AED581"
    },
    {
        arabic: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
        translation: "Parmi Ses serviteurs, seuls les savants craignent Allah",
        color: "#7986CB"
    },
    {
        arabic: "وَلِمَنْ خَافَ مَقَامَ رَبِّهِ جَنَّتَانِ",
        translation: "Et pour celui qui aura craint de comparaître devant son Seigneur, il y aura deux jardins",
        color: "#66BB6A"
    },
    {
        arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ",
        translation: "Ô hommes ! Craignez votre Seigneur",
        color: "#FF7043"
    },
    {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        translation: "Et quiconque craint Allah, Il lui donnera une issue favorable",
        color: "#26A69A"
    },
    {
        arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
        translation: "Et Ma miséricorde embrasse toute chose",
        color: "#EC407A"
    },
    {
        arabic: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ",
        translation: "La miséricorde d'Allah est proche des bienfaisants",
        color: "#AB47BC"
    },
    {
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
        translation: "Ô vous qui croyez ! Cherchez secours dans la patience et la prière",
        color: "#7E57C2"
    },
    {
        arabic: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ",
        translation: "Les endurants auront leur pleine récompense sans compter",
        color: "#42A5F5"
    },
    {
        arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
        translation: "Si vous êtes reconnaissants, très certainement J'augmenterai [Mes bienfaits] pour vous",
        color: "#26C6DA"
    },
    {
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
        translation: "Seigneur, inspire-moi pour que je rende grâce au bienfait dont Tu m'as comblé",
        color: "#26A69A"
    },
    {
        arabic: "إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا",
        translation: "Ceux qui disent : 'Notre Seigneur est Allah', et qui se tiennent dans la droiture",
        color: "#FFA726"
    },
    {
        arabic: "وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ",
        translation: "Et voilà Mon chemin dans toute sa rectitude, suivez-le donc",
        color: "#FF7043"
    },
    {
        arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
        translation: "Dis : 'Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d'Allah'",
        color: "#EC407A"
    },
    {
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Car, en vérité, avec la difficulté, il y a une facilité. Oui, avec la difficulté, il y a une facilité",
        color: "#66BB6A"
    }
];

const hadiths = [
    {
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        translation: "Les actes ne valent que par leurs intentions",
        color: "#4DB6AC",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        translation: "Le musulman est celui dont les musulmans sont à l'abri de sa langue et de sa main",
        color: "#81C784",
        source: "Boukhari"
    },
    {
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        translation: "Nul d'entre vous n'est croyant tant qu'il n'aime pas pour son frère ce qu'il aime pour lui-même",
        color: "#FFB74D",
        source: "Boukhari"
    },
    {
        arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        translation: "Les meilleurs d'entre vous sont ceux qui apprennent le Coran et l'enseignent",
        color: "#BA68C8",
        source: "Boukhari"
    },
    {
        arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
        translation: "Une bonne parole est une aumône",
        color: "#4FC3F7",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
        translation: "La purification est la moitié de la foi",
        color: "#64B5F6",
        source: "Muslim"
    },
    {
        arabic: "الْحَيَاءُ مِنَ الْإِيمَانِ",
        translation: "La pudeur fait partie de la foi",
        color: "#EC407A",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "مَنْ غَشَّنَا فَلَيْسَ مِنَّا",
        translation: "Celui qui nous trompe n'est pas des nôtres",
        color: "#FF7043",
        source: "Muslim"
    },
    {
        arabic: "يَسِّرُوا وَلَا تُعَسِّرُوا",
        translation: "Facilitez et ne rendez pas les choses difficiles",
        color: "#AED581",
        source: "Boukhari"
    },
    {
        arabic: "مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ",
        translation: "Quiconque parmi vous voit un mal, qu'il le change par sa main",
        color: "#9575CD",
        source: "Muslim"
    },
    {
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        translation: "La recherche du savoir est une obligation pour tout musulman",
        color: "#4DB6AC",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الدُّنْيَا مَتَاعٌ وَخَيْرُ مَتَاعِهَا الْمَرْأَةُ الصَّالِحَةُ",
        translation: "La vie d'ici-bas est une jouissance, et la meilleure de ses jouissances est une femme pieuse",
        color: "#FF8A65",
        source: "Muslim"
    },
    {
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        translation: "Que celui qui croit en Allah et au Jour dernier dise du bien ou qu'il se taise",
        color: "#26C6DA",
        source: "Boukhari"
    },
    {
        arabic: "لَا يَشْكُرُ اللَّهَ مَنْ لَا يَشْكُرُ النَّاسَ",
        translation: "Ne remercie pas Allah celui qui ne remercie pas les gens",
        color: "#7986CB",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ فِي الْأَمْرِ كُلِّهِ",
        translation: "Allah est Doux et Il aime la douceur en toute chose",
        color: "#FF7043",
        source: "Boukhari & Muslim"
    }
];

// Nouveaux versets courts à ajouter
const newVerses = [
    {
        arabic: "وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
        translation: "Allah sait et vous ne savez pas",
        color: "#64B5F6"
    },
    {
        arabic: "وَكُونُوا مَعَ الصَّادِقِينَ",
        translation: "Et soyez avec les véridiques",
        color: "#81C784"
    },
    {
        arabic: "وَقُل رَّبِّ ارْحَمْهُمَا",
        translation: "Et dis : 'Seigneur, fais-leur miséricorde'",
        color: "#FF7043"
    },
    {
        arabic: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ",
        translation: "Et Allah aime les patients",
        color: "#9575CD"
    },
    {
        arabic: "وَتَوَكَّلْ عَلَى الْحَيِّ",
        translation: "Et place ta confiance dans le Vivant",
        color: "#4DB6AC"
    }
];

// Nouveaux hadiths courts à ajouter
const newHadiths = [
    {
        arabic: "الدَّالُّ عَلَى الْخَيْرِ كَفَاعِلِهِ",
        translation: "Celui qui guide vers le bien est comme celui qui l'accomplit",
        color: "#FF8A65",
        source: "Muslim"
    },
    {
        arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
        translation: "Les meilleurs des gens sont ceux qui sont les plus utiles aux gens",
        color: "#7986CB",
        source: "Boukhari"
    },
    {
        arabic: "ارْحَمُوا مَنْ فِي الْأَرْضِ",
        translation: "Faites miséricorde à ceux qui sont sur terre",
        color: "#4FC3F7",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ",
        translation: "Le croyant est le miroir du croyant",
        color: "#FFB74D",
        source: "Boukhari"
    },
    {
        arabic: "السَّلامُ قَبْلَ الْكَلامِ",
        translation: "Le salut avant la parole",
        color: "#BA68C8",
        source: "Boukhari"
    }
];

// Ajout de 10 nouveaux versets courts
const newVerses2 = [
    {
        arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
        translation: "Et Il est avec vous où que vous soyez",
        color: "#26A69A"
    },
    {
        arabic: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
        translation: "Et dis : 'Seigneur, accrois ma science'",
        color: "#7986CB"
    },
    {
        arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ",
        translation: "Et Allah est le meilleur des pourvoyeurs",
        color: "#FF7043"
    },
    {
        arabic: "وَكَفَىٰ بِاللَّهِ وَكِيلًا",
        translation: "Allah suffit comme protecteur",
        color: "#4FC3F7"
    },
    {
        arabic: "وَاللَّهُ غَفُورٌ رَحِيمٌ",
        translation: "Et Allah est Pardonneur et Miséricordieux",
        color: "#FFB74D"
    },
    {
        arabic: "وَاللَّهُ يَهْدِي مَن يَشَاءُ",
        translation: "Et Allah guide qui Il veut",
        color: "#BA68C8"
    },
    {
        arabic: "وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "Et Allah est Omnipotent",
        color: "#4DB6AC"
    },
    {
        arabic: "وَهُوَ السَّمِيعُ الْعَلِيمُ",
        translation: "Et c'est Lui l'Audient, l'Omniscient",
        color: "#FF8A65"
    },
    {
        arabic: "وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
        translation: "Allah sait et vous ne savez pas",
        color: "#9575CD"
    },
    {
        arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
        translation: "Et ma réussite ne dépend que d'Allah",
        color: "#26C6DA"
    }
];

// Ajout de 10 nouveaux hadiths courts
const newHadiths2 = [
    {
        arabic: "خَيْرُ الذِّكْرِ الْخَفِيُّ",
        translation: "Le meilleur rappel est celui qui est discret",
        color: "#81C784",
        source: "Muslim"
    },
    {
        arabic: "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ",
        translation: "Le croyant fort est meilleur",
        color: "#64B5F6",
        source: "Muslim"
    },
    {
        arabic: "الْبَرَكَةُ مَعَ الْأَكَابِرِ",
        translation: "La bénédiction est avec les aînés",
        color: "#FFB74D",
        source: "Boukhari"
    },
    {
        arabic: "الْمُسْتَشَارُ مُؤْتَمَنٌ",
        translation: "Celui qu'on consulte est digne de confiance",
        color: "#BA68C8",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الصُّلْحُ خَيْرٌ",
        translation: "La réconciliation est meilleure",
        color: "#4DB6AC",
        source: "Boukhari"
    },
    {
        arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ",
        translation: "Les croyants sont comme une construction",
        color: "#FF8A65",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الدِّينُ الْمُعَامَلَةُ",
        translation: "La religion, c'est la manière d'agir",
        color: "#9575CD",
        source: "Muslim"
    },
    {
        arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ",
        translation: "Le Paradis est sous les pieds des mères",
        color: "#26C6DA",
        source: "Boukhari"
    },
    {
        arabic: "الْعَجَلَةُ مِنَ الشَّيْطَانِ",
        translation: "La précipitation vient de Satan",
        color: "#7986CB",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الْمَرْءُ مَعَ مَنْ أَحَبَّ",
        translation: "On sera avec ceux qu'on aime",
        color: "#FF7043",
        source: "Boukhari & Muslim"
    }
];

// Ajout de 10 nouveaux versets courts
const newVerses3 = [
    {
        arabic: "وَقُلْ رَبِّ اغْفِرْ وَارْحَمْ",
        translation: "Et dis : 'Seigneur, pardonne et fais miséricorde'",
        color: "#26A69A"
    },
    {
        arabic: "وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
        translation: "Et Allah aime les bienfaisants",
        color: "#7986CB"
    },
    {
        arabic: "وَاللَّهُ مَعَ الصَّابِرِينَ",
        translation: "Et Allah est avec les patients",
        color: "#FF7043"
    },
    {
        arabic: "وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ",
        translation: "Et Allah est Omniscient",
        color: "#4FC3F7"
    },
    {
        arabic: "وَهُوَ الْغَفُورُ الْوَدُودُ",
        translation: "Et Il est le Pardonneur, le Plein d'amour",
        color: "#FFB74D"
    },
    {
        arabic: "وَاللَّهُ يَرْزُقُ مَن يَشَاءُ",
        translation: "Et Allah pourvoit qui Il veut",
        color: "#BA68C8"
    },
    {
        arabic: "وَكَفَىٰ بِاللَّهِ شَهِيدًا",
        translation: "Et Allah suffit comme témoin",
        color: "#4DB6AC"
    },
    {
        arabic: "وَاللَّهُ يَدْعُو إِلَىٰ دَارِ السَّلَامِ",
        translation: "Et Allah appelle à la demeure de la paix",
        color: "#FF8A65"
    },
    {
        arabic: "وَاللَّهُ يُحِبُّ الْمُتَوَكِّلِينَ",
        translation: "Et Allah aime ceux qui placent leur confiance en Lui",
        color: "#9575CD"
    },
    {
        arabic: "وَاللَّهُ خَيْرُ الْحَاكِمِينَ",
        translation: "Et Allah est le meilleur des juges",
        color: "#26C6DA"
    }
];

// Ajout de 10 nouveaux hadiths courts
const newHadiths3 = [
    {
        arabic: "الْكَلِمَةُ الْحِكْمَةُ ضَالَّةُ الْمُؤْمِنِ",
        translation: "La parole de sagesse est le bien perdu du croyant",
        color: "#81C784",
        source: "Boukhari"
    },
    {
        arabic: "خَيْرُ الْمَجَالِسِ أَوْسَعُهَا",
        translation: "Les meilleures assemblées sont les plus spacieuses",
        color: "#64B5F6",
        source: "Muslim"
    },
    {
        arabic: "الْمُؤْمِنُ كَالنَّخْلَةِ",
        translation: "Le croyant est comme le palmier",
        color: "#FFB74D",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "السَّعِيدُ مَنْ وُعِظَ بِغَيْرِهِ",
        translation: "L'heureux est celui qui tire leçon d'autrui",
        color: "#BA68C8",
        source: "Boukhari"
    },
    {
        arabic: "الْمَرْءُ عَلَى دِينِ خَلِيلِهِ",
        translation: "L'homme suit la religion de son ami intime",
        color: "#4DB6AC",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الْبَرَكَةُ فِي الْبَاكِرِينَ",
        translation: "La bénédiction est dans la matinalité",
        color: "#FF8A65",
        source: "Boukhari"
    },
    {
        arabic: "الْمُؤْمِنُ يَأْلَفُ وَيُؤْلَفُ",
        translation: "Le croyant est sociable et familier",
        color: "#9575CD",
        source: "Muslim"
    },
    {
        arabic: "الْجَارُ قَبْلَ الدَّارِ",
        translation: "Le voisin avant la maison",
        color: "#26C6DA",
        source: "Boukhari"
    },
    {
        arabic: "الْعِلْمُ نُورٌ",
        translation: "La science est une lumière",
        color: "#7986CB",
        source: "Muslim"
    },
    {
        arabic: "الْقَنَاعَةُ كَنْزٌ",
        translation: "Le contentement est un trésor",
        color: "#FF7043",
        source: "Boukhari & Muslim"
    }
];

// Fusionner les versets et les hadiths
const allTexts = [...verses, ...newVerses, ...newVerses2, ...newVerses3, ...hadiths, ...newHadiths, ...newHadiths2, ...newHadiths3];

const QuranVerse = () => {
    const { prayerTimes } = usePrayerTimes();
    const [currentPair, setCurrentPair] = useState({
        index: 0,
        isTranslation: false
    });
    const [showTranslation, setShowTranslation] = useState(false);
    const arabicRef = useRef(null);
    const translationRef = useRef(null);
    const containerRef = useRef(null);
    const glowRef = useRef(null);

    const animateTextTransition = () => {
        if (!arabicRef.current || !translationRef.current) return;

        const tl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power3.inOut"
            }
        });

        if (showTranslation) {
            // Transition vers la traduction
            tl.to(arabicRef.current, {
                opacity: 0,
                scale: 0.8,
                filter: "blur(10px)",
                y: -30,
                rotateX: -20
            })
            .to(translationRef.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                y: 0,
                rotateX: 0
            }, "-=0.7");

            // Animation du halo pour la traduction
            gsap.to(glowRef.current, {
                background: `
                    radial-gradient(circle at 30% 30%, ${currentVerse.color}08 0%, transparent 60%),
                    radial-gradient(circle at 70% 70%, ${currentVerse.color}10 0%, transparent 60%)
                `,
                opacity: 0.9,
                scale: 1.05,
                duration: 1.2,
                ease: "power2.inOut"
            });
        } else {
            // Transition vers l'arabe
            tl.to(translationRef.current, {
                opacity: 0,
                scale: 0.8,
                filter: "blur(10px)",
                y: 30,
                rotateX: 20
            })
            .to(arabicRef.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                y: 0,
                rotateX: 0
            }, "-=0.7");

            // Animation du halo pour l'arabe
            gsap.to(glowRef.current, {
                background: `
                    radial-gradient(circle at 30% 30%, ${currentVerse.color}05 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, ${currentVerse.color}08 0%, transparent 50%)
                `,
                opacity: 0.8,
                scale: 1.1,
                duration: 1.2,
                ease: "power2.inOut"
            });
        }

        // Animation du conteneur
        gsap.to(containerRef.current, {
            boxShadow: `inset 0 0 50px rgba(0,0,0,${showTranslation ? 0.4 : 0.3})`,
            duration: 1,
            ease: "power2.inOut"
        });
    };

    // Fonction pour passer au texte suivant
    const nextText = () => {
        if (currentPair.isTranslation) {
            // Si on est sur la traduction, passer au prochain texte
            setCurrentPair({
                index: (currentPair.index + 1) % allTexts.length,
                isTranslation: false
            });
        } else {
            // Si on est sur l'arabe, montrer sa traduction
            setCurrentPair({
                ...currentPair,
                isTranslation: true
            });
        }
    };

    // Timer pour changer de texte toutes les 30 secondes
    useEffect(() => {
        const interval = setInterval(nextText, 180000);
        return () => clearInterval(interval);
    }, [currentPair]);

    // Mettre à jour showTranslation en fonction de currentPair
    useEffect(() => {
        setShowTranslation(currentPair.isTranslation);
    }, [currentPair]);

    // Animer la transition
    useEffect(() => {
        animateTextTransition();
    }, [showTranslation]);

    const currentVerse = allTexts[currentPair.index];

    return (
        <div className="w-full h-full grid place-items-center">
            <div 
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                style={{
                    borderRadius: "30px",
                    background: "linear-gradient(180deg, rgba(17,17,25,0.7) 0%, rgba(17,17,25,0.5) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: `
                        inset 0 2px 1px rgba(255,255,255,0.1),
                        inset 0 -1px 1px rgba(0,0,0,0.1),
                        0 0 40px rgba(0,0,0,0.1)
                    `
                }}
            >
                {/* Effet de halo moderne */}
                <div 
                    ref={glowRef}
                    className="absolute inset-0 z-0"
                    style={{
                        background: `
                            radial-gradient(circle at 20% 20%, ${currentVerse.color}15 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, ${currentVerse.color}10 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, ${currentVerse.color}05 0%, transparent 100%)
                        `,
                        opacity: 0.9,
                        mixBlendMode: "soft-light"
                    }}
                />
                
                <div className="verse-content relative w-full h-full flex items-center justify-center p-6">
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        {/* Texte arabe */}
                        <div 
                            ref={arabicRef}
                            className="absolute w-full flex items-center justify-center transform"
                        >
                            <p 
                                className="text-[min(110px,45vw)] font-bold text-white font-arabic text-center max-w-[88%]"
                                style={{
                                    textShadow: `
                                        0 1px 1px rgba(0,0,0,0.3),
                                        0 2px 3px rgba(0,0,0,0.2),
                                        0 4px 16px ${currentVerse.color}35
                                    `,
                                    lineHeight: '1.7',
                                    direction: 'rtl',
                                    letterSpacing: '0.03em',
                                    fontWeight: '700',
                                    WebkitFontSmoothing: 'antialiased'
                                }}
                            >
                                {currentVerse.arabic}
                            </p>
                        </div>

                        {/* Traduction */}
                        <div 
                            ref={translationRef}
                            className="absolute w-full flex flex-col items-center justify-center transform"
                            style={{ opacity: 0 }}
                        >
                            <p 
                                className="text-[min(75px,7.5vw)] text-white font-poppins text-center px-8 max-w-[88%] leading-snug"
                                style={{
                                    textShadow: `
                                        0 1px 1px rgba(0,0,0,0.2),
                                        0 2px 8px ${currentVerse.color}30
                                    `,
                                    fontWeight: '500',
                                    letterSpacing: '-0.01em',
                                    WebkitFontSmoothing: 'antialiased'
                                }}
                            >
                                {currentVerse.translation}
                            </p>
                            {currentVerse.source && (
                                <span 
                                    className="text-[min(19px,2vw)] text-white/85 mt-7 tracking-[0.3em] uppercase"
                                    style={{
                                        textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                        fontWeight: '300',
                                        letterSpacing: '0.4em'
                                    }}
                                >
                                    {currentVerse.source}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuranVerse;

