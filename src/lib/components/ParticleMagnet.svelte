<script lang="ts">
  import { onMount } from 'svelte';

  let canvasRef: HTMLCanvasElement | undefined = $state();
  let containerRef: HTMLDivElement | undefined = $state();

  let isVisible = false;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    mass: number;
    angle: number;
    angularVelocity: number;
    magnetRadius: number;
  }

  onMount(() => {
    if (!canvasRef || !containerRef) return;

    const ctx = canvasRef.getContext('2d');

    if (!ctx) return;

    // =====================================================
    // CANVAS SIZE
    // =====================================================

    let width = containerRef.clientWidth || 800;
    let height = containerRef.clientHeight || 400;

    let isMobile = width < 640;

    const resizeCanvas = () => {
      if (!canvasRef || !containerRef) return;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width = containerRef.clientWidth || 800;
      height = containerRef.clientHeight || 400;

      isMobile = width < 640;

      canvasRef.width = Math.round(width * dpr);
      canvasRef.height = Math.round(height * dpr);

      canvasRef.style.width = `${width}px`;
      canvasRef.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resizeCanvas();

    // =====================================================
    // PARTICLES
    // =====================================================

    const particles: Particle[] = [];

    // Tetap cukup banyak, tapi mobile lebih ringan
    const NUM = isMobile ? 45 : 100;

    // Particle size
    const SIZE = isMobile ? 6 : 7;

    // Jarak antar particle
    // Jangan terlalu besar karena jumlah particle cukup banyak.
    const SAFE_DISTANCE = isMobile
      ? 34
      : 42;

    const INITIAL_DISTANCE = SAFE_DISTANCE;

    const rand = (a: number, b: number) =>
      a + Math.random() * (b - a);

    // =====================================================
    // INITIAL PARTICLES
    // =====================================================

    for (let i = 0; i < NUM; i++) {
      let x = 0;
      let y = 0;
      let attempts = 0;

      do {
        x = rand(
          SIZE,
          Math.max(SIZE, width - SIZE)
        );

        y = rand(
          SIZE,
          Math.max(SIZE, height - SIZE)
        );

        attempts++;

        const tooClose = particles.some((p) => {
          const dx = x - p.x;
          const dy = y - p.y;

          const dist = Math.sqrt(
            dx * dx + dy * dy
          );

          return dist < INITIAL_DISTANCE;
        });

        if (!tooClose) break;
      } while (attempts < 100);

      particles.push({
        x,
        y,

        // Gerakan awal kecil
        vx: rand(
          isMobile ? -0.5 : -0.8,
          isMobile ? 0.5 : 0.8
        ),

        vy: rand(
          isMobile ? -0.5 : -0.8,
          isMobile ? 0.5 : 0.8
        ),

        size: SIZE,

        mass: SIZE * 0.8,

        angle: rand(
          0,
          Math.PI * 2
        ),

        angularVelocity: rand(
          -0.015,
          0.015
        ),

        // Tidak ada magnet antar particle
        magnetRadius: 0
      });
    }

    // =====================================================
    // MOUSE
    // =====================================================

    const mouse = {
      x: -9999,
      y: -9999,
      active: false
    };

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      if (!canvasRef) return;

      const rect =
        canvasRef.getBoundingClientRect();

      mouse.x =
        event.clientX - rect.left;

      mouse.y =
        event.clientY - rect.top;

      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;

      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvasRef.addEventListener(
      'mousemove',
      handleMouseMove
    );

    canvasRef.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    // =====================================================
    // PHYSICS
    // =====================================================

    // Mouse interaction
    const MOUSE_RADIUS = isMobile
      ? 100
      : 120;

    const MOUSE_FORCE = isMobile
      ? 5000
      : 8000;

    // =====================================================
    // IMPORTANT
    // =====================================================
    // Tidak memakai gravity agar particle
    // tidak menumpuk di bagian bawah.
    // =====================================================

    const GRAVITY = 0.05;

    // Bounce lembut
    const BOUNCE = isMobile
      ? -0.35
      : -0.5;

    // Friction
    const FRICTION = isMobile
      ? 0.985
      : 0.99;

    // Seberapa kuat particle dipisahkan
    // ketika terlalu dekat.
    const COLLISION_PUSH = isMobile
      ? 0.35
      : 0.4;

    // =====================================================
    // DRAW
    // =====================================================

    let animationId: number;

    const draw = () => {
      animationId =
        requestAnimationFrame(draw);

      if (!isVisible) return;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      // ===================================================
      // PARTICLE PHYSICS
      // ===================================================

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const p = particles[i];

        // =================================================
        // PARTICLE COLLISION
        // =================================================

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const p2 = particles[j];

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;

          const dist =
            Math.sqrt(
              dx * dx + dy * dy
            ) || 0.0001;

          if (
            dist < SAFE_DISTANCE
          ) {
            const overlap =
              SAFE_DISTANCE - dist;

            /*
             * Positional separation saja.
             *
             * Tidak memberikan velocity,
             * sehingga particle tidak saling
             * "menendang" atau mental.
             */

            const push =
              overlap *
              COLLISION_PUSH;

            const nx = dx / dist;
            const ny = dy / dist;

            p.x += nx * push;
            p.y += ny * push;

            p2.x -= nx * push;
            p2.y -= ny * push;
          }
        }

        // =================================================
        // MOUSE MAGNET
        // =================================================

        if (mouse.active) {
          const dx =
            p.x - mouse.x;

          const dy =
            p.y - mouse.y;

          const distSq =
            dx * dx + dy * dy;

          const dist =
            Math.sqrt(distSq) || 1;

          if (
            dist < MOUSE_RADIUS
          ) {
            const force =
              (
                MOUSE_FORCE /
                Math.max(
                  distSq,
                  40
                )
              ) /
              p.mass;

            p.vx +=
              (dx / dist) * force;

            p.vy +=
              (dy / dist) * force;
          }
        }

        // =================================================
        // MOVEMENT
        // =================================================

        // Gravity sengaja 0
        p.vy += GRAVITY;

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        // =================================================
        // VELOCITY LIMIT
        // =================================================

        const maxVelocity = isMobile
          ? 1.8
          : 2.2;

        p.vx = Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            p.vx
          )
        );

        p.vy = Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            p.vy
          )
        );

        // =================================================
        // ROTATION
        // =================================================

        p.angle +=
          p.angularVelocity +
          p.vx * 0.02;

        // =================================================
        // LEFT WALL
        // =================================================

        if (
          p.x - p.size < 0
        ) {
          p.x = p.size;

          // Hanya mantulkan kalau sedang bergerak
          if (p.vx < 0) {
            p.vx *= BOUNCE;
          }
        }

        // =================================================
        // RIGHT WALL
        // =================================================

        if (
          p.x + p.size > width
        ) {
          p.x =
            width - p.size;

          if (p.vx > 0) {
            p.vx *= BOUNCE;
          }
        }

        // =================================================
        // TOP WALL
        // =================================================

        if (
          p.y - p.size < 0
        ) {
          p.y = p.size;

          if (p.vy < 0) {
            p.vy *= BOUNCE;
          }
        }

        // =================================================
        // BOTTOM WALL
        // =================================================

        if (
          p.y + p.size > height
        ) {
          p.y =
            height - p.size;

          if (p.vy > 0) {
            p.vy *= BOUNCE;
          }
        }

        // =================================================
        // RENDER
        // =================================================

        ctx.save();

        ctx.translate(
          p.x,
          p.y
        );

        ctx.rotate(
          p.angle / 7
        );

        ctx.globalAlpha = 0.85;

        ctx.fillStyle =
          '#ffffff';

        ctx.fillRect(
          -p.size,
          -p.size,
          p.size * 2,
          p.size * 2
        );

        ctx.restore();
      }
    };

    // =====================================================
    // VISIBILITY
    // =====================================================

    const observer =
      new IntersectionObserver(
        (entries) => {
          isVisible =
            entries[0]
              ?.isIntersecting ??
            false;
        },
        {
          threshold: 0
        }
      );

    observer.observe(
      containerRef
    );

    // =====================================================
    // RESIZE OBSERVER
    // =====================================================

    const resizeObserver =
      new ResizeObserver(() => {
        resizeCanvas();
      });

    resizeObserver.observe(
      containerRef
    );

    // =====================================================
    // START
    // =====================================================

    draw();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelAnimationFrame(
        animationId
      );

      observer.disconnect();

      resizeObserver.disconnect();

      canvasRef?.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      canvasRef?.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  });
</script>

<!-- =========================================================
     PARTICLE CONTAINER
   ========================================================= -->

<div
  bind:this={containerRef}
  class="pointer-events-auto relative h-full w-full overflow-hidden"
>
  <canvas
    bind:this={canvasRef}
    class="pointer-events-auto absolute inset-0 block h-full w-full bg-transparent"
  ></canvas>
</div>