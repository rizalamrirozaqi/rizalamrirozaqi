<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { language } from '$lib/stores/language';

  const projects = [
    {
      number: '01',
      year: '2026',
      title: 'Abstract Movement',
      category: 'Motion Graphics',
      description:
        'A small experiment with abstract shapes and movement. Made to explore timing, transitions, and how simple elements can work together.',
      video: '/videos/project-1.webm'
    },
    {
      number: '02',
      year: '2026',
      title: 'Sample Link Archive Web Ad',
      category: 'UI Motion',
      description:
        'A small UI motion experiment exploring movement and visual presentation. Made while trying different ways to make interface elements feel more dynamic.',
      video: '/videos/project-2.webm'
    },
    {
      number: '03',
      year: '2025',
      title: 'Fallen Leaves Animation',
      category: '3D Animation',
      description:
        'A small 3D animation project featuring falling leaves in front of the 7th Amikom University building. Made as part of a 3D animation course while exploring scene creation and simple animation.',
      video: '/videos/project-3.webm'
    },
    {
      number: '04',
      year: '2025',
      title: 'Project Four',
      category: 'Motion Study',
      description:
        'Another experiment while learning motion.',
      video: '/videos/project-04.webm'
    }
  ];

  // =====================================================
  // AUDIO STATE
  // =====================================================

  let activeAudioVideo: HTMLVideoElement | null = null;

  // Menentukan apakah user sudah pernah menyalakan audio
  let hasInteractedWithAudio = false;

  const updateVideoAudio = (
    container: HTMLDivElement,
    video: HTMLVideoElement
  ) => {
    if (video.muted) {
      // =================================================
      // MUTE VIDEO LAIN
      // =================================================

      if (
        activeAudioVideo &&
        activeAudioVideo !== video
      ) {
        activeAudioVideo.muted = true;
      }

      // =================================================
      // UNMUTE VIDEO INI
      // =================================================

      video.muted = false;
      activeAudioVideo = video;

      // User sudah tahu cara menyalakan audio
      hasInteractedWithAudio = true;

      return;
    }

    // =================================================
    // MUTE VIDEO INI
    // =================================================

    video.muted = true;

    if (
      activeAudioVideo === video
    ) {
      activeAudioVideo = null;
    }
  };

  const handleVideoClick = (
    event: MouseEvent
  ) => {
    const container =
      event.currentTarget as HTMLDivElement;

    const video =
      container.querySelector(
        '.project-video'
      ) as HTMLVideoElement | null;

    if (!video) return;

    updateVideoAudio(
      container,
      video
    );
  };

  onMount(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // =====================================================
      // INTRO
      // =====================================================

      const introTl = gsap.timeline({
        defaults: {
          ease: 'power4.out'
        }
      });

      introTl
        .fromTo(
          '.intro-meta',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          }
        )
        .fromTo(
          '.intro-title',
          {
            yPercent: 110
          },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.08
          },
          '-=0.4'
        )
        .fromTo(
          '.intro-copy',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          '-=0.45'
        );

      // =====================================================
      // INTRO PARALLAX
      // =====================================================

      gsap.to('.intro-word', {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // =====================================================
      // HORIZONTAL PROJECTS
      // =====================================================

      const section = document.querySelector(
        '.projects-section'
      ) as HTMLElement | null;

      const track = document.querySelector(
        '.projects-track'
      ) as HTMLElement | null;

      if (section && track) {
        const getDistance = () =>
          Math.max(
            track.scrollWidth -
              window.innerWidth,
            0
          );

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }

      // =====================================================
      // PROJECT CARD REVEAL
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.project-card')
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 35
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: index * 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true
              }
            }
          );
        });

      // =====================================================
      // PROJECT VIDEO SCALE
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.project-video')
        .forEach((video) => {
          gsap.fromTo(
            video,
            {
              scale: 1.05
            },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: video,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            }
          );
        });

      // =====================================================
      // PROJECT TITLE HOVER
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.project-card')
        .forEach((card) => {
          const title =
            card.querySelector(
              '.project-title'
            ) as HTMLElement | null;

          if (!title) return;

          const enter = () => {
            gsap.to(title, {
              x: 8,
              duration: 0.4,
              ease: 'power3.out'
            });
          };

          const leave = () => {
            gsap.to(title, {
              x: 0,
              duration: 0.45,
              ease: 'power3.out'
            });
          };

          card.addEventListener(
            'mouseenter',
            enter
          );

          card.addEventListener(
            'mouseleave',
            leave
          );
        });

      // =====================================================
      // GENERAL REVEAL
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.reveal')
        .forEach((element) => {
          gsap.fromTo(
            element,
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
                trigger: element,
                start: 'top 86%',
                once: true
              }
            }
          );
        });

      // =====================================================
      // PROCESS WORD
      // =====================================================

      gsap.to('.process-word', {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // =====================================================
      // CLOSING WORD
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

      // =====================================================
      // REFRESH
      // =====================================================

      const refresh = () =>
        ScrollTrigger.refresh();

      window.addEventListener(
        'load',
        refresh
      );

      setTimeout(refresh, 300);
      setTimeout(refresh, 800);
    });

    return () => {
      window.removeEventListener(
        'load',
        ScrollTrigger.refresh
      );

      ctx.revert();
    };
  });
