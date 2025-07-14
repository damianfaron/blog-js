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

// function to generate title links
const optionsArticleSelector = '.post',
  optionsTitleListSelector = '.titles',
  optionsTitleSelector = '.post-title';
function generateTitleLinks(customSelector = '') {
  console.log('Funkcja działa');
  // console.log(optionsArticleSelector)
  // console.log(optionsTitleSelector);
  // console.log(articles);

  /* remove contents of titleList */
  const titleList = document.querySelector(optionsTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(
    optionsArticleSelector + customSelector
  );

  // console.log(articles);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optionsTitleSelector).innerHTML;
    /* get the title from the title element */
    // console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML =
      '<li> <a href="#' +
      articleId +
      '"> <span> ' +
      articleTitle +
      '</span></a> </li>';

    /* insert link into titleList */
    html = html + linkHTML;
    // console.log('aktualny: ', html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  // console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
const optionsArticleTagsSelector = '.post-tags .list';

function generateTags() {
  // console.log(optionsArticleTagsSelector);
  /* find all articles */
  const articles = document.querySelectorAll(optionsArticleSelector);
  // console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    // console.log(article);
    /* find tags wrapper */
    const tagWrappers = article.querySelector(optionsArticleTagsSelector);
    // console.log(tagWrappers);
    /* make html variable with empty string */
    let html = '';
    // console.log(html);
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
    /* split tags into array */
    // add space in ' '
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log(tag);
      /* generate HTML of the link */
      const tagHtml = '<li> <a href="#tag-' + tag + '">  ' + tag + '</a> </li>';

      /* add generated code to html variable */
      html = html + tagHtml;
      // console.log(html);
    }

    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagWrappers.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    // console.log(activeTagLink);
  }

  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    // console.log(tagLink);
  }

  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToTags();

const optionsArticleAuthorSelector = '.post-author';

function generateAuthors() {
  const authorOfArticles = '.post';
  const authorsPosts = document.querySelectorAll(authorOfArticles);
  console.log(authorsPosts);
  for (let authorPost of authorsPosts) {
    const author = authorPost.getAttribute('data-author');
    const authorWrapperP = authorPost.querySelector(optionsArticleAuthorSelector);

    // console.log(author);
    // console.log(authorWrapperP);
    const authorHTML = '<a href="#author-' + author + '">' + author + '</a>';

    authorWrapperP.innerHTML = authorHTML;
    // console.log(authorHTML);
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToAuthors();
// function generateTags() {
//   // console.log(optionsArticleTagsSelector);
//   /* find all articles */
//   const articles = document.querySelectorAll(optionsArticleSelector);
//   // console.log(articles);
//   /* START LOOP: for every article: */
//   for (let article of articles) {
//     // console.log(article);
//     /* find tags wrapper */
//     const tagWrappers = article.querySelector(optionsArticleTagsSelector);
//     // console.log(tagWrappers);
//     /* make html variable with empty string */
//     let html = '';
//     // console.log(html);
//     /* get tags from data-tags attribute */
//     const articleTags = article.getAttribute('data-tags');
//     // console.log(articleTags);
//     /* split tags into array */
//     // add space in ' '
//     const articleTagsArray = articleTags.split(' ');
//     // console.log(articleTagsArray);
//     /* START LOOP: for each tag */
//     for (let tag of articleTagsArray) {
//       // console.log(tag);
//       /* generate HTML of the link */
//       const tagHtml = '<li> <a href="#tag-' + tag + '">  ' + tag + '</a> </li>';

//       /* add generated code to html variable */
//       html = html + tagHtml;
//       // console.log(html);
//     }

//     /* END LOOP: for each tag */
//     /* insert HTML of all the links into the tags wrapper */
//     tagWrappers.innerHTML = html;
//     /* END LOOP: for every article: */
//   }
// }
