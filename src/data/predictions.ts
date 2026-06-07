// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (10000次, 最后更新: 2026-06-07 15:07 UTC)

export interface MatchPrediction {
  match_id: string;
  home: string;
  away: string;
  home_win: number;
  draw: number;
  away_win: number;
  details: string;
}

export interface GroupPrediction {
  group?: string;
  simulations?: number;
  teams: {
    team: string;
    advancement_pct: number;
    winner_pct: number;
    avg_points: number;
    avg_gf: number;
    avg_ga: number;
  }[];
}

export const PREDICTIONS: MatchPrediction[] = [
  {
    "match_id": "760415",
    "home": "MEX",
    "away": "RSA",
    "home_win": 66.3,
    "draw": 21.7,
    "away_win": 12.0,
    "details": "MEX -225"
  },
  {
    "match_id": "760414",
    "home": "KOR",
    "away": "CZE",
    "home_win": 36.1,
    "draw": 30.3,
    "away_win": 33.6,
    "details": "KOR +165"
  },
  {
    "match_id": "760416",
    "home": "CAN",
    "away": "BIH",
    "home_win": 53.1,
    "draw": 25.8,
    "away_win": 21.1,
    "details": "CAN -125"
  },
  {
    "match_id": "760417",
    "home": "USA",
    "away": "PAR",
    "home_win": 48.5,
    "draw": 27.5,
    "away_win": 24.0,
    "details": "USA -105"
  },
  {
    "match_id": "760420",
    "home": "QAT",
    "away": "SUI",
    "home_win": 7.9,
    "draw": 14.7,
    "away_win": 77.4,
    "details": "SUI -425"
  },
  {
    "match_id": "760419",
    "home": "BRA",
    "away": "MAR",
    "home_win": 59.3,
    "draw": 24.1,
    "away_win": 16.6,
    "details": "BRA -165"
  },
  {
    "match_id": "760418",
    "home": "HAI",
    "away": "SCO",
    "home_win": 14.6,
    "draw": 22.1,
    "away_win": 63.3,
    "details": "SCO -200"
  },
  {
    "match_id": "760421",
    "home": "AUS",
    "away": "TUR",
    "home_win": 20.3,
    "draw": 25.8,
    "away_win": 53.9,
    "details": "TUR -130"
  },
  {
    "match_id": "760422",
    "home": "GER",
    "away": "CUW",
    "home_win": 91.5,
    "draw": 5.5,
    "away_win": 3.0,
    "details": "GER -5000"
  },
  {
    "match_id": "760425",
    "home": "NED",
    "away": "JPN",
    "home_win": 47.8,
    "draw": 26.3,
    "away_win": 25.9,
    "details": "NED -105"
  },
  {
    "match_id": "760423",
    "home": "CIV",
    "away": "ECU",
    "home_win": 25.9,
    "draw": 34.2,
    "away_win": 39.9,
    "details": "ECU +140"
  },
  {
    "match_id": "760424",
    "home": "SWE",
    "away": "TUN",
    "home_win": 49.6,
    "draw": 27.8,
    "away_win": 22.6,
    "details": "SWE -110"
  },
  {
    "match_id": "760428",
    "home": "ESP",
    "away": "CPV",
    "home_win": 88.4,
    "draw": 8.0,
    "away_win": 3.6,
    "details": "ESP -1200"
  },
  {
    "match_id": "760426",
    "home": "BEL",
    "away": "EGY",
    "home_win": 57.1,
    "draw": 24.1,
    "away_win": 18.8,
    "details": "BEL -155"
  },
  {
    "match_id": "760429",
    "home": "KSA",
    "away": "URU",
    "home_win": 14.6,
    "draw": 21.6,
    "away_win": 63.8,
    "details": "URU -205"
  },
  {
    "match_id": "760427",
    "home": "IRN",
    "away": "NZL",
    "home_win": 49.8,
    "draw": 27.6,
    "away_win": 22.6,
    "details": "IRN -110"
  },
  {
    "match_id": "760432",
    "home": "FRA",
    "away": "SEN",
    "home_win": 65.2,
    "draw": 21.2,
    "away_win": 13.6,
    "details": "FRA -215"
  },
  {
    "match_id": "760430",
    "home": "IRQ",
    "away": "NOR",
    "home_win": 7.4,
    "draw": 13.7,
    "away_win": 78.9,
    "details": "NOR -475"
  },
  {
    "match_id": "760433",
    "home": "ARG",
    "away": "ALG",
    "home_win": 67.5,
    "draw": 21.2,
    "away_win": 11.3,
    "details": "ARG -240"
  },
  {
    "match_id": "760431",
    "home": "AUT",
    "away": "JOR",
    "home_win": 72.1,
    "draw": 17.3,
    "away_win": 10.6,
    "details": "AUT -310"
  },
  {
    "match_id": "760435",
    "home": "POR",
    "away": "COD",
    "home_win": 74.7,
    "draw": 16.6,
    "away_win": 8.7,
    "details": "POR -360"
  },
  {
    "match_id": "760437",
    "home": "ENG",
    "away": "CRO",
    "home_win": 55.5,
    "draw": 24.7,
    "away_win": 19.8,
    "details": "ENG -140"
  },
  {
    "match_id": "760434",
    "home": "GHA",
    "away": "PAN",
    "home_win": 46.7,
    "draw": 27.4,
    "away_win": 25.9,
    "details": "GHA +105"
  },
  {
    "match_id": "760436",
    "home": "UZB",
    "away": "COL",
    "home_win": 11.9,
    "draw": 20.7,
    "away_win": 67.4,
    "details": "COL -240"
  },
  {
    "match_id": "760438",
    "home": "CZE",
    "away": "RSA",
    "home_win": 47.5,
    "draw": 28.8,
    "away_win": 23.7,
    "details": "CZE +100"
  },
  {
    "match_id": "760439",
    "home": "SUI",
    "away": "BIH",
    "home_win": 60.1,
    "draw": 23.3,
    "away_win": 16.6,
    "details": "SUI -170"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 71.4,
    "draw": 19.0,
    "away_win": 9.6,
    "details": "CAN -300"
  },
  {
    "match_id": "760441",
    "home": "MEX",
    "away": "KOR",
    "home_win": 53.1,
    "draw": 26.6,
    "away_win": 20.3,
    "details": "MEX -125"
  },
  {
    "match_id": "760442",
    "home": "USA",
    "away": "AUS",
    "home_win": 54.1,
    "draw": 24.2,
    "away_win": 21.7,
    "details": "USA -130"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 23.3,
    "draw": 28.9,
    "away_win": 47.8,
    "details": "MAR +100"
  },
  {
    "match_id": "760444",
    "home": "BRA",
    "away": "HAI",
    "home_win": 89.0,
    "draw": 7.3,
    "away_win": 3.7,
    "details": "BRA -1400"
  },
  {
    "match_id": "760443",
    "home": "TUR",
    "away": "PAR",
    "home_win": 42.4,
    "draw": 29.8,
    "away_win": 27.8,
    "details": "TUR +125"
  },
  {
    "match_id": "760447",
    "home": "NED",
    "away": "SWE",
    "home_win": 58.3,
    "draw": 23.4,
    "away_win": 18.3,
    "details": "NED -155"
  },
  {
    "match_id": "760448",
    "home": "GER",
    "away": "CIV",
    "home_win": 61.6,
    "draw": 21.7,
    "away_win": 16.7,
    "details": "GER -180"
  },
  {
    "match_id": "760446",
    "home": "ECU",
    "away": "CUW",
    "home_win": 79.0,
    "draw": 13.7,
    "away_win": 7.3,
    "details": "ECU -475"
  },
  {
    "match_id": "760449",
    "home": "TUN",
    "away": "JPN",
    "home_win": 20.2,
    "draw": 27.1,
    "away_win": 52.7,
    "details": "JPN -125"
  },
  {
    "match_id": "760453",
    "home": "ESP",
    "away": "KSA",
    "home_win": 86.3,
    "draw": 9.6,
    "away_win": 4.1,
    "details": "ESP -900"
  },
  {
    "match_id": "760451",
    "home": "BEL",
    "away": "IRN",
    "home_win": 68.1,
    "draw": 19.9,
    "away_win": 12.0,
    "details": "BEL -245"
  },
  {
    "match_id": "760450",
    "home": "URU",
    "away": "CPV",
    "home_win": 66.4,
    "draw": 20.8,
    "away_win": 12.8,
    "details": "URU -225"
  },
  {
    "match_id": "760452",
    "home": "NZL",
    "away": "EGY",
    "home_win": 20.6,
    "draw": 24.7,
    "away_win": 54.7,
    "details": "EGY -135"
  },
  {
    "match_id": "760456",
    "home": "ARG",
    "away": "AUT",
    "home_win": 57.9,
    "draw": 24.8,
    "away_win": 17.3,
    "details": "ARG -155"
  },
  {
    "match_id": "760457",
    "home": "FRA",
    "away": "IRQ",
    "home_win": 84.0,
    "draw": 11.9,
    "away_win": 4.1,
    "details": "FRA -750"
  },
  {
    "match_id": "760454",
    "home": "NOR",
    "away": "SEN",
    "home_win": 45.6,
    "draw": 27.0,
    "away_win": 27.4,
    "details": "NOR +110"
  },
  {
    "match_id": "760455",
    "home": "JOR",
    "away": "ALG",
    "home_win": 16.0,
    "draw": 22.9,
    "away_win": 61.1,
    "details": "ALG -175"
  },
  {
    "match_id": "760461",
    "home": "POR",
    "away": "UZB",
    "home_win": 76.6,
    "draw": 14.7,
    "away_win": 8.7,
    "details": "POR -400"
  },
  {
    "match_id": "760458",
    "home": "ENG",
    "away": "GHA",
    "home_win": 72.6,
    "draw": 17.3,
    "away_win": 10.1,
    "details": "ENG -320"
  },
  {
    "match_id": "760460",
    "home": "PAN",
    "away": "CRO",
    "home_win": 13.6,
    "draw": 23.1,
    "away_win": 63.3,
    "details": "CRO -200"
  },
  {
    "match_id": "760459",
    "home": "COL",
    "away": "COD",
    "home_win": 63.8,
    "draw": 22.6,
    "away_win": 13.6,
    "details": "COL -205"
  },
  {
    "match_id": "760462",
    "home": "BIH",
    "away": "QAT",
    "home_win": 62.0,
    "draw": 23.3,
    "away_win": 14.7,
    "details": "BIH -185"
  },
  {
    "match_id": "760463",
    "home": "SUI",
    "away": "CAN",
    "home_win": 45.4,
    "draw": 28.5,
    "away_win": 26.1,
    "details": "SUI +110"
  },
  {
    "match_id": "760464",
    "home": "MAR",
    "away": "HAI",
    "home_win": 70.5,
    "draw": 19.0,
    "away_win": 10.5,
    "details": "MAR -290"
  },
  {
    "match_id": "760465",
    "home": "SCO",
    "away": "BRA",
    "home_win": 16.0,
    "draw": 19.9,
    "away_win": 64.1,
    "details": "BRA -205"
  },
  {
    "match_id": "760467",
    "home": "CZE",
    "away": "MEX",
    "home_win": 20.4,
    "draw": 26.3,
    "away_win": 53.3,
    "details": "MEX -125"
  },
  {
    "match_id": "760466",
    "home": "RSA",
    "away": "KOR",
    "home_win": 23.8,
    "draw": 27.6,
    "away_win": 48.6,
    "details": "KOR -105"
  },
  {
    "match_id": "760473",
    "home": "CUW",
    "away": "CIV",
    "home_win": 7.9,
    "draw": 14.7,
    "away_win": 77.4,
    "details": "CIV -425"
  },
  {
    "match_id": "760468",
    "home": "ECU",
    "away": "GER",
    "home_win": 19.4,
    "draw": 24.1,
    "away_win": 56.5,
    "details": "GER -145"
  },
  {
    "match_id": "760471",
    "home": "JPN",
    "away": "SWE",
    "home_win": 46.4,
    "draw": 27.6,
    "away_win": 26.0,
    "details": "JPN +105"
  },
  {
    "match_id": "760472",
    "home": "TUN",
    "away": "NED",
    "home_win": 14.7,
    "draw": 22.2,
    "away_win": 63.1,
    "details": "NED -195"
  },
  {
    "match_id": "760469",
    "home": "PAR",
    "away": "AUS",
    "home_win": 43.5,
    "draw": 29.5,
    "away_win": 27.0,
    "details": "PAR +120"
  },
  {
    "match_id": "760470",
    "home": "TUR",
    "away": "USA",
    "home_win": 35.4,
    "draw": 27.0,
    "away_win": 37.6,
    "details": "USA +155"
  },
  {
    "match_id": "760475",
    "home": "NOR",
    "away": "FRA",
    "home_win": 21.1,
    "draw": 26.0,
    "away_win": 52.9,
    "details": "FRA -125"
  },
  {
    "match_id": "760474",
    "home": "SEN",
    "away": "IRQ",
    "home_win": 65.2,
    "draw": 21.2,
    "away_win": 13.6,
    "details": "SEN -215"
  },
  {
    "match_id": "760478",
    "home": "CPV",
    "away": "KSA",
    "home_win": 36.7,
    "draw": 29.3,
    "away_win": 34.0,
    "details": "CPV +160"
  },
  {
    "match_id": "760479",
    "home": "URU",
    "away": "ESP",
    "home_win": 18.1,
    "draw": 23.9,
    "away_win": 58.0,
    "details": "ESP -155"
  },
  {
    "match_id": "760476",
    "home": "EGY",
    "away": "IRN",
    "home_win": 42.3,
    "draw": 31.2,
    "away_win": 26.5,
    "details": "EGY +125"
  },
  {
    "match_id": "760477",
    "home": "NZL",
    "away": "BEL",
    "home_win": 10.0,
    "draw": 16.6,
    "away_win": 73.4,
    "details": "BEL -330"
  },
  {
    "match_id": "760480",
    "home": "CRO",
    "away": "GHA",
    "home_win": 57.6,
    "draw": 25.0,
    "away_win": 17.4,
    "details": "CRO -150"
  },
  {
    "match_id": "760485",
    "home": "PAN",
    "away": "ENG",
    "home_win": 12.0,
    "draw": 14.7,
    "away_win": 73.3,
    "details": "ENG -330"
  },
  {
    "match_id": "760481",
    "home": "COL",
    "away": "POR",
    "home_win": 27.2,
    "draw": 28.5,
    "away_win": 44.3,
    "details": "POR +115"
  },
  {
    "match_id": "760482",
    "home": "COD",
    "away": "UZB",
    "home_win": 41.4,
    "draw": 28.4,
    "away_win": 30.2,
    "details": "COD +130"
  },
  {
    "match_id": "760484",
    "home": "ALG",
    "away": "AUT",
    "home_win": 28.5,
    "draw": 30.8,
    "away_win": 40.7,
    "details": "AUT +135"
  },
  {
    "match_id": "760483",
    "home": "JOR",
    "away": "ARG",
    "home_win": 7.3,
    "draw": 13.6,
    "away_win": 79.1,
    "details": "ARG -500"
  },
];

