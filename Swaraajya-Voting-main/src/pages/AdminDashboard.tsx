
import { useState } from 'react';
import { BarChart3Icon, FlagIcon, UsersIcon, UserIcon, VoteIcon, PlayIcon, SquareIcon, CalendarIcon, MapIcon, CheckCircleIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import { useVoting } from '@/context/useVoting';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/context/LanguageContext';

const AdminDashboard = () => {
  const { 
    parties, 
    candidates, 
    voters, 
    votes, 
    getVotesByParty, 
    getPartyById, 
    isElectionStarted,
    startElection,
    stopElection 
  } = useVoting();

  const { t, language } = useLanguage();
  
  // Mock data for different election types in India
  const electionTypes = [
    {
      id: 1,
      name: 'Lok Sabha',
      status: 'active',
      startDate: '2024-04-19',
      endDate: '2024-06-01',
      constituencies: 543,
      voterTurnout: '67.2%',
      phase: 'Phase 3 of 7'
    },
    {
      id: 2,
      name: 'Vidhan Sabha',
      status: 'upcoming',
      startDate: '2024-09-15',
      endDate: '2024-10-05',
      constituencies: 288,
      voterTurnout: '-',
      phase: 'Scheduled'
    },
    {
      id: 3,
      name: 'Panchayat',
      status: 'completed',
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      constituencies: 3340,
      voterTurnout: '72.8%',
      phase: 'Completed'
    },
  ];
  
  // Prepare data for the chart
  const votesByParty = getVotesByParty();
  const chartData = parties.map(party => ({
    name: party.name,
    votes: votesByParty[party.id] || 0,
    color: hashStringToColor(party.name)
  }));

  // Function to generate a color based on a string (party name)
  function hashStringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
      '#1abc9c', '#d35400', '#34495e', '#7f8c8d', '#27ae60'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={true} />
        
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">{t('admin_dashboard')}</h1>
              
              <div className="flex gap-2">
                {isElectionStarted ? (
                  <Button 
                    variant="destructive" 
                    onClick={stopElection}
                    className="flex items-center gap-2"
                  >
                    <SquareIcon className="h-4 w-4" />
                    {t('stop_election')}
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    onClick={startElection}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <PlayIcon className="h-4 w-4" />
                    {t('start_election')}
                  </Button>
                )}
              </div>
            </div>
            
            {/* Election Status */}
            <div className="mb-8">
              <div className={`py-2 px-4 rounded-lg inline-flex items-center gap-2 text-white ${
                isElectionStarted ? 'bg-emerald-600' : 'bg-amber-600'
              }`}>
                {isElectionStarted ? (
                  <>
                    <PlayIcon className="h-4 w-4" />
                    <span>{t('election_in_progress')}</span>
                  </>
                ) : (
                  <>
                    <SquareIcon className="h-4 w-4" />
                    <span>{t('election_not_started')}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Ongoing Elections Section */}
            <div className="mb-8 bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                {t('ongoing_elections')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {electionTypes.map((election) => (
                  <Card key={election.id} className="border-2 border-amber-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{election.name}</CardTitle>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          election.status === 'active' ? 'bg-green-100 text-green-800' : 
                          election.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {t(election.status)}
                        </div>
                      </div>
                      <CardDescription>
                        {election.startDate} - {election.endDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapIcon className="h-4 w-4 text-amber-700" />
                          <span>{t('constituency')}: {election.constituencies}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-amber-700" />
                          <span>{t('voter_turnout')}: {election.voterTurnout}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-amber-800">
                        <span className="font-medium">{t('current_status')}:</span> {election.phase}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard 
                title={t('political_parties')}
                value={parties.length} 
                icon={<FlagIcon className="h-5 w-5" />}
                className="animate-fade-in"
                valueClassName="text-blue-500"
              />
              <DashboardCard 
                title={t('candidates')}
                value={candidates.length} 
                icon={<UsersIcon className="h-5 w-5" />}
                className="animate-fade-in delay-75"
                valueClassName="text-emerald-500"
              />
              <DashboardCard 
                title={t('voters')} 
                value={voters.length} 
                icon={<UserIcon className="h-5 w-5" />}
                className="animate-fade-in delay-150"
                valueClassName="text-purple-500"
              />
              <DashboardCard 
                title={t('total_votes')} 
                value={votes.length} 
                icon={<VoteIcon className="h-5 w-5" />}
                className="animate-fade-in delay-200"
                valueClassName="text-amber-500"
                subtitle="67.4% मतदाता भागीदारी"
              />
            </div>
            
            {/* Charts and Activity */}
            <Tabs defaultValue="charts" className="mb-8">
              <TabsList>
                <TabsTrigger value="charts">{t('charts_and_stats')}</TabsTrigger>
                <TabsTrigger value="activity">{t('recent_activity')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts" className="mt-4">
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm animate-fade-in delay-300">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <BarChart3Icon className="h-5 w-5 mr-2 text-primary" />
                    {t('party_wise_votes')}
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          tick={{ fontSize: 12 }}
                          height={60}
                        />
                        <YAxis />
                        <Tooltip 
                          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                          formatter={(value) => [
                            `${value} ${language === 'english' ? 'votes' : language === 'hindi' ? 'वोट' : 'मते'}`,
                            language === 'english' ? 'Votes' : language === 'hindi' ? 'वोट' : 'मते'
                          ]}
                        />
                        <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                {/* Recent Activity */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm animate-fade-in delay-400">
                  <h2 className="text-xl font-semibold mb-4">{t('recent_voting_activity')}</h2>
                  <div className="space-y-4">
                    {votes.length > 0 ? (
                      votes.slice(0, 5).map((vote) => {
                        const candidate = candidates.find(c => c.id === vote.candidateId);
                        const party = candidate ? getPartyById(candidate.partyId) : undefined;
                        const voter = voters.find(v => v.id === vote.voterId);
                        
                        return (
                          <div 
                            key={vote.id}
                            className="flex items-center p-3 rounded-lg bg-secondary/50"
                          >
                            <div className="mr-4 bg-primary/10 p-2 rounded-full text-primary">
                              <VoteIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {voter?.name || t('unknown_voter')} {t('voted_for')} {candidate?.name || t('unknown_candidate')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {party?.name || t('unknown_party')} • {new Date(vote.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground">{t('no_voting_activity')}</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
