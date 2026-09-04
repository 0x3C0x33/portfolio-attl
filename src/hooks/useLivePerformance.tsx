// src/hooks/useLivePerformance.tsx
import { useState, useEffect, useCallback } from 'react';

export interface LiveMetrics {
  // Core Web Vitals
  fcp: number | null;        // First Contentful Paint (ms)
  lcp: number | null;        // Largest Contentful Paint (ms)
  cls: number;               // Cumulative Layout Shift
  tbt: number;               // Total Blocking Time (ms from long tasks)
  ttfb: number | null;       // Time to First Byte (ms)
  domLoadTime: number | null;// DOMContentLoaded (ms)
  pageLoadTime: number | null;// Load event (ms)
  
  // Recursos y Red
  resourceCount: number;
  transferSizeBytes: number;
  decodedSizeBytes: number;

  // Memoria (Chromium)
  usedJSHeapMB: number | null;
  totalJSHeapMB: number | null;
  jsHeapLimitMB: number | null;

  // Puntuaciones Calculadas en Vivo (0 - 100)
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };

  // Diagnósticos de auditoría en vivo
  audits: {
    accessibilityIssues: string[];
    bestPracticeIssues: string[];
    seoIssues: string[];
  };

  uptimeSeconds: number;
  isLive: boolean;
  lastUpdated: Date;
}

