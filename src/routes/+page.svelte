<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

  const shards = [
    'polygon(0% 0%, 28% 4%, 22% 28%, 0% 35%)',
    'polygon(28% 4%, 58% 0%, 52% 26%, 22% 28%)',
    'polygon(58% 0%, 100% 6%, 100% 32%, 52% 26%)',
    'polygon(0% 35%, 22% 28%, 36% 68%, 8% 100%)',
    'polygon(22% 28%, 52% 26%, 48% 68%, 36% 68%)',
    'polygon(52% 26%, 100% 32%, 100% 100%, 48% 68%)',
    'polygon(8% 100%, 36% 68%, 48% 68%, 100% 100%)'
  ];

  let shardEls: HTMLDivElement[] = [];
  let hoveredShard: number | null = $state(null);

  let heroRoot: HTMLElement | undefined = $state();

  let marqueeContainer: HTMLDivElement | undefined = $state();
  let textWrapper: HTMLDivElement | undefined = $state();

  let vidRef: HTMLVideoElement | undefined = $state();
  let textRef1: HTMLHeadingElement | undefined = $state();
  let textRef2: HTMLHeadingElement | undefined = $state();
  let spanRef1: HTMLSpanElement | undefined = $state();
  let spanRef2: HTMLSpanElement | undefined = $state();
  let spanRef3: HTMLSpanElement | undefined = $state();
  let contRef: HTMLDivElement | undefined = $state();
  let mographSection: HTMLElement | undefined = $state();

  interface Particle {
    left: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
  }

  let particles: Particle[] = $state([]);

  const handleHeroMouseMove = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = (mouseY / 800) * -16 + 8;
    const rotateY = (mouseX / 1200) * 16 - 8;

    if (
      hoveredShard !== null &&
      shardEls[hoveredShard]
    ) {
      gsap.to(shardEls[hoveredShard], {
        rotateX,
        rotateY,
        duration: 0.1,
        overwrite: true
      });
    }
  };

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // =====================================================
      // HERO
      // =====================================================

      gsap.fromTo(
        '.hero-line',
        {
          yPercent: 110,
          opacity: 0
        },
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
        {
          opacity: 0,
          y: 20
        },
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
        {
          opacity: 0,
          scale: 0.96,
          y: 40
        },
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
      // MARQUEE
      // =====================================================

      if (marqueeContainer && textWrapper) {
        const marqueeAnim = gsap.to(textWrapper, {
          xPercent: -50,
          ease: 'none',
          duration: 10,
          repeat: -1
        });

        ScrollTrigger.create({
          trigger: marqueeContainer,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            gsap.to(marqueeAnim, {
              timeScale: self.direction,
              duration: 0.5,
              overwrite: true
            });
          }
        });

        gsap.to(marqueeContainer, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // =====================================================
      // MOGRAPH PARTICLES
      // =====================================================

      const newParticles: Particle[] = [];

      for (let i = 0; i < 300; i++) {
        newParticles.push({
          left: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 8 + 4,
          delay: Math.random() * -10,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      particles = newParticles;

      // =====================================================
      // MOGRAPH REEL
      // =====================================================

      if (mographSection) {
        ScrollTrigger.create({
          trigger: mographSection,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: () => {
            updateMograph();
          }
        });
      }

      // =====================================================
      // GENERAL REVEAL
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.home-reveal')
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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
      // PROJECT CTA
      // =====================================================

      gsap.fromTo(
        '.project-cta',
        {
          opacity: 0,
          y: 25
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-cta',
            start: 'top 85%',
            once: true
          }
        }
      );

      // =====================================================
      // CTA HOVER
      // =====================================================

      const cta = document.querySelector(
        '.project-cta'
      ) as HTMLElement | null;

      if (cta) {
        const arrow = cta.querySelector(
          '.cta-arrow'
        ) as HTMLElement | null;

        const enter = () => {
          gsap.to(cta, {
            x: 8,
            duration: 0.35,
            ease: 'power3.out'
          });

          if (arrow) {
            gsap.to(arrow, {
              x: 5,
              y: -5,
              rotation: -8,
              duration: 0.35,
              ease: 'power3.out'
            });
          }
        };

        const leave = () => {
          gsap.to(cta, {
            x: 0,
            duration: 0.4,
            ease: 'power3.out'
          });

          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.4,
              ease: 'power3.out'
            });
          }
        };

        cta.addEventListener('mouseenter', enter);
        cta.addEventListener('mouseleave', leave);
      }

      // =====================================================
      // CLOSING
      // =====================================================

      gsap.fromTo(
        '.closing-content',
        {
          opacity: 0,
          y: 35
        },
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

      // =====================================================
      // REFRESH
      // =====================================================

      const refresh = () => {
        ScrollTrigger.refresh();
        updateMograph();
      };

      window.addEventListener('load', refresh);

      setTimeout(refresh, 300);
      setTimeout(refresh, 800);
    }, heroRoot);

    const handleScroll = () => {
      updateMograph();
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      ctx.revert();
    };
  });

  // =========================================================
  // MOGRAPH SCROLL
  // =========================================================

  function updateMograph() {
    if (!mographSection) return;

    const rect =
      mographSection.getBoundingClientRect();

    const progress = Math.min(
      Math.max(
        -rect.top / rect.height,
        0
      ),
      0.4
    );

    if (vidRef) {
      vidRef.style.transform =
        `translateY(${20 * progress}px) scale(${6 - 7.5 * progress})`;
    }

    if (textRef1) {
      textRef1.style.transform =
        `translateX(-${1000 - 2000 * progress}px) scale(${2 + 2.5 * progress})`;
    }

    if (textRef2) {
      textRef2.style.transform =
        `translateX(${1000 - 2000 * progress}px) scale(${2 + 2.5 * progress})`;
    }

    [spanRef1, spanRef2, spanRef3].forEach(
      (span) => {
        if (!span) return;

        span.style.transform =
          `translateX(${1100 - 2700 * progress}px)`;
      }
    );

    if (contRef) {
      contRef.style.gap =
        `${400 * progress}px`;

      contRef.style.transform =
        `scaleX(${0.1 + 6 * progress})`;
    }
  }
