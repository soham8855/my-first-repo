import { useState, useEffect } from 'react';
import { BarChart3Icon, ChevronsUpDownIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useVoting } from '@/context/VotingContext';
import { useLocation } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ElectionResults = () => {
  const { parties, candidates, votes, getVotesByParty, getPartyById } = useVoting();
  const location = useLocation();
  const isAdmin = location.pathname.includes('admin');

  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [electionType, setElectionType] = useState<'loksabha' | 'vidhan' | 'panchayat'>('loksabha');

  const electionTypeNames = {
    loksabha: 'लोकसभा चुनाव',
    vidhan: 'विधानसभा चुनाव', 
    panchayat: 'पंचायत चुनाव'
  };

  const votesByParty = getVotesByParty();
  const chartData = parties.map(party => ({
    name: party.name,
    votes: votesByParty[party.id] || 0,
    color: hashStringToColor(party.name),
    symbol: party.symbol
  }));

  const candidatesWithVotes = candidates.map(candidate => {
    const voteCount = votes.filter(vote => vote.candidateId === candidate.id).length;
    const party = getPartyById(candidate.partyId);
    return {
      ...candidate,
      voteCount,
      partyName: party?.name || 'Unknown',
      partySymbol: party?.symbol || '❓'
    };
  }).sort((a, b) => b.voteCount - a.voteCount);

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

  const totalVotes = votes.length;
  const voterParticipation = totalVotes > 0 ? 
    `${totalVotes} vote${totalVotes !== 1 ? 's' : ''} cast` : 
    'No votes cast yet';

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={isAdmin} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={isAdmin} />
        
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">चुनाव परिणाम</h1>
                <p className="text-muted-foreground">{voterParticipation}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                <Select
                  value={electionType}
                  onValueChange={(value) => setElectionType(value as any)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="चुनाव प्रकार" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loksabha">लोकसभा चुनाव</SelectItem>
                    <SelectItem value="vidhan">विधानसभा चुनाव</SelectItem>
                    <SelectItem value="panchayat">पंचायत चुनाव</SelectItem>
                  </SelectContent>
                </Select>
              
                <Select
                  value={chartType}
                  onValueChange={(value) => setChartType(value as 'bar' | 'pie')}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="चार्ट प्रकार" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">बार चार्ट</SelectItem>
                    <SelectItem value="pie">पाई चार्ट</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-6 bg-amber-100 border-l-4 border-amber-500 p-4 rounded-md">
              <h2 className="text-lg font-semibold flex items-center text-amber-800">
                <span className="mr-2 text-xl">🗳️</span>
                {electionTypeNames[electionType]} - परिणाम
              </h2>
              <p className="text-amber-700 text-sm mt-1">
                {electionType === 'loksabha' && '543 सीटों में से परिणाम प्रदर्शित हो रहे हैं'}
                {electionType === 'vidhan' && '288 सीटों में से परिणाम प्रदर्शित हो रहे हैं'}
                {electionType === 'panchayat' && '3340 सीटों में से परिणाम प्रदर्शित हो रहे हैं'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="col-span-1 lg:col-span-2 animate-fade-in border-amber-200">
                <CardHeader className="bg-amber-50/50">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3Icon className="h-5 w-5 text-amber-600" />
                    दल-वार वोट
                  </CardTitle>
                  <CardDescription>
                    प्रत्येक राजनीतिक दल द्वारा प्राप्त वोटों का विजुअल प्रतिनिधित्व
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === 'bar' ? (
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
                            formatter={(value) => [`${value} वोट`, 'वोट']}
                          />
                          <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : (
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="votes"
                            nameKey="name"
                            label={({ name, percent }) => 
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value} वोट`, 'वोट']}
                          />
                          <Legend />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-100 border-amber-200">
                <CardHeader className="bg-amber-50/50">
                  <CardTitle>दल परिणाम</CardTitle>
                  <CardDescription>
                    राजनीतिक दलों के अनुसार वोटों का विभाजन
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>प्रतीक</TableHead>
                        <TableHead>दल</TableHead>
                        <TableHead>वोट</TableHead>
                        <TableHead className="text-right">प्रतिशत</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chartData.map((party) => {
                        const percentage = totalVotes > 0 
                          ? ((party.votes / totalVotes) * 100).toFixed(1) 
                          : '0.0';
                          
                        return (
                          <TableRow key={party.name}>
                            <TableCell className="font-medium text-xl">{party.symbol}</TableCell>
                            <TableCell>{party.name}</TableCell>
                            <TableCell>{party.votes}</TableCell>
                            <TableCell className="text-right">{percentage}%</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-200 border-amber-200">
                <CardHeader className="bg-amber-50/50">
                  <CardTitle>उम्मीदवार परिणाम</CardTitle>
                  <CardDescription>
                    व्यक्तिगत उम्मीदवारों द्वारा प्राप्त वोट
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>उम्मीदवार</TableHead>
                        <TableHead>दल</TableHead>
                        <TableHead className="text-right">वोट</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {candidatesWithVotes.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell className="font-medium">{candidate.name}</TableCell>
                          <TableCell>
                            <span className="mr-2">{candidate.partySymbol}</span>
                            {candidate.partyName}
                          </TableCell>
                          <TableCell className="text-right">{candidate.voteCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ElectionResults;
