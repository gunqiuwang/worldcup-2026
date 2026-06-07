import { useState, useEffect, useCallback } from 'react';

interface LiveMatch {
  espn_id: string;
  date: string;
  status: 'scheduled' | 'live' | 'finished';
  status_detail: string;
  elapsed: number | null;
  home: { abbr: string; name: string; score: number | null };
  away: { abbr: string; name: string; score: number | null };
  venue: string;
}

interface LiveScoresData {
  updated_at: string;
  count: number;
  matches: LiveMatch[];
}

interface StandingTeam {
  abbr: string;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
}

interface StandingGroup {
  group: string;
  teams: StandingTeam[];
}

interface StandingsData {
  updated_at: string;
  groups: StandingGroup[];
}

// Match ESPN ID to our live data
export function useLiveScores() {
  const [scores, setScores] = useState<LiveScoresData | null>(null);
  const [standings, setStandings] = useState<StandingsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [scoresResp, standingsResp] = await Promise.allSettled([
        fetch('/live_scores.json?t=' + Date.now()),
        fetch('/standings.json?t=' + Date.now()),
      ]);

      if (scoresResp.status === 'fulfilled' && scoresResp.value.ok) {
        const data = await scoresResp.value.json();
        setScores(data);
      }

      if (standingsResp.status === 'fulfilled' && standingsResp.value.ok) {
        const data = await standingsResp.value.json();
        if (data.groups && data.groups.length > 0) {
          setStandings(data);
        }
      }
    } catch (e) {
      console.warn('Live scores fetch failed:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // 比赛日每分钟刷新, 非比赛日每10分钟
    const timer = setInterval(fetchData, 60 * 1000);
    return () => clearInterval(timer);
  }, [fetchData]);

  // Get live status for a specific match by ESPN ID
  const getLiveMatch = useCallback(
    (matchId: string): LiveMatch | undefined => {
      if (!scores) return undefined;
      return scores.matches.find((m) => m.espn_id === matchId);
    },
    [scores]
  );

  // Count of live matches
  const liveCount = scores?.matches.filter((m) => m.status === 'live').length || 0;

  // Get standings for a group
  const getGroupStandings = useCallback(
    (groupLetter: string): StandingGroup | undefined => {
      if (!standings) return undefined;
      return standings.groups.find((g) =>
        g.group.toLowerCase().includes(`group ${groupLetter.toLowerCase()}`)
      );
    },
    [standings]
  );

  return {
    scores,
    standings,
    loading,
    liveCount,
    getLiveMatch,
    getGroupStandings,
    refresh: fetchData,
  };
}
