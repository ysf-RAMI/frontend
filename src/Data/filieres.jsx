export const filieres = [
  {
    filiereId: 1,
    nomFiliere: "Informatique et Réseaux",
    filiereUrl: "https://www.example.com/infotech.jpg", // Filière image URL
    modules: [
      {
        moduleId: 1,
        moduleName: "Programmation Web",
        moduleUrl: "https://www.example.com/programming-web.jpg", // Module image URL
        courses: [
          {
            courseId: 1,
            courseName: "Introduction à HTML/CSS",
            courseType: "pdf",
            courseUrl:
              "https://www.just.edu.jo/~mqais/CIS99/PDF/Ch.01_Introduction_%20to_computers.pdf", // Added courseUrl
          },
          {
            courseId: 2,
            courseName: "JavaScript pour Débutants",
            courseType: "video",
            courseUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c", // Added courseUrl
          },
        ],
        TD: [
          {
            tdId: 1,
            tdName: "TD 1 - HTML5 et CSS3",
            tdType: "pdf",
            tdUrl:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Introduction", // TD URL
          },
          {
            tdId: 2,
            tdName: "TD 2 - JavaScript Intermédiaire",
            tdType: "video",
            tdUrl: "https://www.youtube.com/watch?v=2LeqjXY3-2M", // TD URL
          },
        ],
        TP: [
          {
            tpId: 1,
            tpName: "TP 1 - Créer une page web",
            tpType: "pdf",
            tpUrl:
              "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics", // TP URL
          },
        ],
        EXAMS: [
          {
            examId: 1,
            examName: "Examen Final - Programmation Web",
            examType: "pdf",
            examUrl: "https://www.w3.org/standards/webdesign/", // Exam URL
          },
        ],
      },
    ],
  },
  {
    filiereId: 2,
    nomFiliere: "Systèmes et Réseaux",
    filiereUrl: "https://www.example.com/networking.jpg", // Filière image URL
    modules: [
      {
        moduleId: 1,
        moduleName: "Administration des Réseaux",
        moduleUrl: "https://www.example.com/network-administration.jpg", // Module image URL
        courses: [
          {
            courseId: 1,
            courseName: "Introduction à la gestion des réseaux",
            courseType: "pdf",
            courseUrl: "https://www.coursera.org/learn/it-networking-basics", // Added courseUrl
          },
          {
            courseId: 2,
            courseName: "Protocoles de Réseau (TCP/IP)",
            courseType: "video",
            courseUrl: "https://www.youtube.com/watch?v=3QhU9jd03a0", // Added courseUrl
          },
        ],
        TD: [
          {
            tdId: 1,
            tdName: "TD 1 - Configuration de routeurs",
            tdType: "pdf",
            tdUrl:
              "https://www.cisco.com/c/en/us/td/docs/iosxr/iosxr-routing/route-i16-0-1-1/pdf", // TD URL
          },
        ],
        TP: [
          {
            tpId: 1,
            tpName: "TP 1 - Mise en place d'un réseau local",
            tpType: "video",
            tpUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // TP URL
          },
        ],
        EXAMS: [
          {
            examId: 1,
            examName: "Examen Final - Administration des Réseaux",
            examType: "pdf",
            examUrl: "https://www.coursera.org/learn/it-networking-basics", // Exam URL
          },
        ],
      },
      {
        moduleId: 2,
        moduleName: "Sécurité des Systèmes",
        moduleUrl: "https://www.example.com/system-security.jpg", // Module image URL
        courses: [
          {
            courseId: 1,
            courseName: "Principes de Sécurité Informatique",
            courseType: "pdf",
            courseUrl: "https://www.coursera.org/learn/cyber-security-basics", // Added courseUrl
          },
          {
            courseId: 2,
            courseName: "Sécuriser un Réseau d'Entreprise",
            courseType: "video",
            courseUrl: "https://www.youtube.com/watch?v=jU02XK3g1q0", // Added courseUrl
          },
        ],
        TD: [
          {
            tdId: 1,
            tdName: "TD 1 - Cryptographie et Authentification",
            tdType: "pdf",
            tdUrl:
              "https://www.schneier.com/academic/archives/1996/10/cryptography_pri.html", // TD URL
          },
        ],
        TP: [
          {
            tpId: 1,
            tpName: "TP 1 - Mise en place de pare-feu",
            tpType: "video",
            tpUrl: "https://www.youtube.com/watch?v=pZqBdxjX2mw", // TP URL
          },
        ],
        EXAMS: [
          {
            examId: 1,
            examName: "Examen Final - Sécurité des Systèmes",
            examType: "pdf",
            examUrl: "https://www.coursera.org/learn/cyber-security-basics", // Exam URL
          },
        ],
      },
    ],
  },
];
