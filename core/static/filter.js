let currentPage = 0;
let pageSize = 5;
let currentFilter = 'Instagram';

const BASE_URL = 'http://127.0.0.1:8000'
const apiPathname = '/api/content'

const getContent = async (currentPage, pageSize, filter) => {
  const queryParams = new URLSearchParams({
    page: currentPage,
    page_size: pageSize,
    filter
  })
  return fetch(`${BASE_URL}${apiPathname}?${queryParams.toString()}`)
}

const clearCanvas = () => {
  document.getElementById('multimedia').innerHTML = '';
}

const getHtmlCard = (data) => {
  const {
    url,
    creator__name,
    creator__rating
  } = data || {};
  let node = '';
  if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.endsWith('.webp')) {
    node = `
      <img src="${url}" width="100%" max-height="400px" class="card-img-top" alt="...">
    `
  } else if (url.endsWith('.mp4')) {
    node = `
      <video controls width="100%" max-height="400px" >
        <source src="${url}" type="video/mp4">
      </video>
    `
  }

  return `
    <div class="card" style="width: 320px;">
      ${node}
      <div class="card-body">
        <h5 class="card-title">${creator__name}</h5>
        <p class="card-text">Rating: ${Number.isNaN(creator__rating) ? '?' : creator__rating.toFixed(2)}</p>
      </div>
    </div>
  `
}

const render = (arr) => {
  clearCanvas();
  document.getElementById('multimedia').innerHTML = arr.map(data => getHtmlCard(data)).join('');
  
}

const refresh = () => {
  setLoading(true);
    getContent(currentPage, pageSize, currentFilter)
      .then(response => response.json())
      .then(arr => render(arr))
      .catch(error => {
        console.error('Error:', error)
      })
      .finally(() => setLoading(false));
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    refresh();
  }
};

const prevButton = document.getElementById('prev');
prevButton.addEventListener("click", () => {
  currentPage = Math.max(0, currentPage - 1);
  refresh();
  if (currentPage === 0 ) {
    prevButton.disabled = true;
  }
  }
);
const nextButton = document.getElementById('next');
nextButton.addEventListener("click", () => {
  currentPage = currentPage + 1;
  refresh();
});

const setLoading = (isLoading) => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = isLoading ? 'block' : 'none';
}

const instagramBtn = document.getElementById('Instagram');
instagramBtn.addEventListener("click", () => {
  currentFilter = 'Instagram';
  refresh();
});

const tiktokBtn = document.getElementById('TikTok');
tiktokBtn.addEventListener("click", () => {
  currentFilter = 'TikTok';
  refresh();
});

const ugcBtn = document.getElementById('User Generated Content');
ugcBtn.addEventListener("click", () => {
  currentFilter = 'User Generated Content';
  refresh();
});


