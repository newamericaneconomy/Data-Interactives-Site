document.addEventListener("DOMContentLoaded", function () {
  const mobileBurger = document.querySelector(".mobile-burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  mobileBurger.addEventListener("click", toggleMobileMenu);

  function toggleMobileMenu() {
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      mobileBurger.classList.remove("open");
    } else {
      mobileMenu.classList.add("open");
      mobileBurger.classList.add("open");
    }
  }

  // Show GIF on Data Viz Title hover
  show_gif_on_title_hover();
  function show_gif_on_title_hover() {
    const viz_links = document.querySelectorAll(".all_posts_div");

    viz_links.forEach((link) => {
      const link_gif = link.childNodes[1].childNodes[1];
      const link_text = link.childNodes[3];

      link_text.addEventListener("mouseover", function () {
        link_gif.style.opacity = "100";
        console.log("it worked");
      });

      link_text.addEventListener("mouseout", function () {
        link_gif.style.opacity = null;
        console.log("it worked");
      });
    });
  }

  //Underline Data Viz title on image hover
  hover_primary_img_title();
  function hover_primary_img_title() {
    const gif_primary = document.querySelectorAll("[data-gif='primary']");

    gif_primary.forEach((gif) => {
      gif.addEventListener("mouseover", function () {
        gif.parentElement.previousElementSibling.children[0].children[0].style.textDecoration =
          "underline";
      });
    });

    gif_primary.forEach((gif) => {
      gif.addEventListener("mouseout", function () {
        gif.parentElement.previousElementSibling.children[0].children[0].style.textDecoration =
          null;
      });
    });
  }

  hover_secondary_img_title();
  function hover_secondary_img_title() {
    const gif_secondary = document.querySelectorAll("[data-gif='secondary']");

    gif_secondary.forEach((gif) => {
      gif.addEventListener("mouseover", function () {
        gif.previousElementSibling.style.textDecoration = "underline";
      });
    });

    gif_secondary.forEach((gif) => {
      gif.addEventListener("mouseout", function () {
        gif.previousElementSibling.style.textDecoration = null;
      });
    });
  }

  //Back to top click function
  back_to_top_click(".btn--backToTop");

  function back_to_top_click(el) {
    document.querySelector(el).addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
});
