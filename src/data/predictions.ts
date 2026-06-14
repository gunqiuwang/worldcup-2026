// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (10000次, 最后更新: 2026-06-14 22:43 UTC)

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
    "match_id": "760423",
    "home": "CIV",
    "away": "ECU",
    "home_win": 29.1,
    "draw": 32.5,
    "away_win": 38.4,
    "details": "ECU +150"
  },
  {
    "match_id": "760424",
    "home": "SWE",
    "away": "TUN",
    "home_win": 50.4,
    "draw": 28.3,
    "away_win": 21.3,
    "details": "SWE -110"
  },
  {
    "match_id": "760428",
    "home": "ESP",
    "away": "CPV",
    "home_win": 87.9,
    "draw": 8.0,
    "away_win": 4.1,
    "details": "ESP -1100"
  },
  {
    "match_id": "760426",
    "home": "BEL",
    "away": "EGY",
    "home_win": 58.7,
    "draw": 24.1,
    "away_win": 17.2,
    "details": "BEL -165"
  },
  {
    "match_id": "760429",
    "home": "KSA",
    "away": "URU",
    "home_win": 12.8,
    "draw": 21.8,
    "away_win": 65.4,
    "details": "URU -215"
  },
  {
    "match_id": "760427",
    "home": "IRN",
    "away": "NZL",
    "home_win": 49.3,
    "draw": 28.3,
    "away_win": 22.4,
    "details": "IRN -105"
  },
  {
    "match_id": "760432",
    "home": "FRA",
    "away": "SEN",
    "home_win": 64.7,
    "draw": 21.7,
    "away_win": 13.6,
    "details": "FRA -210"
  },
  {
    "match_id": "760430",
    "home": "IRQ",
    "away": "NOR",
    "home_win": 6.4,
    "draw": 13.6,
    "away_win": 80.0,
    "details": "NOR -525"
  },
  {
    "match_id": "760433",
    "home": "ARG",
    "away": "ALG",
    "home_win": 69.0,
    "draw": 20.9,
    "away_win": 10.1,
    "details": "ARG -255"
  },
  {
    "match_id": "760431",
    "home": "AUT",
    "away": "JOR",
    "home_win": 71.2,
    "draw": 18.2,
    "away_win": 10.6,
    "details": "AUT -290"
  },
  {
    "match_id": "760435",
    "home": "POR",
    "away": "COD",
    "home_win": 74.6,
    "draw": 16.7,
    "away_win": 8.7,
    "details": "POR -350"
  },
  {
    "match_id": "760437",
    "home": "ENG",
    "away": "CRO",
    "home_win": 55.5,
    "draw": 25.0,
    "away_win": 19.5,
    "details": "ENG -140"
  },
  {
    "match_id": "760434",
    "home": "GHA",
    "away": "PAN",
    "home_win": 43.8,
    "draw": 27.9,
    "away_win": 28.3,
    "details": "GHA +120"
  },
  {
    "match_id": "760436",
    "home": "UZB",
    "away": "COL",
    "home_win": 10.7,
    "draw": 20.4,
    "away_win": 68.9,
    "details": "COL -255"
  },
  {
    "match_id": "760438",
    "home": "CZE",
    "away": "RSA",
    "home_win": 54.5,
    "draw": 25.8,
    "away_win": 19.7,
    "details": "CZE -130"
  },
  {
    "match_id": "760439",
    "home": "SUI",
    "away": "BIH",
    "home_win": 59.8,
    "draw": 23.4,
    "away_win": 16.8,
    "details": "SUI -165"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 74.5,
    "draw": 16.8,
    "away_win": 8.7,
    "details": "CAN -340"
  },
  {
    "match_id": "760441",
    "home": "MEX",
    "away": "KOR",
    "home_win": 48.2,
    "draw": 28.8,
    "away_win": 23.0,
    "details": "MEX +100"
  },
  {
    "match_id": "760442",
    "home": "USA",
    "away": "AUS",
    "home_win": 59.7,
    "draw": 22.8,
    "away_win": 17.5,
    "details": "USA -165"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 19.2,
    "draw": 26.4,
    "away_win": 54.4,
    "details": "MAR -130"
  },
  {
    "match_id": "760444",
    "home": "BRA",
    "away": "HAI",
    "home_win": 86.7,
    "draw": 8.7,
    "away_win": 4.6,
    "details": "BRA -1000"
  },
  {
    "match_id": "760443",
    "home": "TUR",
    "away": "PAR",
    "home_win": 49.0,
    "draw": 28.2,
    "away_win": 22.8,
    "details": "TUR -105"
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
    "home_win": 61.2,
    "draw": 21.3,
    "away_win": 17.5,
    "details": "GER -175"
  },
  {
    "match_id": "760446",
    "home": "ECU",
    "away": "CUW",
    "home_win": 85.1,
    "draw": 10.1,
    "away_win": 4.8,
    "details": "ECU -750"
  },
  {
    "match_id": "760449",
    "home": "TUN",
    "away": "JPN",
    "home_win": 16.7,
    "draw": 25.0,
    "away_win": 58.3,
    "details": "JPN -155"
  },
  {
    "match_id": "760453",
    "home": "ESP",
    "away": "KSA",
    "home_win": 87.2,
    "draw": 8.7,
    "away_win": 4.1,
    "details": "ESP -1000"
  },
  {
    "match_id": "760451",
    "home": "BEL",
    "away": "IRN",
    "home_win": 69.0,
    "draw": 19.6,
    "away_win": 11.4,
    "details": "BEL -255"
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
    "home_win": 20.9,
    "draw": 24.7,
    "away_win": 54.4,
    "details": "EGY -130"
  },
  {
    "match_id": "760456",
    "home": "ARG",
    "away": "AUT",
    "home_win": 58.9,
    "draw": 24.5,
    "away_win": 16.6,
    "details": "ARG -160"
  },
  {
    "match_id": "760457",
    "home": "FRA",
    "away": "IRQ",
    "home_win": 86.3,
    "draw": 10.1,
    "away_win": 3.6,
    "details": "FRA -900"
  },
  {
    "match_id": "760454",
    "home": "NOR",
    "away": "SEN",
    "home_win": 44.8,
    "draw": 26.8,
    "away_win": 28.4,
    "details": "NOR +115"
  },
  {
    "match_id": "760455",
    "home": "JOR",
    "away": "ALG",
    "home_win": 13.8,
    "draw": 21.9,
    "away_win": 64.3,
    "details": "ALG -200"
  },
  {
    "match_id": "760461",
    "home": "POR",
    "away": "UZB",
    "home_win": 77.4,
    "draw": 14.7,
    "away_win": 7.9,
    "details": "POR -425"
  },
  {
    "match_id": "760458",
    "home": "ENG",
    "away": "GHA",
    "home_win": 72.5,
    "draw": 17.4,
    "away_win": 10.1,
    "details": "ENG -310"
  },
  {
    "match_id": "760460",
    "home": "PAN",
    "away": "CRO",
    "home_win": 13.7,
    "draw": 24.0,
    "away_win": 62.3,
    "details": "CRO -185"
  },
  {
    "match_id": "760459",
    "home": "COL",
    "away": "COD",
    "home_win": 66.2,
    "draw": 21.8,
    "away_win": 12.0,
    "details": "COL -220"
  },
  {
    "match_id": "760462",
    "home": "BIH",
    "away": "QAT",
    "home_win": 60.7,
    "draw": 23.3,
    "away_win": 16.0,
    "details": "BIH -175"
  },
  {
    "match_id": "760463",
    "home": "SUI",
    "away": "CAN",
    "home_win": 44.7,
    "draw": 27.9,
    "away_win": 27.4,
    "details": "SUI +115"
  },
  {
    "match_id": "760464",
    "home": "MAR",
    "away": "HAI",
    "home_win": 73.5,
    "draw": 17.4,
    "away_win": 9.1,
    "details": "MAR -330"
  },
  {
    "match_id": "760465",
    "home": "SCO",
    "away": "BRA",
    "home_win": 14.7,
    "draw": 19.1,
    "away_win": 66.2,
    "details": "BRA -225"
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
    "home_win": 16.7,
    "draw": 23.4,
    "away_win": 59.9,
    "details": "KOR -165"
  },
  {
    "match_id": "760473",
    "home": "CUW",
    "away": "CIV",
    "home_win": 5.7,
    "draw": 12.0,
    "away_win": 82.3,
    "details": "CIV -600"
  },
  {
    "match_id": "760468",
    "home": "ECU",
    "away": "GER",
    "home_win": 20.8,
    "draw": 25.2,
    "away_win": 54.0,
    "details": "GER -130"
  },
  {
    "match_id": "760471",
    "home": "JPN",
    "away": "SWE",
    "home_win": 45.4,
    "draw": 27.7,
    "away_win": 26.9,
    "details": "JPN +110"
  },
  {
    "match_id": "760472",
    "home": "TUN",
    "away": "NED",
    "home_win": 13.7,
    "draw": 20.8,
    "away_win": 65.5,
    "details": "NED -215"
  },
  {
    "match_id": "760469",
    "home": "PAR",
    "away": "AUS",
    "home_win": 44.5,
    "draw": 28.6,
    "away_win": 26.9,
    "details": "PAR +115"
  },
  {
    "match_id": "760470",
    "home": "TUR",
    "away": "USA",
    "home_win": 34.9,
    "draw": 25.9,
    "away_win": 39.2,
    "details": "USA +145"
  },
  {
    "match_id": "760475",
    "home": "NOR",
    "away": "FRA",
    "home_win": 22.9,
    "draw": 25.7,
    "away_win": 51.4,
    "details": "FRA -115"
  },
  {
    "match_id": "760474",
    "home": "SEN",
    "away": "IRQ",
    "home_win": 69.0,
    "draw": 19.6,
    "away_win": 11.4,
    "details": "SEN -255"
  },
  {
    "match_id": "760478",
    "home": "CPV",
    "away": "KSA",
    "home_win": 38.3,
    "draw": 25.6,
    "away_win": 36.1,
    "details": "CPV +150"
  },
  {
    "match_id": "760479",
    "home": "URU",
    "away": "ESP",
    "home_win": 17.5,
    "draw": 24.0,
    "away_win": 58.5,
    "details": "ESP -155"
  },
  {
    "match_id": "760476",
    "home": "EGY",
    "away": "IRN",
    "home_win": 42.7,
    "draw": 31.0,
    "away_win": 26.3,
    "details": "EGY +125"
  },
  {
    "match_id": "760477",
    "home": "NZL",
    "away": "BEL",
    "home_win": 9.7,
    "draw": 16.8,
    "away_win": 73.5,
    "details": "BEL -320"
  },
  {
    "match_id": "760480",
    "home": "CRO",
    "away": "GHA",
    "home_win": 59.0,
    "draw": 24.3,
    "away_win": 16.7,
    "details": "CRO -160"
  },
  {
    "match_id": "760485",
    "home": "PAN",
    "away": "ENG",
    "home_win": 10.6,
    "draw": 14.7,
    "away_win": 74.7,
    "details": "ENG -360"
  },
  {
    "match_id": "760481",
    "home": "COL",
    "away": "POR",
    "home_win": 26.9,
    "draw": 27.7,
    "away_win": 45.4,
    "details": "POR +110"
  },
  {
    "match_id": "760482",
    "home": "COD",
    "away": "UZB",
    "home_win": 40.9,
    "draw": 28.7,
    "away_win": 30.4,
    "details": "COD +135"
  },
  {
    "match_id": "760484",
    "home": "ALG",
    "away": "AUT",
    "home_win": 25.3,
    "draw": 31.0,
    "away_win": 43.7,
    "details": "AUT +120"
  },
  {
    "match_id": "760483",
    "home": "JOR",
    "away": "ARG",
    "home_win": 6.4,
    "draw": 12.7,
    "away_win": 80.9,
    "details": "ARG -550"
  },
];

