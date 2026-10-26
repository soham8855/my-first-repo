
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VoteIcon, InfoIcon, UsersIcon, FlagIcon, BarChart3Icon, AlertTriangleIcon, CalendarIcon, MapIcon, CheckCircleIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import { useVoting } from '@/context/useVoting';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/context/LanguageContext';

const VoterDashboard = () => {
  const { parties, candidates, votes, voters, isElectionStarted } = useVoting();
  const { t } = useLanguage();
  
  // In a real app, you would fetch the current user/voter info
  const [currentVoter, setCurrentVoter] = useState({
    id: "voter-01",
    name: "John Doe",
    email: "john.doe@example.com",
    hasVoted: false
  });
  
  // Mock data for different election types in India
  const electionTypes = [
    {
      id: 1,
      name: 'लोकसभा',
      status: 'active',
      startDate: '2024-04-19',
      endDate: '2024-06-01',
      constituencies: 543,
      voterTurnout: '67.2%',
      phase: 'चरण 3 / 7',
      nextPhaseDate: '2024-05-07'
    },
    {
      id: 2,
      name: 'विधानसभा',
      status: 'upcoming',
      startDate: '2024-09-15',
      endDate: '2024-10-05',
      constituencies: 288,
      voterTurnout: '-',
      phase: 'निर्धारित',
      nextPhaseDate: '2024-09-15'
    },
    {
      id: 3,
      name: 'पंचायत',
      status: 'completed',
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      constituencies: 3340,
      voterTurnout: '72.8%',
      phase: 'पूर्ण',
      nextPhaseDate: '-'
    },
  ];
  
  // Update the current voter status based on voters data
  useEffect(() => {
    // Find the voter in our data (in a real app, this would be the logged-in user)
    const foundVoter = voters.find(v => v.id === currentVoter.id);
    if (foundVoter) {
      setCurrentVoter(prev => ({
        ...prev,
        hasVoted: foundVoter.hasVoted
      }));
    }
  }, [voters, currentVoter.id]);
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={false} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={false} />
        
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">{t('voter_dashboard')}</h1>
            </div>
            
            {/* Election status alert */}
            {!isElectionStarted && (
              <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">{t('election_not_active')}</h3>
                  <p className="text-amber-700 text-sm">
                    {t('wait_for_admin')}
                  </p>
                </div>
              </div>
            )}
            
            {/* Ongoing Elections Section */}
            <div className="mb-8 bg-card rounded-xl border border-amber-200 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-amber-600" />
                {t('ongoing_elections')}
              </h2>
              <div className="space-y-4">
                {electionTypes.map((election) => (
                  <Card 
                    key={election.id} 
                    className={`border-2 ${
                      election.status === 'active' ? 'border-amber-300 bg-amber-50/50' : 'border-amber-200'
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="flex items-center">
                          {election.status === 'active' && (
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          )}
                          {election.name}
                        </CardTitle>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          election.status === 'active' ? 'bg-green-100 text-green-800' : 
                          election.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {election.status === 'active' ? t('active') : 
                           election.status === 'upcoming' ? t('upcoming') : t('completed')}
                        </div>
                      </div>
                      <CardDescription>
                        {election.startDate} से {election.endDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
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
                        {election.status === 'active' && (
                          <div className="mt-1">
                            <span className="font-medium">{t('upcoming')}:</span> {election.nextPhaseDate}
                          </div>
                        )}
                      </div>
                      
                      {election.status === 'active' && (
                        <Button 
                          asChild
                          className="mt-3 bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
                          disabled={currentVoter.hasVoted}
                        >
                          <Link to="/cast-vote">
                            <VoteIcon className="h-4 w-4 mr-2" />
                            {currentVoter.hasVoted ? t('already_voted') : t('cast_vote')}
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard 
                title={t("political_parties")} 
                value={parties.length} 
                icon={<FlagIcon className="h-5 w-5" />}
                className="animate-fade-in"
                valueClassName="text-blue-500"
              />
              <DashboardCard 
                title={t("candidates")} 
                value={candidates.length} 
                icon={<UsersIcon className="h-5 w-5" />}
                className="animate-fade-in delay-75"
                valueClassName="text-emerald-500"
              />
              <DashboardCard 
                title={t("total_votes")} 
                value={votes.length} 
                icon={<VoteIcon className="h-5 w-5" />}
                className="animate-fade-in delay-150"
                valueClassName="text-amber-500"
              />
            </div>
            
            <Tabs defaultValue="voting" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="voting">{t('voting_info')}</TabsTrigger>
                <TabsTrigger value="results">{t('view_results')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="voting">
                {/* Voting Card */}
                <Card className="animate-fade-in delay-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <VoteIcon className="h-5 w-5 mr-2 text-primary" />
                      {t('your_vote')}
                    </CardTitle>
                    <CardDescription>
                      {t('select_candidate')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentVoter.hasVoted ? (
                      <div className="bg-green-50 text-green-700 rounded-lg p-4 flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1">
                          <VoteIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-800">{t('vote_cast_success')}</h3>
                          <p className="text-sm">
                            {t('already_voted')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="mb-4">
                          {isElectionStarted ? 
                            t("select_candidate") : 
                            t("election_not_active")}
                        </p>
                        
                        <Button 
                          asChild
                          disabled={!isElectionStarted}
                          className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
                        >
                          <Link to="/cast-vote">
                            <VoteIcon className="h-4 w-4 mr-2" />
                            {t('cast_vote')}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                <Card className="animate-fade-in delay-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3Icon className="h-5 w-5 mr-2 text-primary" />
                      {t('total_votes')}
                    </CardTitle>
                    <CardDescription>
                      {t('charts_and_stats')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <p className="mb-4">
                        {t('view_results')}
                      </p>
                      
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link to="/election-results">
                          <BarChart3Icon className="h-4 w-4 mr-2" />
                          {t('view_results')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Additional Information */}
            <Card className="mb-6 animate-fade-in delay-400 border-amber-200">
              <CardHeader className="bg-amber-50/50">
                <CardTitle className="flex items-center">
                  <InfoIcon className="h-5 w-5 mr-2 text-amber-600" />
                  {t('how_to_vote')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>{t('select_candidate')}</li>
                  <li>{t('vote_for')}</li>
                  <li>{t('confirm')}</li>
                  <li>{t('thank_you')}</li>
                </ol>
              </CardContent>
              <CardFooter className="border-t border-amber-100 pt-4">
                <p className="text-sm text-amber-800">
                  {t('each_voter_once')}
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoterDashboard;
