fetch('/data/profile.json')
  .then(response => response.json())
  .then(data => {
    
// Présentation
if (data.header) {
  if (data.header.image) {
    document.getElementById('fullscreen').style.backgroundImage = `url('${data.header.image}')`;
  } else {
    document.getElementById('fullscreen').style.backgroundColor = '#aaa1f1';
  }

  if (data.header.name) {
    document.getElementById('header-name').textContent = data.header.name;
  } else {
    document.getElementById('header-name').style.display = 'none';
  }

  if (data.header.title) {
    document.getElementById('header-title').textContent = data.header.title;
  } else {
    document.getElementById('header-title').style.display = 'none';
  }

  if (data.header.introduction) {
    document.getElementById('introduction-content').innerHTML = 
    data.header.introduction.map(p => `<p>${p}</p>`).join('');
  } else {
    document.getElementById('introduction').style.display = 'none';
  }
} else {
  document.getElementById('header').style.display = 'none';
}

/* Expériences professionnelles */
if (data.experiences) {
  document.getElementById('experiences-list').innerHTML = 
    data.experiences.map((exp, index) => `
      ${index > 0 ? `<div class="diamond-separator"></div>` : ''}
      <div class="experience ${index % 2 !== 0 ? 'reverse' : ''}">
        ${exp.image ? `
          <div class="exp exp-photo">
            <img src="${exp.image}" alt="${exp.company || ''}" onerror="this.src='images/default-experience.jpg'">
          </div>
        ` : ''}
        <div class="exp exp-texte">
          ${exp.company || exp.position ? `
            ${exp.company ? `<h3>${exp.company}</h3>` : ''}
            ${exp.position ? `<h4>${exp.position}</h4>` : ''}
          ` : ''}
          ${exp.startDate || exp.endDate ? `
            <div class="exp exp-time">${exp.startDate || ''} → ${exp.endDate || ''}</div>
          ` : ''}
          ${exp.objectives ? `
            <div class="exp exp-objective">
              <b>Objectif :</b><br>${exp.objectives}
            </div>
          ` : ''}
          ${exp.achievements ? `
            <div class="exp exp-realisation">
              <b>Réalisations :</b>
              <ul>${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>
          ` : ''}
          ${exp.results ? `
            <div class="exp exp-results">
              <b>Résultats obtenus :</b><br>${exp.results}
            </div>
          ` : ''}
          ${exp.environment ? `
            <div class="exp exp-technique">
              <b>Environnement :</b><br>${exp.environment}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
} else {
  document.getElementById('experiences').style.display = 'none';
}

/* Education */
if (data.education) {
  document.getElementById('education-list').innerHTML = 
    data.education.map(edu => `
      <div class="education color">
      ${edu.school || edu.year ? `
        <div class="education-header">
          ${edu.school ? `<h3>${edu.school}</h3>` : ''}
          ${edu.year ? `<p>${edu.year}</p>` : ''}
        </div>
      ` : ''}
        ${edu.diploma ? `
          ${Array.isArray(edu.diploma) 
            ? edu.diploma.map(d => `<b>${d}</b><br>`).join('') 
            : `<b>${edu.diploma}</b>`}
        ` : ''}    
        ${edu.description ? `
          ${Array.isArray(edu.description) 
            ? edu.description.map(d => `<p>${d}</p>`).join('') 
            : `<p>${edu.description}</p>`}
        ` : ''}
        ${edu.link ? `<a href="${edu.school}"><button>En savoir plus</button></a>` : ''} 
      </div>
    `).join('');
} else {
  document.getElementById('education').style.display = 'none';
}

/* Compétences gestion de projet */
if (data.projectManagementSkills) {
  document.getElementById('project-management-skills-list').innerHTML = 
    data.projectManagementSkills.map(skill => `
      <div class="skill">
        <img class="icon" src="${skill.icon || 'icons/default.png'}" onerror="this.src='icons/default.png'">
        ${skill.category ? `<h3>${skill.category}</h3>` : ''}
        ${skill.items ? `
          <ul>
          ${Array.isArray(skill.items) 
            ? skill.items.map(d => `<li>${d}</li>`).join('') 
            : `<li>${skill.items}</li>`}
          </ul>
        ` : ''}
      </div>
    `).join('');
} else {
  document.getElementById('project-management-skills').style.display = 'none';
}

/* Compétences complémentaires */
if (data.otherSkills) {
  document.getElementById('other-skills-list').innerHTML = 
    data.otherSkills.map(skill => `
      <div class="other-skills color">

        ${skill.category ? ` <h3>${skill.category}</h3>` : ''}
        ${skill.description ? ` 
              ${Array.isArray(skill.description) 
              ? skill.description.map(d => `<p>${d}</p>`).join('') 
              : `<p>${skill.description}</p>`}
        ` : ''}

        ${skill.certification ? `
        <div class="other-skills-certifications">
            ${skill.certification.map(cert => `
            <div class="other-skills-certification ${cert.image ? 'has-image' : ''}">
            ${cert.image ? `
            <div class="cert-image">
              <img src="${cert.image}" alt="${cert.school || ''}" onerror="this.src='images/default-certification.jpg'">
            </div>
            ` : ''}

            <div class="cert-content">
            ${cert.school ? `
              <div class="other-skills-certification-header">
                ${cert.school ? `<h4>${cert.school}</h4>` : ''}
                ${cert.year ? `<p>${cert.year}</p>` : ''}
              </div>
            ` : ''}
            ${cert.description ? `
              ${Array.isArray(cert.description) 
                ? cert.description.map(d => `<p>${d}</p>`).join('') 
                : `<p>${cert.description}</p>`}
            ` : ''}
            </div>
          </div>
          `).join('')}
          </div>

          ${skill.link ? `
            <a href="${skill.link}"><button class="other-skills-link">
              ${skill.linkLabel ? ` ${skill.linkLabel} `: 'En savoir plus'} 
            </button></a>
          </div>
          `: ''} 

          </div>
          ` : ''}
      
    `).join('');
} else {
  document.getElementById('other-skills').style.display = 'none';
}

/* Outils */
if (data.projectManagementSkills) {
  document.getElementById('tools-list').innerHTML = 
    data.tools.map(tool => `
      <div class="skill">
        <img class="icon" src="${tool.icon || 'icons/default.png'}" onerror="this.src='icons/default.png'">
        ${tool.category ? `<h3>${tool.category}</h3>` : ''}
        ${tool.items ? `
          <ul>
          ${Array.isArray(tool.items) 
            ? tool.items.map(d => `<li>${d}</li>`).join('') 
            : `<li>${tool.items}</li>`}
          </ul>
        ` : ''}
      </div>
    `).join('');
} else {
  document.getElementById('tools').style.display = 'none';
}

/* Contact */
if (data.contact) {
  document.getElementById('contact-list').innerHTML = 
    data.contact.map(contact => `
      <div class="contact-item color">
        <img class="icon" src="${contact.icon || 'icons/default.png'}" onerror="this.src='icons/default.png'">
        ${contact.category ? `<h3>${contact.category}</h3>` : ''}
        ${contact.items ? `
          ${Array.isArray(contact.items) 
            ? contact.items.map(d => `<p>${d}</p>`).join('') 
            : `<p>${contact.items}</p>`}
        ` : ''}
      </div>
    `).join('');
} else {
  document.getElementById('contact').style.display = 'none';
}

/* Footer */
document.getElementById('copyright-year').textContent = new Date().getFullYear();

if (data.footer) {
  if (data.footer.copyright) {
    document.getElementById('copyright').innerHTML = data.footer.copyright;
  } 

  if (data.footer.credits) {
    document.getElementById('credits').innerHTML = data.footer.credits;
  } else {
    document.getElementById('credits').style.display = 'none';
  }
} 

if (data.header) {
  if (data.header.image) {
    document.getElementById('footer').style.backgroundImage = `url('${data.header.image}')`;
  } else {
    document.getElementById('footer').style.backgroundColor = '#aaa1f1';
  }
}

});