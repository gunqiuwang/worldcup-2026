// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (10000次, 最后更新: 2026-06-14 06:46 UTC)

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
    "match_id": "760422",
    "home": "GER",
    "away": "CUW",
    "home_win": 90.6,
    "draw": 6.3,
    "away_win": 3.1,
    "details": "GER -3000"
  },
  {
    "match_id": "760425",
    "home": "NED",
    "away": "JPN",
    "home_win": 46.5,
    "draw": 27.3,
    "away_win": 26.2,
    "details": "NED +100"
  },
  {
    "match_id": "760423",
    "home": "CIV",
    "away": "ECU",
    "home_win": 29.0,
    "draw": 33.6,
    "away_win": 37.4,
    "details": "ECU +155"
  },
  {
    "match_id": "760424",
    "home": "SWE",
    "away": "TUN",
    "home_win": 48.9,
    "draw": 27.7,
    "away_win": 23.4,
    "details": "SWE -105"
  },
  {
    "match_id": "760428",
    "home": "ESP",
    "away": "CPV",
    "home_win": 88.3,
    "draw": 8.0,
    "away_win": 3.7,
    "details": "ESP -1100"
  },
  {
    "match_id": "760426",
    "home": "BEL",
    "away": "EGY",
    "home_win": 59.6,
    "draw": 23.9,
    "away_win": 16.5,
    "details": "BEL -170"
  },
  {
    "match_id": "760429",
    "home": "KSA",
    "away": "URU",
    "home_win": 12.0,
    "draw": 21.4,
    "away_win": 66.6,
    "details": "URU -225"
  },
  {
    "match_id": "760427",
    "home": "IRN",
    "away": "NZL",
    "home_win": 52.3,
    "draw": 27.8,
    "away_win": 19.9,
    "details": "IRN -120"
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
    "home_win": 6.8,
    "draw": 13.7,
    "away_win": 79.5,
    "details": "NOR -500"
  },
  {
    "match_id": "760433",
    "home": "ARG",
    "away": "ALG",
    "home_win": 68.4,
    "draw": 20.9,
    "away_win": 10.7,
    "details": "ARG -245"
  },
  {
    "match_id": "760431",
    "home": "AUT",
    "away": "JOR",
    "home_win": 71.8,
    "draw": 17.5,
    "away_win": 10.7,
    "details": "AUT -295"
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
    "home_win": 44.5,
    "draw": 28.1,
    "away_win": 27.4,
    "details": "GHA +115"
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
    "home_win": 60.5,
    "draw": 23.4,
    "away_win": 16.1,
    "details": "SUI -170"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 74.7,
    "draw": 16.6,
    "away_win": 8.7,
    "details": "CAN -360"
  },
  {
    "match_id": "760441",
    "home": "MEX",
    "away": "KOR",
    "home_win": 47.9,
    "draw": 28.7,
    "away_win": 23.4,
    "details": "MEX +100"
  },
  {
    "match_id": "760442",
    "home": "USA",
    "away": "AUS",
    "home_win": 61.2,
    "draw": 21.3,
    "away_win": 17.5,
    "details": "USA -175"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 19.6,
    "draw": 27.1,
    "away_win": 53.3,
    "details": "MAR -125"
  },
  {
    "match_id": "760444",
    "home": "BRA",
    "away": "HAI",
    "home_win": 87.4,
    "draw": 8.0,
    "away_win": 4.6,
    "details": "BRA -1000"
  },
  {
    "match_id": "760443",
    "home": "TUR",
    "away": "PAR",
    "home_win": 50.3,
    "draw": 27.9,
    "away_win": 21.8,
    "details": "TUR -110"
  },
  {
    "match_id": "760447",
    "home": "NED",
    "away": "SWE",
    "home_win": 58.7,
    "draw": 23.0,
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
    "home_win": 80.3,
    "draw": 12.8,
    "away_win": 6.9,
    "details": "ECU -500"
  },
  {
    "match_id": "760449",
    "home": "TUN",
    "away": "JPN",
    "home_win": 17.5,
    "draw": 25.6,
    "away_win": 56.9,
    "details": "JPN -145"
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
    "home_win": 19.5,
    "draw": 25.6,
    "away_win": 54.9,
    "details": "EGY -135"
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
    "home_win": 85.8,
    "draw": 10.6,
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
    "home_win": 73.0,
    "draw": 17.4,
    "away_win": 9.6,
    "details": "ENG -320"
  },
  {
    "match_id": "760460",
    "home": "PAN",
    "away": "CRO",
    "home_win": 14.7,
    "draw": 23.3,
    "away_win": 62.0,
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
    "home_win": 61.4,
    "draw": 22.7,
    "away_win": 15.9,
    "details": "BIH -180"
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
    "home_win": 16.0,
    "draw": 19.2,
    "away_win": 64.8,
    "details": "BRA -210"
  },
  {
    "match_id": "760467",
    "home": "CZE",
    "away": "MEX",
    "home_win": 20.7,
    "draw": 26.2,
    "away_win": 53.1,
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
    "home_win": 7.4,
    "draw": 13.8,
    "away_win": 78.8,
    "details": "CIV -450"
  },
  {
    "match_id": "760468",
    "home": "ECU",
    "away": "GER",
    "home_win": 20.0,
    "draw": 24.7,
    "away_win": 55.3,
    "details": "GER -135"
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
    "home_win": 14.7,
    "draw": 21.7,
    "away_win": 63.6,
    "details": "NED -200"
  },
  {
    "match_id": "760469",
    "home": "PAR",
    "away": "AUS",
    "home_win": 44.8,
    "draw": 28.8,
    "away_win": 26.4,
    "details": "PAR +115"
  },
  {
    "match_id": "760470",
    "home": "TUR",
    "away": "USA",
    "home_win": 35.4,
    "draw": 26.2,
    "away_win": 38.4,
    "details": "USA +150"
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
    "home_win": 68.7,
    "draw": 20.0,
    "away_win": 11.3,
    "details": "SEN -250"
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
    "home_win": 9.6,
    "draw": 16.1,
    "away_win": 74.3,
    "details": "BEL -340"
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
    "home_win": 11.3,
    "draw": 14.7,
    "away_win": 74.0,
    "details": "ENG -340"
  },
  {
    "match_id": "760481",
    "home": "COL",
    "away": "POR",
    "home_win": 27.5,
    "draw": 28.7,
    "away_win": 43.8,
    "details": "POR +120"
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
    "home_win": 25.6,
    "draw": 29.9,
    "away_win": 44.5,
    "details": "AUT +115"
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
        "winner_pct": 66.7,
        "avg_points": 6.79,
        "avg_gf": 5.04,
        "avg_ga": 2.06
      },
      {
        "team": "AUT",
        "advancement_pct": 61.1,
        "winner_pct": 20.5,
        "avg_points": 4.71,
        "avg_gf": 3.89,
        "avg_ga": 3.23
      },
      {
        "team": "ALG",
        "advancement_pct": 40.9,
        "winner_pct": 11.1,
        "avg_points": 3.77,
        "avg_gf": 3.31,
        "avg_ga": 3.74
      },
      {
        "team": "JOR",
        "advancement_pct": 8.6,
        "winner_pct": 1.7,
        "avg_points": 1.44,
        "avg_gf": 1.98,
        "avg_ga": 5.19
      },
    ]
  },
  "B": {
    "group": "B",
    "simulations": 10000,
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 67.1,
        "winner_pct": 40.2,
        "avg_points": 5.06,
        "avg_gf": 4.06,
        "avg_ga": 3.02
      },
      {
        "team": "TUR",
        "advancement_pct": 52.4,
        "winner_pct": 25.6,
        "avg_points": 4.28,
        "avg_gf": 3.65,
        "avg_ga": 3.42
      },
      {
        "team": "PAR",
        "advancement_pct": 43.4,
        "winner_pct": 19.2,
        "avg_points": 3.72,
        "avg_gf": 3.31,
        "avg_ga": 3.75
      },
      {
        "team": "AUS",
        "advancement_pct": 37.2,
        "winner_pct": 15.0,
        "avg_points": 3.4,
        "avg_gf": 3.11,
        "avg_ga": 3.94
      },
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 88.4,
        "winner_pct": 66.8,
        "avg_points": 6.69,
        "avg_gf": 4.98,
        "avg_ga": 2.13
      },
      {
        "team": "EGY",
        "advancement_pct": 54.0,
        "winner_pct": 18.0,
        "avg_points": 4.21,
        "avg_gf": 3.59,
        "avg_ga": 3.45
      },
      {
        "team": "IRN",
        "advancement_pct": 39.1,
        "winner_pct": 10.8,
        "avg_points": 3.5,
        "avg_gf": 3.19,
        "avg_ga": 3.89
      },
      {
        "team": "NZL",
        "advancement_pct": 18.4,
        "winner_pct": 4.5,
        "avg_points": 2.16,
        "avg_gf": 2.4,
        "avg_ga": 4.68
      },
    ]
  },
  "D": {
    "group": "D",
    "simulations": 10000,
    "teams": [
      {
        "team": "CAN",
        "advancement_pct": 66.9,
        "winner_pct": 38.0,
        "avg_points": 5.08,
        "avg_gf": 4.06,
        "avg_ga": 2.98
      },
      {
        "team": "SUI",
        "advancement_pct": 63.0,
        "winner_pct": 33.8,
        "avg_points": 4.85,
        "avg_gf": 3.95,
        "avg_ga": 3.13
      },
      {
        "team": "BIH",
        "advancement_pct": 46.3,
        "winner_pct": 20.1,
        "avg_points": 3.93,
        "avg_gf": 3.41,
        "avg_ga": 3.66
      },
      {
        "team": "QAT",
        "advancement_pct": 23.8,
        "winner_pct": 8.1,
        "avg_points": 2.74,
        "avg_gf": 2.74,
        "avg_ga": 4.39
      },
    ]
  },
  "E": {
    "group": "E",
    "simulations": 10000,
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 86.8,
        "winner_pct": 57.2,
        "avg_points": 6.45,
        "avg_gf": 4.84,
        "avg_ga": 2.31
      },
      {
        "team": "MAR",
        "advancement_pct": 74.2,
        "winner_pct": 33.7,
        "avg_points": 5.39,
        "avg_gf": 4.25,
        "avg_ga": 2.86
      },
      {
        "team": "SCO",
        "advancement_pct": 23.7,
        "winner_pct": 6.3,
        "avg_points": 2.65,
        "avg_gf": 2.7,
        "avg_ga": 4.4
      },
      {
        "team": "HAI",
        "advancement_pct": 15.2,
        "winner_pct": 2.9,
        "avg_points": 2.29,
        "avg_gf": 2.48,
        "avg_ga": 4.7
      },
    ]
  },
  "F": {
    "group": "F",
    "simulations": 10000,
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 87.6,
        "winner_pct": 62.2,
        "avg_points": 6.78,
        "avg_gf": 5.03,
        "avg_ga": 2.12
      },
      {
        "team": "ECU",
        "advancement_pct": 58.4,
        "winner_pct": 20.6,
        "avg_points": 4.82,
        "avg_gf": 3.91,
        "avg_ga": 3.16
      },
      {
        "team": "CIV",
        "advancement_pct": 50.4,
        "winner_pct": 16.7,
        "avg_points": 4.43,
        "avg_gf": 3.71,
        "avg_ga": 3.37
      },
      {
        "team": "CUW",
        "advancement_pct": 3.6,
        "winner_pct": 0.5,
        "avg_points": 0.85,
        "avg_gf": 1.6,
        "avg_ga": 5.6
      },
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 88.4,
        "winner_pct": 55.6,
        "avg_points": 6.49,
        "avg_gf": 4.87,
        "avg_ga": 2.25
      },
      {
        "team": "COL",
        "advancement_pct": 78.2,
        "winner_pct": 36.9,
        "avg_points": 5.56,
        "avg_gf": 4.39,
        "avg_ga": 2.74
      },
      {
        "team": "COD",
        "advancement_pct": 19.3,
        "winner_pct": 4.3,
        "avg_points": 2.54,
        "avg_gf": 2.65,
        "avg_ga": 4.52
      },
      {
        "team": "UZB",
        "advancement_pct": 14.1,
        "winner_pct": 3.2,
        "avg_points": 2.1,
        "avg_gf": 2.38,
        "avg_ga": 4.78
      },
    ]
  },
  "H": {
    "group": "H",
    "simulations": 10000,
    "teams": [
      {
        "team": "ESP",
        "advancement_pct": 95.8,
        "winner_pct": 73.8,
        "avg_points": 7.43,
        "avg_gf": 5.38,
        "avg_ga": 1.8
      },
      {
        "team": "URU",
        "advancement_pct": 74.8,
        "winner_pct": 22.2,
        "avg_points": 5.18,
        "avg_gf": 4.15,
        "avg_ga": 2.98
      },
      {
        "team": "KSA",
        "advancement_pct": 14.8,
        "winner_pct": 2.0,
        "avg_points": 2.14,
        "avg_gf": 2.38,
        "avg_ga": 4.76
      },
      {
        "team": "CPV",
        "advancement_pct": 14.6,
        "winner_pct": 2.0,
        "avg_points": 2.17,
        "avg_gf": 2.38,
        "avg_ga": 4.74
      },
    ]
  },
  "I": {
    "group": "I",
    "simulations": 10000,
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 87.7,
        "winner_pct": 63.5,
        "avg_points": 6.64,
        "avg_gf": 4.95,
        "avg_ga": 2.19
      },
      {
        "team": "CRO",
        "advancement_pct": 68.7,
        "winner_pct": 25.2,
        "avg_points": 4.93,
        "avg_gf": 4.03,
        "avg_ga": 3.09
      },
      {
        "team": "GHA",
        "advancement_pct": 25.3,
        "winner_pct": 6.5,
        "avg_points": 2.84,
        "avg_gf": 2.79,
        "avg_ga": 4.3
      },
      {
        "team": "PAN",
        "advancement_pct": 18.3,
        "winner_pct": 4.8,
        "avg_points": 2.26,
        "avg_gf": 2.43,
        "avg_ga": 4.62
      },
    ]
  },
  "J": {
    "group": "J",
    "simulations": 10000,
    "teams": [
      {
        "team": "MEX",
        "advancement_pct": 68.1,
        "winner_pct": 40.4,
        "avg_points": 5.14,
        "avg_gf": 4.12,
        "avg_ga": 2.92
      },
      {
        "team": "KOR",
        "advancement_pct": 58.8,
        "winner_pct": 29.3,
        "avg_points": 4.62,
        "avg_gf": 3.85,
        "avg_ga": 3.27
      },
      {
        "team": "CZE",
        "advancement_pct": 47.4,
        "winner_pct": 20.9,
        "avg_points": 3.96,
        "avg_gf": 3.43,
        "avg_ga": 3.61
      },
      {
        "team": "RSA",
        "advancement_pct": 25.8,
        "winner_pct": 9.3,
        "avg_points": 2.74,
        "avg_gf": 2.74,
        "avg_ga": 4.34
      },
    ]
  },
  "K": {
    "group": "K",
    "simulations": 10000,
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 87.8,
        "winner_pct": 60.1,
        "avg_points": 6.65,
        "avg_gf": 4.95,
        "avg_ga": 2.14
      },
      {
        "team": "NOR",
        "advancement_pct": 64.8,
        "winner_pct": 26.4,
        "avg_points": 5.08,
        "avg_gf": 4.06,
        "avg_ga": 3.02
      },
      {
        "team": "SEN",
        "advancement_pct": 42.4,
        "winner_pct": 12.8,
        "avg_points": 4.01,
        "avg_gf": 3.43,
        "avg_ga": 3.61
      },
      {
        "team": "IRQ",
        "advancement_pct": 5.1,
        "winner_pct": 0.7,
        "avg_points": 1.08,
        "avg_gf": 1.75,
        "avg_ga": 5.42
      },
    ]
  },
  "L": {
    "group": "L",
    "simulations": 10000,
    "teams": [
      {
        "team": "NED",
        "advancement_pct": 78.0,
        "winner_pct": 50.2,
        "avg_points": 5.79,
        "avg_gf": 4.49,
        "avg_ga": 2.58
      },
      {
        "team": "JPN",
        "advancement_pct": 60.7,
        "winner_pct": 28.2,
        "avg_points": 4.65,
        "avg_gf": 3.84,
        "avg_ga": 3.22
      },
      {
        "team": "SWE",
        "advancement_pct": 40.0,
        "winner_pct": 15.0,
        "avg_points": 3.62,
        "avg_gf": 3.25,
        "avg_ga": 3.82
      },
      {
        "team": "TUN",
        "advancement_pct": 21.4,
        "winner_pct": 6.6,
        "avg_points": 2.4,
        "avg_gf": 2.55,
        "avg_ga": 4.52
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
