<script lang="ts">
  import { onMount } from 'svelte';
  import { Menu, X } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { language, setLanguage } from '$lib/stores/language';

  const toggleLanguage = () => {
    setLanguage($language === 'en' ? 'id' : 'en');
  };

  let imgRef1: HTMLImageElement | null = $state(null);

  let lastScrollY = 0;

  let showHeaderImage = $state(false);
  let isHeaderVisible = $state(true);
  let menuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        isHeaderVisible = false;
      } else {
        isHeaderVisible = true;
      }

      lastScrollY = currentScrollY;

      const header = document.querySelector(
        '.header'
      ) as HTMLElement | null;

      if (!header) return;

      const rect = header.getBoundingClientRect();

      const progress = Math.min(
        Math.max(-rect.top / rect.height, 0),
        1
      );

      if (imgRef1) {
        const translateX = 100 - 100 * progress;

        imgRef1.style.transform = `translateX(${translateX}px)`;
      }

      const thirdSection = document.querySelector(
        '#third-section'
      );

      if (thirdSection) {
        const thirdRect =
          thirdSection.getBoundingClientRect();

        showHeaderImage = thirdRect.top <= 0;
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        menuOpen = false;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<!-- =========================================================
     HEADER
========================================================= -->

<header
  class="header fixed inset-x-0 top-0 z-40 w-full px-6 py-4 backdrop-blur-xl transition-all duration-300 md:px-20
    {isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}"
>
  <div class="flex w-full items-center justify-between gap-6">

    <!-- =====================================================
         LEFT
    ====================================================== -->

    <div class="flex min-w-0 flex-1 items-center gap-4">
      {#if showHeaderImage}
        <div class="z-10 flex shrink-0 items-center justify-center">
          <img
            bind:this={imgRef1}
            src="/images/ayaka.webp"
            alt="Ayaka Hero"
            class="pointer-events-none w-[60px] rounded-lg transition-transform ease-out md:w-[70px]"
          />
        </div>
      {/if}

      <a
        href="/"
        data-cursor-hover
        class="shrink-0 font-playfair text-xl font-bold tracking-widest text-gray-600 md:text-2xl"
      >
        RIZAL AMRI
      </a>
    </div>

    <!-- =====================================================
         DESKTOP NAV
    ====================================================== -->

    <nav class="hidden lg:flex flex-none">
      <ul class="flex items-center gap-6 text-lg">

        {#each [
          ['About', '/About'],
          ['Project', '/Project'],
          ['Contact Me', '/ContactMe']
        ] as [label, href]}
          <li>
            <a
              {href}
              data-cursor-hover
              class="group relative inline-block overflow-hidden font-medium"
            >
              <span
                class="block text-gray-600 transition-transform duration-300 group-hover:-translate-y-full group-hover:text-sky-400"
              >
                {label}
              </span>

              <span
                class="absolute left-0 top-0 block translate-y-full text-gray-600 transition-transform duration-300 group-hover:translate-y-0 group-hover:text-sky-400"
              >
                {label}
              </span>
            </a>
          </li>
        {/each}

      </ul>
    </nav>

    <!-- =====================================================
         RIGHT
    ====================================================== -->

    <div class="flex flex-1 items-center justify-end gap-4">

      <!-- LANGUAGE -->

      <button
        type="button"
        onclick={toggleLanguage}
        data-cursor-hover
        aria-label="Change language"
        class="group relative inline-block overflow-hidden font-medium"
      >
        <span
          class="block text-gray-600 transition-transform duration-300 group-hover:-translate-y-full group-hover:text-sky-400"
        >
          {$language === 'en' ? 'EN' : 'ID'}
        </span>

        <span
          class="absolute left-0 top-0 block translate-y-full text-gray-600 transition-transform duration-300 group-hover:translate-y-0 group-hover:text-sky-400"
        >
          {$language === 'en' ? 'EN' : 'ID'}
        </span>
      </button>

      <!-- MOBILE MENU BUTTON -->

      <button
        type="button"
        onclick={() => (menuOpen = true)}
        data-cursor-hover
        aria-label="Open menu"
        aria-expanded={menuOpen}
        class="flex items-center justify-center text-gray-600 lg:hidden"
      >
        <Menu size={28} />
      </button>

    </div>
  </div>
</header>

<!-- =========================================================
     MOBILE MENU
========================================================= -->

{#if menuOpen}
  <div
    transition:fade={{ duration: 300 }}
    class="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-[#1f1f1f] text-white"
  >

    <!-- CLOSE -->

    <button
      type="button"
      onclick={() => (menuOpen = false)}
      data-cursor-hover
      aria-label="Close menu"
      class="absolute right-6 top-6 text-white transition-colors hover:text-sky-400"
    >
      <X size={36} />
    </button>

    <!-- NAV -->

    <ul class="flex flex-col items-center gap-8 text-4xl font-bebas">
      {#each [
        ['About', '/About'],
        ['Project', '/Project'],
        ['Contact Me', '/ContactMe']
      ] as [label, href], i}

        <li
          transition:fly={{
            y: 30,
            duration: 400,
            delay: i * 50
          }}
        >
          <a
            {href}
            data-cursor-hover
            onclick={() => (menuOpen = false)}
            class="tracking-widest transition-colors hover:text-sky-400"
          >
            {label}
          </a>
        </li>

      {/each}
    </ul>
  </div>
{/if}