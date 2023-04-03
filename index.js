document.addEventListener("DOMContentLoaded", () => {
   console.log("first commit");
   fetch("https://www.swapi.tech/api/")
      .then((res) => res.json())
      .then((res) => console.log(res));
});
