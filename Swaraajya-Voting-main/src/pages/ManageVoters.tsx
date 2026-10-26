
import { useState } from 'react';
import { PlusIcon, Pencil, Trash2, UserIcon, CheckIcon, XIcon } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useVoting } from '@/context/useVoting';
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
import { Badge } from '@/components/ui/badge';
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
import { toast } from 'sonner';

const ManageVoters = () => {
  const { voters, addVoter, updateVoter, deleteVoter, refreshData } = useVoting();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVoter, setCurrentVoter] = useState<any>(null);
  const [newVoter, setNewVoter] = useState({ name: '', email: '', aadhaarNumber: '' });
  
  const handleAddVoter = () => {
    if (!newVoter.name || !newVoter.email || !newVoter.aadhaarNumber) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!isValidEmail(newVoter.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!isValidAadhaar(newVoter.aadhaarNumber)) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }
    
    // Check if Aadhaar number already exists
    if (voters.some(voter => voter.aadhaarNumber === newVoter.aadhaarNumber)) {
      toast.error('A voter with this Aadhaar number already exists');
      return;
    }
    
    addVoter(newVoter);
    setNewVoter({ name: '', email: '', aadhaarNumber: '' });
    setIsAddDialogOpen(false);
    toast.success('Voter added successfully');
  };
  
  const handleEditVoter = () => {
    if (!currentVoter.name || !currentVoter.email || !currentVoter.aadhaarNumber) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!isValidEmail(currentVoter.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!isValidAadhaar(currentVoter.aadhaarNumber)) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }
    
    // Check if Aadhaar number already exists (excluding current voter)
    if (voters.some(voter => 
      voter.aadhaarNumber === currentVoter.aadhaarNumber && voter.id !== currentVoter.id
    )) {
      toast.error('A voter with this Aadhaar number already exists');
      return;
    }
    
    updateVoter(currentVoter);
    setIsEditDialogOpen(false);
    toast.success('Voter updated successfully');
  };
  
  const handleDeleteVoter = async (id: string) => {
    await deleteVoter(id);
    // Refresh all data after deleting a voter to ensure vote counts are updated
    await refreshData();
    toast.success('Voter deleted successfully');
  };
  
  const openEditDialog = (voter: any) => {
    setCurrentVoter({ ...voter });
    setIsEditDialogOpen(true);
  };
  
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const isValidAadhaar = (aadhaar: string) => {
    return /^\d{12}$/.test(aadhaar);
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
                  <UserIcon className="h-5 w-5 mr-2 text-primary" />
                  Manage Voters
                </h1>
                <p className="text-muted-foreground">Add, edit, or remove eligible voters</p>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    Add Voter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Voter</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new voter.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <Input 
                        id="name" 
                        value={newVoter.name} 
                        onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })} 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input 
                        id="email"
                        type="email"
                        value={newVoter.email}
                        onChange={(e) => setNewVoter({ ...newVoter, email: e.target.value })}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="aadhaar" className="text-sm font-medium">Aadhaar Number</label>
                      <Input 
                        id="aadhaar"
                        value={newVoter.aadhaarNumber}
                        onChange={(e) => setNewVoter({ ...newVoter, aadhaarNumber: e.target.value })}
                        placeholder="12-digit Aadhaar number"
                        maxLength={12}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the 12-digit Aadhaar number without spaces or hyphens
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddVoter}>Add Voter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Voters Table */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Aadhaar Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voters.length > 0 ? (
                    voters.map((voter) => (
                      <TableRow key={voter.id} className="animate-fade-in">
                        <TableCell className="font-medium">
                          {voter.name}
                        </TableCell>
                        <TableCell>{voter.email}</TableCell>
                        <TableCell>{voter.aadhaarNumber}</TableCell>
                        <TableCell>
                          {voter.hasVoted ? (
                            <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 flex w-fit items-center gap-1">
                              <CheckIcon className="h-3 w-3" />
                              Voted
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex w-fit items-center gap-1">
                              <XIcon className="h-3 w-3" />
                              Not Voted
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(voter)}
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
                                  <AlertDialogTitle>Delete Voter</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {voter.name}? This action cannot be undone.
                                    {voter.hasVoted && (
                                      <p className="mt-2 text-amber-600">
                                        Warning: This voter has already cast a vote. Deleting this voter will also remove their vote from the count.
                                      </p>
                                    )}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteVoter(voter.id)}
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                        No voters found. Click "Add Voter" to create one.
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
            <DialogTitle>Edit Voter</DialogTitle>
            <DialogDescription>
              Update the details of the voter.
            </DialogDescription>
          </DialogHeader>
          {currentVoter && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Full Name</label>
                <Input 
                  id="edit-name" 
                  value={currentVoter.name} 
                  onChange={(e) => setCurrentVoter({ ...currentVoter, name: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-email" className="text-sm font-medium">Email Address</label>
                <Input 
                  id="edit-email"
                  type="email"
                  value={currentVoter.email}
                  onChange={(e) => setCurrentVoter({ ...currentVoter, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-aadhaar" className="text-sm font-medium">Aadhaar Number</label>
                <Input 
                  id="edit-aadhaar"
                  value={currentVoter.aadhaarNumber}
                  onChange={(e) => setCurrentVoter({ ...currentVoter, aadhaarNumber: e.target.value })}
                  maxLength={12}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditVoter}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageVoters;
