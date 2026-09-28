/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}",
    "./config/**/*.{js,ts}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#080c14",
          surface: "#0d1322",
          card: "#111827",
          "card-hover": "#172033",
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(99, 102, 241, 0.3)",
          muted: "#94a3b8",
          subtle: "#64748b"
        },
        brand: {
          blue: "#38bdf8",
          cyan: "#06b6d4",
          indigo: "#6366f1",
          violet: "#a855f7",
          emerald: "#10b981"
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif"
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-glow": "radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.08) 0px, transparent 50%)"
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        }
      }
    }
  },
  plugins: []
};
