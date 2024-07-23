let currentPage = 0;
let pageSize = 1;

const BASE_URL = 'http://localhost:8000'
const apiPathname = '/api/content'

const getContent = async (currentPage, pageSize) => {
  const queryParams = new URLSearchParams({
    page: currentPage,
    page_size: pageSize
  })
  return fetch(`${BASE_URL}${apiPathname}?${queryParams.toString()}`)
}

const clearCanvas = () => {
  const img = document.getElementById('multimedia-img');
  img.src = '';
  img.style.display = 'none';
  const video = document.getElementById('multimedia-video');
  video.src = '';
  video.style.display = 'none';
  document.getElementById('name').innerHTML = '';
  document.getElementById('rating').innerHTML = '';
  const downloadBtn = document.getElementById("multimedia-download")
  downloadBtn.href = '';
  downloadBtn.download = '';
  downloadBtn.style.display = 'none';
}

const render = (arr) => {
  clearCanvas();
  const data = Array.isArray(arr) && arr.length ? arr[0] : [];
  const {
    url,
    creator__name,
    creator__rating
  } = data || {};
  document.getElementById('name').innerHTML = creator__name;
  document.getElementById('rating').innerHTML = Number.isNaN(creator__rating) ? '?' : creator__rating.toFixed(2);
  if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.endsWith('.webp')) {
    const img = document.getElementById('multimedia-img')
    img.src = url;
    img.style.display = 'block';
  } else if (url.endsWith('.mp4')) {
    const video = document.getElementById('multimedia-video');
    video.src = url;
    video.style.display = 'block';
  }
  const downloadBtn = document.getElementById("multimedia-download")
  downloadBtn.href = url;
  downloadBtn.download = url.split('/').pop();
  downloadBtn.style.display = 'block';
}

const refresh = () => {
  setLoading(true);
    getContent(currentPage, pageSize)
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