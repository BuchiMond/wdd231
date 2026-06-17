// directory.js

const memberContainer = document.querySelector('#memberContainer');
const gridButton = document.querySelector('#gridView');
const listButton = document.querySelector('#listView');
const yearSpan = document.querySelector('#currentYear');
const lastModifiedSpan = document.querySelector('#lastModified');

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    memberContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        const img = document.createElement('img');
        img.setAttribute('src', member.image);
        img.setAttribute('alt', `${member.name} logo`);
        img.setAttribute('loading', 'lazy');

        const name = document.createElement('h2');
        name.textContent = member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = `📞 ${member.phone}`;

        const website = document.createElement('a');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.textContent = 'Visit Website';

        const membership = document.createElement('p');
        membership.textContent = `Membership Level: ${getLevel(member.membership)}`;

        card.append(img, name, address, phone, website, membership);
        memberContainer.appendChild(card);
    });
}

function getLevel(level) {
    switch (level) {
        case 3: return 'Gold';
        case 2: return 'Silver';
        default: return 'Member';
    }
}

gridButton.addEventListener('click', () => {
    memberContainer.classList.add('grid');
    memberContainer.classList.remove('list');
});

listButton.addEventListener('click', () => {
    memberContainer.classList.add('list');
    memberContainer.classList.remove('grid');
});

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

getMembers();