</script>

<svelte:head>
  <title>Rizal Amri Rozaqi</title>

  <meta
    name="description"
    content="Motion Graphics Designer, Front-End Developer, and visual storyteller."
  />
</svelte:head>

<main
  bind:this={heroRoot}
  class="w-full overflow-hidden text-gray-800"
>

  <!-- =======================================================
       01 — HERO
  ======================================================== -->

  <section
    class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 md:flex-row"
  >

    <!-- LEFT -->

    <div
      class="home-reveal relative z-30 flex w-full flex-col items-center p-6 text-center md:w-1/2 md:items-start md:pl-12 md:text-left"
    >
      <p
        class="text-3xl uppercase leading-tight text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl font-bebas"
      >
        Even beneath the snow, elegance never fades.
      </p>

      <p
        class="mt-4 max-w-lg text-base text-gray-600 sm:text-lg md:text-xl"
      >
        Crafting refined interfaces where every pixel flows
        like falling petals in the frost.
      </p>
    </div>

    <!-- SHARDS -->

    <div
      class="relative mt-10 h-[50vh] w-full perspective-[1000px] md:mt-0 md:h-screen md:w-1/2"
      onmousemove={handleHeroMouseMove}
      role="presentation"
    >
      {#each shards as path, i}
        <div
          onmouseenter={() => {
            hoveredShard = i;

            gsap.to(shardEls[i], {
              scale: 1.06,
              filter: 'brightness(1.15) contrast(1.05)',
              duration: 0.3,
              overwrite: true
            });
          }}
          onmouseleave={() => {
            hoveredShard = null;

            gsap.to(shardEls[i], {
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              filter: 'brightness(1) contrast(1)',
              duration: 0.3,
              overwrite: true
            });
          }}
          style="
            clip-path: {path};
            transform-style: preserve-3d;
            perspective: 800px;
          "
          class="absolute inset-0"
          role="presentation"
        >
          <div
            bind:this={shardEls[i]}
            class="h-full w-full"
          >
            <video
              src="/videos/rizal.mp4"
              autoplay
              loop
              muted
              playsinline
              class="absolute left-0 top-0 h-full w-full rounded-lg object-cover shadow-xl"
              style="clip-path: {path};"
            ></video>

            <div
              class="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent opacity-30 mix-blend-overlay"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- =======================================================
       02 — MARQUEE
  ======================================================== -->

  <section
    bind:this={marqueeContainer}
    class="relative z-20 w-screen overflow-hidden bg-transparent"
  >
    <div
      class="flex w-full overflow-hidden bg-gradient-to-b from-gray-800 to-slate-700 py-5"
    >
      <div
        bind:this={textWrapper}
        class="flex w-fit whitespace-nowrap text-[20rem] font-bold tracking-widest text-white font-bebas"
      >
        {#each Array(4) as _}
          <span class="mx-8">
            RIZAL AMRI ROZAQI
          </span>
        {/each}
      </div>
    </div>
  </section>

  <!-- =======================================================
       03 — MOGRAPH REEL
  ======================================================== -->

  <section
    bind:this={mographSection}
    id="target-section"
    class="hero relative h-[200vh] w-screen translate-y-2 transform overflow-hidden bg-gray-300"
  >

    <!-- PROCEDURAL BARS -->

    <div
      bind:this={contRef}
      class="absolute left-0 top-0 flex h-full w-screen flex-row justify-center gap-40 overflow-hidden"
    >
      {#each Array(4) as _}
        <div class="relative h-full w-[2%] bg-gray-950">
          <div
            class="h-full w-full border-x border-gray-800 bg-[image:repeating-linear-gradient(315deg,gray_0,gray_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] opacity-10"
          ></div>
        </div>
      {/each}
    </div>

    <!-- LOWER VISUAL -->

    <div
      class="absolute bottom-0 h-[50vh] w-screen overflow-hidden border-t border-gray-700 bg-gray-800"
    >
      <div class="relative h-full w-full">

        <!-- MARQUEE -->

        <div
          class="relative z-10 flex items-center gap-10 border-b border-gray-800 bg-gray-950 py-3"
        >
          <span
            bind:this={spanRef1}
            class="whitespace-nowrap text-3xl tracking-widest text-gray-400 font-mono"
          >
            Procedural Geometry. Abstract Forms. Kinetic Explorations.
          </span>

          <span
            bind:this={spanRef2}
            class="whitespace-nowrap text-3xl tracking-widest text-gray-400 font-mono"
          >
            Procedural Geometry. Abstract Forms. Kinetic Explorations.
          </span>

          <span
            bind:this={spanRef3}
            class="whitespace-nowrap text-3xl tracking-widest text-gray-400 font-mono"
          >
            Procedural Geometry. Abstract Forms. Kinetic Explorations.
          </span>
        </div>

        <!-- PARTICLES -->

        <div
          class="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gray-900"
        >
          {#each particles as p}
            <div
              class="particle-anim absolute rounded-full bg-sky-400"
              style="
                left: {p.left}%;
                width: {p.size}px;
                height: {p.size}px;
                opacity: {p.opacity};
                animation-duration: {p.duration}s;
                animation-delay: {p.delay}s;
              "
            ></div>
          {/each}
        </div>

      </div>
    </div>

    <!-- CENTER VIDEO -->

    <div
      class="sticky top-0 z-10 flex h-screen items-center justify-center overflow-hidden"
    >
      <video
        bind:this={vidRef}
        src="/videos/rizal.webm"
        autoplay
        loop
        muted
        playsinline
        class="pointer-events-none w-[250px] rounded-xl object-cover shadow-[0_0_50px_rgba(56,189,248,0.2)]"
      ></video>
    </div>

    <!-- TOP TITLE -->

    <h1
      bind:this={textRef1}
      class="absolute bottom-[35%] left-1/2 z-20 mb-4 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap text-4xl font-black tracking-widest text-white mix-blend-difference font-bebas md:text-6xl"
    >
      RIZAL AMRI
    </h1>

    <!-- BOTTOM TITLE -->

    <h1
      bind:this={textRef2}
      class="absolute bottom-[5%] left-1/2 z-20 mb-4 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap text-4xl font-black tracking-widest text-sky-400 mix-blend-difference font-bebas md:text-6xl"
    >
      ABSTRACT MOTION
    </h1>

  </section>

  <!-- =======================================================
       04 — PROJECT CTA
  ======================================================== -->

  <section
    class="relative flex min-h-[55vh] items-center overflow-hidden bg-[#AEB7C3] px-6 py-24 md:px-12 md:py-32"
  >
    <div
      class="pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-1/2 select-none font-bebas text-[22vw] leading-none text-[#172238]/[0.035]"
    >
      WORK
    </div>

    <div
      class="mx-auto flex w-full max-w-7xl flex-col justify-between gap-12 md:flex-row md:items-end"
    >
      <div class="home-reveal max-w-2xl">
        <div
          class="font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/40"
        >
          / Selected Work
        </div>

        <h2
          class="mt-6 font-playfair text-5xl leading-[0.9] tracking-[-0.02em] md:text-7xl"
        >
          Want to see what
          <span class="text-[#172238]/30">
            I've been making?
          </span>
        </h2>
      </div>

      <a
        href="/Project"
        data-cursor-hover
        class="project-cta group inline-flex shrink-0 items-center gap-4 self-start font-mono text-[9px] uppercase tracking-[0.14em] text-[#172238] md:self-end"
      >
        <span class="border-b border-[#172238]/35 pb-2">
          View Projects
        </span>

        <span class="cta-arrow text-[#18A9E8]">
          ↗
        </span>
      </a>
    </div>
  </section>

  <!-- =======================================================
       05 — CLOSING
  ======================================================== -->

  <section
    class="closing-section relative flex min-h-[78vh] items-center overflow-hidden bg-[#EEF0F2] px-6 py-32 md:px-12 md:py-44"
  >
    <div
      class="closing-word pointer-events-none absolute -bottom-8 left-[-4vw] select-none whitespace-nowrap font-bebas text-[20vw] leading-none text-[#172238]/[0.035]"
    >
      PASSION
    </div>

    <div
      class="closing-content relative z-10 mx-auto w-full max-w-7xl"
    >
      <div
        class="font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/40"
      >
        / Until next time
      </div>

      <div class="mt-12">
        <h2
          class="font-serif text-[8vw] leading-[0.95] tracking-[-0.025em] md:text-[7vw]"
        >
          雪の下にも、情熱がある。
        </h2>

        <p
          class="mt-8 font-bebas text-2xl tracking-[0.02em] text-[#172238]/70 md:text-4xl"
        >
          EVEN BENEATH THE SNOW, PASSION BURNS.
        </p>
      </div>

      <div
        class="mt-20 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.15em] text-[#172238]/40"
      >
        <span class="h-2 w-2 rounded-full bg-[#18A9E8]"></span>
        More to come
      </div>
    </div>
  </section>

</main>

<style>
  .particle-anim {
    bottom: -10px;
    animation-name: floatUp;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
  }

  @keyframes floatUp {
    0% {
      transform: translateY(20px);
    }

    100% {
      transform: translateY(-55vh);
    }
  }
</style>