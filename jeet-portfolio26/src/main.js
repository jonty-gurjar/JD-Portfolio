import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
  Flip
);

ScrollSmoother.create({
  smooth: 1, 
  effects: true, 
  smoothTouch: 0.1, 
});

let landingText;
let alagtext;

const initSplitTextAndHovers = () => {
  if (!landingText) {
    landingText = SplitText.create(".maintext h1", {
      type: "chars",
      mask: "chars",
    });
  }
  if (!alagtext) {
    alagtext = SplitText.create(".alagtext", {
      type: "words",
      mask: "lines",
    });
  }
  initHoverEffects();
};

if (document.fonts) {
  document.fonts.ready.then(initSplitTextAndHovers);
} else {
  window.addEventListener("DOMContentLoaded", initSplitTextAndHovers);
}

window.addEventListener("load", () => {
  initSplitTextAndHovers();

  const counter = document.querySelector(".counter");
  const images = document.querySelectorAll("img[data-src]");
  const underline = document.querySelector(".underline");
  const imageLength = images.length;
  let to_load = 0;
  let isLoaderFinished = false;

  const finishLoader = () => {
    if (isLoaderFinished) return;
    isLoaderFinished = true;
    if (counter) counter.textContent = "100%";
    if (underline) underline.style.width = "100%";
    tl_loaded.play(0);
  };

  const tl_loaded = gsap
    .timeline({ paused: true })
    .to(".loadingtext", {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(
      ".colordiv",
      {
        y: "-100%",
        duration: 1,
        stagger: {
          each: 0.04,
          from: "edges",
        },
        ease: "expo.inOut",
      },
      "a"
    )
    .from(
      ".scaleImage",
      {
        scale: 2,
        duration: 2.5,
        ease: "expo.out",
      },
      "a"
    );

  if (landingText?.chars) {
    tl_loaded.from(
      landingText.chars,
      {
        y: "100%",
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.03,
      },
      "a"
    );
  }

  if (alagtext?.words) {
    tl_loaded.from(
      alagtext.words,
      {
        y: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.08,
      },
      "a"
    );
  }

  const itemLoaded = () => {
    to_load++;
    const percent = imageLength > 0 ? Math.min(100, Math.round((to_load / imageLength) * 100)) : 100;
    if (counter) counter.textContent = `${percent}%`;
    if (underline) underline.style.width = `${percent}%`;
    if (to_load >= imageLength) {
      finishLoader();
    }
  };

  const preloadImage = (image) => {
    return new Promise((resolve) => {
      if (image.complete) {
        resolve();
        return;
      }
      image.onload = resolve;
      image.onerror = resolve;
    });
  };

  gsap.set(".loadingtext", {
    autoAlpha: 0,
  });

  const tl_namaste = gsap
    .timeline()
    .from(".namaste", {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".namaste", {
      delay: 1,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".loadingtext", {
      autoAlpha: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        chalo();
      },
    });

  const chalo = () => {
    if (imageLength === 0) {
      finishLoader();
      return;
    }
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = `${img.dataset.src}`;
      }
      preloadImage(img).then(() => {
        itemLoaded();
      });
    });

    // Fallback safety timeout so preloader never hangs
    setTimeout(() => {
      finishLoader();
    }, 4000);
  };
});

gsap.to(".image-div", {
  scrollTrigger: {
    trigger: ".image-div",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: true,
  },
});

// navbar animation

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down
    gsap.to("nav", {
      y: "-100%",
      duration: 0.5,
      ease: "power2.Out",
    });
  } else {
    // scrolling up
    gsap.to("nav", {
      y: "0%",
      duration: 0.5,
      ease: "power2.Out",
    });
  }
  lastScrollY = window.scrollY;
});

