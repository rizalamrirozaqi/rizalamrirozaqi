<script lang="ts">
  import { onMount } from 'svelte';
  import {gsap} from 'gsap';
  import { language } from '$lib/stores/language';

  let customCursor: HTMLDivElement | undefined = $state();
  let hoverImageRef: HTMLDivElement | undefined = $state();
  let activeHoverImg = $state('');

  const arsenalList = [
    {
      name: 'AFTER EFFECTS',
      cat: 'MOTION GRAPHICS | COMPOSITING | VFX',
      img: '/images/placeholder-1.jpg'
    },
    {
      name: 'PHOTOSHOP',
      cat: 'DESIGN | PHOTO EDITING | MASKING',
      img: '/images/placeholder-2.jpg'
    },
    {
      name: 'FIGMA',
      cat: 'UI / UX',
      img: '/images/placeholder-3.jpg'
    },
    {
      name: 'BLENDER',
      cat: '3D / VISUAL',
      img: '/images/preview-blender.webp'
    },
    {
      name: 'CANVA',
      cat: 'DESIGN | PRESENTATION',
      img: '/images/placeholder-4.jpg'
    }
  ];

  function handleMouseEnterArsenal(imgSrc: string) {
    activeHoverImg = imgSrc;

    if (customCursor) {
      gsap.to(customCursor, {
        scale: 2.8,
        opacity: 0.35,
        duration: 0.3,
        ease: 'power3.out'
      });
    }

    if (hoverImageRef) {
      gsap.to(hoverImageRef, {
        opacity: 1,
        scale: 1,
        rotate: -3,
        duration: 0.4,
        ease: 'power3.out'
      });
    }
  }

  function handleMouseLeaveArsenal() {
    if (customCursor) {
      gsap.to(customCursor, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out'
      });
    }

    if (hoverImageRef) {
      gsap.to(hoverImageRef, {
        opacity: 0,
        scale: 0.8,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }

  onMount(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // =====================================================
      // HERO
      // =====================================================

      gsap.fromTo(
        '.hero-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out'
        }
      );

      gsap.fromTo(
        '.hero-meta',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          stagger: 0.05,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        '.hero-visual',
        { opacity: 0, scale: 0.96, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          delay: 0.25,
          ease: 'power4.out'
        }
      );

      // =====================================================
      // HERO PARALLAX
      // =====================================================

      gsap.to('.hero-word', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.hero-visual', {
        yPercent: -10,
        rotate: -1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // =====================================================
      // GENERAL REVEAL
      // =====================================================

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              once: true
            }
          }
        );
      });

      // =====================================================
      // BACKGROUND WORD
      // =====================================================

      gsap.utils.toArray<HTMLElement>('.background-word').forEach((element) => {
        gsap.to(element, {
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      // =====================================================
      // EXPERIENCE
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.experience-item')
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              x: index % 2 === 0 ? -30 : 30
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 86%',
                once: true
              }
            }
          );
        });

      // =====================================================
      // ARSENAL
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.arsenal-item')
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay: index * 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                once: true
              }
            }
          );
        });

      // =====================================================
      // EDUCATION
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.education-item')
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true
              }
            }
          );
        });

      // =====================================================
      // CLOSING PHRASE
      // =====================================================

      gsap.to('.closing-word', {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.closing-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.fromTo(
        '.closing-content',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.closing-content',
            start: 'top 85%',
            once: true
          }
        }
      );

      // =====================================================
      // REFRESH
      // =====================================================

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener('load', refresh);

      setTimeout(refresh, 300);
      setTimeout(refresh, 800);
    });

    // =======================================================
    // CURSOR + PREVIEW
    // =======================================================

    let mouseMoveHandler: ((event: MouseEvent) => void) | null = null;

    if (customCursor && hoverImageRef) {
      const cursorX = gsap.quickTo(customCursor, 'x', {
        duration: 0.16,
        ease: 'power3.out'
      });

      const cursorY = gsap.quickTo(customCursor, 'y', {
        duration: 0.16,
        ease: 'power3.out'
      });

      const imageX = gsap.quickTo(hoverImageRef, 'x', {
        duration: 0.3,
        ease: 'power3.out'
      });

      const imageY = gsap.quickTo(hoverImageRef, 'y', {
        duration: 0.3,
        ease: 'power3.out'
      });

      mouseMoveHandler = (event: MouseEvent) => {
        cursorX(event.clientX);
        cursorY(event.clientY);
        imageX(event.clientX);
        imageY(event.clientY);
      };

      window.addEventListener('mousemove', mouseMoveHandler);
    }

    return () => {
      if (mouseMoveHandler) {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }

      ctx.revert();
    };
  });
