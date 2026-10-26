
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BarChart3Icon, UsersIcon, MapPinIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useVoting } from '@/context/useVoting';
import { Button } from '@/components/ui/button';
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Mock data for constituencies
const constituencies = [
  { id: '1', name: 'Varanasi', state: 'Uttar Pradesh', type: 'Lok Sabha', voterCount: 1876342 },
  { id: '2', name: 'South Delhi', state: 'Delhi', type: 'Lok Sabha', voterCount: 1543267 },
  { id: '3', name: 'Bangalore South', state: 'Karnataka', type: 'Lok Sabha', voterCount: 2134587 },
];

const ConstituencyResults = () => {
  const { id } = useParams();
  const { candidates, votes, getPartyById } = useVoting();
  const [constituency, setConstituency] = useState<any>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  
  // Find constituency in mock data
  useEffect(() => {
    const found = constituencies.find(c => c.id === id);
    if (found) {
      setConstituency(found);
    }
  }, [id]);

  if (!constituency) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">निर्वाचन क्षेत्र नहीं मिला</h1>
          <Button asChild>
            <Link to="/election-results">वापस जाएँ</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock candidates specific to this constituency
  const constituencyCandidates = candidates.slice(0, 5).map(candidate => {
    const party = getPartyById(candidate.partyId);
    // Assign random vote counts
    const voteCount = Math.floor(Math.random() * 100000) + 50000;
    return {
      ...candidate,
      party,
      voteCount
    };
  });

  // Sort candidates by votes
  const sortedCandidates = [...constituencyCandidates].sort((a, b) => b.voteCount - a.voteCount);
  
  // Prepare chart data
  const chartData = sortedCandidates.map(candidate => ({
    name: candidate.name,
    party: candidate.party?.name || 'Unknown',
    votes: candidate.voteCount,
    color: hashStringToColor(candidate.party?.name || candidate.name)
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

  // Calculate total votes
  const totalVotes = sortedCandidates.reduce((sum, candidate) => sum + candidate.voteCount, 0);
  const turnoutPercentage = ((totalVotes / constituency.voterCount) * 100).toFixed(1);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={false} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={false} />
        
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-2">
                <Link to="/election-results" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  सभी परिणामों पर वापस जाएँ
                </Link>
              </Button>
              
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">{constituency.name} निर्वाचन क्षेत्र</h1>
                  <p className="text-muted-foreground flex items-center mt-1">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {constituency.state} • {constituency.type}
                  </p>
                </div>
                
                <div className="bg-amber-100 px-4 py-2 rounded-lg text-amber-800">
                  <div className="text-sm">मतदाता उपस्थिति</div>
                  <div className="text-xl font-bold">{turnoutPercentage}%</div>
                </div>
              </div>
            </div>
            
            {/* Winner Card */}
            {sortedCandidates.length > 0 && (
              <Card className="mb-8 border-green-300 bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="text-green-600 mr-2">🏆</span>
                    विजेता
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    सबसे अधिक वोट प्राप्त करने वाले उम्मीदवार
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center">
                      <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border-2 border-green-300 mr-4">
                        <UsersIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{sortedCandidates[0].name}</h3>
                        <p className="text-green-700 flex items-center">
                          {sortedCandidates[0].party?.symbol} {sortedCandidates[0].party?.name || "अज्ञात दल"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <div className="text-3xl font-bold text-green-700">
                        {sortedCandidates[0].voteCount.toLocaleString()}
                      </div>
                      <div className="text-green-700">
                        वोट • {((sortedCandidates[0].voteCount / totalVotes) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Results Chart */}
            <Card className="mb-8 border-amber-200">
              <CardHeader className="bg-amber-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <BarChart3Icon className="h-5 w-5 mr-2 text-amber-600" />
                    उम्मीदवार-वार वोट
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={chartType === 'bar' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartType('bar')}
                      className={chartType === 'bar' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                    >
                      बार
                    </Button>
                    <Button 
                      variant={chartType === 'pie' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartType('pie')}
                      className={chartType === 'pie' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                    >
                      पाई
                    </Button>
                  </div>
                </div>
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
                          formatter={(value) => [`${value.toLocaleString()} वोट`, 'वोट']}
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
                          formatter={(value) => [`${value.toLocaleString()} वोट`, 'वोट']}
                        />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Results Table */}
            <Card className="border-amber-200">
              <CardHeader className="bg-amber-50/50">
                <CardTitle>विस्तृत परिणाम</CardTitle>
                <CardDescription>
                  निर्वाचन क्षेत्र में सभी उम्मीदवारों के परिणाम
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>क्रम</TableHead>
                      <TableHead>उम्मीदवार</TableHead>
                      <TableHead>दल</TableHead>
                      <TableHead>वोट</TableHead>
                      <TableHead className="text-right">प्रतिशत</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate, index) => {
                      const percentage = ((candidate.voteCount / totalVotes) * 100).toFixed(1);
                      
                      return (
                        <TableRow key={candidate.id} className={index === 0 ? "bg-green-50" : ""}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{candidate.name}</TableCell>
                          <TableCell>
                            <span className="mr-1">{candidate.party?.symbol}</span>
                            {candidate.party?.name || "अज्ञात दल"}
                          </TableCell>
                          <TableCell>{candidate.voteCount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{percentage}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConstituencyResults;
