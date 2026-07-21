document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter, currentCount = 0) => {
        const targetAttr = counter.getAttribute('data-target');
        const target = parseFloat(targetAttr);
        const decimals = (targetAttr.split('.')[1] || []).length;
        const speed = 90;
        const inc = target / speed;

        if (currentCount < target) {
            const nextValue = currentCount + inc;

            if (nextValue < target) {
                counter.innerText = nextValue.toFixed(decimals);
                setTimeout(() => animateCounter(counter, nextValue), 16);
            } else {
                counter.innerText = targetAttr;
            }
        } else {
            counter.innerText = targetAttr;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, 0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach((counter) => observer.observe(counter));
});

const langBtn = document.getElementById('lang-menu-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langArrow = document.getElementById('lang-arrow');

const getCurrentLanguage = () => {
    const pathname = window.location.pathname;

    if (pathname.includes('/en/')) return 'en';
    if (pathname.includes('/de/')) return 'de';
    return 'cz';
};

const applyLanguageUI = () => {
    if (!langBtn || !langDropdown || !langArrow) return;

    const currentLang = getCurrentLanguage();
    const currentDirDepth = window.location.pathname.split('/').filter(Boolean).length;
    
    const isSubFolder = window.location.pathname.includes('/en/') || window.location.pathname.includes('/de/');
    const relativeBase = isSubFolder ? '../' : '';

    const languageMeta = {
        cz: {
            label: 'Čeština',
            flag: `${relativeBase}assets/icons/cz-flag-icon.svg`,
            alt: 'Čeština'
        },
        en: {
            label: 'English',
            flag: `${relativeBase}assets/icons/en-flag-icon.svg`,
            alt: 'English'
        },
        de: {
            label: 'Deutsch',
            flag: `${relativeBase}assets/icons/de-flag-icon.svg`,
            alt: 'Deutsch'
        }
    };

    const meta = languageMeta[currentLang];
    const buttonFlag = langBtn.querySelector('img');
    const buttonText = langBtn.querySelector('p');

    if (buttonFlag && meta) {
        buttonFlag.src = meta.flag;
        buttonFlag.alt = meta.alt;
    }

    if (buttonText && meta) {
        buttonText.textContent = meta.label;
    }

    const dropdownLinks = langDropdown.querySelectorAll('a');
    const targets = {
        cz: `${relativeBase}index.html`,
        en: `${relativeBase}en/index.html`,
        de: `${relativeBase}de/index.html`
    };

    dropdownLinks.forEach((link) => {
        const targetLang = link.getAttribute('data-lang');
        if (targetLang && targets[targetLang]) {
            link.href = targets[targetLang];
        }
    });
};

if (langBtn && langDropdown && langArrow) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
        langArrow.classList.toggle('rotate-180');
    });

    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.add('hidden');
            langArrow.classList.remove('rotate-180');
        }
    });

    applyLanguageUI();
}

