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
      pDetails.innerHTML = "";
      pDetails.append(pForm);
      pDetails.append(savedPlanet);
   });

   pForm.addEventListener("submit", (e) => {
      e.preventDefault();
      savedPlanet.style.display = "flex";
      const newPlanetObj = {
         name: e.target.planet_name.value,
         population: e.target.planet_population.value,
         gravity: e.target.planet_gravity.value,
         diameter: e.target.planet_diameter.value,
         orbital_period: e.target.orbital_period.value,
         rotation_period: e.target.rotation_period.value,
         climate: e.target.climate.value,
         terrain: e.target.terrain.value,
         surface_water: e.target.surface_water.value,
      };

      pForm.reset();
   });

   //    Warns a user of page reload
   window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
   });

   // People
   const peopleList = document.getElementById("people-list");
   const peopleDetails = document.getElementById("people-details");

   // fetch people
   fetch("https://www.swapi.tech/api/people")
      .then((res) => res.json())
      .then(({ results }) => {
         results.forEach((character) => {
            const li = document.createElement("li");
            li.textContent = character.name;
            peopleList.append(li);

            // OnClick event of characters
            li.addEventListener("click", () => {
               fetch(character.url)
                  .then((res) => res.json())
                  .then(({ result }) => {
                     console.log(result.properties);
                     peopleDetails.innerHTML = `
                     <div class="planet-label">
         <h5>Name</h5>
         <span>${result.properties.name}</span>
      </div>
      <div class="planet-label">
         <h5>Gender</h5>
         <span style="text-transform: capitalize">${result.properties.gender}</span>
      </div>
      <div class="planet-label">
         <h5>DOB</h5>
         <span>${result.properties.birth_year}</span>
      </div>
      <div class="planet-label">
         <h5>Weight</h5>
         <span>${result.properties.mass} kgs</span>
      </div>
      <div class="planet-label">
         <h5>Height</h5>
         <span>${result.properties.height} cm</span>
      </div>
      <div class="planet-label">
         <h5>Skin tone</h5>
         <span style="text-transform: capitalize">${result.properties.skin_color}</span>
      </div>
      <div class="planet-label">
         <h5>Hair color</h5>
         <span style="text-transform: capitalize">${result.properties.hair_color}</span>
      </div>
      <div class="planet-label">
         <h5>Eye color</h5>
         <span style="text-transform: capitalize">${result.properties.eye_color}</span>
      </div>
                     `;
                  });
            });
         });
      })
      .catch((err) => {
         console.log(err.message);
      });

   // fetch first character
   fetch("https://www.swapi.tech/api/people/1")
      .then((res) => res.json())
      .then(({ result }) => {
         peopleDetails.innerHTML = `
         <div class="planet-label">
         <h5>Name</h5>
         <span>${result.properties.name}</span>
      </div>
      <div class="planet-label">
         <h5>Gender</h5>
         <span style="text-transform: capitalize">${result.properties.gender}</span>
      </div>
      <div class="planet-label">
         <h5>DOB</h5>
         <span>${result.properties.birth_year}</span>
      </div>
      <div class="planet-label">
         <h5>Weight</h5>
         <span>${result.properties.mass} kgs</span>
      </div>
      <div class="planet-label">
         <h5>Height</h5>
         <span>${result.properties.height} cm</span>
      </div>
      <div class="planet-label">
         <h5>Skin tone</h5>
         <span style="text-transform: capitalize">${result.properties.skin_color}</span>
      </div>
      <div class="planet-label">
         <h5>Hair color</h5>
         <span style="text-transform: capitalize">${result.properties.hair_color}</span>
      </div>
      <div class="planet-label">
         <h5>Eye color</h5>
         <span style="text-transform: capitalize">${result.properties.eye_color}</span>
      </div> 
      `;
         // <div class="planet-label">
         //    <h5>Home planet</h5>
         //    <span id="home-planet" style="text-transform: capitalize">${(fetchPlanet = fetch(result.properties.homeworld)
         //       .then((res) => res.json())
         //       .then((data) => {
         //          document.getElementById("home-planet").textContent = data.result.properties.name;
         //       }))}</span>
         // </div>
      })
      .catch((err) => {
         console.log(err.message);
      });

   // Search character functionality
   const searchContainer = document.querySelector(".search-container");
   searchContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = e.target.search_input.value;

      // fetch query
      fetch(`https://www.swapi.tech/api/people/?name=${query}`)
         .then((res) => res.json())
         .then(({ result }) => {
            console.log(result[0].properties);

            peopleDetails.innerHTML = `
         <div class="planet-label">
         <h5>Name</h5>
         <span>${result[0].properties.name}</span>
      </div>
      <div class="planet-label">
         <h5>Gender</h5>
         <span style="text-transform: capitalize">${result[0].properties.gender}</span>
      </div>
      <div class="planet-label">
         <h5>DOB</h5>
         <span>${result[0].properties.birth_year}</span>
      </div>
      <div class="planet-label">
         <h5>Weight</h5>
         <span>${result[0].properties.mass} kgs</span>
      </div>
      <div class="planet-label">
         <h5>Height</h5>
         <span>${result[0].properties.height} cm</span>
      </div>
      <div class="planet-label">
         <h5>Skin tone</h5>
         <span style="text-transform: capitalize">${result[0].properties.skin_color}</span>
      </div>
      <div class="planet-label">
         <h5>Hair color</h5>
         <span style="text-transform: capitalize">${result[0].properties.hair_color}</span>
      </div>
      <div class="planet-label">
         <h5>Eye color</h5>
         <span style="text-transform: capitalize">${result[0].properties.eye_color}</span>
      </div> 
      `;
         })
         .catch((err) => {
            console.log(err);
         });
   });

   //dynamic year footer
   let now = new Date();
   const year = now.getFullYear();

   const dynamicYear = document.getElementById("yearD");
   dynamicYear.textContent = year;
   console.log(dynamicYear);
});