// links & buttons hover interaction
function initHoverEffects() {
  // 1. Regular text links (navbar and footer socials)
  const links = document.querySelectorAll(".links:not(.buttondiv .links)");

  links.forEach((link) => {
    if (link.dataset.hoverInit === "true") return;
    const first = link.querySelector(":scope > :nth-child(1)");
    const second = link.querySelector(":scope > :nth-child(2)");
    if (!first || !second) return;

    link.dataset.hoverInit = "true";
    const h3up = SplitText.create(first, { type: "chars" });
    const h3bottom = SplitText.create(second, { type: "chars" });

    link.addEventListener("mouseenter", () => {
      gsap.to(h3up.chars, {
        duration: 0.3,
        y: "-100%",
        stagger: 0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      gsap.to(h3bottom.chars, {
        duration: 0.3,
        y: "-100%",
        stagger: 0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(h3up.chars, {
        duration: 0.3,
        y: "0%",
        stagger: -0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      gsap.to(h3bottom.chars, {
        duration: 0.3,
        y: "0%",
        stagger: -0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  });

  // 2. Button hover interaction (.buttondiv)
  const buttons = document.querySelectorAll(".buttondiv");

  buttons.forEach((button) => {
    if (button.dataset.hoverInit === "true") return;
    const first = button.querySelector("h2:nth-child(1)") || button.querySelector(".links > :nth-child(1)");
    const second = button.querySelector("h2:nth-child(2)") || button.querySelector(".links > :nth-child(2)");
    if (!first || !second) return;

    button.dataset.hoverInit = "true";
    const h2up = SplitText.create(first, { type: "chars" });
    const h2bottom = SplitText.create(second, { type: "chars" });

    button.addEventListener("mouseenter", () => {
      gsap.to(h2up.chars, {
        duration: 0.3,
        y: "-100%",
        stagger: 0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      gsap.to(h2bottom.chars, {
        duration: 0.3,
        y: "-100%",
        stagger: 0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(h2up.chars, {
        duration: 0.3,
        y: "0%",
        stagger: -0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      gsap.to(h2bottom.chars, {
        duration: 0.3,
        y: "0%",
        stagger: -0.02,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  });
}


// project animation

const projects = [
  {
    title: "VITALA - WELLNESS",
    link: "https://vitala-wellness.vercel.app/",
    year: 2026,
    tagline: "Premium wellness, health & longevity platform.",
    description: `Vitala is a modern wellness platform designed to bring health, fitness, nutrition, mindfulness, and recovery into one calming digital experience. The website focuses on a clean editorial-style interface with immersive visuals, smooth interactions, and responsive layouts. I built the experience to feel premium and engaging while keeping navigation simple and intuitive. The project helped me explore modern frontend development, responsive design, animations, reusable components, and interactive wellness-focused sections.`,
    techStack: ["JavaScript", "Tailwind CSS", "JavaScript", "React.js", "Framer Motion"],
    highlights: [
      "Premium wellness-focused visual design",
      "Smooth scroll and section animations",
      "Fitness, nutrition, mindfulness & recovery sections",
    ],
  },
  {
    title: "AUREX",
    link: "https://aurex-online.vercel.app/ ",
    year: 2026,
    tagline: "A modern fashion e-commerce experience built for everyday style.",
    description: `Aurex is a modern e-commerce website designed to deliver a clean and engaging fashion shopping experience. I built the interface with a strong focus on responsive layouts, product presentation, intuitive navigation, and smooth interactions. The project helped me strengthen my React development skills while working with reusable components, dynamic product sections, category-based navigation, and a responsive shopping experience.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "React.js", "Vite", "React Icons"],
    highlights: [
      "Modern fashion e-commerce UI",
      "Product-focused layouts",
      "Men, Women & Kids categories",
    ],
  },
  {
    title: "Arrive+",
    link: "https://arrive-trip.vercel.app/",
    year: 2026,
    tagline: "Travel experiences designed to make every journey feel effortless.",
    description: `Arrive+ is a modern travel experience website designed around discovery, exploration, and effortless navigation. I focused on creating a visually rich interface where destinations, experiences, and travel information come together through clean layouts and engaging interactions. The project allowed me to experiment with editorial-style composition, responsive design, animations, and creating a strong visual identity through code.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "React.js","Frmaer Motion"],
    highlights: [
      "Smooth page transitions",
      "Modern editorial design",
      "Responsive layouts",
    ],
  },
  {
    title: "Spotify Clone",
    link: "https://spotify-clone-pink-delta-69.vercel.app/",
    year: 2026,
    tagline: "A music experience inspired by the world's most popular streaming platforms.",
    description: `Spotify Clone is a modern music streaming interface focused on creating an immersive and responsive listening experience. I recreated the core visual language of a music platform while building reusable UI components, interactive sections, and responsive layouts. The project helped me explore component-based development, state management, dynamic content, and creating interfaces that feel smooth and intuitive.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "React.js","Vite"],
    highlights: [
      "Interactive music interface",
      "Reusable React components",
      "Modern dark-themed UI",
    ],
  },
];

gsap.set(".projectoverlay .colordivs", {
  y: "100%",
});

const projectBox = document.querySelectorAll(".projectBox");
const previews = document.querySelectorAll(".projectPreview");

const projectsOverlay = document.querySelector(".projects-overlay");
const flipTarget = document.querySelector(".projectflip .project-img");
const closeBtn = document.querySelector(".closeBtn");

const heading = document.querySelector(".infoverview .heading");
const right = document.querySelector(".infoverview .right-part");

projectBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    const originalParent = previews[index];

    const project = projects[index];
    heading.innerHTML = `<h3
                class="projecttitle text-[14vw] md:text-[5.9vw] leading-[1] text-white"
              >
                ${project.title}
              </h3>
              <div class="subheading flex items-center gap-[3vw] md:gap-[2vw]">
                <div class="year">
                  <h2
                    class="projectyear text-white text-[4vw] leading-[1.1] md:text-[2vw]"
                  >
                   ${project.year}
                  </h2>
                </div>
                <div class="shortdescription">
                  <h4
                    class="projectshorttag text-white text-[3vw] leading-[1] md:text-[1.3vw]"
                  >
                     ${project.tagline}
                  </h4>
                </div>
              </div>
              <div class="livelink mt-[3vw] md:mt-[1vw]">
                <a target="_blank" href= ${project.link}>
                  <div
                    class="buttondiv w-fit border border-white cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] bg-[#242A23]"
                  >
                    <div class="links cursor-pointer h-[1rem] overflow-hidden">
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
          `;
    right.innerHTML = `<div class="right-part-wrapper px-[2vw]">
              <div class="description">
                <h2 class="text-white text-[5.5vw] md:text-[2.5vw]">
                  description
                </h2>
                <h4
                  class="text-[2.5vw] md:text-[1.2vw] mt-[1.3vw] text-white leading-[1.2]"
                >
                  ${project.description}
                </h4>
              </div>
              <div
                class="techstackandhighlights mt-[4vw] md:mt-[2vw] h-[25vh] md:h-[20vh] w-full flex md:flex-row flex-col"
              >
                <div
                  class="techstack flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[35%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    tech Stack
                  </h2>
                  <div class="tech flex mt-[1.5vw] flex-col gap-[0.2vw]">
                  ${project.techStack
                    .map(
                      (tech) =>
                        `<h4 class="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1]">${tech}</h4>`
                    )
                    .join("")}
                    
                  </div>
                </div>
                <div
                  class="highlights flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full w-[65%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    highlights
                  </h2>
                  <div
                    class="tech flex mt-[1.5vw] flex-col gap-[1vw] md:gap-[0.4vw]"
                  >
                   ${project.highlights
                     .map(
                       (h) =>
                         `<h4 class="text-white text-[2.5vw] md:text-[1vw] leading-[1.1]">${h}</h4>`
                     )
                     .join("")}
                  </div>
                </div>
              </div>
            </div>`;

    const previewImgDiv = previews[index].querySelector(".project-img");

    let title = SplitText.create(".projecttitle", {
      type: "chars",
      mask: "chars",
    });
    let year = SplitText.create(".projectyear", {
      type: "chars",
      mask: "chars",
    });
    let tag = SplitText.create(".projectshorttag", {
      type: "words",
      mask: "words",
    });

    gsap.set([title.chars, year.chars, tag.words], {
      y: "100%",
    });

    gsap.set(
      [
        ".closeBtn",
        ".livelink",
        ".description h2",
        ".techstackandhighlights h2",
        ".right-part-wrapper",
      ],
      {
        autoAlpha: 0,
      }
    );

    
    function closeProject() {
      
      closeBtn.removeEventListener("click", closeProject);

      const state = Flip.getState(previewImgDiv);

      gsap
        .timeline() // Flip animation (move image back to original box)
        .to(
          [
            ".closeBtn",
            ".livelink",
            ".description h2",
            ".techstackandhighlights h2",
            ".right-part-wrapper",
          ],
          {
            autoAlpha: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "a"
        )
        .to(
          [title.chars, year.chars, tag.words],
          {
            y: "100%",
            stagger: 0.05,
            duration: 1.4,
            ease: "expo.out",
          },
          "a"
        )
        .add(() => {
          originalParent.appendChild(previewImgDiv);
          Flip.from(state, {
            delay: 0.8,
            duration: 1.2,
            ease: "power3.inOut",
            absolute: true,
            scale: true,
          }, "a");
        })
        .to(".projectoverlay .colordivs", {
          y: "-100%",
          duration: 1,
          stagger: {
            each: 0.07,
            from: "edges",
          },
          ease: "power2.inOut",
          onComplete: () => {
            projectsOverlay.classList.add("hidden");
            gsap.set(".projectoverlay .colordivs", {
              y: "100%",
            });
          },
        });
    }

    
    const state = Flip.getState(previewImgDiv);

    // Make overlay visible
    projectsOverlay.classList.remove("hidden");

    // Add close event listener (once)
    closeBtn.addEventListener("click", closeProject);

    gsap
      .timeline()
      // Flip image into overlay target
      .add(() => {
        flipTarget.appendChild(previewImgDiv);
        Flip.from(state, {
          delay: 0.8,
          duration: 1,
          ease: "power3.inOut",
          absolute: true,
          scale: true,
        });
      })
      .to(".projectoverlay .colordivs", {
        y: "0%",
        duration: 1,
        stagger: {
          each: 0.07,
          from: "edges",
        },
        ease: "power2.inOut",
      })
      .to(
        [
          ".closeBtn",
          ".livelink",
          ".description h2",
          ".techstackandhighlights h2",
          ".right-part-wrapper",
        ],
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "a"
      )
      .to(
        [title.chars, year.chars, tag.words],
        {
          y: "0%",
          stagger: 0.05,
          duration: 1.4,
          ease: "expo.out",
        },
        "a"
      );
  });

  box.addEventListener("mouseenter", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "0%", // reveal the preview
      duration: 1.2,
      ease: "expo.out",
    });
    gsap.to(image, {
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    });
  });

  box.addEventListener("mouseleave", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    }); // optional speed adjustment
    gsap.to(image, {
      scale: 1.2,
      duration: 1,
      ease: "expo.out",
    });
  });

  window.addEventListener("scroll", () => {
    gsap.to(previews, {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    });
  });
});

// nav
const about = document.querySelector("#aboutlink");
const project = document.querySelector("#projectlink");
const reco = document.querySelector("#recolink");
const techstack = document.querySelector("#techstacklink");
const education = document.querySelector("#educationlink");
const contact = document.querySelector("#contactlink");

if (about) {
  about.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#about", ease: "power2.out" });
  });
}
if (project) {
  project.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#projects", ease: "power2.out" });
  });
}
if (reco) {
  reco.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#cover", ease: "power2.out" });
  });
}
if (techstack) {
  techstack.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#techStack", ease: "power2.out" });
  });
}
if (education) {
  education.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#education", ease: "power2.out" });
  });
}
if (contact) {
  contact.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#contact", ease: "power2.out" });
  });
}

// ========================================================
// CHARACTER V1 - 3D CONVERGING TEXT OVER BACKGROUND IMAGE
// ========================================================
const techChars = document.querySelectorAll("#techStack .char-v1");
if (techChars.length) {
  const centerIndex = Math.floor(techChars.length / 2);
  gsap.fromTo(
    techChars,
    {
      x: (i) => (i - centerIndex) * 50,
      rotateX: (i) => (i - centerIndex) * 50,
      opacity: 0.2,
    },
    {
      x: 0,
      rotateX: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#techStack",
        start: "top 80%",
        end: "center center",
        scrub: 1.5,
      },
    }
  );
}

// ========================================================
// MORPHED MENU (MOBILE ANIMATED NAVIGATION)
// ========================================================
const morphedBtn = document.querySelector("#morphed-menu-btn");
const morphedPanel = document.querySelector("#as-animated-menu-box");
const morphedBtnInner = document.querySelector(".morphed-btn-inner");
const morphedNavItems = document.querySelectorAll(".morphed-nav-item");
const morphedFooterLinks = document.querySelectorAll(".morphed-footer-links > div");
const morphedContainer = document.querySelector("#morphed-menu-container");

if (morphedBtn && morphedPanel) {
  let isMenuOpen = false;

  const openMenu = () => {
    isMenuOpen = true;
    morphedBtn.setAttribute("aria-expanded", "true");
    if (morphedBtnInner) morphedBtnInner.classList.add("is-open");

    // Enable panel pointer events and set active
    morphedPanel.style.pointerEvents = "auto";

    // Panel morph animation from button to full card
    gsap.killTweensOf(morphedPanel);
    gsap.fromTo(
      morphedPanel,
      {
        width: "92px",
        height: "40px",
        opacity: 0,
      },
      {
        width: "min(90vw, 360px)",
        height: "min(62vh, 480px)",
        opacity: 1,
        duration: 0.55,
        ease: "power4.out",
      }
    );

    // Staggered 3D Perspective Nav items entrance
    if (morphedNavItems.length) {
      gsap.fromTo(
        morphedNavItems,
        {
          rotateX: 90,
          y: 45,
          opacity: 0,
        },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "back.out(1.4)",
          delay: 0.12,
        }
      );
    }

    // Staggered Footer items entrance
    if (morphedFooterLinks.length) {
      gsap.fromTo(
        morphedFooterLinks,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.25,
        }
      );
    }
  };

  const closeMenu = () => {
    isMenuOpen = false;
    morphedBtn.setAttribute("aria-expanded", "false");
    if (morphedBtnInner) morphedBtnInner.classList.remove("is-open");

    // Fade and collapse items
    if (morphedNavItems.length) {
      gsap.to(morphedNavItems, {
        y: 15,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (morphedFooterLinks.length) {
      gsap.to(morphedFooterLinks, {
        opacity: 0,
        duration: 0.15,
      });
    }

    // Panel shrink animation back to button dimensions
    gsap.to(morphedPanel, {
      width: "92px",
      height: "40px",
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        morphedPanel.style.pointerEvents = "none";
      },
    });
  };

  morphedBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Nav items click handler with smooth scroll
  morphedNavItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const target = item.getAttribute("data-target");
      closeMenu();
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: target,
          ease: "power2.out",
        });
      }
    });
  });

  // Close on clicking outside
  document.addEventListener("click", (e) => {
    if (isMenuOpen && morphedContainer && !morphedContainer.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });
}

// ========================================================
// HOVER SLIDER ANIMATED SLIDESHOW (TECH STACK)
// ========================================================
const initHoverSlider = () => {
  const slider = document.querySelector("#techStack");
  if (!slider) return;

  const items = slider.querySelectorAll(".text-stagger-hover");
  const images = slider.querySelectorAll(".hover-slider-img");
  if (!items.length) return;

  items.forEach((item, itemIdx) => {
    const rawText = item.getAttribute("data-text") || item.textContent.trim();
    item.innerHTML = "";

    // Split text into characters with staggered animation delays
    const chars = rawText.split("");
    chars.forEach((char, charIdx) => {
      const charWrap = document.createElement("span");
      charWrap.className = "text-stagger-char";

      const baseSpan = document.createElement("span");
      baseSpan.className = "char-base";
      baseSpan.innerHTML = char === " " ? "&nbsp;" : char;
      baseSpan.style.transitionDelay = `${charIdx * 0.025}s`;

      const activeSpan = document.createElement("span");
      activeSpan.className = "char-active";
      activeSpan.innerHTML = char === " " ? "&nbsp;" : char;
      activeSpan.style.transitionDelay = `${charIdx * 0.025}s`;

      charWrap.appendChild(baseSpan);
      charWrap.appendChild(activeSpan);
      item.appendChild(charWrap);
    });

    const activateSlide = () => {
      items.forEach((it) => it.classList.remove("is-active"));
      images.forEach((img) => img.classList.remove("is-active"));

      item.classList.add("is-active");
      const targetImg = slider.querySelector(`.hover-slider-img[data-index="${itemIdx}"]`);
      if (targetImg) {
        targetImg.classList.add("is-active");
      }
    };

    item.addEventListener("mouseenter", activateSlide);
    item.addEventListener("click", activateSlide);
  });

  // Set default first item active
  if (items[0] && images[0]) {
    items[0].classList.add("is-active");
    images[0].classList.add("is-active");
  }

  // Scroll entrance animation
  gsap.fromTo(
    "#techStack .techstack-slideshow-wrap",
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#techStack",
        start: "top 75%",
      },
    }
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHoverSlider);
} else {
  initHoverSlider();
}

// ========================================================
// 3D TAG SPHERE (TECH STACK)
// ========================================================
const initTagSphere = () => {
  const container = document.querySelector("#techstack-sphere");
  if (!container) return;

  const TECH_TAGS = [
    "React.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "REST API",
    "MongoDB",
    "SQL",
    "Git",
    "GitHub",
    "VS Code",
    "Vite",
    "NPM",
    "Figma",
    "Vercel",
    "Responsive Design",
    "Component Architecture",
    "API Integration",
    "State Management",
    "DOM",
    "Async / Await",
    "ES6+",
    "Accessibility"
  ];

  const DEG = Math.PI / 180;
  const DEFAULT_IDLE_SPEED = 0.0022;
  const DEFAULT_DRAG_SENSITIVITY = 0.18;
  const DEFAULT_FRICTION = 0.94;

  let radius = window.innerWidth < 768 ? 135 : 185;
  let minFontSize = window.innerWidth < 768 ? 10 : 11;
  let maxFontSize = window.innerWidth < 768 ? 17 : 23;

  const getPoints = (count) => {
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push([Math.cos(theta) * radiusAtY, y, Math.sin(theta) * radiusAtY]);
    }
    return pts;
  };

  const basePoints = getPoints(TECH_TAGS.length);
  const N = TECH_TAGS.length;

  container.innerHTML = "";

  const scene = document.createElement("div");
  scene.className =
    "tag-sphere-tw-scene absolute inset-0 grid place-items-center touch-none select-none outline-none cursor-grab";
  scene.setAttribute("role", "group");
  scene.setAttribute("aria-label", "Tech stack 3D tag cloud");
  scene.setAttribute("tabindex", "0");

  const ul = document.createElement("ul");
  ul.className = "relative m-0 h-0 w-0 list-none p-0 [transform-style:preserve-3d]";

  const tagElements = [];

  TECH_TAGS.forEach((tag, i) => {
    const li = document.createElement("li");
    li.className = "absolute left-0 top-0 will-change-transform";
    li.style.transform = "translate3d(0,0,0)";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "tag-sphere-tw-tag block -mt-[0.6em] -translate-x-1/2 cursor-pointer whitespace-nowrap border-0 bg-transparent p-0 font-medium leading-[1.2] tracking-[-0.01em] text-[#f4f1ea] no-underline transition-colors duration-150";
    btn.setAttribute("aria-label", tag);
    btn.setAttribute("data-value", tag);
    btn.setAttribute("draggable", "false");
    btn.textContent = tag;

    li.appendChild(btn);
    ul.appendChild(li);
    tagElements.push(li);
  });

  scene.appendChild(ul);
  container.appendChild(scene);

  let yaw = 0;
  let pitch = 0;
  let velYaw = DEFAULT_IDLE_SPEED;
  let velPitch = 0;
  let dragging = false;
  let lastPos = { x: 0, y: 0 };
  let inView = false;
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", (e) => {
    reduced = e.matches;
  });

  window.addEventListener("resize", () => {
    radius = window.innerWidth < 768 ? 135 : 185;
    minFontSize = window.innerWidth < 768 ? 10 : 11;
    maxFontSize = window.innerWidth < 768 ? 17 : 23;
  });

  let isVisible = !document.hidden;
  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;
  });

  const onPointerDown = (e) => {
    dragging = true;
    scene.classList.remove("cursor-grab");
    scene.classList.add("cursor-grabbing");
    lastPos = { x: e.clientX, y: e.clientY };
    try {
      scene.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    lastPos = { x: e.clientX, y: e.clientY };
    velYaw = dx * DEFAULT_DRAG_SENSITIVITY * DEG;
    velPitch = -dy * DEFAULT_DRAG_SENSITIVITY * DEG;
  };

  const onPointerUp = (e) => {
    if (!dragging) return;
    dragging = false;
    scene.classList.remove("cursor-grabbing");
    scene.classList.add("cursor-grab");
    try {
      scene.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  scene.addEventListener("pointerdown", onPointerDown);
  scene.addEventListener("pointermove", onPointerMove);
  scene.addEventListener("pointerup", onPointerUp);
  scene.addEventListener("pointercancel", onPointerUp);

  scene.addEventListener("keydown", (e) => {
    const nudge = 0.16;
    if (e.key === "ArrowLeft") velYaw = -nudge;
    else if (e.key === "ArrowRight") velYaw = nudge;
    else if (e.key === "ArrowUp") velPitch = nudge;
    else if (e.key === "ArrowDown") velPitch = -nudge;
    else return;
    e.preventDefault();
  });

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio > 0.15;
    },
    { threshold: [0, 0.15, 0.5, 1] }
  );
  io.observe(scene);

  const fontSpan = () => maxFontSize - minFontSize;

  let rafId;
  const tick = () => {
    if (isVisible) {
      if (reduced) {
        velYaw = 0;
        velPitch = 0;
      } else if (!dragging) {
        velYaw *= DEFAULT_FRICTION;
        velPitch *= DEFAULT_FRICTION;
        if (inView && Math.abs(velYaw) < DEFAULT_IDLE_SPEED) {
          velYaw = DEFAULT_IDLE_SPEED;
        }
      }

      yaw += velYaw;
      pitch += velPitch;
      const maxPitch = 1.2;
      if (pitch > maxPitch) pitch = maxPitch;
      if (pitch < -maxPitch) pitch = -maxPitch;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const currentSpan = fontSpan();

      for (let i = 0; i < N; i++) {
        const el = tagElements[i];
        if (!el) continue;
        const [bx, by, bz] = basePoints[i];

        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const px = x1 * radius;
        const py = y2 * radius;

        if (reduced) {
          el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
          el.style.fontSize = `${(minFontSize + currentSpan * 0.6).toFixed(1)}px`;
          el.style.opacity = "1";
          el.style.zIndex = "1";
          continue;
        }

        const depth01 = (z2 + 1) / 2;
        const scale = 0.6 + depth01 * 0.7;
        const opacity = 0.28 + depth01 * 0.72;
        const fontSize = minFontSize + currentSpan * depth01;

        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.fontSize = `${fontSize.toFixed(1)}px`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round(depth01 * 100));
      }
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  // Scroll entrance animation
  gsap.fromTo(
    "#techstack-sphere-wrapper",
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#techStack",
        start: "top 75%",
      },
    }
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTagSphere);
} else {
  initTagSphere();
}

// ========================================================
// STICKY SCROLL REVEAL (EDUCATION)
// ========================================================
const initStickyScrollReveal = () => {
  const container = document.querySelector("#education-sticky-scroll");
  if (!container) return;

  const scrollArea = container.querySelector("#sticky-scroll-milestones");
  const cards = container.querySelectorAll(".sticky-scroll-card-item");
  const previewCard = container.querySelector("#sticky-preview-card");
  const captionBadge = container.querySelector("#sticky-preview-caption-badge");
  const captionTitle = container.querySelector("#sticky-preview-caption-title");

  const MILESTONE_DATA = [
    {
      badge: "Industral Training Institute",
      title: "Diploma in Computer Operator & Programming Assistant",
    },
    {
      badge: "Govt High School",
      title: "Commerce (Class XII)",
    },
    {
      badge: "Keshav International School",
      title: "CBSE Secondary (Class X)",
    },
  ];

  let activeIndex = 0;

  const setActiveMilestone = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;

    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.remove("opacity-30");
        card.classList.add("opacity-100");
      } else {
        card.classList.remove("opacity-100");
        card.classList.add("opacity-30");
      }
    });

    const data = MILESTONE_DATA[index] || MILESTONE_DATA[0];

    if (captionBadge) {
      captionBadge.textContent = data.badge;
      captionBadge.className = "text-[10px] md:text-xs font-mono font-semibold uppercase tracking-wider block text-neutral-300";
    }
    if (captionTitle) {
      captionTitle.textContent = data.title;
    }

    // Switch image with cross-fade
    for (let i = 0; i < MILESTONE_DATA.length; i++) {
      const img = container.querySelector(`#sticky-preview-img-${i}`);
      if (!img) continue;
      if (i === index) {
        img.classList.remove("opacity-0", "scale-105");
        img.classList.add("opacity-100", "scale-100");
      } else {
        img.classList.remove("opacity-100", "scale-100");
        img.classList.add("opacity-0", "scale-105");
      }
    }
  };

  if (scrollArea) {
    scrollArea.addEventListener("scroll", () => {
      const scrollPos = scrollArea.scrollTop;
      const totalHeight = scrollArea.scrollHeight - scrollArea.clientHeight;
      if (totalHeight <= 0) return;

      const progress = scrollPos / totalHeight;
      const cardLength = cards.length;
      const closest = Math.min(
        cardLength - 1,
        Math.max(0, Math.floor(progress * cardLength + 0.35))
      );
      setActiveMilestone(closest);
    });
  }

  // Allow clicking on milestones to navigate
  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      setActiveMilestone(idx);
      if (scrollArea) {
        const targetTop = (idx / (cards.length - 1)) * (scrollArea.scrollHeight - scrollArea.clientHeight);
        scrollArea.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    });
  });

  // GSAP entrance
  gsap.fromTo(
    "#education-sticky-scroll",
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#education",
        start: "top 75%",
      },
    }
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStickyScrollReveal);
} else {
  initStickyScrollReveal();
}

// ========================================================
// STATS SECTION COUNTER ANIMATION (FRAMER STATS SECTION)
// ========================================================
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const initStatsSection = () => {
  const container = document.querySelector("#about-stats-section");
  if (!container || container.dataset.statsInit === "true") return;

  const counters = container.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  const startAnimation = () => {
    if (container.dataset.statsAnimated === "true") return;
    container.dataset.statsAnimated = "true";

    const duration = 2.0;

    counters.forEach((counter) => {
      const target = parseFloat(counter.dataset.target) || 0;
      const decimals = parseInt(counter.dataset.decimals, 10) || 0;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const currentVal = eased * target;

        counter.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  container.dataset.statsInit = "true";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(container);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStatsSection);
} else {
  initStatsSection();
}




