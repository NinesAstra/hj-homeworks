const tabs = document.querySelector('#tabs');
const articlesCollection = document.querySelectorAll('[data-tab-title]');
console.log(articlesCollection);

const tabsContainer = document.querySelector('.tabs-nav');
const demoTab = tabsContainer.querySelector('li');
for (let item of articlesCollection) {

const tab = demoTab.cloneNode(true); 
tabsContainer.appendChild(tab);

tab.firstElementChild.innerHTML = item.dataset.tabTitle;
tab.firstElementChild.classList.add(item.dataset.tabIcon);
}

tabsContainer.removeChild(demoTab);

const tabsCollection = tabsContainer.querySelectorAll('li');

document.addEventListener('DOMContentLoaded', showFirstTab);

function showFirstTab(event) {
    for (let i = 0; i < tabsCollection.length; ++i) {
	articlesCollection[i].classList.add('hidden');
  }
    tabsCollection[0].classList.add('ui-tabs-active');
    articlesCollection[0].classList.remove('hidden');
}

for (item of tabsCollection) {
	item.addEventListener ('click', showActiveTab);
}
function showActiveTab(event) {
		if (event.currentTarget.classList.contains('ui-tabs-active')) {
			return;
		}
	for (let i = 0; i < tabsCollection.length; ++i) {
		tabsCollection[i].classList.remove('ui-tabs-active');
		articlesCollection[i].classList.add('hidden')
	}
	event.currentTarget.classList.add('ui-tabs-active');
	for (let i = 0; i < tabsCollection.length; ++i) {
		if (tabsCollection[i].classList.contains('ui-tabs-active')) {
		articlesCollection[i].classList.remove('hidden')
	  }
	}
}