export const GROUP_PREDICTIONS: Record<string, GroupPrediction> = {
  "A": {
    "group": "A",
    "simulations": 10000,
    "teams": [
      {
        "team": "ARG",
        "advancement_pct": 89.4,
        "winner_pct": 66.2,
        "avg_points": 6.82,
        "avg_gf": 5.05,
        "avg_ga": 2.06
      },
      {
        "team": "AUT",
        "advancement_pct": 61.7,
        "winner_pct": 21.1,
        "avg_points": 4.72,
        "avg_gf": 3.89,
        "avg_ga": 3.23
      },
      {
        "team": "ALG",
        "advancement_pct": 39.9,
        "winner_pct": 11.0,
        "avg_points": 3.7,
        "avg_gf": 3.3,
        "avg_ga": 3.79
      },
      {
        "team": "JOR",
        "advancement_pct": 8.9,
        "winner_pct": 1.6,
        "avg_points": 1.48,
        "avg_gf": 2.0,
        "avg_ga": 5.16
      },
    ]
  },
  "B": {
    "group": "B",
    "simulations": 10000,
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 67.0,
        "winner_pct": 39.4,
        "avg_points": 5.04,
        "avg_gf": 4.06,
        "avg_ga": 3.01
      },
      {
        "team": "TUR",
        "advancement_pct": 51.3,
        "winner_pct": 25.4,
        "avg_points": 4.21,
        "avg_gf": 3.61,
        "avg_ga": 3.48
      },
      {
        "team": "PAR",
        "advancement_pct": 43.3,
        "winner_pct": 19.4,
        "avg_points": 3.73,
        "avg_gf": 3.31,
        "avg_ga": 3.74
      },
      {
        "team": "AUS",
        "advancement_pct": 38.4,
        "winner_pct": 15.8,
        "avg_points": 3.45,
        "avg_gf": 3.13,
        "avg_ga": 3.89
      },
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 88.1,
        "winner_pct": 65.6,
        "avg_points": 6.62,
        "avg_gf": 4.95,
        "avg_ga": 2.16
      },
      {
        "team": "EGY",
        "advancement_pct": 54.7,
        "winner_pct": 18.4,
        "avg_points": 4.23,
        "avg_gf": 3.6,
        "avg_ga": 3.44
      },
      {
        "team": "IRN",
        "advancement_pct": 37.5,
        "winner_pct": 11.1,
        "avg_points": 3.41,
        "avg_gf": 3.14,
        "avg_ga": 3.94
      },
      {
        "team": "NZL",
        "advancement_pct": 19.8,
        "winner_pct": 5.0,
        "avg_points": 2.29,
        "avg_gf": 2.48,
        "avg_ga": 4.61
      },
    ]
  },
  "D": {
    "group": "D",
    "simulations": 10000,
    "teams": [
      {
        "team": "CAN",
        "advancement_pct": 66.1,
        "winner_pct": 37.5,
        "avg_points": 5.06,
        "avg_gf": 4.06,
        "avg_ga": 3.01
      },
      {
        "team": "SUI",
        "advancement_pct": 61.9,
        "winner_pct": 33.4,
        "avg_points": 4.8,
        "avg_gf": 3.93,
        "avg_ga": 3.14
      },
      {
        "team": "BIH",
        "advancement_pct": 47.3,
        "winner_pct": 20.7,
        "avg_points": 3.96,
        "avg_gf": 3.44,
        "avg_ga": 3.65
      },
      {
        "team": "QAT",
        "advancement_pct": 24.7,
        "winner_pct": 8.4,
        "avg_points": 2.75,
        "avg_gf": 2.74,
        "avg_ga": 4.36
      },
    ]
  },
  "E": {
    "group": "E",
    "simulations": 10000,
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 88.0,
        "winner_pct": 57.3,
        "avg_points": 6.5,
        "avg_gf": 4.89,
        "avg_ga": 2.28
      },
      {
        "team": "MAR",
        "advancement_pct": 75.2,
        "winner_pct": 33.8,
        "avg_points": 5.44,
        "avg_gf": 4.27,
        "avg_ga": 2.83
      },
      {
        "team": "SCO",
        "advancement_pct": 22.7,
        "winner_pct": 6.2,
        "avg_points": 2.58,
        "avg_gf": 2.66,
        "avg_ga": 4.45
      },
      {
        "team": "HAI",
        "advancement_pct": 14.1,
        "winner_pct": 2.7,
        "avg_points": 2.26,
        "avg_gf": 2.46,
        "avg_ga": 4.71
      },
    ]
  },
  "F": {
    "group": "F",
    "simulations": 10000,
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 72.9,
        "winner_pct": 44.0,
        "avg_points": 5.48,
        "avg_gf": 4.3,
        "avg_ga": 2.77
      },
      {
        "team": "ECU",
        "advancement_pct": 63.6,
        "winner_pct": 30.5,
        "avg_points": 5.02,
        "avg_gf": 4.06,
        "avg_ga": 3.07
      },
      {
        "team": "CIV",
        "advancement_pct": 54.5,
        "winner_pct": 23.2,
        "avg_points": 4.54,
        "avg_gf": 3.75,
        "avg_ga": 3.35
      },
      {
        "team": "CUW",
        "advancement_pct": 9.0,
        "winner_pct": 2.2,
        "avg_points": 1.7,
        "avg_gf": 2.1,
        "avg_ga": 5.02
      },
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 88.3,
        "winner_pct": 56.6,
        "avg_points": 6.52,
        "avg_gf": 4.89,
        "avg_ga": 2.26
      },
      {
        "team": "COL",
        "advancement_pct": 78.9,
        "winner_pct": 36.1,
        "avg_points": 5.58,
        "avg_gf": 4.39,
        "avg_ga": 2.73
      },
      {
        "team": "COD",
        "advancement_pct": 18.5,
        "winner_pct": 4.0,
        "avg_points": 2.51,
        "avg_gf": 2.6,
        "avg_ga": 4.49
      },
      {
        "team": "UZB",
        "advancement_pct": 14.3,
        "winner_pct": 3.4,
        "avg_points": 2.09,
        "avg_gf": 2.34,
        "avg_ga": 4.74
      },
    ]
  },
  "H": {
    "group": "H",
    "simulations": 10000,
    "teams": [
      {
        "team": "ESP",
        "advancement_pct": 95.4,
        "winner_pct": 73.8,
        "avg_points": 7.41,
        "avg_gf": 5.36,
        "avg_ga": 1.79
      },
      {
        "team": "URU",
        "advancement_pct": 73.7,
        "winner_pct": 22.1,
        "avg_points": 5.14,
        "avg_gf": 4.09,
        "avg_ga": 2.97
      },
      {
        "team": "CPV",
        "advancement_pct": 15.6,
        "winner_pct": 2.1,
        "avg_points": 2.2,
        "avg_gf": 2.42,
        "avg_ga": 4.74
      },
      {
        "team": "KSA",
        "advancement_pct": 15.3,
        "winner_pct": 2.0,
        "avg_points": 2.15,
        "avg_gf": 2.35,
        "avg_ga": 4.72
      },
    ]
  },
  "I": {
    "group": "I",
    "simulations": 10000,
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 88.4,
        "winner_pct": 63.3,
        "avg_points": 6.64,
        "avg_gf": 4.95,
        "avg_ga": 2.18
      },
      {
        "team": "CRO",
        "advancement_pct": 69.4,
        "winner_pct": 26.6,
        "avg_points": 5.0,
        "avg_gf": 4.06,
        "avg_ga": 3.08
      },
      {
        "team": "GHA",
        "advancement_pct": 25.5,
        "winner_pct": 6.2,
        "avg_points": 2.83,
        "avg_gf": 2.81,
        "avg_ga": 4.31
      },
      {
        "team": "PAN",
        "advancement_pct": 16.7,
        "winner_pct": 3.9,
        "avg_points": 2.21,
        "avg_gf": 2.41,
        "avg_ga": 4.67
      },
    ]
  },
  "J": {
    "group": "J",
    "simulations": 10000,
    "teams": [
      {
        "team": "MEX",
        "advancement_pct": 69.2,
        "winner_pct": 41.3,
        "avg_points": 5.18,
        "avg_gf": 4.17,
        "avg_ga": 2.9
      },
      {
        "team": "KOR",
        "advancement_pct": 59.0,
        "winner_pct": 29.4,
        "avg_points": 4.6,
        "avg_gf": 3.81,
        "avg_ga": 3.25
      },
      {
        "team": "CZE",
        "advancement_pct": 46.2,
        "winner_pct": 20.0,
        "avg_points": 3.94,
        "avg_gf": 3.43,
        "avg_ga": 3.63
      },
      {
        "team": "RSA",
        "advancement_pct": 25.7,
        "winner_pct": 9.3,
        "avg_points": 2.73,
        "avg_gf": 2.71,
        "avg_ga": 4.35
      },
    ]
  },
  "K": {
    "group": "K",
    "simulations": 10000,
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 87.0,
        "winner_pct": 59.3,
        "avg_points": 6.63,
        "avg_gf": 4.96,
        "avg_ga": 2.18
      },
      {
        "team": "NOR",
        "advancement_pct": 66.8,
        "winner_pct": 27.4,
        "avg_points": 5.15,
        "avg_gf": 4.15,
        "avg_ga": 3.02
      },
      {
        "team": "SEN",
        "advancement_pct": 41.1,
        "winner_pct": 12.6,
        "avg_points": 3.97,
        "avg_gf": 3.45,
        "avg_ga": 3.67
      },
      {
        "team": "IRQ",
        "advancement_pct": 5.0,
        "winner_pct": 0.7,
        "avg_points": 1.08,
        "avg_gf": 1.75,
        "avg_ga": 5.44
      },
    ]
  },
  "L": {
    "group": "L",
    "simulations": 10000,
    "teams": [
      {
        "team": "NED",
        "advancement_pct": 76.9,
        "winner_pct": 49.1,
        "avg_points": 5.75,
        "avg_gf": 4.49,
        "avg_ga": 2.65
      },
      {
        "team": "JPN",
        "advancement_pct": 62.5,
        "winner_pct": 29.6,
        "avg_points": 4.77,
        "avg_gf": 3.89,
        "avg_ga": 3.16
      },
      {
        "team": "SWE",
        "advancement_pct": 40.5,
        "winner_pct": 14.8,
        "avg_points": 3.65,
        "avg_gf": 3.28,
        "avg_ga": 3.79
      },
      {
        "team": "TUN",
        "advancement_pct": 20.1,
        "winner_pct": 6.4,
        "avg_points": 2.32,
        "avg_gf": 2.53,
        "avg_ga": 4.58
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
