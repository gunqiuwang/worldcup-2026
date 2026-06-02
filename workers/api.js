// 2026 世界杯 Cloudflare Worker — 数据代理 + 缓存
// 部署: npx wrangler deploy

const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world';
const CACHE_TTL = 300; // 5 分钟缓存
const CACHE_TTL_LIVE = 30; // 比赛中 30 秒
const CACHE_TTL_ODDS = 600; // 赔率 10 分钟

// CORS headers
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': `public, max-age=${CACHE_TTL}`,
};

// 中文队名映射
const TEAM_CN = {
  MEX: '墨西哥', RSA: '南非', KOR: '韩国', CZE: '捷克',
  CAN: '加拿大', BIH: '波黑', QAT: '卡塔尔', SUI: '瑞士',
  USA: '美国', PAR: '巴拉圭', AUS: '澳大利亚', TUR: '土耳其',
  HAI: '海地', SCO: '苏格兰', MAR: '摩洛哥', BRA: '巴西',
  GER: '德国', CUW: '库拉索', CIV: '科特迪瓦', ECU: '厄瓜多尔',
  NED: '荷兰', JPN: '日本', SWE: '瑞典', TUN: '突尼斯',
  ESP: '西班牙', CPV: '佛得角', KSA: '沙特', URU: '乌拉圭',
  BEL: '比利时', EGY: '埃及', IRN: '伊朗', NZL: '新西兰',
  FRA: '法国', SEN: '塞内加尔', IRQ: '伊拉克', NOR: '挪威',
  ARG: '阿根廷', ALG: '阿尔及利亚', AUT: '奥地利', JOR: '约旦',
  POR: '葡萄牙', COD: '刚果(金)', UZB: '乌兹别克斯坦', COL: '哥伦比亚',
  ENG: '英格兰', CRO: '克罗地亚', GHA: '加纳', PAN: '巴拿马',
};

// 国旗 emoji 映射
const FLAG = {
  MEX: '🇲🇽', RSA: '🇿🇦', KOR: '🇰🇷', CZE: '🇨🇿',
  CAN: '🇨🇦', BIH: '🇧🇦', QAT: '🇶🇦', SUI: '🇨🇭',
  USA: '🇺🇸', PAR: '🇵🇾', AUS: '🇦🇺', TUR: '🇹🇷',
  HAI: '🇭🇹', SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', MAR: '🇲🇦', BRA: '🇧🇷',
  GER: '🇩🇪', CUW: '🇨🇼', CIV: '🇨🇮', ECU: '🇪🇨',
  NED: '🇳🇱', JPN: '🇯🇵', SWE: '🇸🇪', TUN: '🇹🇳',
  ESP: '🇪🇸', CPV: '🇨🇻', KSA: '🇸🇦', URU: '🇺🇾',
  BEL: '🇧🇪', EGY: '🇪🇬', IRN: '🇮🇷', NZL: '🇳🇿',
  FRA: '🇫🇷', SEN: '🇸🇳', IRQ: '🇮🇶', NOR: '🇳🇴',
  ARG: '🇦🇷', ALG: '🇩🇿', AUT: '🇦🇹', JOR: '🇯🇴',
  POR: '🇵🇹', COD: '🇨🇩', UZB: '🇺🇿', COL: '🇨🇴',
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', CRO: '🇭🇷', GHA: '🇬🇭', PAN: '🇵🇦',
};

// 小组映射（从 ESPN 数据推导）
const GROUPS = {
  A: ['ARG', 'ALG', 'AUT', 'JOR'],
  B: ['USA', 'PAR', 'AUS', 'TUR'],
  C: ['BEL', 'EGY', 'IRN', 'NZL'],
  D: ['CAN', 'BIH', 'QAT', 'SUI'],
  E: ['BRA', 'HAI', 'MAR', 'SCO'],
  F: ['GER', 'CUW', 'CIV', 'ECU'],
  G: ['COL', 'POR', 'COD', 'UZB'],
  H: ['ESP', 'CPV', 'KSA', 'URU'],
  I: ['ENG', 'CRO', 'GHA', 'PAN'],
  J: ['MEX', 'CZE', 'KOR', 'RSA'],
  K: ['FRA', 'IRQ', 'NOR', 'SEN'],
  L: ['NED', 'JPN', 'SWE', 'TUN'],
};

// 反向映射：队伍 → 小组
const TEAM_TO_GROUP = {};
for (const [group, teams] of Object.entries(GROUPS)) {
  for (const team of teams) {
    TEAM_TO_GROUP[team] = group;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    try {
      // 路由
      if (path === '/api/schedule' || path === '/api/schedule/') {
        return jsonResponse(await getSchedule(env), env);
      }
      if (path === '/api/standings' || path === '/api/standings/') {
        return jsonResponse(await getStandings(env), env);
      }
      if (path === '/api/today' || path === '/api/today/') {
        return jsonResponse(await getTodayMatches(env), env);
      }
      if (path === '/api/groups' || path === '/api/groups/') {
        return jsonResponse({ groups: GROUPS, team_cn: TEAM_CN, flags: FLAG }, env);
      }
      if (path === '/api/status' || path === '/api/status/') {
        return jsonResponse({ ok: true, time: new Date().toISOString(), version: '1.0.0' }, env);
      }
      if (path === '/') {
        return Response.redirect(`https://404969.xyz`, 302);
      }

      return new Response('Not Found', { status: 404, headers: CORS });
    } catch (err) {
      return jsonResponse({ error: err.message }, env, 500);
    }
  },
};