</script>

<svelte:head>
  <title>Projects — Rizal Amri Rozaqi</title>

  <meta
    name="description"
    content="Selected motion graphics and visual projects by Rizal Amri Rozaqi."
  />
</svelte:head>

<main
  class="overflow-hidden text-[#172238] selection:bg-[#18A9E8] selection:text-[#F0F2F4]"
>
  <!-- =======================================================
       01 — INTRO
  ======================================================== -->

  <section
    class="intro-section relative flex min-h-[82vh] flex-col justify-end overflow-hidden bg-[#EEF0F2] px-6 pb-16 pt-24 md:px-12 md:pb-20"
  >
    <div
      class="intro-word pointer-events-none absolute -right-[4vw] top-[22%] select-none font-bebas text-[18vw] leading-none text-[#172238]/[0.025]"
    >
      MOTION
    </div>

    <div
      class="relative z-10 mx-auto w-full max-w-7xl"
    >
      <div
        class="intro-meta font-mono text-[9px] uppercase tracking-[0.16em] text-[#172238]/45"
      >
        / 01 — Projects
      </div>

      <div class="mt-8 overflow-hidden">
        <h1
          class="intro-title font-bebas text-[14vw] leading-[0.78] tracking-[-0.035em] md:text-[11vw]"
        >
          SELECTED
        </h1>
      </div>

      <div class="overflow-hidden">
        <h2
          class="intro-title font-bebas text-[11vw] leading-[0.78] tracking-[-0.03em] text-[#172238]/25 md:text-[8vw]"
        >
          WORK
        </h2>
      </div>

      <div
        class="intro-copy mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        {#if $language === 'id'}
          <p
            class="max-w-md text-base leading-relaxed text-[#172238]/55 md:text-lg"
          >
            Beberapa hal yang pernah saya kerjakan,
            pelajari, atau saya buat untuk mencoba
            sesuatu yang baru.
          </p>
        {:else}
          <p
            class="max-w-md text-base leading-relaxed text-[#172238]/55 md:text-lg"
          >
            A few things I've worked on, explored,
            or made while trying to learn something
            new.
          </p>
        {/if}

        <div
          class="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.15em] text-[#172238]/40"
        >
          <span
            class="h-2 w-2 rounded-full bg-[#18A9E8]"
          ></span>

          Scroll horizontally →
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       02 — PROJECTS
  ======================================================== -->

  <section
    class="projects-section relative overflow-hidden bg-[#172238] text-[#EEF0F2]"
  >
    <div
      class="absolute left-6 top-8 z-20 font-mono text-[8px] uppercase tracking-[0.15em] text-[#EEF0F2]/45 md:left-12"
    >
      / 02 — Selected Work
    </div>

    <div
      class="projects-track flex min-h-screen w-max items-center gap-12 px-6 py-24 md:gap-16 md:px-12"
    >
      <!-- INTRO -->

      <div
        class="w-[70vw] shrink-0 md:w-[30vw]"
      >
        <div
          class="font-mono text-[8px] uppercase tracking-[0.15em] text-[#18A9E8]"
        >
          Motion / Visual / Experiments
        </div>

        <h2
          class="mt-6 max-w-md font-playfair text-5xl leading-[0.92] md:text-6xl"
        >
          Things I've made,
          <span class="text-[#EEF0F2]/25">
            one experiment at a time.
          </span>
        </h2>

        {#if $language === 'id'}
          <p
            class="mt-8 max-w-sm text-sm leading-relaxed text-[#EEF0F2]/40"
          >
            Tidak semuanya dibuat untuk alasan yang
            sama. Sebagian hanya karena penasaran dan
            ingin mencoba.
          </p>
        {:else}
          <p
            class="mt-8 max-w-sm text-sm leading-relaxed text-[#EEF0F2]/40"
          >
            Not everything was made for the same reason.
            Some were simply made out of curiosity and
            a desire to try.
          </p>
        {/if}
      </div>

      <!-- PROJECTS -->

      {#each projects as project}
        <article
          class="project-card group flex w-[82vw] shrink-0 flex-col md:w-[44vw]"
          data-cursor-hover
        >
          <!-- VIDEO -->

          <div
            class="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg bg-[#263650]"
            onclick={handleVideoClick}
            role="button"
            tabindex="0"
            onkeydown={(event) => {
              if (
                event.key === 'Enter' ||
                event.key === ' '
              ) {
                event.preventDefault();

                handleVideoClick(
                  event as unknown as MouseEvent
                );
              }
            }}
            aria-label={`Play sound for ${project.title}`}
          >
            <span
              class="absolute left-5 top-5 z-20 font-mono text-[8px] text-[#18A9E8]"
            >
              {project.number}
            </span>

            <video
              src={project.video}
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
              class="project-video absolute inset-0 h-full w-full object-contain"
            ></video>

            <!-- HOVER GRADIENT -->

            <div
              class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#101A2D]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></div>

            <!-- HOVER INFO -->

            <div
              class="pointer-events-none absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <span
                class="font-mono text-[8px] uppercase tracking-[0.12em] text-white"
              >
                {project.category}
              </span>

              <span
                class="font-mono text-[8px] text-white"
              >
                {project.year}
              </span>
            </div>
          </div>

          <!-- SOUND HINT -->

          {#if !hasInteractedWithAudio}
            <div
              class="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#EEF0F2]/25"
            >
              Click for sound
            </div>
          {/if}

          <!-- PROJECT INFO -->

          <div
            class:mt-3={hasInteractedWithAudio}
            class:mt-6={!hasInteractedWithAudio}
            class="flex min-h-[170px] items-start justify-between gap-6 md:min-h-[185px]"
          >
            <div class="max-w-lg">
              <div
                class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#18A9E8]"
              >
                {project.category}
              </div>

              <h3
                class="project-title mt-2 max-w-[90%] font-playfair text-3xl leading-[0.95] md:text-5xl"
              >
                {project.title}
              </h3>

              <p
                class="mt-3 max-w-md text-sm leading-relaxed text-[#EEF0F2]/45"
              >
                {project.description}
              </p>
            </div>

            <span
              class="hidden font-bebas text-7xl leading-none text-[#EEF0F2]/10 md:block"
            >
              {project.number}
            </span>
          </div>
        </article>
      {/each}

      <!-- END -->

      <div
        class="w-[65vw] shrink-0 md:w-[30vw]"
      >
        <div
          class="font-mono text-[8px] uppercase tracking-[0.15em] text-[#18A9E8]"
        >
          End of selection
        </div>

        <h2
          class="mt-6 max-w-md font-playfair text-5xl leading-[0.92] md:text-6xl"
        >
          More things are
          <span class="text-[#EEF0F2]/25">
            on the way.
          </span>
        </h2>
      </div>
    </div>
  </section>

  <!-- =======================================================
       03 — PROCESS
  ======================================================== -->

  <section
    class="process-section relative overflow-hidden bg-[#AEB7C3] px-6 py-32 md:px-12 md:py-44"
  >
    <div
      class="process-word pointer-events-none absolute -right-[5vw] top-[36%] select-none font-bebas text-[20vw] leading-none text-[#172238]/[0.045]"
    >
      PROCESS
    </div>

    <div
      class="relative z-10 mx-auto max-w-7xl"
    >
      <div
        class="grid gap-16 md:grid-cols-[0.7fr_1.3fr]"
      >
        <div class="reveal">
          <div
            class="font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/45"
          >
            / 03 — Process
          </div>

          <h2
            class="mt-6 font-bebas text-[13vw] leading-[0.72] tracking-[-0.03em] md:text-[9vw]"
          >
            PROCESS
          </h2>

          {#if $language === 'id'}
            <p
              class="mt-8 max-w-sm text-sm leading-relaxed text-[#172238]/55"
            >
              Tidak selalu punya proses yang sama.
              Biasanya saya mulai dari sesuatu yang
              menarik, lalu mencoba melihat ke mana
              arahnya.
            </p>
          {:else}
            <p
              class="mt-8 max-w-sm text-sm leading-relaxed text-[#172238]/55"
            >
              I don't always follow the same process.
              Usually, I start with something interesting
              and see where it leads.
            </p>
          {/if}
        </div>

        <div
          class="grid gap-10 md:grid-cols-3"
        >
          <div class="reveal">
            <span
              class="font-mono text-[9px] text-[#172238]/40"
            >
              01
            </span>

            <h3
              class="mt-4 font-playfair text-3xl"
            >
              Explore
            </h3>

            {#if $language === 'id'}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Mencari referensi dan mencoba memahami
                apa yang sebenarnya ingin dibuat.
              </p>
            {:else}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Looking for references and trying to
                understand what I actually want to make.
              </p>
            {/if}
          </div>

          <div class="reveal">
            <span
              class="font-mono text-[9px] text-[#172238]/40"
            >
              02
            </span>

            <h3
              class="mt-4 font-playfair text-3xl"
            >
              Build
            </h3>

            {#if $language === 'id'}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Mencoba teknik yang berbeda sampai
                menemukan pendekatan yang terasa pas.
              </p>
            {:else}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Trying different techniques until I
                find an approach that feels right.
              </p>
            {/if}
          </div>

          <div class="reveal">
            <span
              class="font-mono text-[9px] text-[#172238]/40"
            >
              03
            </span>

            <h3
              class="mt-4 font-playfair text-3xl"
            >
              Learn
            </h3>

            {#if $language === 'id'}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Melihat kembali hasilnya, menerima
                masukan, lalu belajar dari kesalahan yang
                ada.
              </p>
            {:else}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Looking back at the result, taking
                feedback, and learning from what went
                wrong.
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       04 — CLOSING PHRASE
  ======================================================== -->

  <section
    class="closing-section relative flex min-h-[72vh] items-center overflow-hidden bg-[#EEF0F2] px-6 py-32 md:px-12 md:py-44"
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
        / 04 — Until next time
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
        <span
          class="h-2 w-2 rounded-full bg-[#18A9E8]"
        ></span>

        More to come
      </div>
    </div>
  </section>
</main>