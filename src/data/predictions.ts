// 唯一数据源 — 赔率概率 + 蒙特卡洛出线率
// 赔率来自博彩公司（最聪明的预测）
// 出线率来自 10000 次蒙特卡洛模拟（Poisson 比分模型）

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
    "home_win": 63.9,
    "draw": 17.6,
    "away_win": 18.5,
    "details": "MEX -215"
  },
  {
    "match_id": "760414",
    "home": "KOR",
    "away": "CZE",
    "home_win": 56.1,
    "draw": 18.7,
    "away_win": 25.1,
    "details": "KOR +165"
  },
  {
    "match_id": "760416",
    "home": "CAN",
    "away": "BIH",
    "home_win": 53.0,
    "draw": 20.3,
    "away_win": 26.7,
    "details": "CAN -120"
  },
  {
    "match_id": "760417",
    "home": "USA",
    "away": "PAR",
    "home_win": 55.7,
    "draw": 20.3,
    "away_win": 24.0,
    "details": "USA +100"
  },
  {
    "match_id": "760420",
    "home": "QAT",
    "away": "SUI",
    "home_win": 37.5,
    "draw": 17.6,
    "away_win": 44.9,
    "details": "SUI -400"
  },
  {
    "match_id": "760419",
    "home": "BRA",
    "away": "MAR",
    "home_win": 53.4,
    "draw": 18.7,
    "away_win": 27.9,
    "details": "BRA -165"
  },
  {
    "match_id": "760418",
    "home": "HAI",
    "away": "SCO",
    "home_win": 33.2,
    "draw": 17.6,
    "away_win": 49.1,
    "details": "SCO -220"
  },
  {
    "match_id": "760421",
    "home": "AUS",
    "away": "TUR",
    "home_win": 45.5,
    "draw": 19.5,
    "away_win": 35.0,
    "details": "TUR -125"
  },
  {
    "match_id": "760422",
    "home": "GER",
    "away": "CUW",
    "home_win": 73.8,
    "draw": 17.6,
    "away_win": 8.5,
    "details": "GER -5000"
  },
  {
    "match_id": "760425",
    "home": "NED",
    "away": "JPN",
    "home_win": 50.9,
    "draw": 20.3,
    "away_win": 28.8,
    "details": "NED +100"
  },
  {
    "match_id": "760423",
    "home": "CIV",
    "away": "ECU",
    "home_win": 37.5,
    "draw": 19.5,
    "away_win": 43.0,
    "details": "ECU +135"
  },
  {
    "match_id": "760424",
    "home": "SWE",
    "away": "TUN",
    "home_win": 50.5,
    "draw": 20.3,
    "away_win": 29.2,
    "details": "SWE -105"
  },
  {
    "match_id": "760428",
    "home": "ESP",
    "away": "CPV",
    "home_win": 71.7,
    "draw": 17.6,
    "away_win": 10.6,
    "details": "ESP -1200"
  },
  {
    "match_id": "760426",
    "home": "BEL",
    "away": "EGY",
    "home_win": 59.2,
    "draw": 18.7,
    "away_win": 22.1,
    "details": "BEL -155"
  },
  {
    "match_id": "760429",
    "home": "KSA",
    "away": "URU",
    "home_win": 30.8,
    "draw": 17.6,
    "away_win": 51.6,
    "details": "URU -205"
  },
  {
    "match_id": "760427",
    "home": "IRN",
    "away": "NZL",
    "home_win": 58.3,
    "draw": 19.5,
    "away_win": 22.2,
    "details": "IRN -125"
  },
  {
    "match_id": "760432",
    "home": "FRA",
    "away": "SEN",
    "home_win": 59.5,
    "draw": 17.6,
    "away_win": 22.8,
    "details": "FRA -220"
  },
  {
    "match_id": "760430",
    "home": "IRQ",
    "away": "NOR",
    "home_win": 43.6,
    "draw": 17.6,
    "away_win": 38.8,
    "details": "NOR -475"
  },
  {
    "match_id": "760433",
    "home": "ARG",
    "away": "ALG",
    "home_win": 64.7,
    "draw": 17.6,
    "away_win": 17.6,
    "details": "ARG -230"
  },
  {
    "match_id": "760431",
    "home": "AUT",
    "away": "JOR",
    "home_win": 65.1,
    "draw": 17.6,
    "away_win": 17.3,
    "details": "AUT -310"
  },
  {
    "match_id": "760435",
    "home": "POR",
    "away": "COD",
    "home_win": 67.3,
    "draw": 17.6,
    "away_win": 15.0,
    "details": "POR -370"
  },
  {
    "match_id": "760437",
    "home": "ENG",
    "away": "CRO",
    "home_win": 49.6,
    "draw": 19.5,
    "away_win": 30.9,
    "details": "ENG -140"
  },
  {
    "match_id": "760434",
    "home": "GHA",
    "away": "PAN",
    "home_win": 43.0,
    "draw": 20.3,
    "away_win": 36.8,
    "details": "GHA +100"
  },
  {
    "match_id": "760436",
    "home": "UZB",
    "away": "COL",
    "home_win": 32.5,
    "draw": 17.6,
    "away_win": 49.9,
    "details": "COL -240"
  },
  {
    "match_id": "760438",
    "home": "CZE",
    "away": "RSA",
    "home_win": 53.3,
    "draw": 20.3,
    "away_win": 26.5,
    "details": "CZE +100"
  },
  {
    "match_id": "760439",
    "home": "SUI",
    "away": "BIH",
    "home_win": 60.7,
    "draw": 18.7,
    "away_win": 20.6,
    "details": "SUI -170"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 48.9,
    "draw": 17.6,
    "away_win": 33.5,
    "details": "CAN -285"
  },
  {
    "match_id": "760441",
    "home": "MEX",
    "away": "KOR",
    "home_win": 50.4,
    "draw": 20.3,
    "away_win": 29.3,
    "details": "MEX -120"
  },
  {
    "match_id": "760442",
    "home": "USA",
    "away": "AUS",
    "home_win": 53.5,
    "draw": 19.5,
    "away_win": 26.9,
    "details": "USA -130"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 26.5,
    "draw": 20.3,
    "away_win": 53.3,
    "details": "MAR +105"
  },
  {
    "match_id": "760444",
    "home": "BRA",
    "away": "HAI",
    "home_win": 72.9,
    "draw": 17.6,
    "away_win": 9.5,
    "details": "BRA -1400"
  },
  {
    "match_id": "760443",
    "home": "TUR",
    "away": "PAR",
    "home_win": 57.1,
    "draw": 19.5,
    "away_win": 23.4,
    "details": "TUR +125"
  },
  {
    "match_id": "760447",
    "home": "NED",
    "away": "SWE",
    "home_win": 57.7,
    "draw": 18.7,
    "away_win": 23.6,
    "details": "NED -155"
  },
  {
    "match_id": "760448",
    "home": "GER",
    "away": "CIV",
    "home_win": 60.9,
    "draw": 18.7,
    "away_win": 20.3,
    "details": "GER -180"
  },
  {
    "match_id": "760446",
    "home": "ECU",
    "away": "CUW",
    "home_win": 66.0,
    "draw": 17.6,
    "away_win": 16.3,
    "details": "ECU -350"
  },
  {
    "match_id": "760449",
    "home": "TUN",
    "away": "JPN",
    "home_win": 30.7,
    "draw": 19.5,
    "away_win": 49.7,
    "details": "JPN -125"
  },
  {
    "match_id": "760453",
    "home": "ESP",
    "away": "KSA",
    "home_win": 70.5,
    "draw": 17.6,
    "away_win": 11.9,
    "details": "ESP -900"
  },
  {
    "match_id": "760451",
    "home": "BEL",
    "away": "IRN",
    "home_win": 59.0,
    "draw": 17.6,
    "away_win": 23.4,
    "details": "BEL -245"
  },
  {
    "match_id": "760450",
    "home": "URU",
    "away": "CPV",
    "home_win": 64.6,
    "draw": 17.6,
    "away_win": 17.7,
    "details": "URU -225"
  },
  {
    "match_id": "760452",
    "home": "NZL",
    "away": "EGY",
    "home_win": 28.3,
    "draw": 19.5,
    "away_win": 52.1,
    "details": "EGY -140"
  },
  {
    "match_id": "760456",
    "home": "ARG",
    "away": "AUT",
    "home_win": 59.4,
    "draw": 18.7,
    "away_win": 21.9,
    "details": "ARG -155"
  },
  {
    "match_id": "760457",
    "home": "FRA",
    "away": "IRQ",
    "home_win": 71.1,
    "draw": 17.6,
    "away_win": 11.2,
    "details": "FRA -1000"
  },
  {
    "match_id": "760454",
    "home": "NOR",
    "away": "SEN",
    "home_win": 25.9,
    "draw": 20.3,
    "away_win": 53.8,
    "details": "NOR +110"
  },
  {
    "match_id": "760455",
    "home": "JOR",
    "away": "ALG",
    "home_win": 31.7,
    "draw": 18.7,
    "away_win": 49.6,
    "details": "ALG -155"
  },
  {
    "match_id": "760461",
    "home": "POR",
    "away": "UZB",
    "home_win": 68.2,
    "draw": 17.6,
    "away_win": 14.1,
    "details": "POR -400"
  },
  {
    "match_id": "760458",
    "home": "ENG",
    "away": "GHA",
    "home_win": 66.0,
    "draw": 17.6,
    "away_win": 16.4,
    "details": "ENG -310"
  },
  {
    "match_id": "760460",
    "home": "PAN",
    "away": "CRO",
    "home_win": 30.8,
    "draw": 17.6,
    "away_win": 51.5,
    "details": "CRO -190"
  },
  {
    "match_id": "760459",
    "home": "COL",
    "away": "COD",
    "home_win": 62.4,
    "draw": 17.6,
    "away_win": 20.0,
    "details": "COL -205"
  },
  {
    "match_id": "760462",
    "home": "BIH",
    "away": "QAT",
    "home_win": 33.7,
    "draw": 18.7,
    "away_win": 47.5,
    "details": "BIH -165"
  },
  {
    "match_id": "760463",
    "home": "SUI",
    "away": "CAN",
    "home_win": 55.9,
    "draw": 20.3,
    "away_win": 23.8,
    "details": "SUI +110"
  },
  {
    "match_id": "760464",
    "home": "MAR",
    "away": "HAI",
    "home_win": 68.8,
    "draw": 17.6,
    "away_win": 13.6,
    "details": "MAR -450"
  },
  {
    "match_id": "760465",
    "home": "SCO",
    "away": "BRA",
    "home_win": 33.4,
    "draw": 17.6,
    "away_win": 49.0,
    "details": "BRA -250"
  },
  {
    "match_id": "760467",
    "home": "CZE",
    "away": "MEX",
    "home_win": 28.8,
    "draw": 19.5,
    "away_win": 51.6,
    "details": "MEX -125"
  },
  {
    "match_id": "760466",
    "home": "RSA",
    "away": "KOR",
    "home_win": 25.1,
    "draw": 20.3,
    "away_win": 54.6,
    "details": "KOR -105"
  },
  {
    "match_id": "760473",
    "home": "CUW",
    "away": "CIV",
    "home_win": 36.4,
    "draw": 17.6,
    "away_win": 46.0,
    "details": "CIV -290"
  },
  {
    "match_id": "760468",
    "home": "ECU",
    "away": "GER",
    "home_win": 30.9,
    "draw": 19.5,
    "away_win": 49.6,
    "details": "GER -150"
  },
  {
    "match_id": "760471",
    "home": "JPN",
    "away": "SWE",
    "home_win": 48.1,
    "draw": 20.3,
    "away_win": 31.6,
    "details": "JPN +105"
  },
  {
    "match_id": "760472",
    "home": "TUN",
    "away": "NED",
    "home_win": 31.6,
    "draw": 17.6,
    "away_win": 50.8,
    "details": "NED -195"
  },
  {
    "match_id": "760469",
    "home": "PAR",
    "away": "AUS",
    "home_win": 27.2,
    "draw": 20.3,
    "away_win": 52.5,
    "details": "PAR +120"
  },
  {
    "match_id": "760470",
    "home": "TUR",
    "away": "USA",
    "home_win": 34.4,
    "draw": 19.5,
    "away_win": 46.1,
    "details": "USA +150"
  },
  {
    "match_id": "760475",
    "home": "NOR",
    "away": "FRA",
    "home_win": 25.7,
    "draw": 19.5,
    "away_win": 54.8,
    "details": "FRA -125"
  },
  {
    "match_id": "760474",
    "home": "SEN",
    "away": "IRQ",
    "home_win": 63.7,
    "draw": 17.6,
    "away_win": 18.6,
    "details": "SEN -225"
  },
  {
    "match_id": "760478",
    "home": "CPV",
    "away": "KSA",
    "home_win": 39.0,
    "draw": 19.5,
    "away_win": 41.5,
    "details": "CPV +150"
  },
  {
    "match_id": "760479",
    "home": "URU",
    "away": "ESP",
    "home_win": 40.1,
    "draw": 18.7,
    "away_win": 41.2,
    "details": "ESP -155"
  },
  {
    "match_id": "760476",
    "home": "EGY",
    "away": "IRN",
    "home_win": 33.4,
    "draw": 19.5,
    "away_win": 47.1,
    "details": "EGY +125"
  },
  {
    "match_id": "760477",
    "home": "NZL",
    "away": "BEL",
    "home_win": 34.6,
    "draw": 17.6,
    "away_win": 47.8,
    "details": "BEL -360"
  },
  {
    "match_id": "760480",
    "home": "CRO",
    "away": "GHA",
    "home_win": 58.8,
    "draw": 19.5,
    "away_win": 21.7,
    "details": "CRO -140"
  },
  {
    "match_id": "760485",
    "home": "PAN",
    "away": "ENG",
    "home_win": 35.4,
    "draw": 17.6,
    "away_win": 47.0,
    "details": "ENG -400"
  },
  {
    "match_id": "760481",
    "home": "COL",
    "away": "POR",
    "home_win": 36.0,
    "draw": 20.3,
    "away_win": 43.7,
    "details": "POR +115"
  },
  {
    "match_id": "760482",
    "home": "COD",
    "away": "UZB",
    "home_win": 48.7,
    "draw": 18.7,
    "away_win": 32.6,
    "details": "COD +155"
  },
  {
    "match_id": "760484",
    "home": "ALG",
    "away": "AUT",
    "home_win": 32.8,
    "draw": 19.5,
    "away_win": 47.7,
    "details": "AUT +135"
  },
  {
    "match_id": "760483",
    "home": "JOR",
    "away": "ARG",
    "home_win": 36.1,
    "draw": 17.6,
    "away_win": 46.2,
    "details": "ARG -550"
  }
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
