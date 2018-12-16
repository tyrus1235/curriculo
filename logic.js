// O conteúdo do currículo (basicamente, o "container").
var content = document.getElementById('content');

// O botão que ativa o Tema Claro.
var lightTheme = document.getElementById('light-theme');

// O botão que ativa o Tema Escuro.
var darkTheme = document.getElementById('dark-theme');

// URL para a requisição de experiência profissional.
var experienceURL = 'https://demo8029375.mockable.io/experience';

// URL para a requisição de habilidades técnicas.
var skillsURL = 'https://demo8029375.mockable.io/skills';

// Se o usuário havia escolhido o Tema Escuro antes, mantenha esse tema ao recarregar a página.
try {
    if (localStorage.getItem('theme') === 'dark') {
        changeTheme('dark');
    }
}
catch(error) {
    console.error("localStorage não suportado!");
}

// Se o usuário clicar no botão do Tema Claro, trocar o tema para claro e armazenar a opção do usuário.
lightTheme.addEventListener("click", function() {
    changeTheme('light');
    try {
        localStorage.setItem('theme', 'light');
    }
    catch(error) {
        console.error("localStorage não suportado!");
    }
});

// Se o usuário clicar no botão do Tema Escuro, trocar o tema para escuro e armazenar a opção do usuário.
darkTheme.addEventListener("click", function() {
    changeTheme('dark');
    try {
        localStorage.setItem('theme', 'dark');
    }
    catch(error) {
        console.error("localStorage não suportado!");
    }
});

// Requisições HTTP.
var xhrExperience = new XMLHttpRequest();

// Requisição GET para recuperar a lista de experiências profissionais.
xhrExperience.open('GET', experienceURL);

// Ao obter a lista, mostrá-la na tela para o usuário.
xhrExperience.onreadystatechange = function() {
    if (xhrExperience.readyState === xhrExperience.DONE && xhrExperience.status === 200) {

        var experience = JSON.parse(xhrExperience.response).experience;
        console.log('experience: ', experience);

        var expContainer = document.getElementById('experience-container');

        document.getElementById('experience-loading').hidden = true;

        for (var i = 0; i < experience.length; i++) {
            var expDiv = document.createElement('div');
            expDiv.innerHTML = `<h3 class="company-title">${experience[i].company}</h3>
            <p><strong>Dura&#231;&#227;o:</strong> ${experience[i].startedAt} at&#233; ${experience[i].endedAt}</p>
            <p><strong>Cargos:</strong> ${experience[i].roles}</p>
            <p><strong>Atividades:</strong></p>`;

            for (var j = 0; j < experience[i].activities.length; j++) {
                expDiv.innerHTML += `<li>${experience[i].activities[j]}</li>`;
            }

            expContainer.append(expDiv);
        }

    }
}

// Enviar a requisição (assíncrona).
xhrExperience.send();

var xhrSkills = new XMLHttpRequest();

// Requisição GET para recuperar a lista de habilidades técnicas.
xhrSkills.open('GET', skillsURL);

// Ao obter a lista, mostrá-la na tela para o usuário.
xhrSkills.onreadystatechange = function() {
    if (xhrSkills.readyState === xhrSkills.DONE && xhrSkills.status === 200) {

        var skills = JSON.parse(xhrSkills.response).skills;
        console.log('skills: ', skills);

        var skillsContainer = document.getElementById('skills-container');
        var skillsDivs = {};

        document.getElementById('skills-loading').hidden = true;

        for (var i = 0; i < skills.length; i++) {

            if (!skillsDivs[skills[i].level]) {
                skillsDivs[skills[i].level] = document.createElement('div');
                skillsDivs[skills[i].level].innerHTML = `<h3>N&#237;vel ${skills[i].level}</h3>`;

                skillsContainer.appendChild(skillsDivs[skills[i].level]);
            }

            skillsDivs[skills[i].level].innerHTML += `<li>${skills[i].skill}</li>`;
        }

    }
}

// Enviar a requisição (assíncrona).
xhrSkills.send();

// Função que troca o tema da página entre Claro e Escuro.
function changeTheme(theme) {
    if (theme === 'dark') {
        content.classList.add('dark');
        content.classList.remove('light');
        lightTheme.setAttribute('aria-pressed', 'false');
        darkTheme.setAttribute('aria-pressed', 'true');
    }
    else {
        content.classList.remove('dark');
        content.classList.add('light');
        lightTheme.setAttribute('aria-pressed', 'true');
        darkTheme.setAttribute('aria-pressed', 'false');
    }
}