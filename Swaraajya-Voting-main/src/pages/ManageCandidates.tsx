
import { useState } from 'react';
import { PlusIcon, Pencil, Trash2, UsersIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useVoting } from '@/context/VotingContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

const ManageCandidates = () => {
  const { candidates, parties, addCandidate, updateCandidate, deleteCandidate, getPartyById } = useVoting();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<any>(null);
  const [newCandidate, setNewCandidate] = useState({ 
    name: '', 
    partyId: '', 
    imageUrl: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70) 
  });
  
  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.partyId) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    addCandidate(newCandidate);
    setNewCandidate({ 
      name: '', 
      partyId: '', 
      imageUrl: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70) 
    });
    setIsAddDialogOpen(false);
    toast.success('Candidate added successfully');
  };
  
  const handleEditCandidate = () => {
    if (!currentCandidate.name || !currentCandidate.partyId) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    updateCandidate(currentCandidate);
    setIsEditDialogOpen(false);
    toast.success('Candidate updated successfully');
  };
  
  const handleDeleteCandidate = (id: string) => {
    deleteCandidate(id);
    toast.success('Candidate deleted successfully');
  };
  
  const openEditDialog = (candidate: any) => {
    setCurrentCandidate({ ...candidate });
    setIsEditDialogOpen(true);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={true} />
        
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2 text-primary" />
                  Manage Candidates
                </h1>
                <p className="text-muted-foreground">Add, edit, or remove election candidates</p>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    Add Candidate
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Candidate</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new candidate.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Candidate Name</label>
                      <Input 
                        id="name" 
                        value={newCandidate.name} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} 
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="party" className="text-sm font-medium">Party</label>
                      <Select 
                        onValueChange={(value) => setNewCandidate({ ...newCandidate, partyId: value })}
                        value={newCandidate.partyId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a party" />
                        </SelectTrigger>
                        <SelectContent>
                          {parties.map((party) => (
                            <SelectItem key={party.id} value={party.id}>
                              {party.symbol} {party.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="imageUrl" className="text-sm font-medium">Image URL</label>
                      <Input 
                        id="imageUrl" 
                        value={newCandidate.imageUrl} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, imageUrl: e.target.value })} 
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddCandidate}>Add Candidate</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Candidates Table */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => {
                      const party = getPartyById(candidate.partyId);
                      
                      return (
                        <TableRow key={candidate.id} className="animate-fade-in">
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={candidate.imageUrl} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {candidate.name}
                          </TableCell>
                          <TableCell>
                            {party ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{party.symbol}</span>
                                <span>{party.name}</span>
                              </div>
                            ) : (
                              "Unknown Party"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(candidate)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Candidate</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {candidate.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteCandidate(candidate.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                        No candidates found. Click "Add Candidate" to create one.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
            <DialogDescription>
              Update the details of the candidate.
            </DialogDescription>
          </DialogHeader>
          {currentCandidate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Candidate Name</label>
                <Input 
                  id="edit-name" 
                  value={currentCandidate.name} 
                  onChange={(e) => setCurrentCandidate({ ...currentCandidate, name: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-party" className="text-sm font-medium">Party</label>
                <Select 
                  onValueChange={(value) => setCurrentCandidate({ ...currentCandidate, partyId: value })}
                  value={currentCandidate.partyId}
                >
                  <SelectTrigger id="edit-party">
                    <SelectValue placeholder="Select a party" />
                  </SelectTrigger>
                  <SelectContent>
                    {parties.map((party) => (
                      <SelectItem key={party.id} value={party.id}>
                        {party.symbol} {party.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-imageUrl" className="text-sm font-medium">Image URL</label>
                <Input 
                  id="edit-imageUrl" 
                  value={currentCandidate.imageUrl} 
                  onChange={(e) => setCurrentCandidate({ ...currentCandidate, imageUrl: e.target.value })} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCandidate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCandidates;