document.addEventListener('DOMContentLoaded', () => {

    // 1. Zjištění aktuálního jazyka podle složky v URL adrese
    let currentLang = 'cz';
    
    if (window.location.pathname.includes('/en/')) {
        currentLang = 'en';
    } else if (window.location.pathname.includes('/de/')) {
        currentLang = 'de';
    }

    // 2. Multijazyčná data pro modaly
    const capacityData = {
        'cz': {
            '1': {
                num: '01',
                title: 'Výroba forem',
                desc: 'Zajišťujeme kompletní vývoj, konstrukci a výrobu forem pro zpracování napěněných materiálů jako jsou EPS, EPP, PUR a také přesné vstřikovací formy pro plasty. Náš proces zahrnuje simulace toku materiálu, precizní CNC lícování a finální testování funkčnosti nástroje před předáním.'
            },
            '2': {
                num: '02',
                title: 'CNC 3-osé a 5-osé obrábění',
                desc: 'Disponujeme moderním strojovým parkem pro přesné frézování složitých tvarových dílů, velkoobjemových modelů a forem. Kombinace výkonného 3-osého obrábění a kontinuálního 5-osého frézování nám umožňuje dosáhnout dokonalé čistoty povrchu, ostrých detailů a maximální rozměrové přesnosti podle technické dokumentace.'
            },
            '3': {
                num: '03',
                title: 'CAD/CAM modelování',
                desc: 'Naše konstrukční kancelář zpracovává 3D data nejvyšší kvality. Provádíme optimalizaci zákaznických modelů, návrh kompletních sestav forem a programování efektivních CAM drah pro výrobu. Pracujeme v špičkových softwarových systémech, které minimalizují riziko chyb a urychlují náběh výroby.'
            },
            '4': {
                num: '04',
                title: 'Povrchové úpravy a texturování',
                desc: 'Dodáváme finální vzhled vašim produktům. Provádíme precizní ruční leštění do zrcadlového lesku, technické pískování povrchů a chemické dezénování (texturování) vnitřních částí forem. Správná povrchová úprava nejen zlepšuje estetiku výlisku, ale také usnadňuje vyjímání dílů z formy a zvyšuje její celkovou životnost.'
            }
        },
        'en': {
            '1': {
                num: '01',
                title: 'Mold Manufacturing',
                desc: 'We provide complete development, design, and production of molds for processing foamed materials such as EPS, EPP, PUR, as well as precise injection molds for plastics. Our process includes material flow simulations, precise CNC fitting, and final tool functionality testing before delivery.'
            },
            '2': {
                num: '02',
                title: '3-Axis and 5-Axis CNC Machining',
                desc: 'We have a modern machine park for precise milling of complex shaped parts, large-volume models, and molds. The combination of powerful 3-axis machining and continuous 5-axis milling allows us to achieve perfect surface cleanliness, sharp details, and maximum dimensional accuracy according to technical documentation.'
            },
            '3': {
                num: '03',
                title: 'CAD/CAM Modeling',
                desc: 'Our design office processes 3D data of the highest quality. We optimize customer models, design complete mold assemblies, and program efficient CAM tracks for production. We work with top software systems that minimize the risk of errors and accelerate the launch of production.'
            },
            '4': {
                num: '04',
                title: 'Surface Finishing and Texturing',
                desc: 'We deliver the final look to your products. We perform precise manual polishing to a mirror finish, technical surface sandblasting, and chemical graining (texturing) of the internal parts of the molds. The correct surface finish not only improves the aesthetics of the molded part but also facilitates the removal of parts from the mold and increases its overall lifespan.'
            }
        },
        'de': {
            '1': {
                num: '01',
                title: 'Formenbau',
                desc: 'Wir bieten die komplette Entwicklung, Konstruktion und Herstellung von Formen für die Verarbeitung von geschäumten Materialien wie EPS, EPP, PUR sowie präzise Spritzgussformen für Kunststoffe. Unser Prozess umfasst Materialflusssimulationen, präzise CNC-Anpassung und abschließende Funktionsprüfungen des Werkzeugs vor der Übergabe.'
            },
            '2': {
                num: '02',
                title: '3-Achs- und 5-Achs-CNC-Bearbeitung',
                desc: 'Wir verfügen über einen modernen Maschinenpark für das präzise Fräsen von komplexen Formteilen, großvolumigen Modellen und Formen. Die Kombination aus leistungsstarker 3-Achs-Bearbeitung und kontinuierlichem 5-Achs-Fräsen ermöglicht uns perfekte Oberflächenreinheit, scharfe Details und maximale Maßhaltigkeit gemäß technischer Dokumentation.'
            },
            '3': {
                num: '03',
                title: 'CAD/CAM-Modellierung',
                desc: 'Unser Konstruktionsbüro verarbeitet 3D-Daten von höchster Qualität. Wir optimieren Kundenmodelle, entwerfen komplette Formenbaugruppen und programmieren effiziente CAM-Bahnen für die Produktion. Wir arbeiten mit führenden Softwaresystemen, die das Fehlerrisiko minimieren und den Produktionsanlauf beschleunigen.'
            },
            '4': {
                num: '04',
                title: 'Oberflächenbehandlung und Texturierung',
                desc: 'Wir verleihen Ihren Produkten das finale Aussehen. Wir führen präzises manuelles Polieren auf Spiegelglanz, technisches Sandstrahlen von Oberflächen und chemisches Texturieren der Innenteile von Formen durch. Die richtige Oberflächenbehandlung verbessert nicht nur die Ästhetik des Formteils, sondern erleichtert auch die Entformung und erhöht die Gesamtlebensdauer der Form.'
            }
        }
    };

    const modal = document.getElementById('capacity-modal');
    const modalCard = document.getElementById('modal-card');
    const modalNum = document.getElementById('modal-num');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalCta = document.getElementById('modal-cta');
    const openButtons = document.querySelectorAll('.capacity-open-btn');
    const closeElements = [
        document.getElementById('modal-close-btn'),
        document.getElementById('modal-close-action'),
        modal
    ];

    const openModal = (id) => {
        const data = capacityData[currentLang][id];
        if (!data || !modal || !modalCard || !modalNum || !modalTitle || !modalDesc) return;

        modalNum.innerText = data.num;
        modalTitle.innerText = data.title;
        modalDesc.innerText = data.desc;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalCard.classList.remove('scale-95');
        modalCard.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal || !modalCard) return;

        modal.classList.add('opacity-0', 'pointer-events-none');
        modalCard.classList.remove('scale-100');
        modalCard.classList.add('scale-95');
        document.body.style.overflow = '';
    };

    openButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal(btn.getAttribute('data-capacity'));
        });
    });

    closeElements.forEach((el) => {
        if (el) {
            el.addEventListener('click', (e) => {
                if (el === modal && e.target !== modal) return;
                closeModal();
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('opacity-0')) {
            closeModal();
        }
    });

    if (modalCta) {
        modalCta.addEventListener('click', () => {
            closeModal();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const dropZone = document.getElementById('drop-zone');
    const dropZoneText = document.getElementById('drop-zone-text');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const submitBtn = document.getElementById('submit-btn');
    const submitBtnSpan = submitBtn?.querySelector('span');
    const statusSuccess = document.getElementById('form-status-success');
    const statusError = document.getElementById('form-status-error');

    let selectedFiles = [];
    const MAX_FILE_SIZE_MB = 20;
    const TOTAL_MAX_SIZE_MB = 50;

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            addFiles(e.target.files);
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach((eventName) => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('border-brand-cyan', 'bg-slate-800/50');
            });
        });

        ['dragleave', 'drop'].forEach((eventName) => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('border-brand-cyan', 'bg-slate-800/50');
            });
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            addFiles(dt.files);
        });
    }

    const addFiles = (newFiles) => {
        let totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i];

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                alert(`Soubor ${file.name} je příliš velký. Max. velikost jednoho souboru je ${MAX_FILE_SIZE_MB}MB.`);
                continue;
            }

            totalSize += file.size;
            if (totalSize > TOTAL_MAX_SIZE_MB * 1024 * 1024) {
                alert(`Celková velikost souborů překročila limit ${TOTAL_MAX_SIZE_MB}MB. Více souborů nelze přidat.`);
                break;
            }

            selectedFiles.push(file);
        }
        updateFileListUI();
    };

    window.removeFile = function(index) {
        selectedFiles.splice(index, 1);
        updateFileListUI();
    };

    const updateFileListUI = () => {
        if (!fileList || !dropZoneText) return;

        if (selectedFiles.length > 0) {
            fileList.innerHTML = '';
            selectedFiles.forEach((file, index) => {
                fileList.innerHTML += `
                    <li class="flex items-center justify-between bg-slate-700/50 p-2 rounded gap-2">
                        <span class="truncate">${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button type="button" onclick="removeFile(${index})" class="text-red-400 hover:text-white shrink-0 cursor-pointer">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </li>
                `;
            });
            fileList.classList.remove('hidden');
            dropZoneText.classList.add('hidden');
        } else {
            fileList.classList.add('hidden');
            dropZoneText.classList.remove('hidden');
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        statusSuccess?.classList.add('hidden');
        statusError?.classList.add('hidden');

        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('border-red-500', 'focus:ring-red-500');
            isValid = false;
        } else {
            emailInput.classList.remove('border-red-500', 'focus:ring-red-500');
        }

        if (!isValid) {
            statusError.innerText = 'Zkontrolujte prosím e-mailovou adresu.';
            statusError.classList.remove('hidden');
            return;
        }

        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('email', emailInput.value);
        formData.append('message', messageInput.value);

        selectedFiles.forEach((file) => {
            formData.append('files[]', file);
        });

        if (submitBtn) {
            submitBtn.disabled = true;
        }
        if (submitBtnSpan) {
            submitBtnSpan.innerText = 'Odesílám...';
        }

        fetch('mail.php', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
                if (submitBtnSpan) {
                    submitBtnSpan.innerText = 'Odeslat poptávku';
                }

                if (data.status === 'success') {
                    statusSuccess.classList.remove('hidden');
                    form.reset();
                    selectedFiles = [];
                    updateFileListUI();
                    statusSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    statusError.innerText = data.message || 'Při odesílání na serveru došlo k chybě.';
                    statusError.classList.remove('hidden');
                }
            })
            .catch((error) => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
                if (submitBtnSpan) {
                    submitBtnSpan.innerText = 'Odeslat poptávku';
                }
                statusError.innerText = 'Nepodařilo se spojit se serverem. Zkontrolujte prosím připojení nebo nám napište e-mail.';
                statusError.classList.remove('hidden');
                console.error('Error:', error);
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        window.AOS.init({
            once: true,
            offset: 100,
            duration: 800
        });
    }

    window.openModal = function(src) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        if (!modal || !modalImg) return;

        modalImg.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('imageModal');
        if (!modal) return;

        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    window.initMap = function() {
        const liberecLocation = { lat: 50.748143256308346, lng: 15.061313291123291 };
        const mapElement = document.getElementById('map');

        if (!mapElement || typeof google === 'undefined' || !google.maps) return;

        const map = new google.maps.Map(mapElement, {
            zoom: 16,
            center: liberecLocation,
            disableDefaultUI: true,
            styles: [
                { featureType: 'all', elementType: 'geometry.stroke', stylers: [{ color: '#243746' }] },
                { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#243746' }] },
                { featureType: 'all', elementType: 'labels.icon', stylers: [{ visibility: 'simplified' }] },
                { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
                { featureType: 'administrative.country', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] },
                { featureType: 'landscape.natural.landcover', elementType: 'labels.icon', stylers: [{ visibility: 'off' }, { saturation: '12' }] },
                { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
                { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
                { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
                { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ visibility: 'on' }, { color: '#cf112c' }] },
                { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#243746' }] },
                { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit.station.airport', elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
                { featureType: 'transit.station.bus', elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
                { featureType: 'transit.station.rail', elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
                { featureType: 'water', elementType: 'all', stylers: [{ color: '#6fb1c8' }, { visibility: 'on' }] }
            ]
        });

        new google.maps.Marker({
            position: liberecLocation,
            map: map,
            title: 'A1-MAKERS s.r.o.'
        });
    };
});