</script>

<svelte:head>
  <title>About — Rizal Amri Rozaqi</title>
  <meta
    name="description"
    content="Rizal Amri Rozaqi — Motion Graphics Designer with a background in front-end development."
  />
</svelte:head>

<!-- =========================================================
     CUSTOM CURSOR
========================================================= -->

<div
  bind:this={customCursor}
  class="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#172238] opacity-100 mix-blend-difference md:block"
></div>

<!-- =========================================================
     HOVER IMAGE
========================================================= -->

<div
  bind:this={hoverImageRef}
  class="pointer-events-none fixed left-0 top-0 z-[9000] hidden aspect-[4/3] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-75 overflow-hidden rounded-md bg-[#172238] opacity-0 shadow-[0_25px_70px_rgba(16,26,45,0.18)] md:block"
>
  {#if activeHoverImg}
    <img
      src={activeHoverImg}
      alt="Preview"
      class="h-full w-full object-cover grayscale"
    />
  {/if}

  <div class="absolute inset-0 bg-[#172238]/10"></div>
</div>

<!-- =========================================================
     PAGE
========================================================= -->

<main class="min-h-screen overflow-hidden text-[#172238] selection:bg-[#18A9E8] selection:text-[#EEF0F2]">

  <!-- =======================================================
       HERO
  ======================================================== -->

  <section
    class="hero relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-8 md:px-12"
    style="background: linear-gradient(to bottom, #EEF0F2 0%, #E7EBEF 55%, #C9D1DA 100%);"
  >
    <header class="hero-meta flex items-center justify-between border-b border-[#172238]/15 pb-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#172238]/55">
      <span>RIZAL AMRI ROZAQI</span>
      <span>Creative Designer</span>
      <span class="hidden md:block">Indonesia</span>
    </header>

    <div class="hero-word relative z-10 mt-auto pt-24">
      <div class="overflow-hidden">
        <h1 class="hero-line font-bebas text-[24vw] leading-[0.78] tracking-[-0.035em]">
          RIZAL
        </h1>
      </div>

      <div class="flex flex-col justify-between gap-5 overflow-hidden md:flex-row md:items-end">
        <div class="overflow-hidden">
          <h1 class="hero-line font-bebas text-[17vw] leading-[0.8] tracking-[-0.03em] text-[#172238]/45 md:text-[11vw]">
            AMRI ROZAQI
          </h1>
        </div>

        <p class="hero-meta max-w-xs pb-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-[#172238]/55 md:text-xs">
          Motion graphics<br />
          Video compositing<br />
          Visual storytelling
        </p>
      </div>
    </div>

    <div class="relative mt-10 flex justify-end">
      <div class="hero-visual relative aspect-[16/9] w-full overflow-hidden rounded-md bg-[#172238] shadow-[0_25px_70px_rgba(16,26,45,0.12)] md:w-[42vw]">
        <video
          src="/videos/project-1.webm"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          class="h-full w-full object-cover"
        ></video>

        <div class="absolute bottom-0 left-0 right-0 flex justify-between bg-gradient-to-t from-[#101A2D]/60 to-transparent px-4 pb-3 pt-10 font-mono text-[8px] uppercase tracking-[0.15em] text-white/70">
          <span>Selected Motion Work</span>
          <span>01 / 01</span>
        </div>
      </div>
    </div>

    <div class="hero-meta mt-5 flex items-center justify-between border-t border-[#172238]/15 pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/45">
      <span>Scroll</span>
      <span>Front-end → Motion Graphics</span>
      <span class="text-[#18A9E8]">↓</span>
    </div>
  </section>

  <!-- =======================================================
       ABOUT ME
  ======================================================== -->

  <section
    class="px-6 py-32 md:px-12 md:py-48"
    style="background: linear-gradient(to bottom, #C9D1DA 0%, #E7EBEF 22%, #EEF0F2 100%);"
  >
    <div class="mx-auto max-w-7xl">
      <div class="reveal mb-10 font-mono text-[9px] uppercase tracking-[0.2em] text-[#172238]/45">
        / About Me
      </div>

      <h2 class="reveal max-w-6xl font-playfair text-[9vw] font-medium leading-[0.96] md:text-[6.4vw]">
        Just someone who is
        <span class="text-[#172238]/30">
          still learning.
        </span>
      </h2>

      <div class="mt-20 grid gap-10 md:grid-cols-2">

        <div class="reveal">
          <div class="mb-4 h-px w-full bg-[#172238]/20"></div>

          {#if $language === 'id'}
            <p class="max-w-xl text-base leading-relaxed text-[#172238]/65 md:text-lg">
              Saya lulusan D3 Teknik Informatika Universitas Amikom Yogyakarta.
              Awalnya lebih banyak belajar dan mengerjakan hal-hal yang
              berhubungan dengan web development.
            </p>
          {:else}
            <p class="max-w-xl text-base leading-relaxed text-[#172238]/65 md:text-lg">
              I graduated with a Diploma in Informatics Engineering from
              Universitas Amikom Yogyakarta. I initially spent more time
              learning and working with web development.
            </p>
          {/if}
        </div>

        <div class="reveal">
          <div class="mb-4 h-px w-full bg-[#172238]/20"></div>

          {#if $language === 'id'}
            <p class="max-w-xl text-base leading-relaxed text-[#172238]/65 md:text-lg">
              Belakangan saya mulai lebih sering bermain dengan video editing
              dan motion graphics. Sampai sekarang pun masih belajar, mencoba
              hal baru, dan melihat apa yang bisa saya buat lebih baik.
            </p>
          {:else}
            <p class="max-w-xl text-base leading-relaxed text-[#172238]/65 md:text-lg">
              More recently, I started spending more time with video editing
              and motion graphics. I am still learning, trying new things,
              and seeing how I can make things a little better.
            </p>
          {/if}
        </div>

      </div>
    </div>
  </section>

  <!-- =======================================================
       EXPERIENCE
  ======================================================== -->

  <section
    class="relative overflow-hidden px-6 py-32 md:px-12 md:py-40"
    style="background: linear-gradient(to bottom, #D8DEE5 0%, #B8C2CE 55%, #91A0B0 100%);"
  >
    <div class="background-word pointer-events-none absolute right-[-5vw] top-1/3 whitespace-nowrap font-bebas text-[18vw] leading-none text-[#172238]/[0.05]">
      EXPERIENCE
    </div>

    <div class="relative z-10 mx-auto max-w-7xl">
      <div class="mb-20 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="reveal">
          <div class="font-mono text-[9px] uppercase tracking-[0.2em] text-[#172238]/45">
            / Experience
          </div>

          <h2 class="mt-5 font-bebas text-[15vw] leading-[0.75] md:text-[10vw]">
            EXPERIENCE
          </h2>
        </div>

        <div class="reveal max-w-xs font-mono text-[10px] leading-relaxed text-[#172238]/45">
          {#if $language === 'id'}
            Sedikit pengalaman, banyak hal yang masih ingin dipelajari.
          {:else}
            A little experience, with plenty more left to learn.
          {/if}
        </div>
      </div>

      <!-- EXPERIENCE 01 -->

      <article class="experience-item reveal border-t border-[#172238]/20 py-10">
        <div class="grid gap-8 md:grid-cols-[120px_1fr_auto]">
          <span class="font-mono text-[10px] text-[#172238]/40">
            01
          </span>

          <div>
            <h3 class="font-playfair text-4xl md:text-6xl">
              PT Diginet Media
            </h3>

            <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#172238]/50">
              FrontEnd Developer — Intern
            </p>

            {#if $language === 'id'}
              <p class="mt-6 max-w-2xl leading-relaxed text-[#172238]/60">
                Membantu merancang dan memproduksi video motion graphics
                untuk kebutuhan demonstrasi aplikasi dan website.
                Banyak belajar dari proses bekerja bersama tim dan
                menerima masukan selama pengerjaan.
              </p>
            {:else}
              <p class="mt-6 max-w-2xl leading-relaxed text-[#172238]/60">
                Helped create motion graphics videos for application and
                website demonstrations. I learned a lot from working
                with the team and receiving feedback throughout the process.
              </p>
            {/if}
          </div>

          <span class="font-mono text-[10px] text-[#172238]/45">
            AUG 2025 — DEC 2025
          </span>
        </div>
      </article>

      <div class="h-px w-full bg-[#172238]/20"></div>

      <!-- EXPERIENCE 02 -->

      <article class="experience-item reveal py-10">
        <div class="grid gap-8 md:grid-cols-[120px_1fr_auto]">
          <span class="font-mono text-[10px] text-[#172238]/40">
            02
          </span>

          <div>
            <h3 class="font-playfair text-4xl md:text-6xl">
              Klinik Komputer WTC
            </h3>

            <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#172238]/50">
              IT Support — Intern
            </p>

            {#if $language === 'id'}
              <p class="mt-6 max-w-2xl leading-relaxed text-[#172238]/60">
                Pengalaman awal di bidang IT support, mulai dari instalasi
                jaringan dasar sampai troubleshooting perangkat keras
                dan koneksi lokal.
              </p>
            {:else}
              <p class="mt-6 max-w-2xl leading-relaxed text-[#172238]/60">
                An early experience in IT support, including basic network
                installation, hardware troubleshooting, and local
                connectivity issues.
              </p>
            {/if}
          </div>

          <span class="font-mono text-[10px] text-[#172238]/45">
            FEB 2022 — MAY 2022
          </span>
        </div>
      </article>
    </div>
  </section>

  <!-- =======================================================
       THINGS I USE
  ======================================================== -->

  <section
    class="py-32 text-[#EEF0F2] md:py-40"
    style="background: linear-gradient(to bottom, #1B2940 0%, #15233A 100%);"
  >
    <div class="px-6 md:px-12">
      <div class="mx-auto max-w-7xl">
        <div class="reveal">
          <div class="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            / Software & Skills
          </div>

          <h2 class="mt-6 font-bebas text-[18vw] leading-[0.72] tracking-[-0.03em] md:text-[11vw]">
            THINGS I USE
          </h2>

          {#if $language === 'id'}
            <p class="mt-8 max-w-md text-sm leading-relaxed text-white/45">
              Beberapa software yang paling sering saya gunakan selama
              belajar dan mengerjakan berbagai hal.
            </p>
          {:else}
            <p class="mt-8 max-w-md text-sm leading-relaxed text-white/45">
              Some of the software I use most often while learning
              and working on different things.
            </p>
          {/if}
        </div>
      </div>
    </div>

    <div class="mt-20 border-t border-white/15">
      {#each arsenalList as tech, i}
        <div
          class="arsenal-item group relative flex flex-col justify-between gap-5 border-b border-white/15 px-6 py-8 transition-colors duration-500 hover:bg-[#EEF0F2] hover:text-[#172238] md:flex-row md:items-center md:px-12 md:py-10"
          onmouseenter={() => handleMouseEnterArsenal(tech.img)}
          onmouseleave={handleMouseLeaveArsenal}
          role="presentation"
        >
          <div class="flex items-start gap-5">
            <span class="pt-2 font-mono text-[9px] text-[#18A9E8]">
              0{i + 1}
            </span>

            <h3 class="font-bebas text-5xl leading-none tracking-wide transition-transform duration-500 group-hover:translate-x-4 md:text-7xl">
              {tech.name}
            </h3>
          </div>

          <span class="font-mono text-[9px] uppercase tracking-[0.16em] opacity-45">
            {tech.cat}
          </span>
        </div>
      {/each}
    </div>
  </section>

  <!-- =======================================================
       EDUCATION
  ======================================================== -->

  <section
    class="px-6 py-32 md:px-12 md:py-40"
    style="background: linear-gradient(to bottom, #DDE2E7 0%, #EEF0F2 60%, #F5F3EF 100%);"
  >
    <div class="mx-auto grid max-w-7xl gap-16 md:grid-cols-3">
      <div class="reveal">
        <div class="font-mono text-[9px] uppercase tracking-[0.2em] text-[#172238]/45">
          / Education
        </div>

        <h2 class="mt-5 font-bebas text-7xl leading-[0.8] md:text-9xl">
          STUDY
        </h2>
      </div>

      <div class="md:col-span-2">
        <div class="education-item reveal py-8">
          <div class="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <span class="font-mono text-[9px] text-[#172238]/40">
                2023 — 2026
              </span>

              <h3 class="mt-4 font-playfair text-3xl md:text-5xl">
                Universitas Amikom Yogyakarta
              </h3>

              <p class="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#172238]/50">
                D3 Teknik Informatika
              </p>
            </div>
          </div>
        </div>

        <div class="h-px w-full bg-[#172238]/15"></div>

        <div class="education-item reveal py-8">
          <div class="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <span class="font-mono text-[9px] text-[#172238]/40">
                2020 — 2023
              </span>

              <h3 class="mt-4 font-playfair text-3xl md:text-5xl">
                SMK Islam Pemalang
              </h3>

              <p class="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#172238]/50">
                Teknik Komputer dan Jaringan
              </p>
            </div>
          </div>
        </div>

        <div class="h-px w-full bg-[#172238]/20"></div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       BEYOND
  ======================================================== -->

  <section
    class="relative overflow-hidden px-6 py-32 md:px-12 md:py-48"
    style="background: linear-gradient(to bottom, #EEF0F2 0%, #C8D1DB 52%, #AAB7C5 100%);"
  >
    <div class="background-word pointer-events-none absolute -right-10 top-1/3 whitespace-nowrap font-bebas text-[22vw] leading-none text-[#172238]/[0.05]">
      BEYOND
    </div>

    <div class="relative z-10 mx-auto max-w-7xl">
      <div class="reveal grid gap-16 md:grid-cols-2 md:items-end">
        <div>
          <div class="font-mono text-[9px] uppercase tracking-[0.2em] text-[#172238]/45">
            / Beyond Motion
          </div>

          <h2 class="mt-6 font-playfair text-6xl leading-[0.9] md:text-8xl">
            Still curious
            <span class="text-[#172238]/30">
              about other things too.
            </span>
          </h2>
        </div>

        <div class="max-w-xl text-base leading-relaxed text-[#172238]/60 md:text-lg">
{#if $language === 'id'}
  <p>
    Di luar editing dan development, saya cukup suka ngulik PC hardware,
    menonton anime, bermain game, dan mencoba hal-hal baru.
  </p>

  <p class="mt-6">
    Hal-hal tersebut mungkin tidak selalu berhubungan langsung dengan
    pekerjaan saya, tetapi sering memberi inspirasi dan perspektif baru.
  </p>
{:else}
  <p>
    Outside editing and development, I enjoy exploring PC hardware,
    watching anime, playing games, and occasionally trying new things.
  </p>

  <p class="mt-6">
    They may not always be directly related to my work, but they often
    give me new ideas and perspectives.
  </p>
{/if}
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       CLOSING PHRASE
  ======================================================== -->

  <section
    class="closing-section relative flex min-h-[72vh] items-center overflow-hidden px-6 py-32 md:px-12 md:py-44"
    style="background: linear-gradient(to bottom, #AAB7C5 0%, #DCE1E6 42%, #EEF0F2 100%);"
  >
    <div class="closing-word pointer-events-none absolute -bottom-8 left-[-4vw] select-none whitespace-nowrap font-bebas text-[20vw] leading-none text-[#172238]/[0.045]">
      PASSION
    </div>

    <div class="closing-content relative z-10 mx-auto w-full max-w-7xl">
      <div class="font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/40">
        / Until next time
      </div>

      <div class="mt-12">
        <h2 class="font-playfair text-[8vw] leading-[0.95] tracking-[-0.025em] md:text-[7vw]">
          雪の下にも、情熱がある。
        </h2>

        <p class="mt-8 font-bebas text-2xl tracking-[0.02em] text-[#172238]/70 md:text-4xl">
          EVEN BENEATH THE SNOW, PASSION BURNS.
        </p>
      </div>

      <div class="mt-20 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.15em] text-[#172238]/40">
        <span class="h-2 w-2 rounded-full bg-[#18A9E8]"></span>
        More to come
      </div>
    </div>
  </section>
</main>