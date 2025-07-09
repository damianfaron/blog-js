'use strict';

function titleClickHandler(event) {
	event.preventDefault();
	const clickedElement = this;

	// console.log('Link kliknięty');

	/* remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll('.titles a.active');
	for (let activeLink of activeLinks) {
		activeLink.classList.remove('active');
	}

	/* add class 'active' to the clicked link */

	// console.log('clickedElement:', clickedElement);
	clickedElement.classList.add('active');
	/* remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('.posts article.active');
	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove('active');
	}

	/* get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute('href');
	// console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);
	// console.log(targetArticle);

	/* add class 'active' to the correct article */
	targetArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');
for (let link of links) {
	link.addEventListener('click', titleClickHandler);
}

// function to generate title links

function generateTitleLinks() {
	const optionsArticleSelector = '.post',
		optionsTitleListSelector = '.titles',
		optionsTitleSelector = '.post-title';

	const articles = document.querySelectorAll(optionsArticleSelector);
	const titleList = document.querySelector(optionsTitleListSelector);

	// const

	console.log('Funkcja działa');
	// console.log(optionsArticleSelector)
	// console.log(optionsTitleSelector);
	// console.log(articles);

	/* remove contents of titleList */
	titleList.innerHTML = '';

	/* for each article */
	for (let article of articles) {
		/* get the article id */
		const articleId = article.getAttribute('id');
		// console.log(articleId);
		/* find the title element */
		const articleTitle = article.querySelector(optionsTitleSelector).innerHTML;
		/* get the title from the title element */
		console.log(articleTitle);
		/* create HTML of the link */
		const linkHTML =
			'<li> <a href="# ' +
			articleId +
			'"> <span> ' +
			articleTitle +
			'</span></a> </li>';

		console.log(linkHTML);
		/* insert link into titleList */
		titleList.innerHTML = titleList.innerHTML + linkHTML;
	}
}

generateTitleLinks();
