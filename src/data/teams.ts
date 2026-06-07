export interface TeamInfo {
  cn: string;
  flag: string;
  fifa_rank: number;
  tier: 'S' | 'A' | 'B' | 'C';  // 实力等级（从赔率推导）
  trend: '↑' | '→' | '↓';       // 近期状态趋势
}

export const GROUPS: Record<string, string[]> = {"A": ["ARG", "ALG", "AUT", "JOR"], "B": ["USA", "PAR", "AUS", "TUR"], "C": ["BEL", "EGY", "IRN", "NZL"], "D": ["CAN", "BIH", "QAT", "SUI"], "E": ["BRA", "HAI", "MAR", "SCO"], "F": ["GER", "CUW", "CIV", "ECU"], "G": ["COL", "POR", "COD", "UZB"], "H": ["ESP", "CPV", "KSA", "URU"], "I": ["ENG", "CRO", "GHA", "PAN"], "J": ["MEX", "CZE", "KOR", "RSA"], "K": ["FRA", "IRQ", "NOR", "SEN"], "L": ["NED", "JPN", "SWE", "TUN"]};

export const TEAMS: Record<string, TeamInfo> = {
  "ALG": { cn: "阿尔及利亚", flag: "🇩🇿", fifa_rank: 37, tier: "C", trend: "↓" },
  "ARG": { cn: "阿根廷", flag: "🇦🇷", fifa_rank: 1, tier: "A", trend: "↑" },
  "AUS": { cn: "澳大利亚", flag: "🇦🇺", fifa_rank: 24, tier: "B", trend: "→" },
  "AUT": { cn: "奥地利", flag: "🇦🇹", fifa_rank: 22, tier: "B", trend: "↓" },
  "BEL": { cn: "比利时", flag: "🇧🇪", fifa_rank: 8, tier: "A", trend: "→" },
  "BIH": { cn: "波黑", flag: "🇧🇦", fifa_rank: 63, tier: "C", trend: "↑" },
  "BRA": { cn: "巴西", flag: "🇧🇷", fifa_rank: 5, tier: "A", trend: "↑" },
  "CAN": { cn: "加拿大", flag: "🇨🇦", fifa_rank: 43, tier: "B", trend: "→" },
  "CIV": { cn: "科特迪瓦", flag: "🇨🇮", fifa_rank: 38, tier: "C", trend: "→" },
  "COD": { cn: "刚果(金)", flag: "🇨🇩", fifa_rank: 58, tier: "C", trend: "→" },
  "COL": { cn: "哥伦比亚", flag: "🇨🇴", fifa_rank: 14, tier: "B", trend: "↓" },
  "CPV": { cn: "佛得角", flag: "🇨🇻", fifa_rank: 72, tier: "C", trend: "↓" },
  "CRO": { cn: "克罗地亚", flag: "🇭🇷", fifa_rank: 9, tier: "B", trend: "→" },
  "CUW": { cn: "库拉索", flag: "🇨🇼", fifa_rank: 85, tier: "C", trend: "→" },
  "CZE": { cn: "捷克", flag: "🇨🇿", fifa_rank: 36, tier: "C", trend: "↓" },
  "ECU": { cn: "厄瓜多尔", flag: "🇪🇨", fifa_rank: 30, tier: "B", trend: "→" },
  "EGY": { cn: "埃及", flag: "🇪🇬", fifa_rank: 32, tier: "C", trend: "↓" },
  "ENG": { cn: "英格兰", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fifa_rank: 4, tier: "A", trend: "→" },
  "ESP": { cn: "西班牙", flag: "🇪🇸", fifa_rank: 3, tier: "S", trend: "↓" },
  "FRA": { cn: "法国", flag: "🇫🇷", fifa_rank: 2, tier: "S", trend: "→" },
  "GER": { cn: "德国", flag: "🇩🇪", fifa_rank: 10, tier: "S", trend: "↑" },
  "GHA": { cn: "加纳", flag: "🇬🇭", fifa_rank: 47, tier: "C", trend: "↓" },
  "HAI": { cn: "海地", flag: "🇭🇹", fifa_rank: 87, tier: "C", trend: "↓" },
  "IRN": { cn: "伊朗", flag: "🇮🇷", fifa_rank: 20, tier: "B", trend: "↑" },
  "IRQ": { cn: "伊拉克", flag: "🇮🇶", fifa_rank: 59, tier: "C", trend: "↓" },
  "JOR": { cn: "约旦", flag: "🇯🇴", fifa_rank: 68, tier: "C", trend: "↓" },
  "JPN": { cn: "日本", flag: "🇯🇵", fifa_rank: 18, tier: "B", trend: "→" },
  "KOR": { cn: "韩国", flag: "🇰🇷", fifa_rank: 23, tier: "B", trend: "→" },
  "KSA": { cn: "沙特", flag: "🇸🇦", fifa_rank: 56, tier: "C", trend: "↓" },
  "MAR": { cn: "摩洛哥", flag: "🇲🇦", fifa_rank: 13, tier: "A", trend: "↑" },
  "MEX": { cn: "墨西哥", flag: "🇲🇽", fifa_rank: 15, tier: "A", trend: "↑" },
  "NED": { cn: "荷兰", flag: "🇳🇱", fifa_rank: 6, tier: "A", trend: "→" },
  "NOR": { cn: "挪威", flag: "🇳🇴", fifa_rank: 42, tier: "C", trend: "↓" },
  "NZL": { cn: "新西兰", flag: "🇳🇿", fifa_rank: 94, tier: "C", trend: "↓" },
  "PAN": { cn: "巴拿马", flag: "🇵🇦", fifa_rank: 48, tier: "C", trend: "↓" },
  "PAR": { cn: "巴拉圭", flag: "🇵🇾", fifa_rank: 55, tier: "C", trend: "→" },
  "POR": { cn: "葡萄牙", flag: "🇵🇹", fifa_rank: 7, tier: "A", trend: "↑" },
  "QAT": { cn: "卡塔尔", flag: "🇶🇦", fifa_rank: 40, tier: "C", trend: "↓" },
  "RSA": { cn: "南非", flag: "🇿🇦", fifa_rank: 57, tier: "C", trend: "↓" },
  "SCO": { cn: "苏格兰", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fifa_rank: 39, tier: "C", trend: "↑" },
  "SEN": { cn: "塞内加尔", flag: "🇸🇳", fifa_rank: 17, tier: "B", trend: "→" },
  "SUI": { cn: "瑞士", flag: "🇨🇭", fifa_rank: 16, tier: "A", trend: "↑" },
  "SWE": { cn: "瑞典", flag: "🇸🇪", fifa_rank: 25, tier: "C", trend: "→" },
  "TUN": { cn: "突尼斯", flag: "🇹🇳", fifa_rank: 35, tier: "C", trend: "↓" },
  "TUR": { cn: "土耳其", flag: "🇹🇷", fifa_rank: 26, tier: "B", trend: "↑" },
  "URU": { cn: "乌拉圭", flag: "🇺🇾", fifa_rank: 11, tier: "A", trend: "↑" },
  "USA": { cn: "美国", flag: "🇺🇸", fifa_rank: 12, tier: "A", trend: "↑" },
  "UZB": { cn: "乌兹别克斯坦", flag: "🇺🇿", fifa_rank: 61, tier: "C", trend: "↓" }
};

export const TEAM_TO_GROUP: Record<string, string> = {};
for (const [group, members] of Object.entries(GROUPS)) {
  for (const member of members) {
    TEAM_TO_GROUP[member] = group;
  }
}