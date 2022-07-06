const toggleButton = document.querySelector(".dark-light");

toggleButton.addEventListener("click", () => {
  console.log("clicked");
  document.body.classList.toggle("dark-mode");
});

const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");

wrapper.addEventListener("scroll", (e) => {
  e.target.scrollTop > 30
    ? header.classList.add("header-shadow")
    : header.classList.remove("header-shadow");
});

const fectchData = async () => {
  const res = await fetch(
    "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=36130a86&app_key=eeb5ceaf044d200d3ec0cb1570e9b3f7&&content-type=application/json"
  );
  const data = await res.json();
  updateListening(data.results);
};

const updateListening = (jobs) => {
  const jobCards = document.querySelectorAll(".job-card");
  const jobLogos = document.querySelector(".job-logos");
  const jobDetailTitle = document.querySelector(
    ".job-explain-content .job-card-title"
  );
  const cardsContainer = document.querySelector(".job-cards")
  const jobBg = document.querySelector(".job-bg");
  console.log(jobs);

  jobs.map((job) => {
    const {title, description} = job
    const jobCard = document.createElement("div");
    const cardTitle = document.createElement("div")
    const subtitle = document.createElement("div")
    subtitle.className = "job-card-subtitle"
    subtitle.textContent = description
    cardTitle.textContent = title
    jobCard.className = "job-card"
    cardTitle.className = "job-card-title"
    jobCard.appendChild(cardTitle)
    jobCard.appendChild(subtitle)
    cardsContainer.appendChild(jobCard)
  })


  jobCards.forEach((jobCard) => {
    jobCard.addEventListener("click", () => {
      const number = Math.floor(Math.random() * 10);
      const url = `https://unsplash.it/640/425?image=${number}`;
      jobBg.src = url;
  
      const logo = jobCard.querySelector("svg");
      const bg = logo.style.backgroundColor;
      console.log(bg);
      jobBg.style.background = bg;
      const title = jobCard.querySelector(".job-card-title");
      jobDetailTitle.textContent = title.textContent;
      jobLogos.innerHTML = logo.outerHTML;
      wrapper.classList.add("detail-page");
      wrapper.scrollTop = 0;
    });
  });
};


const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  console.log("clicked");
  wrapper.classList.remove("detail-page");
});

fectchData();
