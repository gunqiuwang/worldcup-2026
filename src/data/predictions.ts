// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (10000次, 最后更新: 2026-06-13 05:04 UTC)

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
    "home_win": 6.8,
    "draw": 14.8,
    "away_win": 78.4,
    "details": "SUI -450"
  },
  {
    "match_id": "760419",
    "home": "BRA",
    "away": "MAR",
    "home_win": 57.0,
    "draw": 25.0,
    "away_win": 18.0,
    "details": "BRA -150"
  },
  {
    "match_id": "760418",
    "home": "HAI",
    "away": "SCO",
    "home_win": 16.0,
    "draw": 22.3,
    "away_win": 61.7,
    "details": "SCO -180"
  },
  {
    "match_id": "760421",
    "home": "AUS",
    "away": "TUR",
    "home_win": 19.2,
    "draw": 24.9,
    "away_win": 55.9,
    "details": "TUR -140"
  },
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
    "home_win": 88.4,
    "draw": 8.0,
    "away_win": 3.6,
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
    "draw": 13.8,
    "away_win": 79.4,
    "details": "NOR -475"
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
    "home_win": 11.3,
    "draw": 20.4,
    "away_win": 68.3,
    "details": "COL -250"
  },
  {
    "match_id": "760438",
    "home": "CZE",
    "away": "RSA",
    "home_win": 55.4,
    "draw": 25.4,
    "away_win": 19.2,
    "details": "CZE -135"
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
    "draw": 28.2,
    "away_win": 23.9,
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
    "home_win": 23.3,
    "draw": 28.9,
    "away_win": 47.8,
    "details": "MAR +100"
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
    "home_win": 47.8,
    "draw": 29.4,
    "away_win": 22.8,
    "details": "TUR +100"
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
    "home_win": 14.8,
    "draw": 22.4,
    "away_win": 62.8,
    "details": "ALG -190"
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
    "home_win": 58.3,
    "draw": 25.0,
    "away_win": 16.7,
    "details": "BIH -155"
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
    "home_win": 44.5,
    "draw": 29.0,
    "away_win": 26.5,
    "details": "PAR +115"
  },
  {
    "match_id": "760470",
    "home": "TUR",
    "away": "USA",
    "home_win": 36.1,
    "draw": 26.3,
    "away_win": 37.6,
    "details": "USA +155"
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
    "home_win": 42.4,
    "draw": 26.2,
    "away_win": 31.4,
    "details": "CPV +125"
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
        "advancement_pct": 89.5,
        "winner_pct": 66.8,
        "avg_points": 6.81,
        "avg_gf": 5.07,
        "avg_ga": 2.07
      },
      {
        "team": "AUT",
        "advancement_pct": 62.3,
        "winner_pct": 21.2,
        "avg_points": 4.74,
        "avg_gf": 3.86,
        "avg_ga": 3.18
      },
      {
        "team": "ALG",
        "advancement_pct": 39.1,
        "winner_pct": 10.2,
        "avg_points": 3.67,
        "avg_gf": 3.27,
        "avg_ga": 3.79
      },
      {
        "team": "JOR",
        "advancement_pct": 9.0,
        "winner_pct": 1.8,
        "avg_points": 1.49,
        "avg_gf": 1.99,
        "avg_ga": 5.15
      },
    ]
  },
  "B": {
    "group": "B",
    "simulations": 10000,
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 66.5,
        "winner_pct": 37.7,
        "avg_points": 5.04,
        "avg_gf": 4.04,
        "avg_ga": 3.0
      },
      {
        "team": "TUR",
        "advancement_pct": 65.0,
        "winner_pct": 35.6,
        "avg_points": 5.0,
        "avg_gf": 4.05,
        "avg_ga": 3.0
      },
      {
        "team": "PAR",
        "advancement_pct": 43.5,
        "winner_pct": 18.0,
        "avg_points": 3.75,
        "avg_gf": 3.33,
        "avg_ga": 3.71
      },
      {
        "team": "AUS",
        "advancement_pct": 25.1,
        "winner_pct": 8.7,
        "avg_points": 2.64,
        "avg_gf": 2.67,
        "avg_ga": 4.38
      },
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 88.2,
        "winner_pct": 66.1,
        "avg_points": 6.64,
        "avg_gf": 4.96,
        "avg_ga": 2.15
      },
      {
        "team": "EGY",
        "advancement_pct": 53.6,
        "winner_pct": 18.0,
        "avg_points": 4.2,
        "avg_gf": 3.58,
        "avg_ga": 3.47
      },
      {
        "team": "IRN",
        "advancement_pct": 39.7,
        "winner_pct": 11.6,
        "avg_points": 3.53,
        "avg_gf": 3.21,
        "avg_ga": 3.86
      },
      {
        "team": "NZL",
        "advancement_pct": 18.5,
        "winner_pct": 4.3,
        "avg_points": 2.19,
        "avg_gf": 2.41,
        "avg_ga": 4.68
      },
    ]
  },
  "D": {
    "group": "D",
    "simulations": 10000,
    "teams": [
      {
        "team": "SUI",
        "advancement_pct": 81.3,
        "winner_pct": 51.6,
        "avg_points": 6.14,
        "avg_gf": 4.67,
        "avg_ga": 2.42
      },
      {
        "team": "CAN",
        "advancement_pct": 67.0,
        "winner_pct": 31.6,
        "avg_points": 5.1,
        "avg_gf": 4.11,
        "avg_ga": 3.01
      },
      {
        "team": "BIH",
        "advancement_pct": 41.9,
        "winner_pct": 14.5,
        "avg_points": 3.86,
        "avg_gf": 3.36,
        "avg_ga": 3.69
      },
      {
        "team": "QAT",
        "advancement_pct": 9.8,
        "winner_pct": 2.3,
        "avg_points": 1.57,
        "avg_gf": 2.07,
        "avg_ga": 5.09
      },
    ]
  },
  "E": {
    "group": "E",
    "simulations": 10000,
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 89.0,
        "winner_pct": 63.9,
        "avg_points": 6.81,
        "avg_gf": 5.02,
        "avg_ga": 2.07
      },
      {
        "team": "MAR",
        "advancement_pct": 64.2,
        "winner_pct": 22.9,
        "avg_points": 4.85,
        "avg_gf": 3.93,
        "avg_ga": 3.11
      },
      {
        "team": "SCO",
        "advancement_pct": 39.2,
        "winner_pct": 11.8,
        "avg_points": 3.74,
        "avg_gf": 3.29,
        "avg_ga": 3.77
      },
      {
        "team": "HAI",
        "advancement_pct": 7.6,
        "winner_pct": 1.3,
        "avg_points": 1.38,
        "avg_gf": 1.93,
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
        "winner_pct": 61.5,
        "avg_points": 6.74,
        "avg_gf": 5.0,
        "avg_ga": 2.13
      },
      {
        "team": "ECU",
        "advancement_pct": 60.1,
        "winner_pct": 22.1,
        "avg_points": 4.87,
        "avg_gf": 3.95,
        "avg_ga": 3.1
      },
      {
        "team": "CIV",
        "advancement_pct": 48.8,
        "winner_pct": 15.9,
        "avg_points": 4.39,
        "avg_gf": 3.65,
        "avg_ga": 3.39
      },
      {
        "team": "CUW",
        "advancement_pct": 3.5,
        "winner_pct": 0.5,
        "avg_points": 0.86,
        "avg_gf": 1.6,
        "avg_ga": 5.59
      },
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 87.3,
        "winner_pct": 55.0,
        "avg_points": 6.45,
        "avg_gf": 4.83,
        "avg_ga": 2.26
      },
      {
        "team": "COL",
        "advancement_pct": 78.2,
        "winner_pct": 37.4,
        "avg_points": 5.59,
        "avg_gf": 4.38,
        "avg_ga": 2.72
      },
      {
        "team": "COD",
        "advancement_pct": 19.7,
        "winner_pct": 4.3,
        "avg_points": 2.51,
        "avg_gf": 2.6,
        "avg_ga": 4.48
      },
      {
        "team": "UZB",
        "advancement_pct": 14.8,
        "winner_pct": 3.3,
        "avg_points": 2.13,
        "avg_gf": 2.38,
        "avg_ga": 4.73
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
        "winner_pct": 73.9,
        "avg_points": 7.42,
        "avg_gf": 5.39,
        "avg_ga": 1.8
      },
      {
        "team": "URU",
        "advancement_pct": 74.7,
        "winner_pct": 22.1,
        "avg_points": 5.2,
        "avg_gf": 4.15,
        "avg_ga": 2.96
      },
      {
        "team": "CPV",
        "advancement_pct": 15.8,
        "winner_pct": 2.1,
        "avg_points": 2.3,
        "avg_gf": 2.46,
        "avg_ga": 4.67
      },
      {
        "team": "KSA",
        "advancement_pct": 13.6,
        "winner_pct": 1.8,
        "avg_points": 1.98,
        "avg_gf": 2.28,
        "avg_ga": 4.85
      },
    ]
  },
  "I": {
    "group": "I",
    "simulations": 10000,
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 88.3,
        "winner_pct": 64.1,
        "avg_points": 6.64,
        "avg_gf": 4.96,
        "avg_ga": 2.16
      },
      {
        "team": "CRO",
        "advancement_pct": 67.8,
        "winner_pct": 25.4,
        "avg_points": 4.91,
        "avg_gf": 3.97,
        "avg_ga": 3.1
      },
      {
        "team": "GHA",
        "advancement_pct": 25.5,
        "winner_pct": 5.9,
        "avg_points": 2.82,
        "avg_gf": 2.79,
        "avg_ga": 4.33
      },
      {
        "team": "PAN",
        "advancement_pct": 18.4,
        "winner_pct": 4.5,
        "avg_points": 2.28,
        "avg_gf": 2.49,
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
        "advancement_pct": 68.8,
        "winner_pct": 40.9,
        "avg_points": 5.18,
        "avg_gf": 4.13,
        "avg_ga": 2.9
      },
      {
        "team": "KOR",
        "advancement_pct": 59.0,
        "winner_pct": 29.0,
        "avg_points": 4.62,
        "avg_gf": 3.82,
        "avg_ga": 3.21
      },
      {
        "team": "CZE",
        "advancement_pct": 47.2,
        "winner_pct": 20.7,
        "avg_points": 3.98,
        "avg_gf": 3.44,
        "avg_ga": 3.6
      },
      {
        "team": "RSA",
        "advancement_pct": 25.0,
        "winner_pct": 9.4,
        "avg_points": 2.68,
        "avg_gf": 2.69,
        "avg_ga": 4.37
      },
    ]
  },
  "K": {
    "group": "K",
    "simulations": 10000,
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 87.6,
        "winner_pct": 60.3,
        "avg_points": 6.66,
        "avg_gf": 4.93,
        "avg_ga": 2.14
      },
      {
        "team": "NOR",
        "advancement_pct": 65.2,
        "winner_pct": 26.1,
        "avg_points": 5.07,
        "avg_gf": 4.07,
        "avg_ga": 3.01
      },
      {
        "team": "SEN",
        "advancement_pct": 41.7,
        "winner_pct": 12.8,
        "avg_points": 3.97,
        "avg_gf": 3.43,
        "avg_ga": 3.65
      },
      {
        "team": "IRQ",
        "advancement_pct": 5.5,
        "winner_pct": 0.9,
        "avg_points": 1.12,
        "avg_gf": 1.75,
        "avg_ga": 5.39
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
        "winner_pct": 50.9,
        "avg_points": 5.81,
        "avg_gf": 4.47,
        "avg_ga": 2.59
      },
      {
        "team": "JPN",
        "advancement_pct": 59.9,
        "winner_pct": 26.9,
        "avg_points": 4.61,
        "avg_gf": 3.81,
        "avg_ga": 3.22
      },
      {
        "team": "SWE",
        "advancement_pct": 41.4,
        "winner_pct": 15.5,
        "avg_points": 3.68,
        "avg_gf": 3.28,
        "avg_ga": 3.77
      },
      {
        "team": "TUN",
        "advancement_pct": 20.7,
        "winner_pct": 6.6,
        "avg_points": 2.39,
        "avg_gf": 2.54,
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
