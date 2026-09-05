<script lang="ts">
  import '../app.css';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();

  let cursor: HTMLDivElement | undefined = $state();


  onMount( () => {

    if (!cursor) return;

    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const moveX = gsap.quickTo(cursor, 'x', {
      duration: 0.16,
      ease: 'power3.out'
    });

    const moveY = gsap.quickTo(cursor, 'y', {
      duration: 0.16,
      ease: 'power3.out'
    });



    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);


    };

    window.addEventListener('mousemove', handleMouseMove);

    const getTarget = (
      target: EventTarget | null
    ): HTMLElement | null => {
      if (!(target instanceof HTMLElement)) {
        return null;
      }

      return target.closest('[data-cursor], a, button');
    };

const showCursor = () => {
  gsap.to(cursor, {
    scale: 2.8,
    opacity: 0.35,
    duration: 0.3,
    ease: 'power3.out'
  });
};

const hideCursor = () => {
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
    duration: 0.25,
    ease: 'power2.out'
  });
};

    const mouseOver = (event: MouseEvent) => {
      const target = getTarget(event.target);

      if (!target) return;

showCursor();
    };

    const mouseOut = (event: MouseEvent) => {
      const target = getTarget(event.target);

      if (!target) return;

      const related = event.relatedTarget;

      if (
        related instanceof Node &&
        target.contains(related)
      ) {
        return;
      }

      hideCursor();
    };

    document.addEventListener('mouseover', mouseOver);
    document.addEventListener('mouseout', mouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', mouseOver);
      document.removeEventListener('mouseout', mouseOut);
    };
  });
</script>

<div
  bind:this={cursor}
  class="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#252525] mix-blend-difference md:block"
></div>



<Header />

<main class="overflow-x-clip">
  {@render children()}
</main>

<Footer />