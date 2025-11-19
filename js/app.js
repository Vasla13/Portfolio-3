/*
   APP.JS - Logique principale du site
   Gère le Boot, les Onglets, la Map et les Projets.
*/

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SKIP INTRO (SessionStorage) ---
  const bootScreen = document.getElementById("boot-screen");
  const bootText = document.getElementById("boot-text");

  if (sessionStorage.getItem("pipboy_booted")) {
    if (bootScreen) {
      bootScreen.style.display = "none";
      bootScreen.remove();
    }
    setTimeout(animateBars, 100);
  } else {
    const bootLines = [
      "INITIALIZING PIP-OS v7.1.0.8...",
      "CHECKING MEMORY... 64KB OK",
      "LOADING PERSONAL DATA...",
      "CONNECTING TO UHA NETWORK...",
      "USER AUTHENTICATED: ERIC PETERSEN",
    ];
    let lineIndex = 0;
    let charIndex = 0;
    sessionStorage.setItem("pipboy_booted", "true");

    function typeWriter() {
      if (lineIndex < bootLines.length) {
        const line = bootLines[lineIndex];
        if (charIndex < line.length) {
          bootText.innerHTML += line.charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, 20);
        } else {
          bootText.innerHTML += "<br>";
          lineIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 150);
        }
      } else {
        setTimeout(() => {
          bootScreen.style.opacity = "0";
          setTimeout(() => {
            bootScreen.remove();
            animateBars();
          }, 500);
        }, 800);
      }
    }
    typeWriter();
  }

  // --- 2. NAVIGATION ---
  const tabs = document.querySelectorAll(".tab-btn");
  const pages = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      pages.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      if (targetId === "tab-stat") animateBars();
      if (targetId === "tab-map") {
        setTimeout(() => {
          initMap();
          if (map) map.invalidateSize();
        }, 100);
      }

      // Appel du Chatbot via la fonction globale
      if (targetId === "tab-data") {
        if (typeof window.initChatbot === "function") {
          window.initChatbot();
        }
      }
    });
  });

  function animateBars() {
    setTimeout(() => {
      const fills = document.querySelectorAll(".fill");
      fills.forEach((fill) => {
        fill.style.width = "0%";
        setTimeout(() => {
          const targetWidth = fill.getAttribute("style").match(/--w:(\d+%)/)[1];
          fill.style.width = targetWidth;
        }, 100);
      });
    }, 100);
  }

  // --- 3. MAP ---
  let mapInitialized = false;
  let map;
  const iutCoords = [48.077056, 7.370806];

  function initMap() {
    if (mapInitialized) return;
    map = L.map("iut-map", {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      dragging: false,
    }).setView(iutCoords, 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
    const pipIcon = L.divIcon({
      className: "custom-pip-marker",
      html: '<div style="background-color:#1eff00; width:14px; height:14px; border-radius:50%; box-shadow:0 0 10px #1eff00; border: 2px solid #000;"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    L.marker(iutCoords, { icon: pipIcon })
      .addTo(map)
      .bindPopup("IUT COLMAR")
      .openPopup();
    mapInitialized = true;
  }

  // --- 4. PROJETS ---
  const invItems = document.querySelectorAll(".inv-item");
  invItems.forEach((item) => {
    item.addEventListener("click", function () {
      const projectID = this.getAttribute("data-project-id");
      selectProject(projectID);
    });
  });

  function selectProject(projectID) {
    const descBox = document.getElementById("project-desc");
    const linkBox = document.getElementById("project-link-container");

    if (projectID === "BUT2") {
      launchRetroTransition();
      return;
    }

    const data = {
      "SAE-501": {
        desc: "> PROJET: Pilotage d'un projet complexe.\n> COMPÉTENCES: Gestion de projet (Agile), GANTT, Communication.\n> LIEN: Rapport PDF.",
        link: "assets/sae501.pdf",
        txt: "VOIR RAPPORT",
      },
      "SAE-502": {
        desc: "> PROJET: Sécurisation d'une infrastructure réseau.\n> COMPÉTENCES: Pentesting, Firewalling, Hardening Système.\n> LIEN: Documentation technique.",
        link: "assets/sae502.pdf",
        txt: "VOIR DOC",
      },
      Homelab: {
        desc: "> PROJET: Création d'un laboratoire de virtualisation (Proxmox).\n> COMPÉTENCES: Active Directory, DNS, DHCP, Scénarios Red Team.\n> LIEN: Schéma d'architecture.",
        link: "#",
        txt: "VOIR ARCHI",
      },
      ProjetPerso1: {
        desc: "> PROJET: Challenges de cybersécurité (HackTheBox, Root-Me).\n> COMPÉTENCES: Analyse de vulnérabilités, Exploitation, Cryptographie.\n> LIEN: Write-ups (à venir).",
        link: "#",
        txt: "LIEN",
      },
    };

    const item = data[projectID];
    if (item) {
      descBox.innerHTML = item.desc.replace(/\n/g, "<br>");
      linkBox.innerHTML = `<a href="${item.link}" target="_blank" style="color:var(--pip-green); display:block; margin-top:10px;">[ ${item.txt} ]</a>`;
    } else {
      descBox.innerHTML = "DONNÉES INTROUVABLES.";
      linkBox.innerHTML = "";
    }
  }

  function launchRetroTransition() {
    document.body.classList.add("shutting-down");
    setTimeout(() => {
      document.getElementById("transition-overlay").classList.add("active");
    }, 500);
    setTimeout(() => {
      window.location.href = "https://vasla13.github.io/portfolio-2/";
    }, 4000);
  }
});
