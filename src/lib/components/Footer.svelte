<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import { language } from '$lib/stores/language';

  import ParticleMagnet from './ParticleMagnet.svelte';

  let footer: HTMLElement | undefined = $state();
  let email: HTMLAnchorElement | undefined = $state();

  onMount(() => {
    if (!footer) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // =====================================================
      // REVEAL
      // =====================================================

      gsap.fromTo(
        '.footer-reveal',
        {
          opacity: 0,
          y: 24
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            once: true
          }
        }
      );

      gsap.fromTo(
        '.footer-title-line',
        {
          yPercent: 105
        },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            once: true
          }
        }
      );

      // =====================================================
      // BACKGROUND WORD
      // =====================================================

      gsap.to('.footer-bg-word', {
        xPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // =====================================================
      // TITLE PARALLAX
      // =====================================================

      gsap.to('.footer-title', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // =====================================================
      // EMAIL
      // =====================================================

      if (email) {
        const arrow = email.querySelector(
          '.email-arrow'
        ) as HTMLElement | null;

        const enter = () => {
          gsap.to(email, {
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
          gsap.to(email, {
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

        email.addEventListener('mouseenter', enter);
        email.addEventListener('mouseleave', leave);

        return () => {
          email.removeEventListener('mouseenter', enter);
          email.removeEventListener('mouseleave', leave);
        };
      }
    }, footer);

    return () => {
      ctx.revert();
    };
  });
</script>

<svelte:head>
  <meta
    name="author"
    content="Rizal Amri Rozaqi"
  />
</svelte:head>

<footer
  bind:this={footer}
  id="contact"
  class="relative min-h-screen w-full overflow-hidden text-[#172238]"
  style="background: linear-gradient(to bottom, #EEF0F2 0%, #DCE3EA 48%, #AEBCCC 100%);"
>
  <!-- =====================================================
       BACKGROUND
  ====================================================== -->

  <div
    class="absolute inset-0 z-0 bg-gradient-to-b from-[#EEF0F2] via-[#DCE3EA] to-[#C3CDD8]"
  ></div>

  <!-- =====================================================
       PARTICLES

       IMPORTANT:
       hanya area bawah.
       tidak memberi background.
  ====================================================== -->

  <div
    class="pointer-events-auto absolute bottom-0 left-0 right-0 z-0 h-[28vh] overflow-hidden opacity-45 md:h-[34vh]"
  >
    <div class="absolute inset-0">
      <ParticleMagnet />
    </div>
  </div>

  <!-- =====================================================
       BACKGROUND TYPOGRAPHY
  ====================================================== -->

  <div
    class="footer-bg-word pointer-events-none absolute bottom-[-2vw] left-[-3vw] z-[1] select-none whitespace-nowrap font-bebas text-[25vw] leading-none text-[#172238]/[0.04]"
  >
    TOGETHER
  </div>

  <!-- =====================================================
       CONTENT

       pointer-events-none supaya particle tetap bisa
       menerima mouse di area kosong.

       Link/button dikembalikan dengan pointer-events-auto.
  ====================================================== -->

  <div
    class="pointer-events-none relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-12 md:py-10"
  >
    <!-- ===================================================
         TOP META
    ==================================================== -->

    <div
      class="footer-reveal flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-[#172238]/40"
    >
      <span>RIZAL AMRI ROZAQI</span>

      <span class="hidden md:block">
        MOTION GRAPHICS / GRAPHIC DESIGN / VIDEO EDITOR 
      </span>

      <span>END</span>
    </div>

    <!-- ===================================================
         MAIN
    ==================================================== -->

    <div class="footer-title mx-auto w-full max-w-7xl py-16 md:py-24">
      <div class="overflow-hidden">
        <h2
          class="footer-title-line font-bebas text-[18vw] leading-[0.72] tracking-[-0.035em] md:text-[12vw]"
        >
          LET'S
        </h2>
      </div>

      <div class="overflow-hidden">
        <h2
          class="footer-title-line font-bebas text-[18vw] leading-[0.72] tracking-[-0.035em] text-[#172238]/25 md:text-[12vw]"
        >
          TALK.
        </h2>
      </div>

      <div
        class="mt-10 grid gap-10 md:mt-12 md:grid-cols-[1fr_auto] md:items-end"
      >
        <!-- COPY -->

        <div class="footer-reveal max-w-lg">
          <p class="text-base leading-relaxed text-[#172238]/55 md:text-lg">
            {#if $language === 'id'}
              Kalau ada sesuatu yang ingin dibicarakan,
              dikerjakan, atau sekadar ingin berbagi ide,
              boleh menyapa.
            {:else}
              If there's something to discuss,
              work on, or just want to share ideas,
              feel free to reach out.
            {/if}
          </p>
        </div>

        <!-- EMAIL -->

        <a
          bind:this={email}
          href="mailto:rizalamrirozaqi@gmail.com"
          data-cursor-hover
          class="pointer-events-auto footer-reveal inline-flex max-w-full items-center gap-3 self-start font-mono text-[9px] uppercase tracking-[0.12em] text-[#172238] md:text-xs"
        >
          <span class="whitespace-nowrap border-b border-[#172238]/30 pb-1">
            rizalamrirozaqi@gmail.com
          </span>

          <span class="email-arrow text-[#18A9E8]">
            ↗
          </span>
        </a>
      </div>
    </div>

    <!-- ===================================================
         LOWER INFO
    ==================================================== -->

    <div
      class="footer-reveal grid gap-8 border-t border-[#172238]/15 pt-5 md:grid-cols-3"
    >
      <!-- SOCIAL -->

      <div>
        <div
          class="mb-4 font-mono text-[8px] uppercase tracking-[0.15em] text-[#172238]/35"
        >
          Social
        </div>

        <div
          class="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[9px] uppercase tracking-[0.1em]"
        >
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            class="pointer-events-auto transition-opacity duration-300 hover:opacity-40"
          >
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            class="pointer-events-auto transition-opacity duration-300 hover:opacity-40"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            class="pointer-events-auto transition-opacity duration-300 hover:opacity-40"
          >
            GitHub
          </a>
        </div>
      </div>

      <!-- NAVIGATE -->

      <div>
        <div
          class="mb-4 font-mono text-[8px] uppercase tracking-[0.15em] text-[#172238]/35"
        >
          Navigate
        </div>

        <div
          class="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[9px] uppercase tracking-[0.1em]"
        >
          <a
            href="/"
            data-cursor-hover
            class="pointer-events-auto transition-opacity duration-300 hover:opacity-40"
          >
            Home
          </a>

          <a
            href="/About"
            data-cursor-hover
            class="pointer-events-auto transition-opacity duration-300 hover:opacity-40"
          >
            About
          </a>

          <a
            href="/Project"
            data-cursor-hover
            class="pointer-events-auto transition-opacity duration-300 hover:opacity-40"
          >
            Projects
          </a>
        </div>
      </div>

      <!-- LOCATION -->

      <div class="flex flex-col justify-center items-end">
        <div
          class="mb-4 font-mono text-[8px] uppercase tracking-[0.15em] text-[#172238]/35"
        >
          Based in
        </div>

        <p
          class="font-mono text-[9px] uppercase tracking-[0.1em] text-[#172238]/55"
        >
          Central Java, Indonesia
        </p>

        <p
          class="mt-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#172238]/30"
        >
          Available for selected work
        </p>
      </div>
    </div>

    <!-- ===================================================
         COPYRIGHT
    ==================================================== -->

    <div
      class="footer-reveal mt-6 flex flex-col justify-between gap-3 border-t border-[#172238]/10 pt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-[#172238]/30 md:flex-row"
    >
      <span>
        Rizal Amri Rozaqi
      </span>

      <span>
        © 2026
      </span>

      <span>
        Made with Svelte + GSAP
      </span>
    </div>
  </div>
</footer>