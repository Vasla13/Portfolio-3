window.PROJECT_CONTENT = {
    sae501: {
        id: 1,
        code: "SAE 5.01",
        path: "project-sae501.html",
        theme: {
            accent: "#2DD4BF",
            soft: "rgba(45, 212, 191, 0.12)",
            badge: "rgba(45, 212, 191, 0.26)"
        },
        title: "Tracage GNSS LoRaWAN",
        subtitle: "Concevoir, realiser et presenter une solution technique",
        semester: "BUT3 - Semestre 5",
        mentor: "Olivier MURA",
        tracks: ["Connecter", "Programmer"],
        context: "Projet d'equipe (3 a 4 etudiants) consacre a la conception d'une solution complete de tracage de vehicule par GNSS. Les positions sont transmises via LoRaWAN et TTN puis affichees sur une carte via serveur web. Le besoin principal est l'autonomie batterie grace aux mecanismes de faible consommation.",
        objectivePoints: [
            "Transmettre les donnees de geolocalisation en flux fiable vers une interface web.",
            "Activer l'end-device uniquement quand le vehicule est en mouvement.",
            "Reduire le volume de donnees pour respecter les contraintes LoRa et le duty cycle."
        ],
        achievements: [
            "Architecture IoT complete du capteur jusqu'a l'application utilisateur (Gateway + Network Server).",
            "Developpement embarque Python/MicroPython sur cartes Pycom (Pytrack/Fipy/Lopy).",
            "Gestion fine de l'energie avec modes sleep et interruptions accelerometre.",
            "Configuration LoRaWAN & TTN avec maitrise de l'airtime.",
            "Exploitation du broker MQTT de TTN pour la recuperation des mesures.",
            "Mise en place Node-RED pour cartographie et pilotage.",
            "Encodage binaire latitude/longitude sur 3 octets.",
            "Pilotage distant via downlink et alertes SMS.",
            "Traitement payload JSON/binaire et visualisation temps reel."
        ],
        technologies: [
            "LoRaWAN",
            "IoT",
            "GNSS/GPS",
            "MicroPython",
            "Pycom",
            "MQTT",
            "Node-RED",
            "TTN",
            "Deep Sleep",
            "Accelerometre"
        ],
        resultNote: "Solution complete fonctionnelle avec un vrai focus sur l'autonomie energetique et la robustesse de transmission.",
        links: []
    },
    instravel: {
        id: 2,
        code: "Projet Web",
        path: "project-instravel.html",
        theme: {
            accent: "#60A5FA",
            soft: "rgba(96, 165, 250, 0.12)",
            badge: "rgba(96, 165, 250, 0.24)"
        },
        title: "Instravel",
        subtitle: "Plateforme collaborative de gestion de voyages",
        semester: "Projet applicatif",
        mentor: "Equipe projet",
        tracks: ["Programmer", "Collaborer"],
        context: "Instravel est une application qui centralise la creation de voyages, la gestion des etapes, la publication de contenu et l'interaction entre utilisateurs. Le projet inclut un cycle complet de compte utilisateur, de confidentialite et d'administration des donnees.",
        objectivePoints: [
            "Fournir une experience complete: inscription, connexion, profil, voyages, etapes.",
            "Faciliter le deploiement local avec un setup reproductible.",
            "Livrer une base pre-remplie pour accelerer les tests fonctionnels."
        ],
        achievements: [
            "Pipeline de lancement base de donnees via Docker et dump initial.",
            "Environnement Python isole avec Conda.",
            "Flux utilisateur complet: inscription, connexion, mot de passe oublie.",
            "Gestion des voyages, etapes, hashtags, photos, commentaires.",
            "Gestion des profils publics/prives et logique d'abonnements.",
            "Navigation applicative avec recherche utilisateurs/voyages."
        ],
        technologies: [
            "Python",
            "Docker",
            "Conda",
            "SQL",
            "Backend API",
            "UI Web"
        ],
        installationBlocks: [
            {
                title: "Base de donnees",
                points: [
                    "Installer Docker Desktop (Windows/Mac) ou docker/docker-compose (Linux).",
                    "Initialiser la base depuis le dump du backend."
                ],
                commands: [
                    "docker-compose up --build"
                ]
            },
            {
                title: "Environnement Python",
                points: [
                    "Installer Anaconda/Miniconda.",
                    "Creer et activer l'environnement dedie."
                ],
                commands: [
                    "conda env create -f environment.yml",
                    "conda activate Instravel_env"
                ]
            },
            {
                title: "Lancement application",
                points: [
                    "Demarrer l'application depuis le dossier app.",
                    "Utiliser les donnees par defaut pour les premiers tests."
                ],
                commands: [
                    "cd app",
                    "python app.py"
                ]
            }
        ],
        usagePoints: [
            "Creation de compte puis connexion utilisateur.",
            "Recuperation compte via code de verification email.",
            "Creation de voyage puis ajout d'etapes datees.",
            "Consultation des voyages publics et profils.",
            "Mode prive/public avec regles d'acces."
        ],
        resultNote: "Projet exploitable rapidement en local, avec parcours utilisateur complet et donnees de demo.",
        links: [
            {
                label: "Repository GitHub",
                href: "https://github.com/brioniep/Instravel"
            }
        ]
    },
    ae5cyber03: {
        id: 3,
        code: "AE 5.Cyber.03",
        path: "project-ae5-cyber03.html",
        theme: {
            accent: "#FB923C",
            soft: "rgba(251, 146, 60, 0.12)",
            badge: "rgba(251, 146, 60, 0.28)"
        },
        title: "Securisation avancee Stormshield (CSNA)",
        subtitle: "Assurer la securisation et la supervision avancees d'un SI",
        semester: "BUT3 - Semestre 5",
        mentor: "Alexandre VALENTIN",
        tracks: ["Administrer", "Securiser", "Surveiller"],
        context: "Cette AE prepare a la certification CSNA (Certified Stormshield Network Administrator). Le travail est base sur le cursus officiel Stormshield v4 avec laboratoires virtualises et mise en situation d'une architecture d'entreprise.",
        objectivePoints: [
            "Deployer et configurer un pare-feu nouvelle generation SNS.",
            "Mettre en place VPN, PKI, NAT et politiques de filtrage granulaires.",
            "Superviser l'activite reseau et documenter l'exploitation."
        ],
        achievements: [
            "Labs complets sur maquette VirtualBox d'entreprise.",
            "Configuration initiale: interfaces, routage, mises a jour et enregistrement.",
            "Creation objets reseau et regles de securite detaillees.",
            "Mise en oeuvre NAT (Masquerading, DNAT, SNAT).",
            "Protection applicative (HTTP/SMTP), inspection SSL.",
            "Infrastructure PKI et certificats.",
            "VPN IPSec site-a-site (IKEv1/IKEv2) et VPN SSL nomade.",
            "Integration LDAP/Active Directory et portails captifs.",
            "Supervision des logs et monitoring d'activite.",
            "Principes de haute disponibilite (cluster)."
        ],
        technologies: [
            "Stormshield SNS",
            "Next-Gen Firewall",
            "VPN IPSec",
            "VPN SSL",
            "PKI",
            "NAT",
            "LDAP/AD",
            "IDS/IPS",
            "Haute disponibilite"
        ],
        validatedSkills: [
            "AC21.02 - Fonctions de base securite reseau",
            "AC21.06 - Documentation d'exploitation",
            "AC24.01Cyber - Bonnes pratiques cyber",
            "AC24.02Cyber - Outils fondamentaux de securisation",
            "AC24.03Cyber - Securisation des services",
            "AC24.04Cyber - Choix des outils cryptographiques",
            "AC25.03 - Diagnostic via supervision"
        ],
        resultNote: "Certification CSNA validee avec 86%, meilleure note de la promotion.",
        links: []
    }
};
