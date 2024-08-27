const apiKey = '48063c28faf54b0ca69fded773afd3e9';

const mainContainer=document.getElementById('main-container');

const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews()
{
  try
  {
    const apiURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=20&apikey=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json(); 
    return data.articles;
  }
  catch(error)
  {
    console.log('Error fetching the news.',error);
    return [];
  }
}

searchButton.addEventListener('click', async () => 
{
  const query = inputField.value.trim();
  if(query !== '')
  {
    try
    {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } 
    catch(error)
    {
      console.log('Error while fetching data.', error);
      return [];
    }
  }
})

inputField.addEventListener('keypress', async () => 
{
  if (event.key === 'Enter') 
  {
    const query = inputField.value.trim();
    if (query !== '') 
    {
      try {
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
      } catch (error) 
      {
        console.log('Error while fetching data.', error);
      }
    }
  }
});

async function fetchNewsQuery(query)
{
  try
  {
    const apiURL =` https://newsapi.org/v2/everything?q=${query}&pageSize=100&apikey=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.articles;
  }
  catch(error)
  {
    console.log('Error fetching the news.',error);
    return [];
  }
}

function displayBlogs(articles)
{
  mainContainer.innerHTML = '';
  articles.forEach((article) => 
  {
    const blogCard = document.createElement('div');
    blogCard.classList.add('holder');

    const img = document.createElement('img');
    img.classList.add('image');

    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement('div');
    title.classList.add('title'); 
    if(article.title.length>60)
    {
      title.textContent = article.title.slice(0,70)+'...';
    }
    else
    {
      title.textContent = article.title;
    }

    const description = document.createElement('div');
    description.classList.add('description');
    if(article.description.length>200)
    {
      description.textContent = article.description.slice(0,150)+'...';
    }
    else
    {
      description.textContent = article.description;
    }

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click', () => 
    {
      window.open(article.url, 'blank');
    })
    mainContainer.appendChild(blogCard);
  })
}

(async () =>
{
  try
  {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  }
  catch(error)
  {
    console.log('Error fetching the news.');
  }
})();