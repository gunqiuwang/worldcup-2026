// 自动生成的预测数据
// 由 generate_predictions.py 生成
// 最后更新: 2026-06-07 (FIXED: 使用schedule中的概率而非重新解析赔率)

export interface MatchPrediction {
  match_id: string;
  home: string;
  away: string;
  home_win: number;
  draw: number;
  away_win: number;
  confidence: 'high' | 'medium' | 'low';
  upset_index: number;
  details: string;
}

export interface GroupPrediction {
  teams: {
    team: string;
    advancement_pct: number;
    avg_points: number;
    avg_goals_for: number;
    avg_goals_against: number;
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
    "confidence": "high",
    "upset_index": 63,
    "details": "MEX -215"
  },
  {
    "match_id": "760414",
    "home": "KOR",
    "away": "CZE",
    "home_win": 56.1,
    "draw": 18.7,
    "away_win": 25.1,
    "confidence": "high",
    "upset_index": 49,
    "details": "KOR +165"
  },
  {
    "match_id": "760416",
    "home": "CAN",
    "away": "BIH",
    "home_win": 53.0,
    "draw": 20.3,
    "away_win": 26.7,
    "confidence": "medium",
    "upset_index": 46,
    "details": "CAN -120"
  },
  {
    "match_id": "760417",
    "home": "USA",
    "away": "PAR",
    "home_win": 55.7,
    "draw": 20.3,
    "away_win": 24.0,
    "confidence": "high",
    "upset_index": 52,
    "details": "USA +100"
  },
  {
    "match_id": "760420",
    "home": "QAT",
    "away": "SUI",
    "home_win": 37.5,
    "draw": 17.6,
    "away_win": 44.9,
    "confidence": "low",
    "upset_index": 25,
    "details": "SUI -400"
  },
  {
    "match_id": "760419",
    "home": "BRA",
    "away": "MAR",
    "home_win": 53.4,
    "draw": 18.7,
    "away_win": 27.9,
    "confidence": "medium",
    "upset_index": 44,
    "details": "BRA -165"
  },
  {
    "match_id": "760418",
    "home": "HAI",
    "away": "SCO",
    "home_win": 33.2,
    "draw": 17.6,
    "away_win": 49.1,
    "confidence": "medium",
    "upset_index": 33,
    "details": "SCO -220"
  },
  {
    "match_id": "760421",
    "home": "AUS",
    "away": "TUR",
    "home_win": 45.5,
    "draw": 19.5,
    "away_win": 35.0,
    "confidence": "medium",
    "upset_index": 30,
    "details": "TUR -125"
  },
  {
    "match_id": "760422",
    "home": "GER",
    "away": "CUW",
    "home_win": 73.8,
    "draw": 17.6,
    "away_win": 8.5,
    "confidence": "high",
    "upset_index": 83,
    "details": "GER -5000"
  },
  {
    "match_id": "760425",
    "home": "NED",
    "away": "JPN",
    "home_win": 50.9,
    "draw": 20.3,
    "away_win": 28.8,
    "confidence": "medium",
    "upset_index": 42,
    "details": "NED +100"
  },
  {
    "match_id": "760423",
    "home": "CIV",
    "away": "ECU",
    "home_win": 37.5,
    "draw": 19.5,
    "away_win": 43.0,
    "confidence": "low",
    "upset_index": 25,
    "details": "ECU +135"
  },
  {
    "match_id": "760424",
    "home": "SWE",
    "away": "TUN",
    "home_win": 50.5,
    "draw": 20.3,
    "away_win": 29.2,
    "confidence": "medium",
    "upset_index": 41,
    "details": "SWE -105"
  },
  {
    "match_id": "760428",
    "home": "ESP",
    "away": "CPV",
    "home_win": 71.7,
    "draw": 17.6,
    "away_win": 10.6,
    "confidence": "high",
    "upset_index": 78,
    "details": "ESP -1200"
  },
  {
    "match_id": "760426",
    "home": "BEL",
    "away": "EGY",
    "home_win": 59.2,
    "draw": 18.7,
    "away_win": 22.1,
    "confidence": "high",
    "upset_index": 55,
    "details": "BEL -155"
  },
  {
    "match_id": "760429",
    "home": "KSA",
    "away": "URU",
    "home_win": 30.8,
    "draw": 17.6,
    "away_win": 51.6,
    "confidence": "medium",
    "upset_index": 38,
    "details": "URU -205"
  },
  {
    "match_id": "760427",
    "home": "IRN",
    "away": "NZL",
    "home_win": 58.3,
    "draw": 19.5,
    "away_win": 22.2,
    "confidence": "high",
    "upset_index": 55,
    "details": "IRN -125"
  },
  {
    "match_id": "760432",
    "home": "FRA",
    "away": "SEN",
    "home_win": 59.5,
    "draw": 17.6,
    "away_win": 22.8,
    "confidence": "high",
    "upset_index": 54,
    "details": "FRA -220"
  },
  {
    "match_id": "760430",
    "home": "IRQ",
    "away": "NOR",
    "home_win": 43.6,
    "draw": 17.6,
    "away_win": 38.8,
    "confidence": "low",
    "upset_index": 22,
    "details": "NOR -475"
  },
  {
    "match_id": "760433",
    "home": "ARG",
    "away": "ALG",
    "home_win": 64.7,
    "draw": 17.6,
    "away_win": 17.6,
    "confidence": "high",
    "upset_index": 64,
    "details": "ARG -230"
  },
  {
    "match_id": "760431",
    "home": "AUT",
    "away": "JOR",
    "home_win": 65.1,
    "draw": 17.6,
    "away_win": 17.3,
    "confidence": "high",
    "upset_index": 65,
    "details": "AUT -310"
  },
  {
    "match_id": "760435",
    "home": "POR",
    "away": "COD",
    "home_win": 67.3,
    "draw": 17.6,
    "away_win": 15.0,
    "confidence": "high",
    "upset_index": 70,
    "details": "POR -370"
  },
  {
    "match_id": "760437",
    "home": "ENG",
    "away": "CRO",
    "home_win": 49.6,
    "draw": 19.5,
    "away_win": 30.9,
    "confidence": "medium",
    "upset_index": 38,
    "details": "ENG -140"
  },
  {
    "match_id": "760434",
    "home": "GHA",
    "away": "PAN",
    "home_win": 43.0,
    "draw": 20.3,
    "away_win": 36.8,
    "confidence": "low",
    "upset_index": 26,
    "details": "GHA +100"
  },
  {
    "match_id": "760436",
    "home": "UZB",
    "away": "COL",
    "home_win": 32.5,
    "draw": 17.6,
    "away_win": 49.9,
    "confidence": "medium",
    "upset_index": 35,
    "details": "COL -240"
  },
  {
    "match_id": "760438",
    "home": "CZE",
    "away": "RSA",
    "home_win": 53.3,
    "draw": 20.3,
    "away_win": 26.5,
    "confidence": "medium",
    "upset_index": 47,
    "details": "CZE +100"
  },
  {
    "match_id": "760439",
    "home": "SUI",
    "away": "BIH",
    "home_win": 60.7,
    "draw": 18.7,
    "away_win": 20.6,
    "confidence": "high",
    "upset_index": 58,
    "details": "SUI -170"
  },
  {
    "match_id": "760440",
    "home": "CAN",
    "away": "QAT",
    "home_win": 48.9,
    "draw": 17.6,
    "away_win": 33.5,
    "confidence": "medium",
    "upset_index": 33,
    "details": "CAN -285"
  },
  {
    "match_id": "760441",
    "home": "MEX",
    "away": "KOR",
    "home_win": 50.4,
    "draw": 20.3,
    "away_win": 29.3,
    "confidence": "medium",
    "upset_index": 41,
    "details": "MEX -120"
  },
  {
    "match_id": "760442",
    "home": "USA",
    "away": "AUS",
    "home_win": 53.5,
    "draw": 19.5,
    "away_win": 26.9,
    "confidence": "medium",
    "upset_index": 46,
    "details": "USA -130"
  },
  {
    "match_id": "760445",
    "home": "SCO",
    "away": "MAR",
    "home_win": 26.5,
    "draw": 20.3,
    "away_win": 53.3,
    "confidence": "medium",
    "upset_index": 47,
    "details": "MAR +105"
  },
  {
    "match_id": "760444",
    "home": "BRA",
    "away": "HAI",
    "home_win": 72.9,
    "draw": 17.6,
    "away_win": 9.5,
    "confidence": "high",
    "upset_index": 81,
    "details": "BRA -1400"
  },
  {
    "match_id": "760443",
    "home": "TUR",
    "away": "PAR",
    "home_win": 57.1,
    "draw": 19.5,
    "away_win": 23.4,
    "confidence": "high",
    "upset_index": 53,
    "details": "TUR +125"
  },
  {
    "match_id": "760447",
    "home": "NED",
    "away": "SWE",
    "home_win": 57.7,
    "draw": 18.7,
    "away_win": 23.6,
    "confidence": "high",
    "upset_index": 52,
    "details": "NED -155"
  },
  {
    "match_id": "760448",
    "home": "GER",
    "away": "CIV",
    "home_win": 60.9,
    "draw": 18.7,
    "away_win": 20.3,
    "confidence": "high",
    "upset_index": 59,
    "details": "GER -180"
  },
  {
    "match_id": "760446",
    "home": "ECU",
    "away": "CUW",
    "home_win": 66.0,
    "draw": 17.6,
    "away_win": 16.3,
    "confidence": "high",
    "upset_index": 67,
    "details": "ECU -350"
  },
  {
    "match_id": "760449",
    "home": "TUN",
    "away": "JPN",
    "home_win": 30.7,
    "draw": 19.5,
    "away_win": 49.7,
    "confidence": "medium",
    "upset_index": 38,
    "details": "JPN -125"
  },
  {
    "match_id": "760453",
    "home": "ESP",
    "away": "KSA",
    "home_win": 70.5,
    "draw": 17.6,
    "away_win": 11.9,
    "confidence": "high",
    "upset_index": 76,
    "details": "ESP -900"
  },
  {
    "match_id": "760451",
    "home": "BEL",
    "away": "IRN",
    "home_win": 59.0,
    "draw": 17.6,
    "away_win": 23.4,
    "confidence": "high",
    "upset_index": 53,
    "details": "BEL -245"
  },
  {
    "match_id": "760450",
    "home": "URU",
    "away": "CPV",
    "home_win": 64.6,
    "draw": 17.6,
    "away_win": 17.7,
    "confidence": "high",
    "upset_index": 64,
    "details": "URU -225"
  },
  {
    "match_id": "760452",
    "home": "NZL",
    "away": "EGY",
    "home_win": 28.3,
    "draw": 19.5,
    "away_win": 52.1,
    "confidence": "medium",
    "upset_index": 43,
    "details": "EGY -140"
  },
  {
    "match_id": "760456",
    "home": "ARG",
    "away": "AUT",
    "home_win": 59.4,
    "draw": 18.7,
    "away_win": 21.9,
    "confidence": "high",
    "upset_index": 56,
    "details": "ARG -155"
  },
  {
    "match_id": "760457",
    "home": "FRA",
    "away": "IRQ",
    "home_win": 71.1,
    "draw": 17.6,
    "away_win": 11.2,
    "confidence": "high",
    "upset_index": 77,
    "details": "FRA -1000"
  },
  {
    "match_id": "760454",
    "home": "NOR",
    "away": "SEN",
    "home_win": 25.9,
    "draw": 20.3,
    "away_win": 53.8,
    "confidence": "medium",
    "upset_index": 48,
    "details": "NOR +110"
  },
  {
    "match_id": "760455",
    "home": "JOR",
    "away": "ALG",
    "home_win": 31.7,
    "draw": 18.7,
    "away_win": 49.6,
    "confidence": "medium",
    "upset_index": 36,
    "details": "ALG -155"
  },
  {
    "match_id": "760461",
    "home": "POR",
    "away": "UZB",
    "home_win": 68.2,
    "draw": 17.6,
    "away_win": 14.1,
    "confidence": "high",
    "upset_index": 71,
    "details": "POR -400"
  },
  {
    "match_id": "760458",
    "home": "ENG",
    "away": "GHA",
    "home_win": 66.0,
    "draw": 17.6,
    "away_win": 16.4,
    "confidence": "high",
    "upset_index": 67,
    "details": "ENG -310"
  },
  {
    "match_id": "760460",
    "home": "PAN",
    "away": "CRO",
    "home_win": 30.8,
    "draw": 17.6,
    "away_win": 51.5,
    "confidence": "medium",
    "upset_index": 38,
    "details": "CRO -190"
  },
  {
    "match_id": "760459",
    "home": "COL",
    "away": "COD",
    "home_win": 62.4,
    "draw": 17.6,
    "away_win": 20.0,
    "confidence": "high",
    "upset_index": 60,
    "details": "COL -205"
  },
  {
    "match_id": "760462",
    "home": "BIH",
    "away": "QAT",
    "home_win": 33.7,
    "draw": 18.7,
    "away_win": 47.5,
    "confidence": "medium",
    "upset_index": 32,
    "details": "BIH -165"
  },
  {
    "match_id": "760463",
    "home": "SUI",
    "away": "CAN",
    "home_win": 55.9,
    "draw": 20.3,
    "away_win": 23.8,
    "confidence": "high",
    "upset_index": 52,
    "details": "SUI +110"
  },
  {
    "match_id": "760464",
    "home": "MAR",
    "away": "HAI",
    "home_win": 68.8,
    "draw": 17.6,
    "away_win": 13.6,
    "confidence": "high",
    "upset_index": 72,
    "details": "MAR -450"
  },
  {
    "match_id": "760465",
    "home": "SCO",
    "away": "BRA",
    "home_win": 33.4,
    "draw": 17.6,
    "away_win": 49.0,
    "confidence": "medium",
    "upset_index": 33,
    "details": "BRA -250"
  },
  {
    "match_id": "760467",
    "home": "CZE",
    "away": "MEX",
    "home_win": 28.8,
    "draw": 19.5,
    "away_win": 51.6,
    "confidence": "medium",
    "upset_index": 42,
    "details": "MEX -125"
  },
  {
    "match_id": "760466",
    "home": "RSA",
    "away": "KOR",
    "home_win": 25.1,
    "draw": 20.3,
    "away_win": 54.6,
    "confidence": "medium",
    "upset_index": 49,
    "details": "KOR -105"
  },
  {
    "match_id": "760473",
    "home": "CUW",
    "away": "CIV",
    "home_win": 36.4,
    "draw": 17.6,
    "away_win": 46.0,
    "confidence": "low",
    "upset_index": 27,
    "details": "CIV -290"
  },
  {
    "match_id": "760468",
    "home": "ECU",
    "away": "GER",
    "home_win": 30.9,
    "draw": 19.5,
    "away_win": 49.6,
    "confidence": "medium",
    "upset_index": 38,
    "details": "GER -150"
  },
  {
    "match_id": "760471",
    "home": "JPN",
    "away": "SWE",
    "home_win": 48.1,
    "draw": 20.3,
    "away_win": 31.6,
    "confidence": "medium",
    "upset_index": 36,
    "details": "JPN +105"
  },
  {
    "match_id": "760472",
    "home": "TUN",
    "away": "NED",
    "home_win": 31.6,
    "draw": 17.6,
    "away_win": 50.8,
    "confidence": "medium",
    "upset_index": 36,
    "details": "NED -195"
  },
  {
    "match_id": "760469",
    "home": "PAR",
    "away": "AUS",
    "home_win": 27.2,
    "draw": 20.3,
    "away_win": 52.5,
    "confidence": "medium",
    "upset_index": 45,
    "details": "PAR +120"
  },
  {
    "match_id": "760470",
    "home": "TUR",
    "away": "USA",
    "home_win": 34.4,
    "draw": 19.5,
    "away_win": 46.1,
    "confidence": "medium",
    "upset_index": 31,
    "details": "USA +150"
  },
  {
    "match_id": "760475",
    "home": "NOR",
    "away": "FRA",
    "home_win": 25.7,
    "draw": 19.5,
    "away_win": 54.8,
    "confidence": "medium",
    "upset_index": 48,
    "details": "FRA -125"
  },
  {
    "match_id": "760474",
    "home": "SEN",
    "away": "IRQ",
    "home_win": 63.7,
    "draw": 17.6,
    "away_win": 18.6,
    "confidence": "high",
    "upset_index": 62,
    "details": "SEN -225"
  },
  {
    "match_id": "760478",
    "home": "CPV",
    "away": "KSA",
    "home_win": 39.0,
    "draw": 19.5,
    "away_win": 41.5,
    "confidence": "low",
    "upset_index": 22,
    "details": "CPV +150"
  },
  {
    "match_id": "760479",
    "home": "URU",
    "away": "ESP",
    "home_win": 40.1,
    "draw": 18.7,
    "away_win": 41.2,
    "confidence": "low",
    "upset_index": 19,
    "details": "ESP -155"
  },
  {
    "match_id": "760476",
    "home": "EGY",
    "away": "IRN",
    "home_win": 33.4,
    "draw": 19.5,
    "away_win": 47.1,
    "confidence": "medium",
    "upset_index": 33,
    "details": "EGY +125"
  },
  {
    "match_id": "760477",
    "home": "NZL",
    "away": "BEL",
    "home_win": 34.6,
    "draw": 17.6,
    "away_win": 47.8,
    "confidence": "medium",
    "upset_index": 30,
    "details": "BEL -360"
  },
  {
    "match_id": "760480",
    "home": "CRO",
    "away": "GHA",
    "home_win": 58.8,
    "draw": 19.5,
    "away_win": 21.7,
    "confidence": "high",
    "upset_index": 56,
    "details": "CRO -140"
  },
  {
    "match_id": "760485",
    "home": "PAN",
    "away": "ENG",
    "home_win": 35.4,
    "draw": 17.6,
    "away_win": 47.0,
    "confidence": "medium",
    "upset_index": 29,
    "details": "ENG -400"
  },
  {
    "match_id": "760481",
    "home": "COL",
    "away": "POR",
    "home_win": 36.0,
    "draw": 20.3,
    "away_win": 43.7,
    "confidence": "low",
    "upset_index": 28,
    "details": "POR +115"
  },
  {
    "match_id": "760482",
    "home": "COD",
    "away": "UZB",
    "home_win": 48.7,
    "draw": 18.7,
    "away_win": 32.6,
    "confidence": "medium",
    "upset_index": 34,
    "details": "COD +155"
  },
  {
    "match_id": "760484",
    "home": "ALG",
    "away": "AUT",
    "home_win": 32.8,
    "draw": 19.5,
    "away_win": 47.7,
    "confidence": "medium",
    "upset_index": 34,
    "details": "AUT +135"
  },
  {
    "match_id": "760483",
    "home": "JOR",
    "away": "ARG",
    "home_win": 36.1,
    "draw": 17.6,
    "away_win": 46.2,
    "confidence": "medium",
    "upset_index": 27,
    "details": "ARG -550"
  }
];

