// Script pour le guide Malphite TOP

document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight current section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Matchup details toggle
    const matchupHeaders = document.querySelectorAll('.matchup-detailed h4');
    
    matchupHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('expanded');
        });
    });
    
    // Tips hover effect
    const tipItems = document.querySelectorAll('.tip li');
    
    tipItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('highlight');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });
    
    // Tooltips for items
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const img = item.querySelector('img');
        const text = item.querySelector('span').textContent;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        
        item.appendChild(tooltip);
        
        item.addEventListener('mouseenter', function() {
            tooltip.style.display = 'block';
        });
        
        item.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
    
    // Add CSS for active nav and tooltips
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: var(--accent2);
        }
        
        .tip li.highlight {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 2px 5px;
            border-radius: 3px;
        }
        
        .tooltip {
            display: none;
            position: absolute;
            background: rgba(18, 28, 40, 0.95);
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;
            z-index: 100;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            border: 1px solid var(--accent);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .item {
            position: relative;
        }
        
        .matchup-detailed {
            cursor: pointer;
        }
        
        .matchup-detailed ul {
            transition: max-height 0.3s ease-out;
            max-height: 1000px;
        }
        
        .matchup-detailed.expanded ul {
            max-height: 0;
            overflow: hidden;
        }
        
        .matchup-detailed h4::after {
            content: '▼';
            margin-left: 5px;
            font-size: 0.8em;
            transition: transform 0.3s;
        }
        
        .matchup-detailed.expanded h4::after {
            transform: rotate(180deg);
        }
    `;
    
    document.head.appendChild(style);
    
    // Ajouter une classe 'active' au premier lien de navigation par défaut
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Animation de fade-in pour les sections au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('fade-in');
    });
    
    // Ajout de CSS pour l'animation de fade-in
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(fadeStyle);
});

// Ajouter une fonction pour copier les builds dans le presse-papier
function copyBuild(buildName) {
    let buildText = '';
    
    if (buildName === 'tank') {
        buildText = 'Build Tank Malphite TOP:\n';
        buildText += '- Starter: Bouclier de Doran + Potion\n';
        buildText += '- Core: Égide de Feu Solaire > Cœur Gelé > Cotte épineuse\n';
        buildText += '- Situational: Force de la Nature, Masque Abyssal, Plaque de Pierre\n';
        buildText += '- Boots: Tabi Ninja ou Sandales de Mercure';
    } else if (buildName === 'ap') {
        buildText = 'Build AP Malphite TOP:\n';
        buildText += '- Starter: Anneau de Doran + Potion\n';
        buildText += '- Core: Tempête de Luden > Flamme d\'ombre > Sablier de Zhonya\n';
        buildText += '- Situational: Coiffe de Rabadon, Bâton du Vide, Étreinte démoniaque\n';
        buildText += '- Boots: Souliers du Sorcier';
    }
    
    // Créer un élément textarea temporaire pour copier le texte
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = buildText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    // Afficher une notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Build copié dans le presse-papier!';
    document.body.appendChild(notification);
    
    // Ajouter du style pour la notification
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        .copy-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%);
            color: white;
            padding: 10px 20px;
            border-radius: var(--border-radius);
            box-shadow: 0 4px 15px rgba(58, 141, 255, 0.3);
            z-index: 1000;
            animation: fadeInOut 3s forwards;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            15% { opacity: 1; transform: translate(-50%, 0); }
            85% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    
    document.head.appendChild(notifStyle);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Ajouter des événements pour les boutons de copie
document.addEventListener('DOMContentLoaded', function() {
    // Si des boutons de copie sont ajoutés au HTML
    const copyButtons = document.querySelectorAll('.copy-build-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buildType = this.getAttribute('data-build');
            copyBuild(buildType);
        });
    });
    
    // Rendre les items cliquables pour voir plus de détails
    const itemElements = document.querySelectorAll('.item');
    
    itemElements.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('span').textContent;
            showItemDetails(itemName);
        });
    });
    
    // Ajouter une fonctionnalité pour marquer les matchups comme "maîtrisés"
    const matchupElements = document.querySelectorAll('.matchup');
    
    matchupElements.forEach(matchup => {
        matchup.addEventListener('click', function() {
            this.classList.toggle('mastered');
            
            // Sauvegarder l'état dans localStorage
            const championName = this.querySelector('span').textContent;
            const mastered = this.classList.contains('mastered');
            
            // Récupérer les données existantes
            let masteredMatchups = JSON.parse(localStorage.getItem('malphiteMasteredMatchups')) || {};
            
            // Mettre à jour les données
            masteredMatchups[championName] = mastered;
            
            // Sauvegarder les données
            localStorage.setItem('malphiteMasteredMatchups', JSON.stringify(masteredMatchups));
        });
        
        // Charger l'état depuis localStorage
        const championName = matchup.querySelector('span').textContent;
        const masteredMatchups = JSON.parse(localStorage.getItem('malphiteMasteredMatchups')) || {};
        
        if (masteredMatchups[championName]) {
            matchup.classList.add('mastered');
        }
    });
    
    // Ajouter du style pour les matchups maîtrisés
    const masteredStyle = document.createElement('style');
    masteredStyle.textContent = `
        .matchup.mastered {
            position: relative;
        }
        
        .matchup.mastered::after {
            content: '✓';
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: var(--easy);
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }
        
        .matchup.mastered img {
            border: 2px solid var(--easy);
            box-shadow: 0 0 10px rgba(96, 214, 194, 0.5);
        }
    `;
    
    document.head.appendChild(masteredStyle);
});

// Fonction pour afficher les détails d'un item
function showItemDetails(itemName) {
    // Définir les détails des items
    const itemDetails = {
        "Bouclier de Doran": {
            desc: "Item de départ défensif qui fournit de la régénération de vie et des défenses.",
            stats: "80 PV, +6 HP/5s, Régénération améliorée",
            cost: "450 gold",
            when: "Item de départ standard pour Malphite tank qui augmente ta survie en early game."
        },
        "Anneau de Doran": {
            desc: "Item de départ pour mages qui offre puissance et régénération de mana.",
            stats: "15 AP, 70 PV, +5 Mana/5s",
            cost: "400 gold",
            when: "Pour le build AP Malphite, aide à poke et farm avec les sorts."
        },
        "Égide de Feu Solaire": {
            desc: "Item mythique tank qui inflige des dégâts de zone autour de toi.",
            stats: "350 PV, 50 Armure, 50 MR, 20 AH",
            cost: "3200 gold",
            when: "Premier item core pour le build tank, synergie parfaite avec ton kit de tank."
        },
        "Cœur Gelé": {
            desc: "Réduit la vitesse d'attaque des ennemis à proximité et fournit de l'armure et du mana.",
            stats: "70 Armure, 400 Mana, 20 AH",
            cost: "2500 gold",
            when: "Excellent contre les équipes AD et résout tes problèmes de mana."
        },
        "Cotte épineuse": {
            desc: "Applique Blessures Graves aux attaquants et renvoie des dégâts.",
            stats: "350 PV, 60 Armure",
            cost: "2700 gold",
            when: "Contre champions auto-attack et ceux qui dépendent des soins."
        },
        "Force de la Nature": {
            desc: "Réduit les dégâts magiques reçus et augmente ta vitesse de déplacement.",
            stats: "350 PV, 70 MR, 5% MS",
            cost: "2900 gold",
            when: "Essentiel contre les équipes à forte présence AP, particulièrement contre ton counter Mordekaiser."
        },
        "Masque Abyssal": {
            desc: "Amplifie les dégâts magiques que les ennemis proches reçoivent.",
            stats: "400 PV, 40 MR, 10 AH",
            cost: "2700 gold",
            when: "Quand ton équipe a plusieurs sources de dégâts magiques. Amplifie les dégâts de ton ulti."
        },
        "Plaque de Pierre": {
            desc: "Augmente fortement tes résistances en teamfight et dispose d'un bouclier actif.",
            stats: "60 Armure, 60 MR",
            cost: "3300 gold",
            when: "Comme 4ème ou 5ème item pour maximiser ta tankiness en late game."
        },
        "Tempête de Luden": {
            desc: "Item mythique mage qui ajoute des dégâts d'éclair et de la pénétration magique.",
            stats: "80 AP, 6 Pen Magic, 600 Mana, 20 AH",
            cost: "3200 gold",
            when: "Premier item pour le build AP, maximise ton burst et te donne du mana."
        },
        "Flamme d'ombre": {
            desc: "Offre de la pénétration magique et des dégâts supplémentaires contre les cibles à PV faibles.",
            stats: "100 AP, 200 PV, 10-20 Pen Magic",
            cost: "3000 gold",
            when: "Excellent second item pour le build AP, ajoute de la survie et du burst."
        },
        "Sablier de Zhonya": {
            desc: "Te rend invulnérable pendant 2.5 secondes lorsqu'activé.",
            stats: "65 AP, 45 Armure, 10 AH",
            cost: "2600 gold",
            when: "Essentiel en AP pour survivre après ton engage avec R, ou contre les assassins AD."
        },
        "Coiffe de Rabadon": {
            desc: "Augmente ta puissance magique totale de 35%.",
            stats: "120 AP, +35% AP",
            cost: "3600 gold",
            when: "En 4ème ou 5ème item quand tu joues AP pour maximiser ton one-shot potential."
        },
        "Bâton du Vide": {
            desc: "Ignore 40% de la résistance magique des ennemis.",
            stats: "65 AP, 40% Pen Magic",
            cost: "2700 gold",
            when: "Contre des champions qui construisent de la résistance magique."
        },
        "Étreinte démoniaque": {
            desc: "Convertit une partie de tes PV en AP et inflige des dégâts continus.",
            stats: "70 AP, 350 PV",
            cost: "3000 gold",
            when: "Pour un build AP plus tanky, ou contre des champions avec beaucoup de PV."
        },
        "Tabi Ninja": {
            desc: "Réduit les dégâts des auto-attaques et fournit de l'armure.",
            stats: "20 Armure, 45 MS, 12% réduction AA",
            cost: "1100 gold",
            when: "Contre les équipes à dominante AD ou champions auto-attack basés."
        },
        "Sandales de Mercure": {
            desc: "Réduit la durée des contrôles et fournit de la résistance magique.",
            stats: "25 MR, 45 MS, 30% Tenacité",
            cost: "1100 gold",
            when: "Contre les équipes avec beaucoup de CC ou dégâts magiques."
        },
        "Souliers du Sorcier": {
            desc: "Fournit de la pénétration magique pour augmenter tes dégâts.",
            stats: "18 Pen Magic, 45 MS",
            cost: "1100 gold",
            when: "Pour le build AP afin de maximiser ton burst."
        }
    };
    
    // Vérifier si l'item existe dans notre base de données
    if (!itemDetails[itemName]) {
        console.log("Détails de l'item non disponibles pour: " + itemName);
        return;
    }
    
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'item-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'item-modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    const details = itemDetails[itemName];
    
    modalContent.innerHTML = `
        <h3>${itemName}</h3>
        <p><strong>Description:</strong> ${details.desc}</p>
        <p><strong>Stats:</strong> ${details.stats}</p>
        <p><strong>Coût:</strong> ${details.cost}</p>
        <p><strong>Quand l'acheter:</strong> ${details.when}</p>
    `;
    
    modalContent.prepend(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Ajouter du style pour la modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .item-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(18, 28, 40, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .item-modal-content {
            background: var(--primary);
            padding: 25px;
            border-radius: var(--border-radius);
            max-width: 500px;
            width: 90%;
            position: relative;
            border: 1px solid var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(58, 141, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .close-modal:hover {
            background: rgba(58, 141, 255, 0.4);
            transform: rotate(90deg);
        }
    `;
    
    document.head.appendChild(modalStyle);
    
    // Fermer la modal en cliquant en dehors du contenu
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Animation d'ouverture
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Ajouter des fonctionnalités pour le suivi de progression
document.addEventListener('DOMContentLoaded', function() {
    // Tracker de progression
    const progressBarFill = document.querySelector('.progress-fill');
    const progressStats = document.querySelector('.progress-stats');
    
    // Si le local storage existe, utiliser ses valeurs
    const savedProgress = JSON.parse(localStorage.getItem('malphiteProgress')) || {
        lp: 75,
        winStreak: 5
    };
    
    // Mettre à jour l'interface
    if (progressBarFill && progressStats) {
        progressBarFill.style.width = `${savedProgress.lp}%`;
        progressStats.innerHTML = `
            <span>${savedProgress.lp} LP</span>
            <span>${savedProgress.winStreak} victoires consécutives</span>
        `;
    }
    
    // Ajouter des boutons pour simuler les victoires/défaites
    const progressTracker = document.querySelector('.progress-tracker');
    
    if (progressTracker) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'progress-buttons';
        buttonsContainer.style.cssText = `
            display: flex;
            gap: 10px;
            margin-top: 15px;
        `;
        
        const winButton = document.createElement('button');
        winButton.className = 'button win-btn';
        winButton.innerHTML = '<i class="fas fa-plus"></i> Victoire';
        winButton.style.cssText = `
            flex: 1;
            padding: 8px;
            font-size: 0.9rem;
            background: linear-gradient(90deg, var(--easy) 0%, var(--accent2) 100%);
        `;
        
        const lossButton = document.createElement('button');
        lossButton.className = 'button loss-btn';
        lossButton.innerHTML = '<i class="fas fa-minus"></i> Défaite';
        lossButton.style.cssText = `
            flex: 1;
            padding: 8px;
            font-size: 0.9rem;
            background: linear-gradient(90deg, var(--hard) 0%, #FF9A8B 100%);
        `;
        
        buttonsContainer.appendChild(winButton);
        buttonsContainer.appendChild(lossButton);
        progressTracker.appendChild(buttonsContainer);
        
        // Event listeners pour les boutons
        winButton.addEventListener('click', () => {
            updateProgress(true);
        });
        
        lossButton.addEventListener('click', () => {
            updateProgress(false);
        });
    }
});

