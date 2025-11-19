/* BRAIN.JS - Base de connaissance d'Eric
   C'est ici que tu modifies les réponses du Chatbot.
*/

const ericBrain = [
  // IDENTITÉ
  {
    triggers: ["qui es tu", "t'es qui", "présentation", "nom", "prenom"],
    answers: [
      "Moi c'est Eric Petersen. 20 ans. Futur expert Cyber, actuellement étudiant à Colmar.",
      "Eric, enchanté ! Je suis l'intelligence derrière ce portfolio.",
    ],
  },
  // SITUATION & ÉTUDES (Ajouté selon ta demande)
  {
    triggers: [
      "fais quoi",
      "fait quoi",
      "vie",
      "métier",
      "job",
      "travail",
      "etude",
      "étude",
      "cursus",
      "situation",
    ],
    answers: [
      "Je suis étudiant en 3ème année de BUT R&T (Réseaux & Télécoms) option Cyber à l'IUT de Colmar.",
      "Je prépare mon avenir en Cybersécurité ! Je suis en alternance et en fin de cursus BUT.",
      "Je suis un futur expert en cybersécurité. Je jongle entre mes cours à l'IUT et mes missions d'admin réseaux.",
    ],
  },
  // COMPÉTENCES
  {
    triggers: ["compétence", "skill", "niveau", "techno", "sait faire"],
    answers: [
      "Je suis polyvalent : Solide en Réseaux (Cisco/VLANs), bon en Scripting (Python/Bash) et Cyberdéfense.",
      "Mon truc c'est l'infra et la sécurité. Mais je touche aussi au Web et à la virtualisation (Proxmox).",
    ],
  },
  // CYBER
  {
    triggers: ["cyber", "securite", "sécurité", "hack", "pentest"],
    answers: [
      "La cyber, c'est mon objectif. Je m'entraîne sur Root-Me et HackTheBox. J'aime comprendre l'attaque pour mieux défendre.",
      "Sécuriser une infra, configurer un firewall, analyser des logs... C'est ça qui me plaît.",
    ],
  },
  // SPORT / LOISIRS
  {
    triggers: ["sport", "muscu", "foot", "football", "loisir", "hobby"],
    answers: [
      "Le sport c'est vital. Je fais de la muscu pour la discipline et du foot pour l'équipe.",
      "Faut pas rester H24 devant l'écran ! Un esprit sain dans un corps sain.",
    ],
  },
  // JEUX VIDEO
  {
    triggers: ["jeu", "gaming", "jouer", "fallout"],
    answers: [
      "Gamer dans l'âme. J'aime les FPS compétitifs et les RPG immersifs comme Fallout (d'où ce site !).",
      "Je joue pas mal. Ça entraîne les réflexes et la résolution de problèmes.",
    ],
  },
  // LOCALISATION
  {
    triggers: ["habite", "vis", "ville", "alsace", "colmar"],
    answers: [
      "Je suis basé en Alsace. Meilleure région : choucroute et fibre optique !",
      "Grand Est, Alsace. J'aime ma région, c'est calme et connecté.",
    ],
  },
  // CONTACT
  {
    triggers: ["contact", "mail", "email", "linkedin", "github"],
    answers: [
      "Les liens sont juste en bas du chat ! LinkedIn, Mail ou GitHub, choisis ton arme.",
      "Je réponds vite sur LinkedIn. Check les liens sous ce terminal.",
    ],
  },
];

const ericFallbacks = [
  "Erreur 404 : Réponse non trouvée. Essaye de me demander ce que je fais dans la vie ou mes hobbies.",
  "Mon processeur n'a pas compris. Tu peux reformuler ? Essaye 'Études', 'Sport' ou 'Projets'.",
  "Donnée corrompue. Parle-moi de mes compétences ou de mon parcours plutôt.",
  "Commande inconnue. Essaye des mots-clés simples.",
];