// === 数据获取 ===

async function getSchedule(env) {
  const cached = await getCache(env, 'schedule');
  if (cached) return cached;

  const data = await fetchESPN('scoreboard?limit=100&dates=20260611-20260720');
  const events = (data.events || []).map(ev => parseEvent(ev));

  await setCache(env, 'schedule', events, CACHE_TTL);
  return events;
}

async function getStandings(env) {
  const cached = await getCache(env, 'standings');
  if (cached) return cached;

  // 从 ESPN 拉 standings
  const data = await fetchESPN('standings');
  const standings = parseStandings(data);

  await setCache(env, 'standings', standings, CACHE_TTL);
  return standings;
}

async function getTodayMatches(env) {
  const cached = await getCache(env, 'today');
  if (cached) return cached;

  // 今天的时间范围（北京时间）
  const now = new Date();
  const today = now.toISOString().slice(0, 10).replace(/-/g, '');

  const data = await fetchESPN(`scoreboard?dates=${today}&limit=20`);
  const events = (data.events || []).map(ev => parseEvent(ev));

  await setCache(env, 'today', events, CACHE_TTL_LIVE);
  return events;
}

// === ESPN 数据解析 ===

function parseEvent(ev) {
  const comp = ev.competitions?.[0] || {};
  const competitors = comp.competitors || [];
  const home = competitors.find(c => c.homeAway === 'home') || competitors[0] || {};
  const away = competitors.find(c => c.homeAway === 'away') || competitors[1] || {};

  const homeAbbr = home.team?.abbreviation || '';
  const awayAbbr = away.team?.abbreviation || '';

  return {
    id: ev.id,
    date: ev.date,
    name: ev.name,
    short_name: ev.shortName,
    status: comp.status?.type?.state || 'pre',
    status_detail: comp.status?.type?.shortDetail || '',
    clock: comp.status?.displayClock || '',
    venue: comp.venue?.fullName || '',
    city: comp.venue?.address?.city || '',
    group: TEAM_TO_GROUP[homeAbbr] || '',
    home: {
      id: home.id,
      abbr: homeAbbr,
      name: TEAM_CN[homeAbbr] || home.team?.displayName || '',
      name_en: home.team?.displayName || '',
      flag: FLAG[homeAbbr] || '',
      logo: home.team?.logo || '',
      score: parseInt(home.score) || 0,
      record: home.records?.[0]?.summary || '',
      winner: !!home.winner,
    },
    away: {
      id: away.id,
      abbr: awayAbbr,
      name: TEAM_CN[awayAbbr] || away.team?.displayName || '',
      name_en: away.team?.displayName || '',
      flag: FLAG[awayAbbr] || '',
      logo: away.team?.logo || '',
      score: parseInt(away.score) || 0,
      record: away.records?.[0]?.summary || '',
      winner: !!away.winner,
    },
    odds: parseOdds(comp),
  };
}

function parseOdds(comp) {
  const odds = comp.odds?.[0] || {};
  if (!odds.details) return null;
  return {
    provider: odds.provider?.displayName || '',
    home_win_prob: odds.homeWinProbability || null,
    draw_prob: odds.drawProbability || null,
    away_win_prob: odds.awayWinProbability || null,
    over_under: odds.overUnder || null,
    details: odds.details || '',
  };
}

function parseStandings(data) {
  // ESPN standings API returns groups
  const groups = {};
  const children = data.children || [];
  for (const child of children) {
    const groupName = child.name || child.shortName || '';
    const standings = child.standings?.entries || [];
    const groupLetter = groupName.replace('Group ', '');
    groups[groupLetter] = standings.map(entry => ({
      team: entry.team?.abbreviation || '',
      name: TEAM_CN[entry.team?.abbreviation] || entry.team?.displayName || '',
      flag: FLAG[entry.team?.abbreviation] || '',
      logo: entry.team?.logo || '',
      stats: Object.fromEntries(
        (entry.stats || []).map(s => [s.name, s.value || s.displayValue || 0])
      ),
    }));
  }
  return groups;
}

// === ESPN API 调用 ===

async function fetchESPN(endpoint) {
  const url = `${ESPN_BASE}/${endpoint}`;
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });
  if (!resp.ok) throw new Error(`ESPN API error: ${resp.status}`);
  return resp.json();
}

// === 缓存层（Workers KV）===

async function getCache(env, key) {
  if (!env.CACHE_KV) return null;
  try {
    const cached = await env.CACHE_KV.get(key, { type: 'json' });
    if (cached && cached._expires > Date.now()) {
      return cached.data;
    }
  } catch {}
  return null;
}

async function setCache(env, key, data, ttl) {
  if (!env.CACHE_KV) return;
  try {
    await env.CACHE_KV.put(key, JSON.stringify({
      data,
      _expires: Date.now() + ttl * 1000,
    }), { expirationTtl: ttl + 60 });
  } catch {}
}

// === 响应 ===

function jsonResponse(data, env, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