export function useLivePerformance() {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    fcp: null,
    lcp: null,
    cls: 0,
    tbt: 0,
    ttfb: null,
    domLoadTime: null,
    pageLoadTime: null,
    resourceCount: 0,
    transferSizeBytes: 0,
    decodedSizeBytes: 0,
    usedJSHeapMB: null,
    totalJSHeapMB: null,
    jsHeapLimitMB: null,
    scores: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    audits: {
      accessibilityIssues: [],
      bestPracticeIssues: [],
      seoIssues: [],
    },
    uptimeSeconds: 0,
    isLive: true,
    lastUpdated: new Date(),
  });

  const evaluateLiveAudit = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 1. Navigation Timing
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const nav = navEntries.length > 0 ? navEntries[0] : null;

    let ttfb: number | null = null;
    let domLoadTime: number | null = null;
    let pageLoadTime: number | null = null;
    let transferSizeBytes = 0;
    let decodedSizeBytes = 0;

    if (nav) {
      ttfb = Math.max(0, Math.round(nav.responseStart - nav.requestStart || nav.responseStart));
      domLoadTime = Math.max(0, Math.round(nav.domContentLoadedEventEnd || performance.now()));
      pageLoadTime = Math.max(0, Math.round(nav.loadEventEnd || performance.now()));
      transferSizeBytes = nav.transferSize || 0;
      decodedSizeBytes = nav.decodedBodySize || 0;
    }

    // 2. First Contentful Paint (FCP)
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((e) => e.name === 'first-contentful-paint');
    const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : null;

    // 3. Recursos cargados
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const resourceCount = resourceEntries.length;
    let totalResourceTransfer = transferSizeBytes;
    let totalResourceDecoded = decodedSizeBytes;

    resourceEntries.forEach((r) => {
      totalResourceTransfer += r.transferSize || 0;
      totalResourceDecoded += r.decodedBodySize || 0;
    });

    // 4. Memoria (Performance Memory en Chrome / Edge)
    const perfMemory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
    const usedJSHeapMB = perfMemory ? Number((perfMemory.usedJSHeapSize / (1024 * 1024)).toFixed(2)) : null;
    const totalJSHeapMB = perfMemory ? Number((perfMemory.totalJSHeapSize / (1024 * 1024)).toFixed(2)) : null;
    const jsHeapLimitMB = perfMemory ? Number((perfMemory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)) : null;

    // 5. Auditoría en vivo de Accesibilidad
    const a11yIssues: string[] = [];
    const images = Array.from(document.querySelectorAll('img'));
    const imagesWithoutAlt = images.filter((img) => !img.hasAttribute('alt'));
    if (imagesWithoutAlt.length > 0) {
      a11yIssues.push(`${imagesWithoutAlt.length} imágenes sin atributo 'alt'`);
    }

    const buttons = Array.from(document.querySelectorAll('button'));
    const buttonsWithoutLabel = buttons.filter((btn) => !btn.innerText.trim() && !btn.getAttribute('aria-label') && !btn.getAttribute('title'));
    if (buttonsWithoutLabel.length > 0) {
      a11yIssues.push(`${buttonsWithoutLabel.length} botones sin texto ni aria-label`);
    }

    let a11yScore = 100;
    if (a11yIssues.length > 0) {
      a11yScore = Math.max(70, 100 - a11yIssues.length * 10);
    }

    // 6. Auditoría en vivo de Best Practices
    const bpIssues: string[] = [];
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      bpIssues.push('Conexión no cifrada mediante HTTPS');
    }
    if (document.characterSet.toUpperCase() !== 'UTF-8') {
      bpIssues.push('Juego de caracteres no estándar (se recomienda UTF-8)');
    }
    if (!document.doctype || document.doctype.name !== 'html') {
      bpIssues.push('Doctype HTML5 no detectado');
    }

    let bpScore = 100;
    if (bpIssues.length > 0) {
      bpScore = Math.max(75, 100 - bpIssues.length * 12);
    }

    // 7. Auditoría en vivo de SEO
    const seoIssues: string[] = [];
    if (!document.title || document.title.trim() === '') {
      seoIssues.push('El documento no tiene etiqueta <title>');
    }
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      seoIssues.push('Falta etiqueta meta viewport para dispositivos móviles');
    }
    if (!document.documentElement.lang) {
      seoIssues.push('Atributo "lang" no configurado en <html>');
    }

    let seoScore = 100;
    if (seoIssues.length > 0) {
      seoScore = Math.max(80, 100 - seoIssues.length * 10);
    }

    setMetrics((prev) => {
      // 8. Cálculo de Performance Score basado en Core Web Vitals en vivo
      const currentFcp = fcp ?? prev.fcp ?? 300;
      const currentLcp = prev.lcp ?? (currentFcp + 200);
      const currentCls = prev.cls;
      const currentTbt = prev.tbt;

      let fcpScore = 100;
      if (currentFcp > 3000) fcpScore = 60;
      else if (currentFcp > 1800) fcpScore = 80;
      else if (currentFcp > 1000) fcpScore = 95;

      let lcpScore = 100;
      if (currentLcp > 4000) lcpScore = 60;
      else if (currentLcp > 2500) lcpScore = 80;
      else if (currentLcp > 1500) lcpScore = 95;

      let clsScore = 100;
      if (currentCls > 0.25) clsScore = 60;
      else if (currentCls > 0.1) clsScore = 85;

      let tbtScore = 100;
      if (currentTbt > 600) tbtScore = 60;
      else if (currentTbt > 200) tbtScore = 85;
      else if (currentTbt > 50) tbtScore = 95;

      const perfScore = Math.round(
        fcpScore * 0.25 + lcpScore * 0.35 + clsScore * 0.15 + tbtScore * 0.25
      );

      return {
        ...prev,
        fcp: currentFcp,
        ttfb,
        domLoadTime,
        pageLoadTime,
        resourceCount,
        transferSizeBytes: totalResourceTransfer,
        decodedSizeBytes: totalResourceDecoded,
        usedJSHeapMB,
        totalJSHeapMB,
        jsHeapLimitMB,
        uptimeSeconds: Math.floor(performance.now() / 1000),
        lastUpdated: new Date(),
        scores: {
          performance: Math.min(100, Math.max(0, perfScore)),
          accessibility: a11yScore,
          bestPractices: bpScore,
          seo: seoScore,
        },
        audits: {
          accessibilityIssues: a11yIssues,
          bestPracticeIssues: bpIssues,
          seoIssues: seoIssues,
        },
      };
    });
  }, []);

  useEffect(() => {
    const isSupported = (type: string) => {
      return (
        typeof PerformanceObserver !== 'undefined' &&
        Array.isArray(PerformanceObserver.supportedEntryTypes) &&
        PerformanceObserver.supportedEntryTypes.includes(type)
      );
    };

    // 1. Observador de LCP (Largest Contentful Paint)
    let lcpObserver: PerformanceObserver | null = null;
    if (isSupported('largest-contentful-paint')) {
      try {
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const last = entries[entries.length - 1];
          if (last) {
            setMetrics((prev) => ({
              ...prev,
              lcp: Math.round(last.startTime),
            }));
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {
        // Fallback silencioso
      }
    }

    // 2. Observador de CLS (Cumulative Layout Shift)
    let clsObserver: PerformanceObserver | null = null;
    if (isSupported('layout-shift')) {
      try {
        clsObserver = new PerformanceObserver((entryList) => {
          let addedCls = 0;
          for (const entry of entryList.getEntries()) {
            const shift = entry as unknown as { hadRecentInput?: boolean; value?: number };
            if (!shift.hadRecentInput && shift.value) {
              addedCls += shift.value;
            }
          }
          if (addedCls > 0) {
            setMetrics((prev) => ({
              ...prev,
              cls: Number((prev.cls + addedCls).toFixed(4)),
            }));
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch {
        // Fallback silencioso
      }
    }

    // 3. Observador de TBT / Long Tasks (tareas > 50ms)
    let longTaskObserver: PerformanceObserver | null = null;
    if (isSupported('longtask')) {
      try {
        longTaskObserver = new PerformanceObserver((entryList) => {
          let addedBlocking = 0;
          for (const entry of entryList.getEntries()) {
            if (entry.duration > 50) {
              addedBlocking += entry.duration - 50;
            }
          }
          if (addedBlocking > 0) {
            setMetrics((prev) => ({
              ...prev,
              tbt: Math.round(prev.tbt + addedBlocking),
            }));
          }
        });
        longTaskObserver.observe({ type: 'longtask', buffered: true });
      } catch {
        // Fallback silencioso
      }
    }

    // Evaluación inicial diferida para evitar cascading renders síncronos en el efecto
    const initialTimer = setTimeout(() => {
      evaluateLiveAudit();
    }, 0);

    // Polling en vivo cada 1.5s para actualizar telemetría en tiempo real
    const interval = setInterval(() => {
      evaluateLiveAudit();
    }, 1500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      longTaskObserver?.disconnect();
    };
  }, [evaluateLiveAudit]);

  return {
    metrics,
    refreshMetrics: evaluateLiveAudit,
  };
}

