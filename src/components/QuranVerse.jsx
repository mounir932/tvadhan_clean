import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

// Versets coraniques courts et impactants
const verses = [
    {
        arabic: "وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
        translation: "Allah sait et vous ne savez pas",
        color: "#FF7043"
    },
    {
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Certes, avec la difficulté vient la facilité",
        color: "#4CAF50"
    },
    {
        arabic: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ",
        translation: "Et place ta confiance en le Vivant qui ne meurt pas",
        color: "#2196F3"
    },
    {
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        translation: "Seigneur, augmente ma science",
        color: "#9C27B0"
    },
    {
        arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "Allah est avec ceux qui sont patients",
        color: "#FF9800"
    },
    {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        translation: "Et quiconque craint Allah, Il lui donnera une issue",
        color: "#E91E63"
    },
    {
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Alors, certes, avec la difficulté vient la facilité",
        color: "#00BCD4"
    },
    {
        arabic: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
        translation: "Et sois patient, car Allah ne laisse pas perdre la récompense des bienfaisants",
        color: "#8BC34A"
    },
    {
        arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّى يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
        translation: "Allah ne change pas l'état d'un peuple tant qu'ils ne changent pas ce qui est en eux-mêmes",
        color: "#FF5722"
    },
    {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مِنْ أَمْرِهِ يُسْرًا",
        translation: "Et quiconque craint Allah, Il lui facilite ses affaires",
        color: "#673AB7"
    },
    {
        arabic: "وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ",
        translation: "Et invoquez Allah souvent afin que vous réussissiez",
        color: "#3F51B5"
    },
    {
        arabic: "إِنَّ اللَّهَ لَا يَظْلِمُ مِثْقَالَ ذَرَّةٍ",
        translation: "Allah ne fait pas d'injustice, fût-ce du poids d'un atome",
        color: "#009688"
    },
    {
        arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
        translation: "Et ne désespérez pas de la miséricorde d'Allah",
        color: "#FFC107"
    },
    {
        arabic: "وَهُوَ الْغَفُورُ الْوَدُودُ",
        translation: "Et Il est le Pardonneur, le Tout Aimant",
        color: "#795548"
    },
    {
        arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
        translation: "Et quiconque place sa confiance en Allah, Il lui suffit",
        color: "#CDDC39"
    },
    {
        arabic: "إِنَّ اللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ",
        translation: "Allah est certes Clairvoyant sur ce que vous faites",
        color: "#FFEB3B"
    },
    {
        arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
        translation: "Et ma réussite ne dépend que d'Allah",
        color: "#9E9E9E"
    },
    {
        arabic: "وَهُوَ الَّذِي يَقْبَلُ التَّوْبَةَ عَنْ عِبَادِهِ",
        translation: "Et c'est Lui qui accepte le repentir de Ses serviteurs",
        color: "#607D8B"
    },
    {
        arabic: "وَمَا أَصَابَكُم مِّن مُّصِيبَةٍ فَبِمَا كَسَبَتْ أَيْدِيكُمْ",
        translation: "Et tout malheur qui vous atteint est dû à ce que vos mains ont acquis",
        color: "#F44336"
    },
    {
        arabic: "وَهُوَ الَّذِي يُنَزِّلُ الْغَيْثَ مِن بَعْدِ مَا قَنَطُوا",
        translation: "Et c'est Lui qui fait descendre la pluie après qu'ils aient désespéré",
        color: "#4CAF50"
    },
    {
        arabic: "وَهُوَ الْعَلِيمُ الْحَكِيمُ",
        translation: "Et Il est le Savant, le Sage",
        color: "#2196F3"
    },
    {
        arabic: "وَهُوَ الْقَاهِرُ فَوْقَ عِبَادِهِ",
        translation: "Et Il est le Dominateur Suprême sur Ses serviteurs",
        color: "#9C27B0"
    },
    {
        arabic: "وَهُوَ الَّذِي يُحْيِي وَيُمِيتُ",
        translation: "Et c'est Lui qui donne la vie et la mort",
        color: "#FF9800"
    },
    {
        arabic: "وَهُوَ الْغَفُورُ الرَّحِيمُ",
        translation: "Et Il est le Pardonneur, le Miséricordieux",
        color: "#E91E63"
    },
    {
        arabic: "وَهُوَ الْعَزِيزُ الْحَكِيمُ",
        translation: "Et Il est le Puissant, le Sage",
        color: "#00BCD4"
    },
    {
        arabic: "وَهُوَ الْخَلَّاقُ الْعَلِيمُ",
        translation: "Et Il est le Créateur, l'Omniscient",
        color: "#8BC34A"
    },
    {
        arabic: "وَهُوَ السَّمِيعُ الْبَصِيرُ",
        translation: "Et Il est l'Audient, le Clairvoyant",
        color: "#FF5722"
    },
    {
        arabic: "وَهُوَ الْعَلِيمُ الْخَبِيرُ",
        translation: "Et Il est le Connaisseur, l'Informé",
        color: "#673AB7"
    },
    {
        arabic: "وَهُوَ الْقَوِيُّ الْعَزِيزُ",
        translation: "Et Il est le Fort, le Puissant",
        color: "#3F51B5"
    },
    {
        arabic: "وَهُوَ الْغَنِيُّ الْحَمِيدُ",
        translation: "Et Il est le Riche, le Digne de louange",
        color: "#009688"
    },
    {
        arabic: "وَهُوَ الْوَلِيُّ الْحَمِيدُ",
        translation: "Et Il est le Protecteur, le Digne de louange",
        color: "#FFC107"
    },
    {
        arabic: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
        translation: "Je n'ai créé les djinns et les hommes que pour qu'ils M'adorent",
        color: "#64B5F6"
    },
    {
        arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        translation: "N'est-ce pas par l'évocation d'Allah que les cœurs s'apaisent ?",
        color: "#81C784"
    },
    {
        arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
        translation: "Nous sommes plus proche de lui que sa veine jugulaire",
        color: "#FFB74D"
    },
    {
        arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
        translation: "Souvenez-vous de Moi, Je me souviendrai de vous",
        color: "#4DB6AC"
    },
    {
        arabic: "وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ",
        translation: "Et toute chose auprès de Lui est mesurée",
        color: "#9575CD"
    },
    {
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Certes, avec la difficulté il y a une facilité",
        color: "#FF8A65"
    },
    {
        arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
        translation: "Et dis : 'Seigneur, accrois ma science'",
        color: "#7986CB"
    },
    {
        arabic: "وَكَانَ اللَّهُ عَلَىٰ كُلِّ شَيْءٍ مُّقِيتًا",
        translation: "Et Allah a pouvoir sur toute chose",
        color: "#26C6DA"
    },
    {
        arabic: "وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
        translation: "Allah sait et vous ne savez pas",
        color: "#FF7043"
    },
    {
        arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
        translation: "Et ma réussite ne dépend que d'Allah",
        color: "#66BB6A"
    },
    {
        arabic: "وَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ",
        translation: "Et patiente, car la promesse d'Allah est vérité",
        color: "#4DB6AC"
    },
    {
        arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
        translation: "Et quiconque place sa confiance en Allah, Il lui suffit",
        color: "#7986CB"
    },
    {
        arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
        translation: "Ton Seigneur t'accordera certes [Ses faveurs], et alors tu seras satisfait",
        color: "#FF7043"
    },
    {
        arabic: "وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        translation: "Et dis : 'Seigneur, fais-leur miséricorde comme ils m'ont élevé tout petit'",
        color: "#81C784"
    },
    {
        arabic: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
        translation: "Allah ne fait pas perdre la récompense des bienfaisants",
        color: "#FFB74D"
    },
    {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        translation: "Quiconque craint Allah, Il lui donnera une issue favorable",
        color: "#26A69A"
    },
    {
        arabic: "وَكَفَىٰ بِاللَّهِ وَكِيلًا",
        translation: "Allah suffit comme protecteur",
        color: "#7E57C2"
    },
    {
        arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ",
        translation: "Et Allah est le meilleur des pourvoyeurs",
        color: "#FF7043"
    },
    {
        arabic: "وَاللَّهُ مَعَ الصَّابِرِينَ",
        translation: "Et Allah est avec les patients",
        color: "#66BB6A"
    },
    {
        arabic: "وَأَنَّ اللَّهَ سَمِيعٌ بَصِيرٌ",
        translation: "Et Allah est Audient et Clairvoyant",
        color: "#26C6DA"
    },
    {
        arabic: "وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "Et Il est Omnipotent",
        color: "#9CCC65"
    },
    {
        arabic: "وَاللَّهُ غَفُورٌ رَّحِيمٌ",
        translation: "Et Allah est Pardonneur et Miséricordieux",
        color: "#FF8A65"
    },
    {
        arabic: "وَاللَّهُ يَهْدِي مَن يَشَاءُ",
        translation: "Et Allah guide qui Il veut",
        color: "#7986CB"
    },
    {
        arabic: "وَمَا النَّصْرُ إِلَّا مِنْ عِندِ اللَّهِ",
        translation: "La victoire ne vient que d'Allah",
        color: "#4DB6AC"
    },
    {
        arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ",
        translation: "Il se peut que vous détestiez une chose alors qu'elle est un bien pour vous",
        color: "#FFB74D"
    },
    {
        arabic: "وَمَن يَعْتَصِم بِاللَّهِ فَقَدْ هُدِيَ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
        translation: "Et quiconque s'attache à Allah est guidé vers un droit chemin",
        color: "#26A69A"
    },
    {
        arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ",
        translation: "Ne vous laissez pas abattre, ne vous affligez pas alors que vous êtes les supérieurs",
        color: "#7E57C2"
    },
    {
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Certes, avec la difficulté est une facilité",
        color: "#FF7043"
    },
    {
        arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
        translation: "Et cherchez secours dans la patience et la prière",
        color: "#66BB6A"
    },
    {
        arabic: "وَمَن يُطِعِ اللَّهَ وَرَسُولَهُ فَقَدْ فَازَ فَوْزًا عَظِيمًا",
        translation: "Quiconque obéit à Allah et à Son messager obtient certes une grande réussite",
        color: "#26A69A"
    },
    {
        arabic: "وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ",
        translation: "Vous ne pouvez vouloir que si Allah veut",
        color: "#7E57C2"
    },
    {
        arabic: "وَاللَّهُ يَرْزُقُ مَن يَشَاءُ بِغَيْرِ حِسَابٍ",
        translation: "Allah pourvoit qui Il veut sans compter",
        color: "#FF7043"
    },
    {
        arabic: "وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا",
        translation: "Et on ne vous a donné que peu de science",
        color: "#66BB6A"
    }
];

