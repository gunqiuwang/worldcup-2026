// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (10000次, 最后更新: 2026-06-13 18:17 UTC)

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
    "match_id": "760420",
    "home": "QAT",
    "away": "SUI",
    "home_win": 6.4,
    "draw": 13.7,
    "away_win": 79.9,
    "details": "SUI -500"
  },
  {
    "match_id": "760419",
    "home": "BRA",
    "away": "MAR",
    "home_win": 57.2,
    "draw": 25.5,
    "away_win": 17.3,
    "details": "BRA -150"
  },
  {
    "match_id": "760418",
    "home": "HAI",
    "away": "SCO",
    "home_win": 16.6,
    "draw": 20.7,
    "away_win": 62.7,
    "details": "SCO -190"
  },
  {
    "match_id": "760421",
    "home": "AUS",
    "away": "TUR",
    "home_win": 18.2,
    "draw": 25.0,
    "away_win": 56.8,
    "details": "TUR -145"
  },
  {
    "match_id": "760422",
    "home": "GER",
    "away": "CUW",
    "home_win": 91.2,
    "draw": 5.8,
    "away_win": 3.0,
    "details": "GER -3500"
  },
  {
    "match_id": "760425",
    "home": "NED",
    "away": "JPN",
    "home_win": 47.8,
    "draw": 26.7,
    "away_win": 25.5,
    "details": "NED -105"
  },
  {
    "match_id": "760423",
    "home": "CIV",
    "away": "ECU",
    "home_win": 26.8,
    "draw": 33.8,
    "away_win": 39.4,
    "details": "ECU +145"
  },
  {
    "match_id": "760424",
    "home": "SWE",
    "away": "TUN",
    "home_win": 50.4,
    "draw": 27.1,
    "away_win": 22.5,
    "details": "SWE -110"
  },
  {
    "match_id": "760428",
    "home": "ESP",
    "away": "CPV",
    "home_win": 88.8,
    "draw": 8.0,
    "away_win": 3.2,
    "details": "ESP -1200"
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
    "home_win": 52.2,
    "draw": 27.4,
    "away_win": 20.4,
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
    "home_win": 60.2,
    "draw": 23.0,
    "away_win": 16.8,
    "details": "SUI -165"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 73.9,
    "draw": 17.4,
    "away_win": 8.7,
    "details": "CAN -340"
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
    "home_win": 62.7,
    "draw": 21.3,
    "away_win": 16.0,
    "details": "USA -190"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 22.3,
    "draw": 28.6,
    "away_win": 49.1,
    "details": "MAR -105"
  },
  {
    "match_id": "760444",
    "home": "BRA",
    "away": "HAI",
    "home_win": 88.9,
    "draw": 7.4,
    "away_win": 3.7,
    "details": "BRA -1200"
  },
  {
    "match_id": "760443",
    "home": "TUR",
    "away": "PAR",
    "home_win": 48.9,
    "draw": 28.9,
    "away_win": 22.2,
    "details": "TUR -105"
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
    "home_win": 79.9,
    "draw": 12.8,
    "away_win": 7.3,
    "details": "ECU -500"
  },
  {
    "match_id": "760449",
    "home": "TUN",
    "away": "JPN",
    "home_win": 18.2,
    "draw": 25.9,
    "away_win": 55.9,
    "details": "JPN -140"
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
    "home_win": 20.5,
    "draw": 25.0,
    "away_win": 54.5,
    "details": "EGY -130"
  },
  {
    "match_id": "760456",
    "home": "ARG",
    "away": "AUT",
    "home_win": 58.6,
    "draw": 24.7,
    "away_win": 16.7,
    "details": "ARG -155"
  },
  {
    "match_id": "760457",
    "home": "FRA",
    "away": "IRQ",
    "home_win": 85.6,
    "draw": 10.7,
    "away_win": 3.7,
    "details": "FRA -800"
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
    "home_win": 77.1,
    "draw": 14.9,
    "away_win": 8.0,
    "details": "POR -400"
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
    "draw": 23.9,
    "away_win": 61.4,
    "details": "CRO -180"
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
    "home_win": 59.6,
    "draw": 24.5,
    "away_win": 15.9,
    "details": "BIH -165"
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
    "home_win": 70.3,
    "draw": 19.1,
    "away_win": 10.6,
    "details": "MAR -280"
  },
  {
    "match_id": "760465",
    "home": "SCO",
    "away": "BRA",
    "home_win": 15.9,
    "draw": 19.0,
    "away_win": 65.1,
    "details": "BRA -215"
  },
  {
    "match_id": "760467",
    "home": "CZE",
    "away": "MEX",
    "home_win": 21.2,
    "draw": 26.6,
    "away_win": 52.2,
    "details": "MEX -120"
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
    "home_win": 45.6,
    "draw": 28.6,
    "away_win": 25.8,
    "details": "PAR +110"
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
    "home_win": 22.4,
    "draw": 26.3,
    "away_win": 51.3,
    "details": "FRA -115"
  },
  {
    "match_id": "760474",
    "home": "SEN",
    "away": "IRQ",
    "home_win": 68.1,
    "draw": 19.9,
    "away_win": 12.0,
    "details": "SEN -245"
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
    "home_win": 41.9,
    "draw": 31.6,
    "away_win": 26.5,
    "details": "EGY +130"
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
    "home_win": 58.7,
    "draw": 24.4,
    "away_win": 16.9,
    "details": "CRO -155"
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
    "draw": 12.8,
    "away_win": 80.8,
    "details": "ARG -525"
  },
];

