document.addEventListener("DOMContentLoaded", () => {
   const filmCatalog = document.getElementById("fList");
   const filmDetails = document.getElementById("film-details");
   const string = "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....";
   const newString = string.replace("\r\n", "");
   console.log(newString);

   function romanConverter(episode) {
      if (episode === 1) {
         return "Episode I: ";
      } else if (episode === 2) {
         return "Episode II: ";
      } else if (episode === 3) {
         return "Episode III: ";
      } else if (episode === 4) {
         return "Episode IV: ";
      } else if (episode === 5) {
         return "Episode V: ";
      } else if (episode === 6) {
         return "Episode VI: ";
      } else if (episode === 7) {
         return "Episode VII: ";
      }
   }

   //    Fetch film data
   fetch("https://www.swapi.tech/api/films")
      .then((res) => res.json())
      .then((data) => {
         data.result.forEach((film) => {
            const movieList = document.createElement("li");
            movieList.className = "li";
            movieList.textContent = `
            ${romanConverter(film.properties.episode_id)}${film.properties.title}
            `;
            filmCatalog.append(movieList);

            movieList.addEventListener("click", () => {
               filmDetails.style.display = "flex";
               filmDetails.innerHTML = `
               
               <div class="film-label">
               <h5>Title</h5>
               <span>${film.properties.title}</span>
            </div>
            <div class="film-label">
               <h5>Description</h5>
               <span>${film.properties.opening_crawl.replace("\r\n", "")}</span>
            </div>
            <div class="film-label">
               <h5>Director</h5>
               <span>${film.properties.director}</span>
            </div>
            <div class="film-label">
               <h5>Producers</h5>
               <span>${film.properties.producer}</span>
            </div>
            <div class="film-label">
               <h5>Release date</h5>
               <span>${film.properties.release_date}</span>
            </div>

               `;
            });
         });
      });
});
