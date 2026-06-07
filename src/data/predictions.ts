// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (GROUP_PREDICTIONS, 手动更新)

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
        "advancement_pct": 74.2,
        "winner_pct": 47.4,
        "avg_points": 5.44,
        "avg_gf": 5.4,
        "avg_ga": 3.4
      },
      {
        "team": "AUT",
        "advancement_pct": 51.0,
        "winner_pct": 22.7,
        "avg_points": 4.22,
        "avg_gf": 4.43,
        "avg_ga": 4.32
      },
      {
        "team": "ALG",
        "advancement_pct": 37.5,
        "winner_pct": 14.9,
        "avg_points": 3.48,
        "avg_gf": 3.82,
        "avg_ga": 4.89
      },
      {
        "team": "JOR",
        "advancement_pct": 37.3,
        "winner_pct": 15.0,
        "avg_points": 3.49,
        "avg_gf": 3.85,
        "avg_ga": 4.89
      }
    ]
  },
  "B": {
    "group": "B",
    "simulations": 10000,
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 67.9,
        "winner_pct": 40.6,
        "avg_points": 5.12,
        "avg_gf": 5.11,
        "avg_ga": 3.59
      },
      {
        "team": "TUR",
        "advancement_pct": 55.4,
        "winner_pct": 27.9,
        "avg_points": 4.5,
        "avg_gf": 4.64,
        "avg_ga": 4.09
      },
      {
        "team": "AUS",
        "advancement_pct": 48.5,
        "winner_pct": 21.5,
        "avg_points": 4.07,
        "avg_gf": 4.29,
        "avg_ga": 4.43
      },
      {
        "team": "PAR",
        "advancement_pct": 28.2,
        "winner_pct": 10.1,
        "avg_points": 2.9,
        "avg_gf": 3.39,
        "avg_ga": 5.32
      }
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 71.7,
        "winner_pct": 45.7,
        "avg_points": 5.35,
        "avg_gf": 5.31,
        "avg_ga": 3.47
      },
      {
        "team": "IRN",
        "advancement_pct": 49.3,
        "winner_pct": 21.1,
        "avg_points": 4.1,
        "avg_gf": 4.31,
        "avg_ga": 4.38
      },
      {
        "team": "EGY",
        "advancement_pct": 40.7,
        "winner_pct": 17.5,
        "avg_points": 3.62,
        "avg_gf": 3.94,
        "avg_ga": 4.76
      },
      {
        "team": "NZL",
        "advancement_pct": 38.3,
        "winner_pct": 15.7,
        "avg_points": 3.53,
        "avg_gf": 3.89,
        "avg_ga": 4.84
      }
    ]
  },
  "D": {
    "group": "D",
    "simulations": 10000,
    "teams": [
      {
        "team": "SUI",
        "advancement_pct": 69.9,
        "winner_pct": 41.7,
        "avg_points": 5.27,
        "avg_gf": 5.22,
        "avg_ga": 3.52
      },
      {
        "team": "CAN",
        "advancement_pct": 57.3,
        "winner_pct": 27.7,
        "avg_points": 4.49,
        "avg_gf": 4.64,
        "avg_ga": 4.14
      },
      {
        "team": "QAT",
        "advancement_pct": 43.7,
        "winner_pct": 19.5,
        "avg_points": 3.82,
        "avg_gf": 4.17,
        "avg_ga": 4.63
      },
      {
        "team": "BIH",
        "advancement_pct": 29.0,
        "winner_pct": 11.0,
        "avg_points": 3.03,
        "avg_gf": 3.51,
        "avg_ga": 5.25
      }
    ]
  },
  "E": {
    "group": "E",
    "simulations": 10000,
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 75.2,
        "winner_pct": 46.7,
        "avg_points": 5.54,
        "avg_gf": 5.48,
        "avg_ga": 3.29
      },
      {
        "team": "MAR",
        "advancement_pct": 58.0,
        "winner_pct": 27.0,
        "avg_points": 4.6,
        "avg_gf": 4.73,
        "avg_ga": 4.01
      },
      {
        "team": "SCO",
        "advancement_pct": 47.1,
        "winner_pct": 20.5,
        "avg_points": 4.0,
        "avg_gf": 4.27,
        "avg_ga": 4.45
      },
      {
        "team": "HAI",
        "advancement_pct": 19.7,
        "winner_pct": 5.8,
        "avg_points": 2.49,
        "avg_gf": 3.01,
        "avg_ga": 5.74
      }
    ]
  },
  "F": {
    "group": "F",
    "simulations": 10000,
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 79.0,
        "winner_pct": 50.2,
        "avg_points": 5.77,
        "avg_gf": 5.63,
        "avg_ga": 3.08
      },
      {
        "team": "ECU",
        "advancement_pct": 61.2,
        "winner_pct": 29.6,
        "avg_points": 4.74,
        "avg_gf": 4.88,
        "avg_ga": 3.92
      },
      {
        "team": "CIV",
        "advancement_pct": 37.9,
        "winner_pct": 14.0,
        "avg_points": 3.52,
        "avg_gf": 3.89,
        "avg_ga": 4.86
      },
      {
        "team": "CUW",
        "advancement_pct": 21.9,
        "winner_pct": 6.1,
        "avg_points": 2.64,
        "avg_gf": 3.12,
        "avg_ga": 5.66
      }
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 76.4,
        "winner_pct": 47.0,
        "avg_points": 5.62,
        "avg_gf": 5.53,
        "avg_ga": 3.21
      },
      {
        "team": "COL",
        "advancement_pct": 66.3,
        "winner_pct": 34.8,
        "avg_points": 4.96,
        "avg_gf": 4.99,
        "avg_ga": 3.74
      },
      {
        "team": "COD",
        "advancement_pct": 29.0,
        "winner_pct": 9.2,
        "avg_points": 3.1,
        "avg_gf": 3.52,
        "avg_ga": 5.24
      },
      {
        "team": "UZB",
        "advancement_pct": 28.3,
        "winner_pct": 9.0,
        "avg_points": 2.99,
        "avg_gf": 3.43,
        "avg_ga": 5.28
      }
    ]
  },
  "H": {
    "group": "H",
    "simulations": 10000,
    "teams": [
      {
        "team": "ESP",
        "advancement_pct": 78.4,
        "winner_pct": 46.6,
        "avg_points": 5.69,
        "avg_gf": 5.56,
        "avg_ga": 3.13
      },
      {
        "team": "URU",
        "advancement_pct": 67.5,
        "winner_pct": 36.1,
        "avg_points": 5.1,
        "avg_gf": 5.1,
        "avg_ga": 3.61
      },
      {
        "team": "KSA",
        "advancement_pct": 30.1,
        "winner_pct": 10.1,
        "avg_points": 3.13,
        "avg_gf": 3.54,
        "avg_ga": 5.17
      },
      {
        "team": "CPV",
        "advancement_pct": 23.9,
        "winner_pct": 7.2,
        "avg_points": 2.77,
        "avg_gf": 3.21,
        "avg_ga": 5.5
      }
    ]
  },
  "I": {
    "group": "I",
    "simulations": 10000,
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 70.7,
        "winner_pct": 42.9,
        "avg_points": 5.24,
        "avg_gf": 5.2,
        "avg_ga": 3.5
      },
      {
        "team": "CRO",
        "advancement_pct": 54.6,
        "winner_pct": 25.8,
        "avg_points": 4.38,
        "avg_gf": 4.51,
        "avg_ga": 4.15
      },
      {
        "team": "PAN",
        "advancement_pct": 45.6,
        "winner_pct": 20.5,
        "avg_points": 3.9,
        "avg_gf": 4.18,
        "avg_ga": 4.55
      },
      {
        "team": "GHA",
        "advancement_pct": 29.1,
        "winner_pct": 10.8,
        "avg_points": 3.07,
        "avg_gf": 3.49,
        "avg_ga": 5.18
      }
    ]
  },
  "J": {
    "group": "J",
    "simulations": 10000,
    "teams": [
      {
        "team": "MEX",
        "advancement_pct": 72.2,
        "winner_pct": 45.1,
        "avg_points": 5.4,
        "avg_gf": 5.33,
        "avg_ga": 3.4
      },
      {
        "team": "KOR",
        "advancement_pct": 54.6,
        "winner_pct": 24.9,
        "avg_points": 4.39,
        "avg_gf": 4.51,
        "avg_ga": 4.15
      },
      {
        "team": "CZE",
        "advancement_pct": 47.9,
        "winner_pct": 21.2,
        "avg_points": 4.05,
        "avg_gf": 4.28,
        "avg_ga": 4.43
      },
      {
        "team": "RSA",
        "advancement_pct": 25.2,
        "winner_pct": 8.9,
        "avg_points": 2.78,
        "avg_gf": 3.27,
        "avg_ga": 5.42
      }
    ]
  },
  "K": {
    "group": "K",
    "simulations": 10000,
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 78.6,
        "winner_pct": 52.0,
        "avg_points": 5.78,
        "avg_gf": 5.65,
        "avg_ga": 3.11
      },
      {
        "team": "SEN",
        "advancement_pct": 54.5,
        "winner_pct": 22.9,
        "avg_points": 4.37,
        "avg_gf": 4.54,
        "avg_ga": 4.21
      },
      {
        "team": "NOR",
        "advancement_pct": 40.7,
        "winner_pct": 16.6,
        "avg_points": 3.6,
        "avg_gf": 3.95,
        "avg_ga": 4.73
      },
      {
        "team": "IRQ",
        "advancement_pct": 26.2,
        "winner_pct": 8.6,
        "avg_points": 2.9,
        "avg_gf": 3.31,
        "avg_ga": 5.41
      }
    ]
  },
  "L": {
    "group": "L",
    "simulations": 10000,
    "teams": [
      {
        "team": "NED",
        "advancement_pct": 69.5,
        "winner_pct": 42.9,
        "avg_points": 5.21,
        "avg_gf": 5.19,
        "avg_ga": 3.57
      },
      {
        "team": "JPN",
        "advancement_pct": 49.8,
        "winner_pct": 22.2,
        "avg_points": 4.1,
        "avg_gf": 4.31,
        "avg_ga": 4.4
      },
      {
        "team": "TUN",
        "advancement_pct": 40.7,
        "winner_pct": 18.4,
        "avg_points": 3.66,
        "avg_gf": 4.02,
        "avg_ga": 4.73
      },
      {
        "team": "SWE",
        "advancement_pct": 40.0,
        "winner_pct": 16.6,
        "avg_points": 3.62,
        "avg_gf": 3.93,
        "avg_ga": 4.75
      }
    ]
  }
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
