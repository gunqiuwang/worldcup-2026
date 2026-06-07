// 国旗图片 + 球队资源映射
// 使用 flagcdn.com 的高清国旗 (免费CDN，无需API key)
// ESPN 球队 logo 作为徽章备选

const FLAG_CDN = 'https://flagcdn.com/w80';

// FIFA 国家代码 → ISO 3166-1 alpha-2 映射
// 大部分 FIFA 代码和 ISO 一致，以下为不一致的
const FIFA_TO_ISO: Record<string, string> = {
  RSA: 'za', // 南非
  ENG: 'gb-eng', // 英格兰
  SCO: 'gb-sct', // 苏格兰
  CIV: 'ci', // 科特迪瓦
  CUW: 'cw', // 库拉索
  CPV: 'cv', // 佛得角
  COD: 'cd', // 刚果金
  IRN: 'ir', // 伊朗
  KSA: 'sa', // 沙特
  UZB: 'uz', // 乌兹别克
  BIH: 'ba', // 波黑
  NOR: 'no', // 挪威
  JOR: 'jo', // 约旦
  PAN: 'pa', // 巴拿马
  HAI: 'ht', // 海地
  ALG: 'dz', // 阿尔及利亚
  NZL: 'nz', // 新西兰
  TUN: 'tn', // 突尼斯
  KOR: 'kr', // 韩国
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

// ESPN 球队 logo URL
function getTeamLogo(fifaCode: string): string {
  // ESPN 的球队 logo 格式
  const ESPN_LOGO_MAP: Record<string, string> = {
    MEX: '203', RSA: '467', KOR: '205', CZE: '201',
    CAN: '209', BIH: '246', QAT: '474', SUI: '324',
    USA: '248', PAR: '236', AUS: '199', TUR: '219',
    HAI: '450', SCO: '471', MAR: '461', BRA: '206',
    GER: '222', CUW: '18803', CIV: '229', ECU: '218',
    NED: '233', JPN: '230', SWE: '252', TUN: '256',
    ESP: '240', CPV: '18795', KSA: '253', URU: '258',
    BEL: '205', EGY: '217', IRN: '228', NZL: '234',
    FRA: '220', SEN: '243', IRQ: '227', NOR: '235',
    ARG: '202', ALG: '198', AUT: '204', JOR: '231',
    POR: '238', COD: '18794', UZB: '260', COL: '210',
    ENG: '215', CRO: '212', GHA: '223', PAN: '237',
  };
  const id = ESPN_LOGO_MAP[fifaCode];
  return id ? `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png` : '';
}

export { getFlagUrl, getEmojiFlag, getTeamLogo, FIFA_TO_ISO };
