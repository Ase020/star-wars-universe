document.addEventListener("DOMContentLoaded", () => {
   const filmCatalog = document.getElementById("fList");
   const filmDetails = document.getElementById("film-details");

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
               console.log(film.properties.planets);
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
      })
      .catch((err) => console.log(err.message));

   const pList = document.getElementById("pList");
   const pDetails = document.getElementById("planet-details");
   const addPlanet = document.getElementById("add-planet");
   const pForm = document.getElementById("pForm");
   const savedPlanet = document.querySelector(".saved-planet");
   //   Fetch Planets data
   fetch("https://www.swapi.tech/api/planets")
      .then((res) => res.json())
      .then(({ results }) => {
         results.forEach((planet) => {
            const planetList = document.createElement("li");
            planetList.textContent = planet.name;
            pList.append(planetList);

            planetList.addEventListener("click", () => {
               //    Fetch individual planet
               fetch(planet.url)
                  .then((res) => res.json())
                  .then(({ result }) => {
                     pDetails.style.display = "flex";
                     pDetails.innerHTML = `
                     <div class="planet-label">
                  <h5>Name</h5>
                  <span>${result.properties.name}</span>
               </div>

               <div class="planet-label">
                  <h5>Population</h5>
                  <span>${result.properties.population === "unknown" ? "Unknown number of" : parseInt(result.properties.population).toLocaleString()} humans</span>
               </div>

               <div class="planet-label">
                  <h5>Gravity</h5>
                  <span>${result.properties.gravity === "N/A" ? "Unknown" : result.properties.gravity}</span>
               </div>

               <div class="planet-label">
                  <h5>Diameter</h5>
                  <span>${result.properties.diameter} km</span>
               </div>

               <div class="planet-label">
                  <h5>Orbital Period</h5>
                  <span>${result.properties.orbital_period} days</span>
               </div>

               <div class="planet-label">
                  <h5>Rotation Period</h5>
                  <span>${result.properties.rotation_period} days</span>
               </div>

               <div class="planet-label">
                  <h5>Climate</h5>
                  <span>${result.properties.climate}</span>
               </div>

               <div class="planet-label">
                  <h5>Terrain</h5>
                  <span>${result.properties.terrain}</span>
               </div>

               <div class="planet-label">
                  <h5>Surface water</h5>
                  <span>${result.properties.surface_water}${result.properties.surface_water === "unknown" ? "" : "%"}</span>
               </div>
                     `;
                  })
                  .catch((err) => {
                     console.log(err.message);
                  });
            });
         });
      })
      .catch((err) => console.log(err.message));

   //   Add Planet eventListener
   addPlanet.addEventListener("click", () => {
      pDetails.style.display = "flex";
   });

   pForm.addEventListener("submit", (e) => {
      e.preventDefault();
      savedPlanet.style.display = "flex";
      //   const newPlanetObj = {
      //      name: e.target.planet_name.value,
      //      population: e.target.planet_population.value,
      //      gravity: e.target.planet_gravity.value,
      //      diameter: e.target.planet_diameter.value,
      //      orbital_period: e.target.orbital_period.value,
      //      rotation_period: e.target.rotation_period.value,
      //      climate: e.target.climate.value,
      //      terrain: e.target.terrain.value,
      //      surface_water: e.target.surface_water.value,
      //   };
      pForm.reset();
   });

   //    Warns a user of page reload
   window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
   });
});
