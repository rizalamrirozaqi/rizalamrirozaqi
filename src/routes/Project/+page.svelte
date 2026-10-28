<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { language } from '$lib/stores/language';

  // =====================================================
  // PROJECT DATA
  //
  // highlighted: true  = tampil di Selected Work dan All Projects
  // highlighted: false = hanya tampil di All Projects
  //
  // Group yang tersedia:
  // 'Video Editing'
  // 'Motion Graphics'
  // '3D'
  // =====================================================

  const projects = [
    {
      number: '01',
      year: '2026',
      title: 'Music Platform Ad',
      category: 'Motion Graphics',
      group: 'Motion Graphics',
      highlighted: true,
      description: {
        id: 'Eksperimen motion graphics minimalist untuk konsep promosi Spotify, dengan eksplorasi UI, typography, dan transisi.',
        en: 'A minimalist motion graphics experiment for a Spotify promo concept, exploring UI, typography, and transitions.'
      },
      video: '/videos/spotify.webm'
    },
    {
      number: '02',
      year: '2026',
      title: 'Abstract Movement',
      category: 'Motion Graphics',
      group: 'Motion Graphics',
      highlighted: true,
      description: {
        id: 'Eksperimen kecil dengan bentuk dan gerakan abstrak. Dibuat untuk mengeksplorasi timing, transisi, dan bagaimana elemen sederhana dapat bekerja sama.',
        en: 'A small experiment with abstract shapes and movement. Made to explore timing, transitions, and how simple elements can work together.'
      },
      video: '/videos/abstract-movement-1.webm'
    },
    {
      number: '03',
      year: '2026',
      title: 'Link Archive Ad',
      category: 'UI Motion',
      group: 'Motion Graphics',
      highlighted: true,
      description: {
        id: 'Eksperimen motion untuk konsep iklan web Link Archive. Dibuat untuk mencoba bagaimana elemen antarmuka dan transisi dapat membuat presentasi sebuah produk terasa lebih hidup.',
        en: 'A motion experiment for a Link Archive web ad concept. Made to explore how interface elements and transitions can make a product presentation feel more dynamic.'
      },
      video: '/videos/ungumark.webm'
    },
    {
      number: '04',
      year: '2025',
      title: 'Fallen Leaves Animation',
      category: '3D Animation',
      group: '3D',
      highlighted: true,
      description: {
        id: 'Project animasi 3D sederhana yang menampilkan dedaunan jatuh di depan gedung Universitas Amikom Yogyakarta. Dibuat sebagai bagian dari mata kuliah animasi 3D sambil mempelajari pembuatan scene dan animasi sederhana.',
        en: 'A small 3D animation project featuring falling leaves in front of the Universitas Amikom Yogyakarta building. Made as part of a 3D animation course while exploring scene creation and simple animation.'
      },
      video: '/videos/amikom-3d.webm'
    },
    {
      number: '05',
      year: '2025',
      title: 'Bocchi The Rock',
      category: 'Music Video',
      group: 'Video Editing',
      highlighted: true,
      description: {
        id: 'Edit pendek Bocchi the Rock! menggunakan After Effects untuk berlatih berbagai teknik motion design, termasuk masking, lighting, dan integrasi 3D.',
        en: 'A short Bocchi the Rock! edit made in After Effects to practice various motion design techniques, including masking, lighting, and 3D integration.'
      },
      video: '/videos/bocchi-the-rock.webm'
    },

    // =====================================================
    // TEMPLATE PROJECT BIASA
    //
    // Hapus komentar /* dan */ pada object di bawah ini
    // jika ingin menambahkan project baru.
    //
    // Project dengan highlighted: false hanya muncul
    // di All Projects, sesuai dengan group-nya.
    // =====================================================

  
    {
      year: '2026',
      title: 'Natsu e No Tunnel',
      category: 'Music Video',
      group: 'Video Editing',
      highlighted: false,
      description: {
        id: 'Edit pendek Natsu e No Tunnel! menggunakan After Effects dan Blender untuk berlatih berbagai teknik motion design, termasuk masking, lighting, dan integrasi 3D.',
        en: 'A short Natsu e No Tunnel edit made in After Effects and Blender to practice various motion design techniques, including masking, lighting, and 3D integration.'
      },
      video: '/videos/natsu-e-no-tunnel.webm'
    },
    {
      year: '2026',
      title: 'Komads',
      category: 'Promo Video',
      group: 'Motion Graphics',
      highlighted: false,
      description: {
        id: 'Eksperimen motion graphics minimalist untuk konsep promosi Komads, dengan eksplorasi UI, typography, dan transisi.',
        en: 'A minimalist motion graphics experiment for a Komads promo concept, exploring UI, typography, and transitions.'
      },
      video: '/videos/komads.webm'
    },
    {
      year: '2026',
      title: 'Nodewave',
      category: 'Promo Video',
      group: 'Motion Graphics',
      highlighted: false,
      description: {
        id: 'Eksperimen motion graphics minimalist untuk konsep promosi Nodewave, dengan eksplorasi UI, typography, dan transisi.',
        en: 'A minimalist motion graphics experiment for a Nodewave promo concept, exploring UI, typography, and transitions.'
      },
      video: '/videos/nodewave.webm'
    },
  
  ];

  // =====================================================
  // SELECTED WORK
  // Hanya project dengan highlighted: true
  // =====================================================

  const highlightedProjects = projects.filter(
    (project) => project.highlighted
  );

  // =====================================================
  // ALL PROJECTS — CATEGORY FILTERS
  //
  // Semua project otomatis masuk kategori yang sesuai.
  // Flag highlighted tidak membatasi arsip kategori.
  // =====================================================

  const videoEditingProjects = projects.filter(
    (project) => project.group === 'Video Editing'
  );

  const motionProjects = projects.filter(
    (project) => project.group === 'Motion Graphics'
  );

  const threeDProjects = projects.filter(
    (project) => project.group === '3D'
  );

  // =====================================================
  // GRAPHIC DESIGN PROJECTS
  //
  // Setiap object merupakan satu project.
  // Setiap project bisa berisi beberapa gambar.
  //
  // Simpan gambar di folder:
  // static/images/...
  //
  // Contoh src:
  // /images/kimi-no-mobil-carousel/Artboard-1.webp
  // =====================================================

  const graphicDesignProjects = [
    {
      number: '01',
      title: 'Kimi No Mobil',
      category: 'Carousel Design',
      year: '2026',
      description: {
        id: 'Konsep kampanye visual otomotif yang menggabungkan visual kendaraan, lanskap urban, dan tipografi untuk membangun nuansa perjalanan dan kebebasan. Dirancang dalam rangkaian beberapa slide dengan palet warna biru yang konsisten untuk menjaga kesatuan visual dan alur cerita.',
        en: 'An automotive visual campaign concept combining vehicle imagery, urban landscapes, and typography to evoke a sense of journey and freedom. Designed as a multi-slide series with a consistent blue color palette to maintain visual cohesion and storytelling.'
      },
      images: [
        {
          src: '/images/kimi-no-mobil-carousel/Artboard-1.webp',
          alt: 'Campaign Key Visual'
        },
        {
          src: '/images/kimi-no-mobil-carousel/Artboard-2.webp',
          alt: 'Campaign Storytelling'
        },
        {
          src: '/images/kimi-no-mobil-carousel/Artboard-3.webp',
          alt: 'Hero Visual'
        }
      ]
    },
    {
      number: '02',
      title: 'Social Media Campaign',
      category: 'Campaign Design',
      year: '2026',
      description: {
        id: 'Rangkaian desain kampanye media sosial yang membahas tantangan seller marketplace, mulai dari perubahan perilaku pembeli hingga penyesuaian strategi penjualan. Menggunakan kombinasi tipografi tegas, kontras hitam-putih, aksen oranye dan hijau, serta visual informatif untuk menyampaikan edukasi secara ringkas dan menarik.',
        en: 'A social media campaign exploring the challenges faced by marketplace sellers, from shifting consumer behavior to adapting sales strategies. Bold typography, high-contrast black-and-white layouts, orange and green accents, and informative visuals communicate practical insights in a concise and engaging format.'
      },
      images: [
        {
          src: '/images/finance-carousel/Artboard-1.webp',
          alt: 'The Opening Hook'
        },
        {
          src: '/images/finance-carousel/Artboard-2.webp',
          alt: 'The Market Shift'
        },
        {
          src: '/images/finance-carousel/Artboard-3.webp',
          alt: 'The Seller Impact'
        },
        {
          src: '/images/finance-carousel/Artboard-4.webp',
          alt: 'Platform Diversification'
        },
        {
          src: '/images/finance-carousel/Artboard-5.webp',
          alt: 'Pricing & Margin Review'
        },
        {
          src: '/images/finance-carousel/Artboard-6.webp',
          alt: 'Building Direct Channels'
        },
        {
          src: '/images/finance-carousel/Artboard-7.webp',
          alt: 'Seller Center Migration'
        },
        {
          src: '/images/finance-carousel/Artboard-8.webp',
          alt: 'Call to Action'
        }
      ]
    },
    {
      number: '03',
      title: 'Komads Campaign',
      category: 'Campaign Design',
      year: '2026',
      description: {
        id: 'Rangkaian desain kampanye media sosial yang membahas tantangan seller marketplace, mulai dari perubahan perilaku pembeli hingga penyesuaian strategi penjualan. Menggunakan kombinasi tipografi tegas, kontras hitam-putih, aksen oranye dan hijau, serta visual informatif untuk menyampaikan edukasi secara ringkas dan menarik.',
        en: 'A social media campaign exploring the challenges faced by marketplace sellers, from shifting consumer behavior to adapting sales strategies. Bold typography, high-contrast black-and-white layouts, orange and green accents, and informative visuals communicate practical insights in a concise and engaging format.'
      },
      images: [
        {
          src: '/images/komads.webp',
          alt: 'Komads Campaign Visual'
        }
      ]
    }
  ];

  // =====================================================
  // AUDIO STATE
  // =====================================================

  let activeAudioVideo: HTMLVideoElement | null = null;
  let hasInteractedWithAudio = false;

  const updateVideoAudio = (
    video: HTMLVideoElement
  ) => {
    if (video.muted) {
      // Mute video lain jika ada.
      if (
        activeAudioVideo &&
        activeAudioVideo !== video
      ) {
        activeAudioVideo.muted = true;
      }

      // Nyalakan audio video yang sedang dipilih.
      video.muted = false;
      activeAudioVideo = video;
      hasInteractedWithAudio = true;

      return;
    }

    // Klik lagi untuk mematikan audio.
    video.muted = true;

    if (activeAudioVideo === video) {
      activeAudioVideo = null;
    }
  };

  const handleVideoClick = (
    event: MouseEvent
  ) => {
    const container =
      event.currentTarget as HTMLDivElement;

    // Cari video di dalam kartu, baik Selected Work maupun All Projects.
    const video = container.querySelector(
      'video'
    ) as HTMLVideoElement | null;

    if (!video) return;

    updateVideoAudio(video);
  };

  // =====================================================
  // GSAP ANIMATIONS
  // =====================================================

  onMount(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import('gsap/ScrollTrigger')
      .then(({ ScrollTrigger }) => {
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        const projectMedia = gsap.matchMedia();
        const refresh = () => ScrollTrigger.refresh();

        const refreshTimeouts: ReturnType<
          typeof setTimeout
        >[] = [];

        const ctx = gsap.context(() => {
          // =====================================================
          // INTRO ANIMATION
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
          // HORIZONTAL PROJECTS — DESKTOP ONLY
          //
          // Desktop: horizontal scroll dengan pinning.
          // Mobile: list vertikal, tanpa horizontal pinning.
          // =====================================================

          projectMedia.add(
            '(min-width: 768px)',
            () => {
              const section = document.querySelector(
                '.projects-section'
              ) as HTMLElement | null;

              const track = document.querySelector(
                '.projects-track'
              ) as HTMLElement | null;

              if (!section || !track) return;

              const getDistance = () =>
                Math.max(
                  track.scrollWidth -
                    window.innerWidth,
                  0
                );

              const horizontalTween = gsap.to(
                track,
                {
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
                }
              );

              return () => {
                horizontalTween.scrollTrigger?.kill();
                horizontalTween.kill();

                gsap.set(track, {
                  clearProps: 'transform'
                });
              };
            }
          );

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
          // PROCESS PARALLAX
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
          // CLOSING PARALLAX
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

          window.addEventListener('load', refresh);

          refreshTimeouts.push(
            window.setTimeout(refresh, 300),
            window.setTimeout(refresh, 800)
          );
        });

        cleanup = () => {
          window.removeEventListener('load', refresh);

          refreshTimeouts.forEach((timeout) =>
            window.clearTimeout(timeout)
          );

          projectMedia.revert();
          ctx.revert();
        };
      })
      .catch((error) => {
        console.error(
          'Failed to initialize project animations:',
          error
        );
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  });
</script>

<svelte:head>
  <title>Projects</title>

  <meta
    name="description"
    content="Video editing, motion graphics, 3D, and graphic design projects by Rizal Amri Rozaqi."
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

    <div class="relative z-10 mx-auto w-full max-w-7xl">
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

          <span class="hidden md:inline">
            Scroll horizontally →
          </span>

          <span class="md:hidden">
            Scroll to explore ↓
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       02 — SELECTED WORK
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
      class="projects-track flex w-full flex-col items-stretch gap-14 px-6 py-24 md:min-h-screen md:w-max md:flex-row md:items-center md:gap-16 md:px-12"
    >
      <!-- INTRO CARD -->

      <div class="w-full shrink-0 md:w-[30vw]">
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

      <!-- SELECTED PROJECT CARDS -->
      <!-- Hanya menampilkan highlighted: true -->

      {#each highlightedProjects as project}
        <article
          class="project-card group flex w-full shrink-0 flex-col md:w-[44vw]"
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

              <span class="font-mono text-[8px] text-white">
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
                {project.description[$language]}
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

      <!-- END CARD -->

      <div class="w-full shrink-0 md:w-[30vw]">
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
       03 — ALL PROJECTS
  ======================================================== -->

  <section
    class="all-projects-section overflow-hidden bg-[#EEF0F2] px-6 py-24 text-[#172238] md:px-12 md:py-36"
  >
    <div class="mx-auto w-full max-w-7xl">
      <!-- HEADER -->

      <div
        class="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end"
      >
        <div>
          <div
            class="font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/45"
          >
            / 03 — All Projects
          </div>

          <h2
            class="mt-6 max-w-3xl font-bebas text-[15vw] leading-[0.78] tracking-[-0.035em] sm:text-[12vw] md:text-[8vw]"
          >
            BEYOND THE
            <span class="text-[#172238]/25">
              HIGHLIGHTS.
            </span>
          </h2>
        </div>

        <p
          class="max-w-sm text-sm leading-relaxed text-[#172238]/55"
        >
          {#if $language === 'id'}
            Arsip karya berdasarkan bidang, dari video editing
            sampai eksplorasi visual dan desain grafis.
          {:else}
            A collection of work by discipline, from video
            editing to visual experiments and graphic design.
          {/if}
        </p>
      </div>

      <!-- =====================================================
           VIDEO EDITING
      ====================================================== -->

      <section
        id="video-editing"
        class="mt-20 border-t border-[#172238]/15 pt-8 md:mt-28"
      >
        <div
          class="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <p
              class="font-mono text-[8px] uppercase tracking-[0.15em] text-[#18A9E8]"
            >
              01 / Moving Image
            </p>

            <h3
              class="mt-3 font-playfair text-4xl md:text-6xl"
            >
              Video Editing
            </h3>
          </div>

          <span
            class="font-mono text-[9px] text-[#172238]/40"
          >
            {String(videoEditingProjects.length).padStart(2, '0')}
            WORKS
          </span>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          {#each videoEditingProjects as project}
            <article
              class="archive-project-card reveal group min-w-0"
            >
              <div
                class="relative aspect-video cursor-pointer overflow-hidden rounded-md bg-[#172238]"
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
                aria-label={`Toggle sound for ${project.title}`}
              >
                <video
                  src={project.video}
                  autoplay
                  loop
                  muted
                  playsinline
                  preload="metadata"
                  aria-label={project.title}
                  class="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                ></video>

                <span
                  class="absolute left-4 top-4 font-mono text-[9px] text-[#18A9E8]"
                >
                  {project.number}
                </span>

          </div>

              <div class="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p
                    class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                  >
                    {project.category} · {project.year}
                  </p>

                  <h4
                    class="mt-2 font-playfair text-2xl md:text-3xl"
                  >
                    {project.title}
                  </h4>

                  <p
                    class="mt-3 max-w-lg text-sm leading-relaxed text-[#172238]/55"
                  >
                    {project.description[$language]}
                  </p>
                </div>

                <span
                  class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                >
                  Click for Sound
                </span>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <!-- =====================================================
           MOTION GRAPHICS
      ====================================================== -->

      <section
        id="motion-graphics"
        class="mt-20 border-t border-[#172238]/15 pt-8 md:mt-28"
      >
        <div
          class="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <p
              class="font-mono text-[8px] uppercase tracking-[0.15em] text-[#18A9E8]"
            >
              02 / Design in Motion
            </p>

            <h3
              class="mt-3 font-playfair text-4xl md:text-6xl"
            >
              Motion Graphics
            </h3>
          </div>

          <span
            class="font-mono text-[9px] text-[#172238]/40"
          >
            {String(motionProjects.length).padStart(2, '0')}
            WORKS
          </span>
        </div>

        <div
          class="grid gap-x-5 gap-y-10 md:grid-cols-2"
        >
          {#each motionProjects as project}
            <article
              class="archive-project-card reveal group min-w-0"
            >
              <div
                class="relative aspect-video cursor-pointer overflow-hidden rounded-md bg-[#172238]"
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
                aria-label={`Toggle sound for ${project.title}`}
              >
                <video
                  src={project.video}
                  autoplay
                  loop
                  muted
                  playsinline
                  preload="metadata"
                  aria-label={project.title}
                  class="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                ></video>

                <span
                  class="absolute left-4 top-4 font-mono text-[9px] text-[#18A9E8]"
                >
                  {project.number}
                </span>

              </div>

              <div class="mt-4">
              <div class="flex justify-between gap-2">
                <p
                  class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                >
                  {project.category} · {project.year}
                </p>
                <span
                  class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                >
                  Click for Sound
                </span>
              </div>

                <h4
                  class="mt-2 font-playfair text-2xl md:text-3xl"
                >
                  {project.title}
                </h4>

                <p
                  class="mt-3 text-sm leading-relaxed text-[#172238]/55"
                >
                  {project.description[$language]}
                </p>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <!-- =====================================================
           3D
      ====================================================== -->

      <section
        id="3d"
        class="mt-20 border-t border-[#172238]/15 pt-8 md:mt-28"
      >
        <div
          class="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <p
              class="font-mono text-[8px] uppercase tracking-[0.15em] text-[#18A9E8]"
            >
              03 / Space & Form
            </p>

            <h3
              class="mt-3 font-playfair text-4xl md:text-6xl"
            >
              3D
            </h3>
          </div>

          <span
            class="font-mono text-[9px] text-[#172238]/40"
          >
            {String(threeDProjects.length).padStart(2, '0')}
            WORKS
          </span>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          {#each threeDProjects as project}
            <article
              class="archive-project-card reveal group min-w-0"
            >
              <div
                class="relative aspect-video cursor-pointer overflow-hidden rounded-md bg-[#172238]"
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
                aria-label={`Toggle sound for ${project.title}`}
              >
                <video
                  src={project.video}
                  autoplay
                  loop
                  muted
                  playsinline
                  preload="metadata"
                  aria-label={project.title}
                  class="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                ></video>

                <span
                  class="absolute left-4 top-4 font-mono text-[9px] text-[#18A9E8]"
                >
                  {project.number}
                </span>

              </div>

              <div class="mt-4">
              <div class="flex justify-between">
                <p
                  class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                >
                  {project.category} · {project.year}
                </p>
                                <span
                  class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                >
                  Click for Sound
                </span>
              </div>  

                <h4
                  class="mt-2 font-playfair text-2xl md:text-3xl"
                >
                  {project.title}
                </h4>

                <p
                  class="mt-3 max-w-lg text-sm leading-relaxed text-[#172238]/55"
                >
                  {project.description[$language]}
                </p>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <!-- =====================================================
           GRAPHIC DESIGN
           Setiap project mempunyai carousel sendiri.
      ====================================================== -->

      <section
        id="graphic-design"
        class="mt-20 border-t border-[#172238]/15 pt-8 md:mt-28"
      >
        <!-- HEADER -->

        <div
          class="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p
              class="font-mono text-[8px] uppercase tracking-[0.15em] text-[#18A9E8]"
            >
              04 / Static Visuals
            </p>

            <h3
              class="mt-3 font-playfair text-4xl md:text-6xl"
            >
              Graphic Design
            </h3>
          </div>

          <p
            class="max-w-xs text-sm leading-relaxed text-[#172238]/50"
          >
            A collection of visual experiments, ideas,
            and design explorations.
          </p>
        </div>

        <!-- PROJECT LIST -->

        <div class="space-y-16 md:space-y-24">
          {#each graphicDesignProjects as project}
            <article class="graphic-project reveal min-w-0">
              <!-- PROJECT INFORMATION -->

              <div
                class="mb-6 flex items-start justify-between gap-4"
              >
                <div>
                  <p
                    class="font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/45"
                  >
                    {project.number} / {project.category} · {project.year}
                  </p>

                  <h4
                    class="mt-3 font-playfair text-3xl md:text-4xl"
                  >
                    {project.title}
                  </h4>

                  <p
                    class="mt-3 max-w-lg text-sm leading-relaxed text-[#172238]/55"
                  >
                    {project.description[$language]}
                  </p>
                </div>

                <span
                  class="shrink-0 font-mono text-[9px] text-[#172238]/40"
                >
                  {String(project.images.length).padStart(2, '0')}
                  VISUALS
                </span>
              </div>

              <!-- INDIVIDUAL PROJECT CAROUSEL -->

              <div
                class="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 scroll-smooth sm:mx-0 sm:gap-5 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label={`${project.title} gallery`}
              >
                {#each project.images as image, imageIndex}
                  <figure
                    class="group w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[31.5%]"
                  >
                    <div
                      class="relative aspect-[4/5] overflow-hidden rounded-md bg-[#D9E0E8]"
                    >
                      {#if image.src}
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          class="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                        />
                      {:else}
                        <!-- PLACEHOLDER UNTUK GAMBAR -->

                        <div
                          class="flex h-full flex-col justify-between bg-[linear-gradient(145deg,#D9E0E8_0%,#BAC6D4_48%,#8799AF_100%)] p-5 sm:p-7"
                        >
                          <div
                            class="flex items-start justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/60"
                          >
                            <span>{project.category}</span>

                            <span>
                              {String(imageIndex + 1).padStart(2, '0')}
                            </span>
                          </div>

                          <div>
                            <p
                              class="font-bebas text-[22vw] leading-[0.72] tracking-[-0.04em] text-[#172238]/15 sm:text-[11vw] lg:text-[7vw]"
                            >
                              {project.number}
                            </p>

                            <h5
                              class="mt-5 max-w-[10ch] font-playfair text-3xl leading-[0.95] text-[#172238] sm:text-4xl"
                            >
                              {project.title}
                            </h5>
                          </div>

                          <div
                            class="flex items-end justify-between gap-3 border-t border-[#172238]/20 pt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#172238]/60"
                          >
                            <span>{project.category}</span>

                            <span>
                              {String(imageIndex + 1).padStart(2, '0')}
                              /
                              {String(project.images.length).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      {/if}
                    </div>

                    <figcaption
                      class="mt-3 flex items-center justify-between gap-3"
                    >
                      <span class="text-xs text-[#172238]/60">
                        {image.alt}
                      </span>

                      <span
                        class="shrink-0 font-mono text-[8px] uppercase tracking-[0.1em] text-[#172238]/35"
                      >
                        {String(imageIndex + 1).padStart(2, '0')}
                      </span>
                    </figcaption>
                  </figure>
                {/each}
              </div>

              <!-- CAROUSEL HINT -->

              <div
                class="mt-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/35"
              >
                <span>Explore the collection</span>
                <span aria-hidden="true">Swipe →</span>
              </div>
            </article>
          {/each}
        </div>
      </section>
    </div>
  </section>

  <!-- =======================================================
       04 — PROCESS
  ======================================================== -->

  <section
    class="process-section relative overflow-hidden bg-[#AEB7C3] px-6 py-32 md:px-12 md:py-44"
  >
    <div
      class="process-word pointer-events-none absolute -right-[5vw] top-[36%] select-none font-bebas text-[20vw] leading-none text-[#172238]/[0.045]"
    >
      PROCESS
    </div>

    <div class="relative z-10 mx-auto max-w-7xl">
      <div class="grid gap-16 md:grid-cols-[0.7fr_1.3fr]">
        <!-- INTRO -->

        <div class="reveal">
          <div
            class="font-mono text-[9px] uppercase tracking-[0.15em] text-[#172238]/45"
          >
            / 04 — Process
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

        <!-- PROCESS STEPS -->

        <div class="grid gap-10 md:grid-cols-3">
          <div class="reveal">
            <span
              class="font-mono text-[9px] text-[#172238]/40"
            >
              01
            </span>

            <h3 class="mt-4 font-playfair text-3xl">
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

            <h3 class="mt-4 font-playfair text-3xl">
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

            <h3 class="mt-4 font-playfair text-3xl">
              Learn
            </h3>

            {#if $language === 'id'}
              <p
                class="mt-4 text-sm leading-relaxed text-[#172238]/55"
              >
                Melihat kembali hasilnya, menerima
                masukan, lalu belajar dari kesalahan
                yang ada.
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
       05 — CLOSING PHRASE
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
        / 05 — Until next time
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