// Fonction pour mettre à jour la progression
function updateProgress(isWin) {
    // Récupérer les données actuelles
    let currentProgress = JSON.parse(localStorage.getItem('malphiteProgress')) || {
        lp: 75,
        winStreak: 5
    };
    
    if (isWin) {
        // Victoire
        currentProgress.lp += 20;
        currentProgress.winStreak += 1;
        
        // Vérifier la promotion
        if (currentProgress.lp >= 100) {
            currentProgress.lp = 0;
            
            // Notification de promotion
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)';
            notification.innerHTML = '<i class="fas fa-trophy"></i> Félicitations! Tu as atteint Gold!';
            document.body.appendChild(notification);
            
            // Mettre à jour l'icône de rang
            const rankIcon = document.querySelector('.rank-icon');
            if (rankIcon) {
                rankIcon.src = 'https://opgg-static.akamaized.net/images/medals/gold_4.png';
            }
            
            // Mettre à jour le texte
            const rankText = document.querySelector('.rank span');
            if (rankText) {
                rankText.textContent = 'Gold IV';
            }
        } else {
            // Notification standard
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.innerHTML = `<i class="fas fa-arrow-up"></i> +20 LP! ${currentProgress.winStreak} victoires consécutives!`;
            document.body.appendChild(notification);
        }
    } else {
        // Défaite
        currentProgress.lp -= 15;
        currentProgress.winStreak = 0;
        
        // Empêcher LP négatif
        if (currentProgress.lp < 0) {
            currentProgress.lp = 0;
        }
        
        // Notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.style.background = 'linear-gradient(90deg, var(--hard) 0%, #FF9A8B 100%)';
        notification.innerHTML = '<i class="fas fa-arrow-down"></i> -15 LP. Continue d\'essayer!';
        document.body.appendChild(notification);
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('malphiteProgress', JSON.stringify(currentProgress));
    
    // Mettre à jour l'interface
    const progressBarFill = document.querySelector('.progress-fill');
    const progressStats = document.querySelector('.progress-stats');
    
    if (progressBarFill && progressStats) {
        progressBarFill.style.width = `${currentProgress.lp}%`;
        progressStats.innerHTML = `
            <span>${currentProgress.lp} LP</span>
            <span>${currentProgress.winStreak} victoires consécutives</span>
        `;
    }
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        const notification = document.querySelector('.copy-notification');
        if (notification) {
            document.body.removeChild(notification);
        }
    }, 3000);
}