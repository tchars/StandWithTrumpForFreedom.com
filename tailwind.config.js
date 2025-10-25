/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "#e5e7eb",
				input: "#f3f4f6",
				ring: "#3b82f6",
				background: "white",
				foreground: "#111827",
				primary: {
					DEFAULT: "#3b82f6",
					foreground: "white",
				},
				secondary: {
					DEFAULT: "#f3f4f6",
					foreground: "#111827",
				},
				destructive: {
					DEFAULT: "#dc2626",
					foreground: "white",
				},
				muted: {
					DEFAULT: "#f3f4f6",
					foreground: "#6b7280",
				},
				accent: {
					DEFAULT: "#f3f4f6",
					foreground: "#111827",
				},
				popover: {
					DEFAULT: "white",
					foreground: "#111827",
				},
				card: {
					DEFAULT: "white",
					foreground: "#111827",
				},
				"trump-red": {
					DEFAULT: "#dc2626",
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
				},
				"trump-blue": {
					DEFAULT: "#2563eb",
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
				},
				"trump-gold": {
					DEFAULT: "#d97706",
					50: "#fffbeb",
					100: "#fef3c7",
					200: "#fde68a",
					300: "#fcd34d",
					400: "#fbbf24",
					500: "#f59e0b",
					600: "#d97706",
					700: "#b45309",
					800: "#92400e",
					900: "#78350f",
				},
			},
			borderRadius: {
				lg: "0.5rem",
				md: "calc(0.5rem - 2px)",
				sm: "calc(0.5rem - 4px)",
			},
		},
	},
};