export const GROUP_PREDICTIONS: Record<string, GroupPrediction> = {
  "A": {
    "group": "A",
    "simulations": 10000,
    "teams": [
      {
        "team": "ARG",
        "advancement_pct": 89.8,
        "winner_pct": 66.9,
        "avg_points": 6.82,
        "avg_gf": 5.06,
        "avg_ga": 2.06
      },
      {
        "team": "AUT",
        "advancement_pct": 61.9,
        "winner_pct": 20.8,
        "avg_points": 4.7,
        "avg_gf": 3.85,
        "avg_ga": 3.2
      },
      {
        "team": "ALG",
        "advancement_pct": 39.9,
        "winner_pct": 10.8,
        "avg_points": 3.74,
        "avg_gf": 3.3,
        "avg_ga": 3.77
      },
      {
        "team": "JOR",
        "advancement_pct": 8.4,
        "winner_pct": 1.6,
        "avg_points": 1.46,
        "avg_gf": 1.95,
        "avg_ga": 5.13
      },
    ]
  },
  "B": {
    "group": "B",
    "simulations": 10000,
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 67.2,
        "winner_pct": 37.7,
        "avg_points": 5.1,
        "avg_gf": 4.13,
        "avg_ga": 3.01
      },
      {
        "team": "TUR",
        "advancement_pct": 66.6,
        "winner_pct": 36.4,
        "avg_points": 5.07,
        "avg_gf": 4.08,
        "avg_ga": 2.97
      },
      {
        "team": "PAR",
        "advancement_pct": 42.6,
        "winner_pct": 18.0,
        "avg_points": 3.73,
        "avg_gf": 3.31,
        "avg_ga": 3.73
      },
      {
        "team": "AUS",
        "advancement_pct": 23.5,
        "winner_pct": 8.0,
        "avg_points": 2.55,
        "avg_gf": 2.63,
        "avg_ga": 4.45
      },
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 88.5,
        "winner_pct": 66.4,
        "avg_points": 6.67,
        "avg_gf": 4.96,
        "avg_ga": 2.13
      },
      {
        "team": "EGY",
        "advancement_pct": 53.7,
        "winner_pct": 18.1,
        "avg_points": 4.18,
        "avg_gf": 3.57,
        "avg_ga": 3.47
      },
      {
        "team": "IRN",
        "advancement_pct": 39.4,
        "winner_pct": 11.1,
        "avg_points": 3.53,
        "avg_gf": 3.2,
        "avg_ga": 3.87
      },
      {
        "team": "NZL",
        "advancement_pct": 18.4,
        "winner_pct": 4.4,
        "avg_points": 2.18,
        "avg_gf": 2.41,
        "avg_ga": 4.67
      },
    ]
  },
  "D": {
    "group": "D",
    "simulations": 10000,
    "teams": [
      {
        "team": "SUI",
        "advancement_pct": 82.3,
        "winner_pct": 52.2,
        "avg_points": 6.21,
        "avg_gf": 4.7,
        "avg_ga": 2.39
      },
      {
        "team": "CAN",
        "advancement_pct": 67.6,
        "winner_pct": 31.0,
        "avg_points": 5.13,
        "avg_gf": 4.11,
        "avg_ga": 2.99
      },
      {
        "team": "BIH",
        "advancement_pct": 42.1,
        "winner_pct": 15.1,
        "avg_points": 3.88,
        "avg_gf": 3.4,
        "avg_ga": 3.66
      },
      {
        "team": "QAT",
        "advancement_pct": 8.0,
        "winner_pct": 1.7,
        "avg_points": 1.46,
        "avg_gf": 1.98,
        "avg_ga": 5.14
      },
    ]
  },
  "E": {
    "group": "E",
    "simulations": 10000,
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 89.8,
        "winner_pct": 65.8,
        "avg_points": 6.87,
        "avg_gf": 5.09,
        "avg_ga": 2.08
      },
      {
        "team": "MAR",
        "advancement_pct": 64.6,
        "winner_pct": 21.8,
        "avg_points": 4.83,
        "avg_gf": 3.95,
        "avg_ga": 3.16
      },
      {
        "team": "SCO",
        "advancement_pct": 37.7,
        "winner_pct": 11.1,
        "avg_points": 3.69,
        "avg_gf": 3.27,
        "avg_ga": 3.81
      },
      {
        "team": "HAI",
        "advancement_pct": 7.9,
        "winner_pct": 1.3,
        "avg_points": 1.41,
        "avg_gf": 1.96,
        "avg_ga": 5.22
      },
    ]
  },
  "F": {
    "group": "F",
    "simulations": 10000,
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 87.5,
        "winner_pct": 61.6,
        "avg_points": 6.76,
        "avg_gf": 5.03,
        "avg_ga": 2.15
      },
      {
        "team": "ECU",
        "advancement_pct": 60.2,
        "winner_pct": 21.8,
        "avg_points": 4.88,
        "avg_gf": 3.96,
        "avg_ga": 3.1
      },
      {
        "team": "CIV",
        "advancement_pct": 49.0,
        "winner_pct": 16.2,
        "avg_points": 4.39,
        "avg_gf": 3.68,
        "avg_ga": 3.42
      },
      {
        "team": "CUW",
        "advancement_pct": 3.3,
        "winner_pct": 0.4,
        "avg_points": 0.85,
        "avg_gf": 1.61,
        "avg_ga": 5.61
      },
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 88.2,
        "winner_pct": 56.1,
        "avg_points": 6.5,
        "avg_gf": 4.9,
        "avg_ga": 2.24
      },
      {
        "team": "COL",
        "advancement_pct": 79.3,
        "winner_pct": 36.4,
        "avg_points": 5.58,
        "avg_gf": 4.36,
        "avg_ga": 2.72
      },
      {
        "team": "COD",
        "advancement_pct": 18.4,
        "winner_pct": 4.4,
        "avg_points": 2.51,
        "avg_gf": 2.6,
        "avg_ga": 4.52
      },
      {
        "team": "UZB",
        "advancement_pct": 14.1,
        "winner_pct": 3.1,
        "avg_points": 2.1,
        "avg_gf": 2.39,
        "avg_ga": 4.76
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
        "winner_pct": 74.6,
        "avg_points": 7.44,
        "avg_gf": 5.39,
        "avg_ga": 1.8
      },
      {
        "team": "URU",
        "advancement_pct": 73.6,
        "winner_pct": 21.4,
        "avg_points": 5.15,
        "avg_gf": 4.11,
        "avg_ga": 2.99
      },
      {
        "team": "CPV",
        "advancement_pct": 15.8,
        "winner_pct": 2.1,
        "avg_points": 2.19,
        "avg_gf": 2.41,
        "avg_ga": 4.76
      },
      {
        "team": "KSA",
        "advancement_pct": 14.6,
        "winner_pct": 1.9,
        "avg_points": 2.14,
        "avg_gf": 2.39,
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
        "advancement_pct": 87.9,
        "winner_pct": 63.1,
        "avg_points": 6.63,
        "avg_gf": 4.92,
        "avg_ga": 2.17
      },
      {
        "team": "CRO",
        "advancement_pct": 69.2,
        "winner_pct": 26.0,
        "avg_points": 4.97,
        "avg_gf": 4.02,
        "avg_ga": 3.05
      },
      {
        "team": "GHA",
        "advancement_pct": 24.8,
        "winner_pct": 6.2,
        "avg_points": 2.82,
        "avg_gf": 2.78,
        "avg_ga": 4.29
      },
      {
        "team": "PAN",
        "advancement_pct": 18.1,
        "winner_pct": 4.6,
        "avg_points": 2.24,
        "avg_gf": 2.42,
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
        "advancement_pct": 68.9,
        "winner_pct": 41.2,
        "avg_points": 5.19,
        "avg_gf": 4.16,
        "avg_ga": 2.91
      },
      {
        "team": "KOR",
        "advancement_pct": 59.5,
        "winner_pct": 29.4,
        "avg_points": 4.63,
        "avg_gf": 3.82,
        "avg_ga": 3.24
      },
      {
        "team": "CZE",
        "advancement_pct": 46.3,
        "winner_pct": 20.0,
        "avg_points": 3.93,
        "avg_gf": 3.42,
        "avg_ga": 3.63
      },
      {
        "team": "RSA",
        "advancement_pct": 25.3,
        "winner_pct": 9.3,
        "avg_points": 2.7,
        "avg_gf": 2.73,
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
        "advancement_pct": 87.1,
        "winner_pct": 59.5,
        "avg_points": 6.6,
        "avg_gf": 4.95,
        "avg_ga": 2.2
      },
      {
        "team": "NOR",
        "advancement_pct": 65.6,
        "winner_pct": 26.5,
        "avg_points": 5.08,
        "avg_gf": 4.05,
        "avg_ga": 3.01
      },
      {
        "team": "SEN",
        "advancement_pct": 41.9,
        "winner_pct": 13.0,
        "avg_points": 4.0,
        "avg_gf": 3.47,
        "avg_ga": 3.65
      },
      {
        "team": "IRQ",
        "advancement_pct": 5.3,
        "winner_pct": 1.0,
        "avg_points": 1.14,
        "avg_gf": 1.77,
        "avg_ga": 5.37
      },
    ]
  },
  "L": {
    "group": "L",
    "simulations": 10000,
    "teams": [
      {
        "team": "NED",
        "advancement_pct": 77.9,
        "winner_pct": 50.8,
        "avg_points": 5.82,
        "avg_gf": 4.52,
        "avg_ga": 2.58
      },
      {
        "team": "JPN",
        "advancement_pct": 60.1,
        "winner_pct": 27.1,
        "avg_points": 4.6,
        "avg_gf": 3.83,
        "avg_ga": 3.26
      },
      {
        "team": "SWE",
        "advancement_pct": 41.1,
        "winner_pct": 15.8,
        "avg_points": 3.68,
        "avg_gf": 3.3,
        "avg_ga": 3.81
      },
      {
        "team": "TUN",
        "advancement_pct": 20.8,
        "winner_pct": 6.3,
        "avg_points": 2.37,
        "avg_gf": 2.55,
        "avg_ga": 4.55
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
