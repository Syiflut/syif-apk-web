"use client";

import { useEffect, useRef, useState } from "react";

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Menggunakan URL siluet elang berwarna cerah (putih/keemasan)
  const eagleImageUrl =
    "https://cdn.pixabay.com/photo/2021/08/30/14/05/bird-6586026_1280.png";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Titik posisi mouse untuk interaksi
    const mouse = { x: width / 2, y: height / 2 };

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Persiapan Gambar Elang
    const eagleImg = new Image();
    eagleImg.src = eagleImageUrl;

    const eagle = {
      x: width * 0.6, // Posisi di area atas kanan
      y: height * 0.15,
      width: 260, // Ukuran elang diperbesar
      height: 260,
      vx: 0.2,
      alpha: 0.95, // Dibuat jelas/tidak samar (95% solid)
    };

    // Buat 100 partikel (diperbanyak)
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1, // Partikel agak diperbesar
        vx: (Math.random() - 0.5) * 0.4, // Sedikit diperlambat
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.8 + 0.4, // Jauh lebih terang (range 0.4 - 1.0)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gambar Elang Terang yang Melayang (Melayang perlahan di latar belakang)
      if (eagleImg.complete) {
        // Melayang pelan
        eagle.x += eagle.vx;

        // Sedikit bereaksi terhadap mouse (4D reaction)
        const eagleDX = (mouse.x - width / 2) * 0.02;
        const eagleDY = (mouse.y - height / 2) * 0.02;
        const targetX = eagle.x + eagleDX;
        const targetY = eagle.y + eagleDY;

        // Loop batas layar elang
        if (eagle.x > width + eagle.width) eagle.x = -eagle.width;

        // Menambahkan opacity dan render
        ctx.globalAlpha = eagle.alpha;
        ctx.drawImage(eagleImg, targetX, targetY, eagle.width, eagle.height);
        ctx.globalAlpha = 1.0; // Reset
      }

      // Gambar Partikel Terang dan Interaktif
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Loop batas layar
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Jarak partikel ke mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Jika dekat, partikel bereaksi terhadap mouse (4D reaction)
        if (distance < 120) {
          const force = (120 - distance) / 120;
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
          p.alpha = Math.min(1.0, p.alpha + 0.05); // Tambah terang saat didekati
        } else {
          p.alpha = Math.max(0.4, p.alpha - 0.01); // Kembali ke terang asal
        }

        // Gambar titik partikel bercahaya (Emerald & Terang)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Meningkatkan saturasi warna emerald
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.shadowBlur = 15; // Menambah efek cahaya/glow
        ctx.shadowColor = "#10b981";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }} // Berada di antara foto gunung dan konten
    />
  );
}