export const GROUP_PREDICTIONS: Record<string, GroupPrediction> = {
  "A": {
    "teams": [
      {
        "team": "ARG",
        "advancement_pct": 90,
        "avg_points": 5.65,
        "avg_goals_for": 5.68,
        "avg_goals_against": 2.52
      },
      {
        "team": "AUT",
        "advancement_pct": 70,
        "avg_points": 4.6,
        "avg_goals_for": 4.49,
        "avg_goals_against": 3.65
      },
      {
        "team": "ALG",
        "advancement_pct": 30,
        "avg_points": 3.56,
        "avg_goals_for": 3.33,
        "avg_goals_against": 4.8
      },
      {
        "team": "JOR",
        "advancement_pct": 10,
        "avg_points": 3.09,
        "avg_goals_for": 2.84,
        "avg_goals_against": 5.36
      }
    ]
  },
  "B": {
    "teams": [
      {
        "team": "USA",
        "advancement_pct": 90,
        "avg_points": 5.25,
        "avg_goals_for": 5.18,
        "avg_goals_against": 2.84
      },
      {
        "team": "TUR",
        "advancement_pct": 70,
        "avg_points": 4.38,
        "avg_goals_for": 4.22,
        "avg_goals_against": 3.83
      },
      {
        "team": "AUS",
        "advancement_pct": 30,
        "avg_points": 4.34,
        "avg_goals_for": 4.16,
        "avg_goals_against": 3.86
      },
      {
        "team": "PAR",
        "advancement_pct": 10,
        "avg_points": 2.84,
        "avg_goals_for": 2.49,
        "avg_goals_against": 5.51
      }
    ]
  },
  "C": {
    "teams": [
      {
        "team": "BEL",
        "advancement_pct": 90,
        "avg_points": 5.52,
        "avg_goals_for": 5.53,
        "avg_goals_against": 2.67
      },
      {
        "team": "IRN",
        "advancement_pct": 70,
        "avg_points": 4.43,
        "avg_goals_for": 4.29,
        "avg_goals_against": 3.82
      },
      {
        "team": "EGY",
        "advancement_pct": 30,
        "avg_points": 3.81,
        "avg_goals_for": 3.59,
        "avg_goals_against": 4.49
      },
      {
        "team": "NZL",
        "advancement_pct": 10,
        "avg_points": 3.12,
        "avg_goals_for": 2.84,
        "avg_goals_against": 5.27
      }
    ]
  },
  "D": {
    "teams": [
      {
        "team": "SUI",
        "advancement_pct": 90,
        "avg_points": 5.41,
        "avg_goals_for": 5.38,
        "avg_goals_against": 2.73
      },
      {
        "team": "CAN",
        "advancement_pct": 70,
        "avg_points": 4.35,
        "avg_goals_for": 4.19,
        "avg_goals_against": 3.87
      },
      {
        "team": "QAT",
        "advancement_pct": 30,
        "avg_points": 4.09,
        "avg_goals_for": 3.95,
        "avg_goals_against": 4.25
      },
      {
        "team": "BIH",
        "advancement_pct": 10,
        "avg_points": 3.01,
        "avg_goals_for": 2.7,
        "avg_goals_against": 5.37
      }
    ]
  },
  "E": {
    "teams": [
      {
        "team": "BRA",
        "advancement_pct": 90,
        "avg_points": 5.8,
        "avg_goals_for": 5.84,
        "avg_goals_against": 2.36
      },
      {
        "team": "MAR",
        "advancement_pct": 70,
        "avg_points": 5.07,
        "avg_goals_for": 5.0,
        "avg_goals_against": 3.12
      },
      {
        "team": "SCO",
        "advancement_pct": 30,
        "avg_points": 3.83,
        "avg_goals_for": 3.63,
        "avg_goals_against": 4.52
      },
      {
        "team": "HAI",
        "advancement_pct": 10,
        "avg_points": 2.22,
        "avg_goals_for": 1.88,
        "avg_goals_against": 6.36
      }
    ]
  },
  "F": {
    "teams": [
      {
        "team": "GER",
        "advancement_pct": 90,
        "avg_points": 6.09,
        "avg_goals_for": 6.14,
        "avg_goals_against": 1.99
      },
      {
        "team": "ECU",
        "advancement_pct": 70,
        "avg_points": 4.76,
        "avg_goals_for": 4.66,
        "avg_goals_against": 3.45
      },
      {
        "team": "CIV",
        "advancement_pct": 30,
        "avg_points": 3.67,
        "avg_goals_for": 3.46,
        "avg_goals_against": 4.68
      },
      {
        "team": "CUW",
        "advancement_pct": 10,
        "avg_points": 2.36,
        "avg_goals_for": 2.04,
        "avg_goals_against": 6.19
      }
    ]
  },
  "G": {
    "teams": [
      {
        "team": "POR",
        "advancement_pct": 90,
        "avg_points": 5.93,
        "avg_goals_for": 5.97,
        "avg_goals_against": 2.17
      },
      {
        "team": "COL",
        "advancement_pct": 70,
        "avg_points": 5.0,
        "avg_goals_for": 4.94,
        "avg_goals_against": 3.21
      },
      {
        "team": "COD",
        "advancement_pct": 30,
        "avg_points": 3.05,
        "avg_goals_for": 2.79,
        "avg_goals_against": 5.41
      },
      {
        "team": "UZB",
        "advancement_pct": 10,
        "avg_points": 2.92,
        "avg_goals_for": 2.64,
        "avg_goals_against": 5.56
      }
    ]
  },
  "H": {
    "teams": [
      {
        "team": "ESP",
        "advancement_pct": 90,
        "avg_points": 6.04,
        "avg_goals_for": 6.11,
        "avg_goals_against": 2.09
      },
      {
        "team": "URU",
        "advancement_pct": 70,
        "avg_points": 5.23,
        "avg_goals_for": 5.21,
        "avg_goals_against": 2.99
      },
      {
        "team": "KSA",
        "advancement_pct": 30,
        "avg_points": 3.07,
        "avg_goals_for": 2.81,
        "avg_goals_against": 5.37
      },
      {
        "team": "CPV",
        "advancement_pct": 10,
        "avg_points": 2.57,
        "avg_goals_for": 2.24,
        "avg_goals_against": 5.93
      }
    ]
  },
  "I": {
    "teams": [
      {
        "team": "ENG",
        "advancement_pct": 90,
        "avg_points": 5.43,
        "avg_goals_for": 5.42,
        "avg_goals_against": 2.76
      },
      {
        "team": "CRO",
        "advancement_pct": 70,
        "avg_points": 4.8,
        "avg_goals_for": 4.71,
        "avg_goals_against": 3.4
      },
      {
        "team": "PAN",
        "advancement_pct": 30,
        "avg_points": 3.64,
        "avg_goals_for": 3.43,
        "avg_goals_against": 4.72
      },
      {
        "team": "GHA",
        "advancement_pct": 10,
        "avg_points": 3.01,
        "avg_goals_for": 2.7,
        "avg_goals_against": 5.39
      }
    ]
  },
  "J": {
    "teams": [
      {
        "team": "MEX",
        "advancement_pct": 90,
        "avg_points": 5.55,
        "avg_goals_for": 5.53,
        "avg_goals_against": 2.55
      },
      {
        "team": "KOR",
        "advancement_pct": 70,
        "avg_points": 4.79,
        "avg_goals_for": 4.67,
        "avg_goals_against": 3.35
      },
      {
        "team": "CZE",
        "advancement_pct": 30,
        "avg_points": 3.8,
        "avg_goals_for": 3.57,
        "avg_goals_against": 4.47
      },
      {
        "team": "RSA",
        "advancement_pct": 10,
        "avg_points": 2.69,
        "avg_goals_for": 2.34,
        "avg_goals_against": 5.73
      }
    ]
  },
  "K": {
    "teams": [
      {
        "team": "FRA",
        "advancement_pct": 90,
        "avg_points": 6.11,
        "avg_goals_for": 6.18,
        "avg_goals_against": 1.99
      },
      {
        "team": "SEN",
        "advancement_pct": 70,
        "avg_points": 4.76,
        "avg_goals_for": 4.68,
        "avg_goals_against": 3.47
      },
      {
        "team": "NOR",
        "advancement_pct": 30,
        "avg_points": 3.29,
        "avg_goals_for": 3.01,
        "avg_goals_against": 5.07
      },
      {
        "team": "IRQ",
        "advancement_pct": 10,
        "avg_points": 2.73,
        "avg_goals_for": 2.45,
        "avg_goals_against": 5.79
      }
    ]
  },
  "L": {
    "teams": [
      {
        "team": "NED",
        "advancement_pct": 90,
        "avg_points": 5.35,
        "avg_goals_for": 5.31,
        "avg_goals_against": 2.8
      },
      {
        "team": "JPN",
        "advancement_pct": 70,
        "avg_points": 4.4,
        "avg_goals_for": 4.22,
        "avg_goals_against": 3.77
      },
      {
        "team": "SWE",
        "advancement_pct": 30,
        "avg_points": 3.76,
        "avg_goals_for": 3.52,
        "avg_goals_against": 4.5
      },
      {
        "team": "TUN",
        "advancement_pct": 10,
        "avg_points": 3.32,
        "avg_goals_for": 3.05,
        "avg_goals_against": 5.03
      }
    ]
  }
};

export function findTeamInGroups(teamAbbr: string): { group: string; team: GroupPrediction['teams'][0] } | undefined {
  for (const [group, pred] of Object.entries(GROUP_PREDICTIONS)) {
    const team = pred.teams.find(t => t.team === teamAbbr);
    if (team) return { group, team };
  }
  return undefined;
}
