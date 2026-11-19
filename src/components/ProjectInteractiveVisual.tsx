import React, { useEffect, useState } from 'react';
import {
  Power,
  SlidersHorizontal,
  Layers,
  Box,
  Play,
  Pause,
  Plus,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectInteractiveVisualProps {
  project: ProjectItem;
  compact?: boolean;
}

export const ProjectInteractiveVisual: React.FC<ProjectInteractiveVisualProps> = ({
  project,
  compact = false,
}) => {
  // 1. Quadcopter SOLIDWORKS CAD state
  const [armSpanMm, setArmSpanMm] = useState(310);
  const [explodedMm, setExplodedMm] = useState(compact ? 8 : 16);
  const [rotorsActive, setRotorsActive] = useState(false);

  // 2. LED Control Simulator state
  const [ledAutoBlink, setLedAutoBlink] = useState(true);
  const [ledOn, setLedOn] = useState(true);
  const [blinkMs, setBlinkMs] = useState(650);

  // 3. Servo Control Simulator state (Potentiometer ADC 0..1023 -> 0..180 deg)
  const [adcValue, setAdcValue] = useState(512);
  const servoAngle = Math.round((adcValue / 1023) * 180);
  const voltage = ((adcValue / 1023) * 5).toFixed(2);
  const pwmUs = Math.round(544 + (servoAngle / 180) * (2400 - 544));

  // 4. Iron-Conveyor Belt AI Simulator state
  const [beltRunning, setBeltRunning] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(78);
  const [conveyorTick, setConveyorTick] = useState(0);
  const [sampleType, setSampleType] = useState<'Iron Ore' | 'Alloy Scrap' | 'Polymer'>('Iron Ore');
  const detectedScore = sampleType === 'Iron Ore' ? 92 : sampleType === 'Alloy Scrap' ? 81 : 34;
  const isSortedIron = detectedScore >= confidenceThreshold;

  // 5. Study-Helper Desk Mode state
  const [deskMode, setDeskMode] = useState<'Focus' | 'Ambient' | 'Posture'>('Focus');

  useEffect(() => {
    if (project.interactiveType !== 'led' || !ledAutoBlink) return;
    const id = window.setInterval(() => {
      setLedOn((prev) => !prev);
    }, blinkMs);
    return () => window.clearInterval(id);
  }, [project.interactiveType, ledAutoBlink, blinkMs]);

  useEffect(() => {
    if (project.interactiveType !== 'conveyor' || !beltRunning) return;
    const id = window.setInterval(() => {
      setConveyorTick((t) => (t + 4) % 100);
    }, 90);
    return () => window.clearInterval(id);
  }, [project.interactiveType, beltRunning]);

  const containerClass = compact
    ? 'w-full h-full bg-[#0E2440] border border-[#2E5280] rounded-[6px] p-3 flex flex-col justify-between'
    : 'w-full min-h-[290px] bg-[#0E2440] border border-[#2E5280] rounded-xl p-6 flex flex-col justify-between';

  // 1. QUADCOPTER 3D CAD SANDBOX
  if (project.interactiveType === 'quadcopter') {
    const scaleFactor = 0.72 + ((armSpanMm - 220) / 230) * 0.36;
    const rotorR = Math.round(18 * scaleFactor);
    const propClearanceMm = Math.round(armSpanMm * 0.19);

    return (
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-[10px] font-mono-data uppercase tracking-[0.06em] text-[#D0DAE6]">
          <span>SOLIDWORKS · CAD</span>
          <span>{armSpanMm}mm · CLR {propClearanceMm}mm</span>
        </div>

        <div className="flex items-center justify-center my-1">
          <svg
            viewBox="0 0 260 150"
            className={compact ? 'w-48 h-24' : 'w-72 h-44'}
            aria-label="Quadcopter 3D SOLIDWORKS parametric isometric assembly"
          >
            <polygon
              points="130,18 232,72 130,126 28,72"
              fill="rgba(255,255,255,0.04)"
              stroke="#2E5280"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            <g transform={`translate(0, ${explodedMm * 0.65})`}>
              <polygon
                points="130,62 162,79 130,96 98,79"
                fill="rgba(255,255,255,0.06)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <line x1="106" y1="84" x2="106" y2="96" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="154" y1="84" x2="154" y2="96" stroke="#94A3B8" strokeWidth="1.5" />
            </g>

            <g transform={`translate(130, 74) scale(${scaleFactor}) translate(-130, -74)`}>
              <line x1="72" y1="44" x2="188" y2="104" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="188" y1="44" x2="72" y2="104" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

              <polygon
                points="130,58 158,74 130,90 102,74"
                fill="#153358"
                stroke="#FFFFFF"
                strokeWidth="1.6"
              />

              {[
                { cx: 72, cy: 44 },
                { cx: 188, cy: 44 },
                { cx: 72, cy: 104 },
                { cx: 188, cy: 104 },
              ].map((m, idx) => (
                <g key={idx}>
                  <circle cx={m.cx} cy={m.cy} r="6.5" fill="#153358" stroke="#FFFFFF" strokeWidth="1.3" />
                  <g transform={`translate(0, ${-explodedMm * 0.75})`}>
                    <line
                      x1={m.cx}
                      y1={m.cy}
                      x2={m.cx}
                      y2={m.cy + explodedMm * 0.75}
                      stroke="#94A3B8"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <ellipse
                      cx={m.cx}
                      cy={m.cy}
                      rx={rotorR}
                      ry={rotorR * 0.56}
                      fill={rotorsActive ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255,255,255,0.08)'}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                    <line
                      x1={m.cx - rotorR + 2}
                      y1={m.cy}
                      x2={m.cx + rotorR - 2}
                      y2={m.cy}
                      stroke="#FFFFFF"
                      strokeWidth="1.3"
                    />
                  </g>
                </g>
              ))}
            </g>

            <g transform={`translate(0, ${-explodedMm * 0.55})`}>
              <polygon
                points="130,54 152,66 130,78 108,66"
                fill="rgba(255, 255, 255, 0.18)"
                stroke="#FFFFFF"
                strokeWidth="1.3"
              />
            </g>
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2E5280]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono-data text-[#D0DAE6]">
            <Box className="w-3 h-3 text-[#FFFFFF]" />
            <span>Explode</span>
            <input
              type="range"
              min={0}
              max={28}
              value={explodedMm}
              onChange={(e) => setExplodedMm(Number(e.target.value))}
              aria-label="Exploded assembly offset"
              className="w-14 accent-[#FFFFFF] cursor-pointer"
            />
          </div>

          {!compact && (
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono-data text-[#D0DAE6]">
              <span>Arm Span</span>
              <input
                type="range"
                min={220}
                max={450}
                step={10}
                value={armSpanMm}
                onChange={(e) => setArmSpanMm(Number(e.target.value))}
                aria-label="Quadcopter arm span"
                className="w-20 accent-[#FFFFFF] cursor-pointer"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setRotorsActive((r) => !r)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] bg-[#153358] hover:bg-[#1D4475] border border-[#3B6496] text-white rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Power className="w-3 h-3" />
            <span>{rotorsActive ? 'Stop' : 'Spin'}</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. ARDUINO LED CONTROL
  if (project.interactiveType === 'led') {
    return (
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-[10px] font-mono-data uppercase tracking-[0.06em] text-[#D0DAE6]">
          <span>PIN 13 · DIGITAL</span>
          <span>{ledOn ? 'HIGH (5.0V)' : 'LOW (0.0V)'}</span>
        </div>

        <div className="flex items-center justify-center my-2">
          <div
            className="w-14 h-14 rounded-full border transition-all duration-150 flex items-center justify-center"
            style={{
              borderColor: ledOn ? '#FFFFFF' : '#2E5280',
              backgroundColor: ledOn ? 'rgba(255, 255, 255, 0.25)' : '#153358',
              boxShadow: ledOn ? '0 0 28px rgba(255, 255, 255, 0.55)' : 'none',
            }}
          >
            <div
              className="w-5 h-5 rounded-full transition-colors duration-150"
              style={{
                backgroundColor: ledOn ? '#FFFFFF' : '#2E5280',
              }}
            />
          </div>
        </div>

        {!compact && (
          <div className="mb-3 px-3 py-2 bg-[#153358] border border-[#2E5280] rounded font-mono-data text-[11px] text-white">
            <span className="text-[#D0DAE6]">serial&gt; </span>
            digitalWrite(13, {ledOn ? 'HIGH' : 'LOW'}); // delay({blinkMs}ms)
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#2E5280]">
          <button
            type="button"
            onClick={() => setLedAutoBlink((prev) => !prev)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] bg-[#153358] hover:bg-[#1D4475] border border-[#3B6496] text-white rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Power className="w-3 h-3" />
            <span>{ledAutoBlink ? 'Pause' : 'Auto'}</span>
          </button>

          {ledAutoBlink ? (
            <div className="flex items-center gap-2 text-[10px] font-mono-data text-[#D0DAE6]">
              <input
                type="range"
                min={200}
                max={1200}
                step={50}
                value={blinkMs}
                onChange={(e) => setBlinkMs(Number(e.target.value))}
                aria-label="Blink interval milliseconds"
                className="w-16 accent-[#FFFFFF] cursor-pointer"
              />
              <span>{blinkMs}ms</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLedOn((prev) => !prev)}
              className="px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] bg-white text-[#153358] font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Toggle
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. POTENTIOMETER SERVO CONTROL
  if (project.interactiveType === 'servo') {
    return (
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-[10px] font-mono-data uppercase tracking-[0.06em] text-[#D0DAE6]">
          <span>A0 ADC: {adcValue} ({voltage}V)</span>
          <span>SERVO: {servoAngle}°</span>
        </div>

        <div className="flex items-center justify-center my-1">
          <svg
            viewBox="0 0 180 100"
            className="w-40 h-20 overflow-visible"
            aria-label={`Servo arm at ${servoAngle} degrees`}
          >
            <path
              d="M 20 85 A 70 70 0 0 1 160 85"
              fill="none"
              stroke="#2E5280"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line x1="90" y1="85" x2="20" y2="85" stroke="#2E5280" strokeWidth="1" />
            <line x1="90" y1="85" x2="160" y2="85" stroke="#2E5280" strokeWidth="1" />
            <g
              style={{
                transformOrigin: '90px 85px',
                transform: `rotate(${servoAngle - 90}deg)`,
                transition: 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <rect x="85" y="20" width="10" height="65" rx="5" fill="#FFFFFF" />
              <circle cx="90" cy="28" r="2.5" fill="#153358" />
            </g>
            <circle cx="90" cy="85" r="8.5" fill="#153358" stroke="#FFFFFF" strokeWidth="1.6" />
          </svg>
        </div>

        {!compact && (
          <div className="mb-3 px-3 py-2 bg-[#153358] border border-[#2E5280] rounded font-mono-data text-[11px] text-white">
            <span className="text-[#D0DAE6]">serial&gt; </span>
            map({adcValue}, 0, 1023, 0, 180) =&gt; {servoAngle}° · PWM {pwmUs}µs
          </div>
        )}

        <div className="flex items-center gap-3 pt-2 border-t border-[#2E5280]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-white shrink-0" />
          <input
            type="range"
            min={0}
            max={1023}
            value={adcValue}
            onChange={(e) => setAdcValue(Number(e.target.value))}
            aria-label="Potentiometer analog input"
            className="w-full accent-[#FFFFFF] cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 4. IRON-CONVEYOR BELT AI
  if (project.interactiveType === 'conveyor') {
    const itemX = 36 + (conveyorTick / 100) * 146;
    return (
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-[10px] font-mono-data uppercase tracking-[0.06em] text-[#D0DAE6]">
          <span>AI · {sampleType.toUpperCase()}</span>
          <span>CONF {detectedScore}%</span>
        </div>

        <div className="flex items-center justify-center my-1">
          <svg
            viewBox="0 0 240 100"
            className="w-full max-w-[220px] h-20"
            aria-label="Iron-Conveyor Belt AI schematic"
          >
            <rect
              x="20"
              y="62"
              width="200"
              height="20"
              rx="10"
              fill="none"
              stroke="#3B6496"
              strokeWidth="1.8"
            />
            <circle cx="34" cy="72" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
            <circle cx="120" cy="72" r="5.5" fill="none" stroke="#94A3B8" strokeWidth="1.6" />
            <circle cx="206" cy="72" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />

            <rect
              x={itemX}
              y="44"
              width="20"
              height="16"
              rx="2"
              fill={isSortedIron ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.12)'}
              stroke="#FFFFFF"
              strokeWidth="1.4"
            />

            <path d="M 120 18 L 120 42" stroke="#FFFFFF" strokeWidth="1.3" strokeDasharray="3 3" />
            <rect
              x="92"
              y="4"
              width="56"
              height="15"
              rx="2"
              fill="#153358"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <text x="120" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="JetBrains Mono">
              AI SENSOR
            </text>
          </svg>
        </div>

        {!compact && (
          <div className="mb-3 px-3 py-2 bg-[#153358] border border-[#2E5280] rounded font-mono-data text-[11px] text-white">
            <span className="text-[#D0DAE6]">classifier&gt; </span>
            sample=&quot;{sampleType}&quot; score={detectedScore}% =&gt;{' '}
            {isSortedIron ? 'ACTUATE IRON DIVERT' : 'PASS STANDARD LANE'}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2E5280]">
          <button
            type="button"
            onClick={() => setBeltRunning((r) => !r)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] bg-[#153358] border border-[#3B6496] text-white rounded cursor-pointer"
          >
            {beltRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{beltRunning ? 'Pause' : 'Run'}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setSampleType((prev) =>
                prev === 'Iron Ore'
                  ? 'Alloy Scrap'
                  : prev === 'Alloy Scrap'
                  ? 'Polymer'
                  : 'Iron Ore'
              )
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] bg-[#153358] border border-[#3B6496] text-white rounded cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Sample</span>
          </button>

          {!compact && (
            <div className="flex items-center gap-2 text-[10px] font-mono-data text-[#D0DAE6]">
              <span>Thr {confidenceThreshold}%</span>
              <input
                type="range"
                min={50}
                max={95}
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                aria-label="AI detection threshold"
                className="w-16 accent-[#FFFFFF] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 5. STUDY-HELPER DESK
  const modeReadout =
    deskMode === 'Focus'
      ? 'POMODORO MCU TIMER: 25:00 ACTIVE'
      : deskMode === 'Ambient'
      ? 'LDR SENSOR: 340 LUX -> LED PWM 72%'
      : 'ULTRASONIC ERGONOMIC DIST: 54 CM (OK)';

  return (
    <div className={containerClass} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between text-[10px] font-mono-data uppercase tracking-[0.06em] text-[#D0DAE6]">
        <span>DESK · {deskMode.toUpperCase()}</span>
        <span>EMBEDDED</span>
      </div>

      <div className="flex items-center justify-center my-1">
        <svg
          viewBox="0 0 240 100"
          className="w-full max-w-[210px] h-20"
          aria-label="Study-Helper Desk blueprint"
        >
          <rect
            x="36"
            y="20"
            width="168"
            height="58"
            rx="3"
            fill="none"
            stroke="#3B6496"
            strokeWidth="1.5"
          />
          <line x1="36" y1="60" x2="204" y2="60" stroke="#2E5280" strokeWidth="1" />
          <rect
            x="52"
            y="30"
            width="54"
            height="22"
            rx="2"
            fill={deskMode === 'Focus' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)'}
            stroke="#FFFFFF"
            strokeWidth="1.3"
          />
          <rect
            x="122"
            y="30"
            width="66"
            height="22"
            rx="2"
            fill={deskMode !== 'Focus' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)'}
            stroke="#94A3B8"
            strokeWidth="1"
          />
          <line x1="60" y1="78" x2="60" y2="92" stroke="#D0DAE6" strokeWidth="2" />
          <line x1="180" y1="78" x2="180" y2="92" stroke="#D0DAE6" strokeWidth="2" />
        </svg>
      </div>

      {!compact && (
        <div className="mb-3 px-3 py-2 bg-[#153358] border border-[#2E5280] rounded font-mono-data text-[11px] text-white">
          <span className="text-[#D0DAE6]">desk-os&gt; </span>
          {modeReadout}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#2E5280]">
        <div className="flex items-center gap-1">
          {(['Focus', 'Ambient', 'Posture'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setDeskMode(m)}
              className={`px-2 py-1 text-[10px] uppercase tracking-[0.06em] rounded transition-colors cursor-pointer ${
                deskMode === m
                  ? 'bg-white text-[#153358] font-semibold'
                  : 'bg-[#153358] border border-[#3B6496] text-[#D0DAE6] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#D0DAE6] font-mono-data">
          <Layers className="w-3 h-3" />
          05
        </span>
      </div>
    </div>
  );
};
