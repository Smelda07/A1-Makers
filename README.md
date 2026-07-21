# 🌐 A1-MAKERS s.r.o. – Prezentační web

Prezentační a firemní webová stránka pro společnost **A1-MAKERS s.r.o.** se zaměřením na moderní design, přehlednou prezentaci služeb a multijazyčnost.

🔗 **Živá demo ukázka:** [https://illustrious-praline-aac907.netlify.app](https://illustrious-praline-aac907.netlify.app)

---

## 🚀 Klíčové funkce

* **Multijazyčnost:** Plná podpora 3 jazykových mutací – čeština (CZ), angličtina (EN) a němčina (DE).
* **Responzivní design:** Optimalizováno pro mobilní zařízení, tablety i počítače.
* **Interaktivní mapa:** Integrované Google Maps JavaScript API s vlastním barevným stylováním na míru.
* **Scroll animace:** Plynulé načítání prvků na stránce pomocí knihovny AOS (Animate On Scroll).
* **Kontaktní formulář:** Vizuální struktura připravená pro napojení na backendový skript (`mail.php`).

---

## 🛠️ Použité technologie

* **HTML5** – Sémantická struktura webu
* **CSS3** – Vlastní styly, layouty (Flexbox, CSS Grid)
* **JavaScript (ES6+)** – Logika rozhraní a inicializace mapy
* **Google Maps API** – Zobrazení sídla firmy
* **AOS Library** – Animace při skrolování
* **PHP** – Zpracování odesílání formulářů na e-mail

---

## 📁 Struktura projektu

```text
├── assets/          # Obrázky, ikony a grafické podklady
├── de/              # Německá jazyková mutace (index.html)
├── en/              # Anglická jazyková mutace (index.html)
├── index.html       # Hlavní česká verze webu
├── script.js        # Vlastní JS kód (obsahuje window.initMap)
├── style.css        # Hlavní CSS stylesheet
├── mail.php         # PHP skript pro odesílání e-mailů
└── README.md        # Dokumentace projektu