// Suite des hadiths (uniquement Boukhari et/ou Muslim)
const hadiths = [
    {
        arabic: "مَنْ صَمَتَ نَجَا",
        translation: "Celui qui garde le silence est sauvé",
        color: "#FF8A65",
        source: "Boukhari"
    },
    {
        arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
        translation: "La vie d'ici-bas est la prison du croyant et le paradis du mécréant",
        color: "#9575CD",
        source: "Muslim"
    },
    {
        arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        translation: "Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne",
        color: "#26C6DA",
        source: "Boukhari"
    },
    {
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        translation: "Nul d'entre vous n'est croyant tant qu'il n'aime pas pour son frère ce qu'il aime pour lui-même",
        color: "#9575CD",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
        translation: "Une bonne parole est une aumône",
        color: "#FF8A65",
        source: "Boukhari"
    },
    {
        arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",
        translation: "Crains Allah où que tu sois",
        color: "#4DB6AC",
        source: "Tirmidhi"
    },
    {
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        translation: "La recherche du savoir est une obligation pour tout musulman",
        color: "#7986CB",
        source: "Ibn Majah"
    },
    {
        arabic: "الدِّينُ النَّصِيحَةُ",
        translation: "La religion, c'est la sincérité",
        color: "#26C6DA",
        source: "Muslim"
    },
    {
        arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
        translation: "Les meilleurs des hommes sont ceux qui sont les plus utiles aux autres",
        color: "#9CCC65",
        source: "Tabarani"
    },
    {
        arabic: "الْحَيَاءُ مِنَ الْإِيمَانِ",
        translation: "La pudeur fait partie de la foi",
        color: "#FF8A65",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ",
        translation: "Renonce à ce bas monde, Allah t'aimera",
        color: "#7986CB",
        source: "Ibn Majah"
    },
    {
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        translation: "Les actes ne valent que par leurs intentions",
        color: "#26C6DA",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "مَنْ حَسُنَ إِسْلَامُ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
        translation: "Parmi les qualités de l'Islam d'une personne, il y a le fait de délaisser ce qui ne le concerne pas",
        color: "#9CCC65",
        source: "Tirmidhi"
    },
    {
        arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        translation: "Le musulman est celui dont les musulmans sont à l'abri de sa langue et de sa main",
        color: "#FF8A65",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "لَا يَشْكُرُ اللَّهَ مَنْ لَا يَشْكُرُ النَّاسَ",
        translation: "Ne remercie pas Allah celui qui ne remercie pas les gens",
        color: "#7986CB",
        source: "Abou Dawoud"
    },
    {
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
        translation: "Quiconque emprunte un chemin à la recherche du savoir, Allah lui facilite un chemin vers le Paradis",
        color: "#26C6DA",
        source: "Muslim"
    },
    {
        arabic: "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ",
        translation: "Le croyant est le miroir du croyant",
        color: "#9CCC65",
        source: "Abou Dawoud"
    },
    {
        arabic: "كُلُّ مَعْرُوفٍ صَدَقَةٌ",
        translation: "Tout acte de bonté est une aumône",
        color: "#FF8A65",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
        translation: "Les miséricordieux, le Tout Miséricordieux leur font miséricorde",
        color: "#7986CB",
        source: "Abou Dawoud & Tirmidhi"
    },
    {
        arabic: "خَيْرُ الْمَجَالِسِ أَوْسَعُهَا",
        translation: "Les meilleures assemblées sont les plus spacieuses",
        color: "#26A69A",
        source: "Abou Dawoud"
    },
    {
        arabic: "مَنْ صَمَتَ نَجَا",
        translation: "Celui qui garde le silence est sauvé",
        color: "#FF7043",
        source: "Tirmidhi"
    },
    {
        arabic: "السَّلامُ قَبْلَ الْكَلامِ",
        translation: "Le salut avant la parole",
        color: "#9575CD",
        source: "Tirmidhi"
    },
    {
        arabic: "خَيْرُ الزَّادِ التَّقْوَى",
        translation: "La meilleure provision est la piété",
        color: "#4DB6AC",
        source: "Boukhari"
    },
    {
        arabic: "الدَّالُّ عَلَى الْخَيْرِ كَفَاعِلِهِ",
        translation: "Celui qui guide vers le bien est comme celui qui l'accomplit",
        color: "#FF9800",
        source: "Tirmidhi"
    },
    {
        arabic: "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ",
        translation: "Le meilleur d'entre vous est le meilleur envers sa famille",
        color: "#8BC34A",
        source: "Tirmidhi"
    },
    {
        arabic: "الْبَرَكَةُ مَعَ الْجَمَاعَةِ",
        translation: "La bénédiction est avec le groupe",
        color: "#673AB7",
        source: "Tirmidhi"
    },
    {
        arabic: "الْمُسْتَشَارُ مُؤْتَمَنٌ",
        translation: "Celui qu'on consulte est digne de confiance",
        color: "#E91E63",
        source: "Abou Dawoud & Tirmidhi"
    },
    {
        arabic: "الصُّلْحُ سَيِّدُ الْأَحْكَامِ",
        translation: "La réconciliation est la meilleure des sentences",
        color: "#FFC107",
        source: "Hakim"
    },
    {
        arabic: "الْمَرْءُ مَعَ مَنْ أَحَبَّ",
        translation: "L'homme sera avec ceux qu'il aime",
        color: "#607D8B",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
        translation: "Pas de préjudice ni de représailles",
        color: "#795548",
        source: "Ibn Majah"
    },
    {
        arabic: "الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ",
        translation: "Le licite est clair et l'illicite est clair",
        color: "#9E9E9E",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ",
        translation: "Le croyant fort est meilleur",
        color: "#FF5722",
        source: "Muslim"
    },
    {
        arabic: "خَيْرُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ",
        translation: "La meilleure invocation est celle du jour de Arafat",
        color: "#3F51B5",
        source: "Tirmidhi"
    },
    {
        arabic: "مَنْ غَشَّنَا فَلَيْسَ مِنَّا",
        translation: "Celui qui nous trompe n'est pas des nôtres",
        color: "#26C6DA",
        source: "Muslim"
    },
    {
        arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
        translation: "La purification est la moitié de la foi",
        color: "#9CCC65",
        source: "Muslim"
    },
    {
        arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ",
        translation: "Le musulman est le frère du musulman, il ne l'opprime pas et ne l'abandonne pas",
        color: "#FF8A65",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        translation: "Que celui qui croit en Allah et au Jour dernier dise du bien ou qu'il se taise",
        color: "#7986CB",
        source: "Boukhari & Muslim"
    },
    {
        arabic: "لَا يَدْخُلُ الْجَنَّةَ قَاطِعُ رَحِمٍ",
        translation: "Celui qui rompt les liens de parenté n'entrera pas au Paradis",
        color: "#26A69A",
        source: "Boukhari & Muslim"
    }
];

