// 主题 CSS 变量 — 参考 Linear 的暗色系统
type Theme = 'dark' | 'light' | 'matchday';

export const THEME_CSS: Record<Theme, string> = {
  dark: `
    :root {
      --bg: #08090a;
      --bg-2: #0f1011;
      --bg-3: #191a1b;
      --text: #f7f8f8;
      --text-2: #d0d6e0;
      --text-3: #8a8f98;
      --text-4: #62666d;
      --gold: #FFD54F;
      --gold-dark: #FFA726;
      --green: #00E676;
      --green-dark: #00C853;
      --red: #FF5252;
      --red-dark: #D32F2F;
      --blue: #7170ff;
      --glass: rgba(255,255,255,0.02);
      --glass-border: rgba(255,255,255,0.06);
      --glass-hover: rgba(255,255,255,0.04);
    }
    body {
      background: var(--bg);
      color: var(--text);
      background-image:
        radial-gradient(ellipse at 50% 0%, rgba(0,230,118,0.02) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(255,82,82,0.015) 0%, transparent 40%);
    }
  `,
  light: `
    :root {
      --bg: #F8F9FA;
      --bg-2: #FFFFFF;
      --bg-3: #F0F2F5;
      --text: #1A1A2E;
      --text-2: #6B7280;
      --text-3: #9CA3AF;
      --text-4: #D1D5DB;
      --gold: #D97706;
      --gold-dark: #B45309;
      --green: #059669;
      --green-dark: #047857;
      --red: #DC2626;
      --red-dark: #B91C1C;
      --blue: #533afd;
      --glass: rgba(0,0,0,0.02);
      --glass-border: rgba(0,0,0,0.06);
      --glass-hover: rgba(0,0,0,0.04);
    }
    body {
      background: var(--bg);
      color: var(--text);
      background-image:
        radial-gradient(ellipse at 50% 0%, rgba(5,150,105,0.03) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(220,38,38,0.02) 0%, transparent 40%);
    }
    .glass-card {
      background: var(--bg-2);
      border-color: var(--glass-border);
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .glass-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .gold-gradient {
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,
  matchday: `
    :root {
      --bg: #0A0F0A;
      --bg-2: #0F1A0F;
      --bg-3: #142014;
      --text: #E8F5E9;
      --text-2: #81C784;
      --text-3: #4CAF50;
      --text-4: #2E7D32;
      --gold: #FFD54F;
      --gold-dark: #FFA726;
      --green: #66BB6A;
      --green-dark: #43A047;
      --red: #EF5350;
      --red-dark: #E53935;
      --blue: #4FC3F7;
      --glass: rgba(76,175,80,0.04);
      --glass-border: rgba(76,175,80,0.08);
      --glass-hover: rgba(76,175,80,0.06);
    }
    body {
      background: var(--bg);
      color: var(--text);
      background-image:
        radial-gradient(ellipse at 50% 50%, rgba(76,175,80,0.04) 0%, transparent 60%),
        radial-gradient(ellipse at 20% 80%, rgba(255,213,79,0.02) 0%, transparent 40%);
    }
    .pulse-dot::before {
      background: #66BB6A;
      box-shadow: 0 0 12px #66BB6A, 0 0 24px rgba(102,187,106,0.3);
    }
  `,
};
