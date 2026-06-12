// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 出线率来自蒙特卡洛模拟 (10000次, 最后更新: 2026-06-11 05:00 UTC)

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
    "match_id": "760414",
    "home": "KOR",
    "away": "CZE",
    "home_win": 37.0,
    "draw": 31.0,
    "away_win": 32.0,
    "details": "KOR +160"
  },
  {
    "match_id": "760416",
    "home": "CAN",
    "away": "BIH",
    "home_win": 51.5,
    "draw": 27.1,
    "away_win": 21.4,
    "details": "CAN -115"
  },
  {
    "match_id": "760417",
    "home": "USA",
    "away": "PAR",
    "home_win": 48.8,
    "draw": 28.0,
    "away_win": 23.2,
    "details": "USA -105"
  },
  {
    "match_id": "760420",
    "home": "QAT",
    "away": "SUI",
    "home_win": 7.4,
    "draw": 14.8,
    "away_win": 77.8,
    "details": "SUI -425"
  },
  {
    "match_id": "760419",
    "home": "BRA",
    "away": "MAR",
    "home_win": 58.6,
    "draw": 24.8,
    "away_win": 16.6,
    "details": "BRA -160"
  },
  {
    "match_id": "760418",
    "home": "HAI",
    "away": "SCO",
    "home_win": 16.0,
    "draw": 22.9,
    "away_win": 61.1,
    "details": "SCO -175"
  },
  {
    "match_id": "760421",
    "home": "AUS",
    "away": "TUR",
    "home_win": 19.1,
    "draw": 25.1,
    "away_win": 55.8,
    "details": "TUR -140"
  },
  {
    "match_id": "760422",
    "home": "GER",
    "away": "CUW",
    "home_win": 91.0,
    "draw": 5.8,
    "away_win": 3.2,
    "details": "GER -3000"
  },
  {
    "match_id": "760425",
    "home": "NED",
    "away": "JPN",
    "home_win": 46.8,
    "draw": 27.2,
    "away_win": 26.0,
    "details": "NED +100"
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
    "home_win": 50.0,
    "draw": 27.7,
    "away_win": 22.3,
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
    "home_win": 57.7,
    "draw": 24.4,
    "away_win": 17.9,
    "details": "BEL -160"
  },
  {
    "match_id": "760429",
    "home": "KSA",
    "away": "URU",
    "home_win": 12.8,
    "draw": 21.3,
    "away_win": 65.9,
    "details": "URU -220"
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
    "home_win": 72.5,
    "draw": 17.4,
    "away_win": 10.1,
    "details": "AUT -310"
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
    "draw": 24.7,
    "away_win": 19.8,
    "details": "ENG -140"
  },
  {
    "match_id": "760434",
    "home": "GHA",
    "away": "PAN",
    "home_win": 45.6,
    "draw": 27.8,
    "away_win": 26.6,
    "details": "GHA +110"
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
    "home_win": 58.7,
    "draw": 23.9,
    "away_win": 17.4,
    "details": "CZE -160"
  },
  {
    "match_id": "760439",
    "home": "SUI",
    "away": "BIH",
    "home_win": 59.1,
    "draw": 23.4,
    "away_win": 17.5,
    "details": "SUI -160"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 73.1,
    "draw": 18.2,
    "away_win": 8.7,
    "details": "CAN -320"
  },
  {
    "match_id": "760441",
    "home": "MEX",
    "away": "KOR",
    "home_win": 51.0,
    "draw": 26.9,
    "away_win": 22.1,
    "details": "MEX -115"
  },
  {
    "match_id": "760442",
    "home": "USA",
    "away": "AUS",
    "home_win": 54.3,
    "draw": 24.3,
    "away_win": 21.4,
    "details": "USA -130"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 22.9,
    "draw": 29.1,
    "away_win": 48.0,
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
    "home_win": 42.4,
    "draw": 29.8,
    "away_win": 27.8,
    "details": "TUR +125"
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
    "home_win": 59.2,
    "draw": 24.7,
    "away_win": 16.1,
    "details": "BIH -160"
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
    "home_win": 71.5,
    "draw": 18.4,
    "away_win": 10.1,
    "details": "MAR -285"
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
    "home_win": 20.4,
    "draw": 26.3,
    "away_win": 53.3,
    "details": "MEX -125"
  },
  {
    "match_id": "760466",
    "home": "RSA",
    "away": "KOR",
    "home_win": 19.2,
    "draw": 24.9,
    "away_win": 55.9,
    "details": "KOR -140"
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
    "home_win": 35.4,
    "draw": 27.0,
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
    "home_win": 67.5,
    "draw": 20.5,
    "away_win": 12.0,
    "details": "SEN -235"
  },
  {
    "match_id": "760478",
    "home": "CPV",
    "away": "KSA",
    "home_win": 36.9,
    "draw": 29.5,
    "away_win": 33.6,
    "details": "CPV +160"
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
    "home_win": 57.6,
    "draw": 25.0,
    "away_win": 17.4,
    "details": "CRO -150"
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
    "home_win": 26.1,
    "draw": 30.5,
    "away_win": 43.4,
    "details": "AUT +125"
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
        "advancement_pct": 90.2,
        "winner_pct": 66.4,
        "avg_points": 6.8,
        "avg_gf": 5.05,
        "avg_ga": 2.07
      },
      {
        "team": "AUT",
        "advancement_pct": 59.7,
        "winner_pct": 20.8,
        "avg_points": 4.67,
        "avg_gf": 3.83,
        "avg_ga": 3.19
      },
      {
        "team": "ALG",
        "advancement_pct": 41.0,
        "winner_pct": 11.3,
        "avg_points": 3.77,
        "avg_gf": 3.33,
        "avg_ga": 3.74
      },
      {
        "team": "JOR",
        "advancement_pct": 9.1,
        "winner_pct": 1.5,
        "avg_points": 1.46,
        "avg_gf": 1.97,
        "avg_ga": 5.17
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
        "winner_pct": 37.6,
        "avg_points": 5.01,
        "avg_gf": 4.05,
        "avg_ga": 3.0
      },
      {
        "team": "TUR",
        "advancement_pct": 62.5,
        "winner_pct": 33.7,
        "avg_points": 4.82,
        "avg_gf": 3.96,
        "avg_ga": 3.11
      },
      {
        "team": "PAR",
        "advancement_pct": 43.6,
        "winner_pct": 18.4,
        "avg_points": 3.74,
        "avg_gf": 3.34,
        "avg_ga": 3.72
      },
      {
        "team": "AUS",
        "advancement_pct": 27.4,
        "winner_pct": 10.3,
        "avg_points": 2.8,
        "avg_gf": 2.79,
        "avg_ga": 4.3
      },
    ]
  },
  "C": {
    "group": "C",
    "simulations": 10000,
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 87.9,
        "winner_pct": 65.2,
        "avg_points": 6.6,
        "avg_gf": 4.93,
        "avg_ga": 2.18
      },
      {
        "team": "EGY",
        "advancement_pct": 54.3,
        "winner_pct": 19.2,
        "avg_points": 4.25,
        "avg_gf": 3.63,
        "avg_ga": 3.45
      },
      {
        "team": "IRN",
        "advancement_pct": 38.5,
        "winner_pct": 11.2,
        "avg_points": 3.49,
        "avg_gf": 3.17,
        "avg_ga": 3.87
      },
      {
        "team": "NZL",
        "advancement_pct": 19.2,
        "winner_pct": 4.5,
        "avg_points": 2.22,
        "avg_gf": 2.44,
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
        "advancement_pct": 80.9,
        "winner_pct": 50.9,
        "avg_points": 6.12,
        "avg_gf": 4.66,
        "avg_ga": 2.43
      },
      {
        "team": "CAN",
        "advancement_pct": 72.5,
        "winner_pct": 35.0,
        "avg_points": 5.35,
        "avg_gf": 4.24,
        "avg_ga": 2.85
      },
      {
        "team": "BIH",
        "advancement_pct": 37.3,
        "winner_pct": 12.1,
        "avg_points": 3.65,
        "avg_gf": 3.28,
        "avg_ga": 3.82
      },
      {
        "team": "QAT",
        "advancement_pct": 9.3,
        "winner_pct": 2.0,
        "avg_points": 1.54,
        "avg_gf": 2.02,
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
        "advancement_pct": 89.4,
        "winner_pct": 65.1,
        "avg_points": 6.84,
        "avg_gf": 5.03,
        "avg_ga": 2.07
      },
      {
        "team": "MAR",
        "advancement_pct": 64.2,
        "winner_pct": 22.1,
        "avg_points": 4.85,
        "avg_gf": 3.93,
        "avg_ga": 3.11
      },
      {
        "team": "SCO",
        "advancement_pct": 38.5,
        "winner_pct": 11.4,
        "avg_points": 3.71,
        "avg_gf": 3.29,
        "avg_ga": 3.78
      },
      {
        "team": "HAI",
        "advancement_pct": 7.9,
        "winner_pct": 1.4,
        "avg_points": 1.38,
        "avg_gf": 1.93,
        "avg_ga": 5.23
      },
    ]
  },
  "F": {
    "group": "F",
    "simulations": 10000,
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 87.0,
        "winner_pct": 62.0,
        "avg_points": 6.75,
        "avg_gf": 5.02,
        "avg_ga": 2.14
      },
      {
        "team": "ECU",
        "advancement_pct": 61.2,
        "winner_pct": 22.0,
        "avg_points": 4.89,
        "avg_gf": 3.98,
        "avg_ga": 3.12
      },
      {
        "team": "CIV",
        "advancement_pct": 47.9,
        "winner_pct": 15.6,
        "avg_points": 4.32,
        "avg_gf": 3.65,
        "avg_ga": 3.44
      },
      {
        "team": "CUW",
        "advancement_pct": 3.8,
        "winner_pct": 0.4,
        "avg_points": 0.89,
        "avg_gf": 1.62,
        "avg_ga": 5.58
      },
    ]
  },
  "G": {
    "group": "G",
    "simulations": 10000,
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 88.0,
        "winner_pct": 56.2,
        "avg_points": 6.49,
        "avg_gf": 4.88,
        "avg_ga": 2.24
      },
      {
        "team": "COL",
        "advancement_pct": 79.3,
        "winner_pct": 36.5,
        "avg_points": 5.59,
        "avg_gf": 4.39,
        "avg_ga": 2.71
      },
      {
        "team": "COD",
        "advancement_pct": 18.6,
        "winner_pct": 4.3,
        "avg_points": 2.51,
        "avg_gf": 2.61,
        "avg_ga": 4.53
      },
      {
        "team": "UZB",
        "advancement_pct": 14.1,
        "winner_pct": 3.0,
        "avg_points": 2.11,
        "avg_gf": 2.36,
        "avg_ga": 4.75
      },
    ]
  },
  "H": {
    "group": "H",
    "simulations": 10000,
    "teams": [
      {
        "team": "ESP",
        "advancement_pct": 95.9,
        "winner_pct": 73.8,
        "avg_points": 7.43,
        "avg_gf": 5.39,
        "avg_ga": 1.79
      },
      {
        "team": "URU",
        "advancement_pct": 74.6,
        "winner_pct": 22.2,
        "avg_points": 5.17,
        "avg_gf": 4.14,
        "avg_ga": 2.98
      },
      {
        "team": "CPV",
        "advancement_pct": 15.3,
        "winner_pct": 2.0,
        "avg_points": 2.2,
        "avg_gf": 2.41,
        "avg_ga": 4.71
      },
      {
        "team": "KSA",
        "advancement_pct": 14.2,
        "winner_pct": 2.0,
        "avg_points": 2.08,
        "avg_gf": 2.34,
        "avg_ga": 4.8
      },
    ]
  },
  "I": {
    "group": "I",
    "simulations": 10000,
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 88.2,
        "winner_pct": 63.6,
        "avg_points": 6.64,
        "avg_gf": 4.97,
        "avg_ga": 2.17
      },
      {
        "team": "CRO",
        "advancement_pct": 67.2,
        "winner_pct": 25.7,
        "avg_points": 4.91,
        "avg_gf": 3.97,
        "avg_ga": 3.09
      },
      {
        "team": "GHA",
        "advancement_pct": 26.4,
        "winner_pct": 6.6,
        "avg_points": 2.91,
        "avg_gf": 2.82,
        "avg_ga": 4.26
      },
      {
        "team": "PAN",
        "advancement_pct": 18.2,
        "winner_pct": 4.1,
        "avg_points": 2.22,
        "avg_gf": 2.41,
        "avg_ga": 4.65
      },
    ]
  },
  "J": {
    "group": "J",
    "simulations": 10000,
    "teams": [
      {
        "team": "MEX",
        "advancement_pct": 81.0,
        "winner_pct": 55.2,
        "avg_points": 5.97,
        "avg_gf": 4.59,
        "avg_ga": 2.48
      },
      {
        "team": "KOR",
        "advancement_pct": 48.9,
        "winner_pct": 20.1,
        "avg_points": 4.01,
        "avg_gf": 3.5,
        "avg_ga": 3.57
      },
      {
        "team": "CZE",
        "advancement_pct": 47.7,
        "winner_pct": 17.9,
        "avg_points": 3.91,
        "avg_gf": 3.42,
        "avg_ga": 3.62
      },
      {
        "team": "RSA",
        "advancement_pct": 22.4,
        "winner_pct": 6.8,
        "avg_points": 2.51,
        "avg_gf": 2.62,
        "avg_ga": 4.46
      },
    ]
  },
  "K": {
    "group": "K",
    "simulations": 10000,
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 88.0,
        "winner_pct": 61.6,
        "avg_points": 6.67,
        "avg_gf": 4.99,
        "avg_ga": 2.16
      },
      {
        "team": "NOR",
        "advancement_pct": 65.0,
        "winner_pct": 24.3,
        "avg_points": 5.02,
        "avg_gf": 4.04,
        "avg_ga": 3.05
      },
      {
        "team": "SEN",
        "advancement_pct": 41.8,
        "winner_pct": 13.3,
        "avg_points": 3.99,
        "avg_gf": 3.46,
        "avg_ga": 3.67
      },
      {
        "team": "IRQ",
        "advancement_pct": 5.2,
        "winner_pct": 0.8,
        "avg_points": 1.13,
        "avg_gf": 1.79,
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
        "winner_pct": 49.5,
        "avg_points": 5.76,
        "avg_gf": 4.48,
        "avg_ga": 2.63
      },
      {
        "team": "JPN",
        "advancement_pct": 59.8,
        "winner_pct": 28.4,
        "avg_points": 4.63,
        "avg_gf": 3.85,
        "avg_ga": 3.24
      },
      {
        "team": "SWE",
        "advancement_pct": 41.3,
        "winner_pct": 15.3,
        "avg_points": 3.65,
        "avg_gf": 3.3,
        "avg_ga": 3.81
      },
      {
        "team": "TUN",
        "advancement_pct": 20.9,
        "winner_pct": 6.8,
        "avg_points": 2.41,
        "avg_gf": 2.57,
        "avg_ga": 4.51
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