// Fusion des deux tableaux
const allTexts = [...verses, ...hadiths];

const QuranVerse = () => {
    const [currentPair, setCurrentPair] = useState({
        index: 0,
        isTranslation: false
    });
    const [showTranslation, setShowTranslation] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
    const arabicRef = useRef(null);
    const translationRef = useRef(null);
    const containerRef = useRef(null);
    const glowRef = useRef(null);

    // Ajout de deux nouveaux states pour suivre les textes déjà affichés
    const [usedVerses, setUsedVerses] = useState(new Set());
    const [usedHadiths, setUsedHadiths] = useState(new Set());

    // Fonction pour obtenir un index aléatoire non utilisé
    const getNextUnusedIndex = (isVerse) => {
        const used = isVerse ? usedVerses : usedHadiths;
        const total = isVerse ? verses.length : hadiths.length;
        const start = isVerse ? 0 : verses.length;
        
        // Si tous les textes ont été utilisés, réinitialiser
        if (used.size >= total) {
            if (isVerse) {
                setUsedVerses(new Set());
            } else {
                setUsedHadiths(new Set());
            }
            return start + Math.floor(Math.random() * total);
        }

        // Trouver un index non utilisé
        let nextIndex;
        do {
            nextIndex = start + Math.floor(Math.random() * total);
        } while (used.has(nextIndex));

        // Marquer l'index comme utilisé
        if (isVerse) {
            setUsedVerses(new Set([...usedVerses, nextIndex]));
        } else {
            setUsedHadiths(new Set([...usedHadiths, nextIndex]));
        }

        return nextIndex;
    };

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

    // Modification de la fonction nextText
    const nextText = () => {
        if (currentPair.isTranslation) {
            const currentIsVerse = currentPair.index < verses.length;
            const nextIndex = getNextUnusedIndex(!currentIsVerse); // Alterner entre verset et hadith

            setCurrentPair({
                index: nextIndex,
                isTranslation: false
            });
        } else {
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

    // Initialisation après le premier rendu
    useEffect(() => {
        setIsInitialized(true);
    }, []);

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

                        {/* Traduction - cachée jusqu'à l'initialisation */}
                        {isInitialized && (
                            <div 
                                ref={translationRef}
                                className="absolute w-full flex flex-col items-center justify-center transform opacity-0"
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuranVerse;

