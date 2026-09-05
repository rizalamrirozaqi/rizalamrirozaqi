<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let containerRef: HTMLElement | undefined = $state();
  let scrollWrapper: HTMLDivElement | undefined = $state();

  const projects = [
    { 
      id: '01', 
      title: 'AMV Compositing', 
      desc: 'Koreografi aksi dengan Twixtor, Sapphire, dan Optical Flares.',
      color: 'text-sky-400',
      bg: 'bg-gray-900'
    },
    { 
      id: '02', 
      title: '3D Environments', 
      desc: 'Modeling dan rendering tata letak kota serta lokomotif menggunakan Blender 4.4.',
      color: 'text-white',
      bg: 'bg-gray-800'
    },
    { 
      id: '03', 
      title: 'Quizu Platform', 
      desc: 'Pengembangan front-end interaktif untuk platform competitive programming.',
      color: 'text-gray-400',
      bg: 'bg-gray-950'
    }
  ];

  onMount(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (containerRef && scrollWrapper) {
      // Setup horizontal scroll
      const sections = gsap.utils.toArray('.gallery-item') as HTMLElement[];
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef,
          pin: true,
          scrub: 1, // Efek inersia yang smooth
          snap: 1 / (sections.length - 1), // Otomatis mengunci ke proyek terdekat
          end: () => "+=" + scrollWrapper!.offsetWidth
        }
      });
    }
  });
</script>

<section bind:this={containerRef} class="h-screen w-full overflow-hidden bg-gray-900 z-20 relative text-white">
  
  <div class="absolute top-12 left-12 z-30 pointer-events-none mix-blend-difference">
    <h2 class="font-bebas text-4xl tracking-widest text-white">SELECTED WORKS</h2>
  </div>

  <div class="absolute bottom-12 right-12 z-30 pointer-events-none mix-blend-difference flex items-center gap-4">
    <span class="text-sm font-mono tracking-widest uppercase text-gray-400">Scroll to explore</span>
    <div class="w-16 h-[1px] bg-white"></div>
  </div>

  <!-- Wrapper yang akan bergeser ke kiri -->
  <div bind:this={scrollWrapper} class="flex h-full w-[300vw] relative">
    
    {#each projects as project}
      <div class="gallery-item w-screen h-full flex flex-col items-center justify-center relative flex-shrink-0 {project.bg} border-r border-gray-800">
        
        <!-- Elemen Dekoratif Nomor Belakang -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-bebas text-white/5 pointer-events-none select-none leading-none">
          {project.id}
        </div>

        <div class="z-10 flex flex-col md:flex-row items-center gap-12 max-w-7xl px-8 w-full">
          <!-- Area Media (Video/Gambar) -->
          <div class="w-full md:w-3/5 aspect-video bg-gray-950 rounded-lg overflow-hidden shadow-2xl relative group cursor-pointer border border-gray-800">
            <!-- Ganti dengan video render aslimu -->
            <div class="absolute inset-0 bg-gray-800/50 flex items-center justify-center text-gray-500 font-mono">
              [ Media Thumbnail / Video ]
            </div>
            
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>

          <!-- Area Teks -->
          <div class="w-full md:w-2/5 flex flex-col gap-6">
            <span class="text-xl font-mono {project.color}">{project.id}</span>
            <h3 class="font-bebas text-6xl md:text-8xl tracking-tight leading-none {project.color}">{project.title}</h3>
            <p class="text-lg md:text-xl text-gray-400 font-playfair italic max-w-md">
              {project.desc}
            </p>
            <button class="mt-4 w-fit px-8 py-3 border border-gray-500 hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm tracking-widest uppercase rounded-xl">
              View Project
            </button>
          </div>
        </div>

      </div>
    {/each}

  </div>
</section>