export const GROUP_PREDICTIONS: Record<string, GroupPrediction> = {
  "A": {
    "group": "A",
    "simulations": 10000,
    "teams": [
      {
        "team": "ARG",
        "advancement_pct": 89.5,
        "winner_pct": 65.8,
        "avg_points": 6.78,
        "avg_gf": 5.03,
        "avg_ga": 2.11
      },
      {
        "team": "AUT",
        "advancement_pct": 58.8,
        "winner_pct": 19.8,
        "avg_points": 4.6,
        "avg_gf": 3.8,
        "avg_ga": 3.27
      },
      {
        "team": "ALG",
        "advancement_pct": 41.8,
        "winner_pct": 12.3,
        "avg_points": 3.76,
        "avg_gf": 3.35,
        "avg_ga": 3.75
      },
      {
        "team": "JOR",
        "advancement_pct": 9.9,
        "winner_pct": 2.0,
        "avg_points": 1.56,
        "avg_gf": 2.04,
        "avg_ga": 5.09
      },
    ]
  },
  "B": {
    "group": "B",
    "simulations": 10000,
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 65.9,
        "winner_pct": 37.7,
        "avg_points": 4.99,
        "avg_gf": 4.04,
        "avg_ga": 3.02
      },
      {
        "team": "TUR",
        "advancement_pct": 61.5,
        "winner_pct": 32.6,
        "avg_points": 4.75,
        "avg_gf": 3.92,
        "avg_ga": 3.16
      },
      {
        "team": "PAR",
        "advancement_pct": 43.3,
        "winner_pct": 18.6,
        "avg_points": 3.73,
        "avg_gf": 3.32,
        "avg_ga": 3.71
      },
      {
        "team": "AUS",
        "advancement_pct": 29.3,
        "winner_pct": 11.1,
        "avg_points": 2.88,
        "avg_gf": 2.83,
        "avg_ga": 4.23
      },
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 87.6,
        "winner_pct": 64.4,
        "avg_points": 6.57,
        "avg_gf": 4.93,
        "avg_ga": 2.21
      },
      {
        "team": "EGY",
        "advancement_pct": 55.2,
        "winner_pct": 19.7,
        "avg_points": 4.28,
        "avg_gf": 3.6,
        "avg_ga": 3.42
      },
      {
        "team": "IRN",
        "advancement_pct": 38.1,
        "winner_pct": 11.1,
        "avg_points": 3.47,
        "avg_gf": 3.18,
        "avg_ga": 3.9
      },
      {
        "team": "NZL",
        "advancement_pct": 19.1,
        "winner_pct": 4.9,
        "avg_points": 2.26,
        "avg_gf": 2.46,
        "avg_ga": 4.65
      },
    ]
  },
  "D": {
    "group": "D",
    "simulations": 10000,
    "teams": [
      {
        "team": "SUI",
        "advancement_pct": 82.1,
        "winner_pct": 51.9,
        "avg_points": 6.16,
        "avg_gf": 4.72,
        "avg_ga": 2.41
      },
      {
        "team": "CAN",
        "advancement_pct": 71.8,
        "winner_pct": 33.5,
        "avg_points": 5.29,
        "avg_gf": 4.2,
        "avg_ga": 2.88
      },
      {
        "team": "BIH",
        "advancement_pct": 37.0,
        "winner_pct": 12.5,
        "avg_points": 3.67,
        "avg_gf": 3.27,
        "avg_ga": 3.81
      },
      {
        "team": "QAT",
        "advancement_pct": 9.1,
        "winner_pct": 2.1,
        "avg_points": 1.53,
        "avg_gf": 2.01,
        "avg_ga": 5.11
      },
    ]
  },
  "E": {
    "group": "E",
    "simulations": 10000,
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 90.3,
        "winner_pct": 70.7,
        "avg_points": 6.87,
        "avg_gf": 5.09,
        "avg_ga": 2.07
      },
      {
        "team": "MAR",
        "advancement_pct": 39.9,
        "winner_pct": 11.7,
        "avg_points": 3.48,
        "avg_gf": 3.15,
        "avg_ga": 3.92
      },
      {
        "team": "SCO",
        "advancement_pct": 38.6,
        "winner_pct": 11.6,
        "avg_points": 3.42,
        "avg_gf": 3.12,
        "avg_ga": 3.94
      },
      {
        "team": "HAI",
        "advancement_pct": 31.3,
        "winner_pct": 6.0,
        "avg_points": 2.97,
        "avg_gf": 2.84,
        "avg_ga": 4.27
      },
    ]
  },
  "F": {
    "group": "F",
    "simulations": 10000,
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 88.1,
        "winner_pct": 63.2,
        "avg_points": 6.82,
        "avg_gf": 5.01,
        "avg_ga": 2.07
      },
      {
        "team": "ECU",
        "advancement_pct": 61.2,
        "winner_pct": 21.2,
        "avg_points": 4.89,
        "avg_gf": 3.95,
        "avg_ga": 3.11
      },
      {
        "team": "CIV",
        "advancement_pct": 46.9,
        "winner_pct": 15.0,
        "avg_points": 4.28,
        "avg_gf": 3.6,
        "avg_ga": 3.46
      },
      {
        "team": "CUW",
        "advancement_pct": 3.8,
        "winner_pct": 0.5,
        "avg_points": 0.88,
        "avg_gf": 1.61,
        "avg_ga": 5.54
      },
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "COL",
        "advancement_pct": 74.3,
        "winner_pct": 43.1,
        "avg_points": 5.46,
        "avg_gf": 4.31,
        "avg_ga": 2.77
      },
      {
        "team": "POR",
        "advancement_pct": 69.0,
        "winner_pct": 37.2,
        "avg_points": 5.17,
        "avg_gf": 4.14,
        "avg_ga": 2.97
      },
      {
        "team": "UZB",
        "advancement_pct": 35.0,
        "winner_pct": 13.0,
        "avg_points": 3.36,
        "avg_gf": 3.08,
        "avg_ga": 3.97
      },
      {
        "team": "COD",
        "advancement_pct": 21.7,
        "winner_pct": 6.6,
        "avg_points": 2.59,
        "avg_gf": 2.65,
        "avg_ga": 4.46
      },
    ]
  },
  "H": {
    "group": "H",
    "simulations": 10000,
    "teams": [
      {
        "team": "ESP",
        "advancement_pct": 96.1,
        "winner_pct": 75.0,
        "avg_points": 7.4,
        "avg_gf": 5.39,
        "avg_ga": 1.79
      },
      {
        "team": "URU",
        "advancement_pct": 72.9,
        "winner_pct": 20.8,
        "avg_points": 5.09,
        "avg_gf": 4.07,
        "avg_ga": 3.02
      },
      {
        "team": "KSA",
        "advancement_pct": 16.1,
        "winner_pct": 2.1,
        "avg_points": 2.2,
        "avg_gf": 2.4,
        "avg_ga": 4.7
      },
      {
        "team": "CPV",
        "advancement_pct": 14.9,
        "winner_pct": 2.1,
        "avg_points": 2.17,
        "avg_gf": 2.4,
        "avg_ga": 4.76
      },
    ]
  },
  "I": {
    "group": "I",
    "simulations": 10000,
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 87.4,
        "winner_pct": 62.5,
        "avg_points": 6.6,
        "avg_gf": 4.93,
        "avg_ga": 2.18
      },
      {
        "team": "CRO",
        "advancement_pct": 69.1,
        "winner_pct": 26.5,
        "avg_points": 4.97,
        "avg_gf": 3.96,
        "avg_ga": 3.03
      },
      {
        "team": "GHA",
        "advancement_pct": 26.5,
        "winner_pct": 6.8,
        "avg_points": 2.93,
        "avg_gf": 2.82,
        "avg_ga": 4.22
      },
      {
        "team": "PAN",
        "advancement_pct": 17.1,
        "winner_pct": 4.2,
        "avg_points": 2.19,
        "avg_gf": 2.4,
        "avg_ga": 4.68
      },
    ]
  },
  "J": {
    "group": "J",
    "simulations": 10000,
    "teams": [
      {
        "team": "MEX",
        "advancement_pct": 58.9,
        "winner_pct": 32.3,
        "avg_points": 4.61,
        "avg_gf": 3.81,
        "avg_ga": 3.25
      },
      {
        "team": "RSA",
        "advancement_pct": 53.4,
        "winner_pct": 27.7,
        "avg_points": 4.34,
        "avg_gf": 3.64,
        "avg_ga": 3.39
      },
      {
        "team": "CZE",
        "advancement_pct": 47.1,
        "winner_pct": 22.1,
        "avg_points": 3.9,
        "avg_gf": 3.4,
        "avg_ga": 3.64
      },
      {
        "team": "KOR",
        "advancement_pct": 40.6,
        "winner_pct": 17.9,
        "avg_points": 3.63,
        "avg_gf": 3.25,
        "avg_ga": 3.81
      },
    ]
  },
  "K": {
    "group": "K",
    "simulations": 10000,
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 68.4,
        "winner_pct": 36.0,
        "avg_points": 5.38,
        "avg_gf": 4.22,
        "avg_ga": 2.86
      },
      {
        "team": "NOR",
        "advancement_pct": 67.5,
        "winner_pct": 34.7,
        "avg_points": 5.28,
        "avg_gf": 4.2,
        "avg_ga": 2.89
      },
      {
        "team": "SEN",
        "advancement_pct": 58.1,
        "winner_pct": 27.9,
        "avg_points": 4.86,
        "avg_gf": 3.95,
        "avg_ga": 3.13
      },
      {
        "team": "IRQ",
        "advancement_pct": 6.0,
        "winner_pct": 1.5,
        "avg_points": 1.22,
        "avg_gf": 1.8,
        "avg_ga": 5.29
      },
    ]
  },
  "L": {
    "group": "L",
    "simulations": 10000,
    "teams": [
      {
        "team": "NED",
        "advancement_pct": 77.2,
        "winner_pct": 50.4,
        "avg_points": 5.75,
        "avg_gf": 4.45,
        "avg_ga": 2.61
      },
      {
        "team": "JPN",
        "advancement_pct": 59.4,
        "winner_pct": 27.1,
        "avg_points": 4.58,
        "avg_gf": 3.79,
        "avg_ga": 3.26
      },
      {
        "team": "SWE",
        "advancement_pct": 40.9,
        "winner_pct": 15.4,
        "avg_points": 3.61,
        "avg_gf": 3.25,
        "avg_ga": 3.82
      },
      {
        "team": "TUN",
        "advancement_pct": 22.5,
        "winner_pct": 7.1,
        "avg_points": 2.51,
        "avg_gf": 2.63,
        "avg_ga": 4.42
      },
    ]
  },
};

/** 查找单场预测 */
export function getPrediction(matchId: string): MatchPrediction | undefined {
  return PREDICTIONS.find(p => p.match_id === matchId);
}

/** 查找球队所在小组的预测 */
export function getGroupPrediction(teamAbbr: string): { group: string; team: GroupPrediction["teams"][0] } | undefined {
  for (const [group, pred] of Object.entries(GROUP_PREDICTIONS)) {
    const team = pred.teams.find(t => t.team === teamAbbr);
    if (team) return { group, team };
  }
  return undefined;
}
