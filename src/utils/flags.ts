// 国旗图片 + 球队资源映射
// 使用 flagcdn.com 的高清国旗 (免费CDN，无需API key)
// ESPN 球队 logo 作为徽章备选

const FLAG_CDN = 'https://flagcdn.com/w80';

// FIFA 国家代码 → ISO 3166-1 alpha-2 映射
// 大部分 FIFA 代码和 ISO 一致，以下为不一致的
const FIFA_TO_ISO: Record<string, string> = {
  // 不一致的映射
  RSA: 'za',     // 南非
  ENG: 'gb-eng', // 英格兰
  SCO: 'gb-sct', // 苏格兰
  CIV: 'ci',     // 科特迪瓦
  CUW: 'cw',     // 库拉索
  CPV: 'cv',     // 佛得角
  COD: 'cd',     // 刚果金
  IRN: 'ir',     // 伊朗
  KSA: 'sa',     // 沙特
  UZB: 'uz',     // 乌兹别克
  BIH: 'ba',     // 波黑
  NOR: 'no',     // 挪威
  JOR: 'jo',     // 约旦
  PAN: 'pa',     // 巴拿马
  HAI: 'ht',     // 海地
  ALG: 'dz',     // 阿尔及利亚
  NZL: 'nz',     // 新西兰
  TUN: 'tn',     // 突尼斯
  KOR: 'kr',     // 韩国
  // 3字母FIFA→2字母ISO
  ARG: 'ar',     // 阿根廷
  AUS: 'au',     // 澳大利亚
  AUT: 'at',     // 奥地利
  BEL: 'be',     // 比利时
  BRA: 'br',     // 巴西
  CAN: 'ca',     // 加拿大
  COL: 'co',     // 哥伦比亚
  CRO: 'hr',     // 克罗地亚
  CZE: 'cz',     // 捷克
  ECU: 'ec',     // 厄瓜多尔
  EGY: 'eg',     // 埃及
  ESP: 'es',     // 西班牙
  FRA: 'fr',     // 法国
  GER: 'de',     // 德国
  GHA: 'gh',     // 加纳
  IRQ: 'iq',     // 伊拉克
  JPN: 'jp',     // 日本
  MAR: 'ma',     // 摩洛哥
  MEX: 'mx',     // 墨西哥
  NED: 'nl',     // 荷兰
  PAR: 'py',     // 巴拉圭
  POR: 'pt',     // 葡萄牙
  QAT: 'qa',     // 卡塔尔
  SEN: 'sn',     // 塞内加尔
  SUI: 'ch',     // 瑞士
  SWE: 'se',     // 瑞典
  TUR: 'tr',     // 土耳其
  URU: 'uy',     // 乌拉圭
  USA: 'us',     // 美国
};

function getFlagUrl(fifaCode: string): string {
  const iso = FIFA_TO_ISO[fifaCode] || fifaCode.toLowerCase();
  return `${FLAG_CDN}/${iso}.png`;
}

// 备用：用 emoji 当 fallback（图片加载失败时）
function getEmojiFlag(fifaCode: string): string {
  const EMOJI_MAP: Record<string, string> = {
    MEX: '🇲🇽', RSA: '🇿🇦', KOR: '🇰🇷', CZE: '🇨🇿',
    CAN: '🇨🇦', BIH: '🇧🇦', QAT: '🇶🇦', SUI: '🇨🇭',
    USA: '🇺🇸', PAR: '🇵🇾', AUS: '🇦🇺', TUR: '🇹🇷',
    HAI: '🇭🇹', SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', MAR: '🇲🇦', BRA: '🇧🇷',
    GER: '🇩🇪', CUW: '🇨🇼', CIV: '🇨🇮', ECU: '🇪🇨',
    NED: '🇳🇱', JPN: '🇯🇵', SWE: '🇸🇪', TUN: '🇹🇳',
    ESP: '🇪🇸', CPV: '🇨🇻', KSA: '🇸🇦', URU: '🇺🇾',
    BEL: '🇧🇪', EGY: '🇪🇬', IRN: '🇮🇷', NZL: '🇳🇿',
    FRA: '🇫🇷', SEN: '🇸🇳', IRQ: '🇮🇶', NOR: '🇳🇴',
    ARG: '🇦🇷', ALG: '🇩🇿', AUT: '🇦🇹', JOR: '🇯🇴',
    POR: '🇵🇹', COD: '🇨🇩', UZB: '🇺🇿', COL: '🇨🇴',
    ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', CRO: '🇭🇷', GHA: '🇬🇭', PAN: '🇵🇦',
  };
  return EMOJI_MAP[fifaCode] || '🏳️';
}

// ESPN 球队 logo URL（从 ESPN API 原始数据提取的真实 ID）
function getTeamLogo(fifaCode: string): string {
  const ESPN_LOGO_MAP: Record<string, string> = {
    'ALG': '624', 'ARG': '202', 'AUS': '628', 'AUT': '474',
    'BEL': '459', 'BIH': '452', 'BRA': '205', 'CAN': '206',
    'CIV': '4789', 'COD': '2850', 'COL': '208', 'CPV': '2597',
    'CRO': '477', 'CUW': '11678', 'CZE': '450', 'ECU': '209',
    'EGY': '2620', 'ENG': '448', 'ESP': '164', 'FRA': '478',
    'GER': '481', 'GHA': '4469', 'HAI': '2654', 'IRN': '469',
    'IRQ': '4375', 'JOR': '2917', 'JPN': '627', 'KOR': '451',
    'KSA': '655', 'MAR': '2869', 'MEX': '203', 'NED': '449',
    'NOR': '464', 'NZL': '2666', 'PAN': '2659', 'PAR': '210',
    'POR': '482', 'QAT': '4398', 'RSA': '467', 'SCO': '580',
    'SEN': '654', 'SUI': '475', 'SWE': '466', 'TUN': '659',
    'TUR': '465', 'URU': '212', 'USA': '660', 'UZB': '2570',
  };
  const id = ESPN_LOGO_MAP[fifaCode];
  return id ? `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png` : '';
}

export { getFlagUrl, getEmojiFlag, getTeamLogo, FIFA_TO_ISO };
