
import { useState } from 'react';
import { PlusIcon, Pencil, Trash2, FlagIcon, RefreshCcw } from 'lucide-react';
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

const ManageParties = () => {
  const { parties, addParty, updateParty, deleteParty, loading, refreshData } = useVoting();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentParty, setCurrentParty] = useState<any>(null);
  const [newParty, setNewParty] = useState({ name: '', symbol: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddParty = async () => {
    if (!newParty.name || !newParty.symbol) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addParty(newParty);
      setNewParty({ name: '', symbol: '' });
      setIsAddDialogOpen(false);
      toast.success('Party added successfully');
    } catch (error) {
      console.error('Error adding party:', error);
      toast.error('Failed to add party');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditParty = async () => {
    if (!currentParty.name || !currentParty.symbol) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await updateParty(currentParty);
      setIsEditDialogOpen(false);
      toast.success('Party updated successfully');
    } catch (error) {
      console.error('Error updating party:', error);
      toast.error('Failed to update party');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteParty = async (id: string) => {
    try {
      await deleteParty(id);
      toast.success('Party deleted successfully');
    } catch (error) {
      console.error('Error deleting party:', error);
      toast.error('Failed to delete party');
    }
  };
  
  const handleRefresh = async () => {
    toast.info('Refreshing data...');
    await refreshData();
    toast.success('Data refreshed successfully');
  };
  
  const openEditDialog = (party: any) => {
    setCurrentParty({ ...party });
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
                  <FlagIcon className="h-5 w-5 mr-2 text-primary" />
                  Manage Parties
                </h1>
                <p className="text-muted-foreground">Add, edit, or remove political parties</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </Button>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <PlusIcon className="h-4 w-4" />
                      Add Party
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Party</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new political party.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Party Name</label>
                        <Input 
                          id="name" 
                          value={newParty.name} 
                          onChange={(e) => setNewParty({ ...newParty, name: e.target.value })} 
                          placeholder="Democratic Party"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="symbol" className="text-sm font-medium">Party Symbol</label>
                        <Input 
                          id="symbol" 
                          value={newParty.symbol} 
                          onChange={(e) => setNewParty({ ...newParty, symbol: e.target.value })} 
                          placeholder="🔵"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
                      <Button onClick={handleAddParty} disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Party'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {/* Parties Table */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    // Loading skeleton
                    Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={`skeleton-${index}`}>
                        <TableCell>
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[250px]" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : parties.length > 0 ? (
                    parties.map((party) => (
                      <TableRow key={party.id} className="animate-fade-in">
                        <TableCell className="font-medium text-2xl">
                          {party.symbol}
                        </TableCell>
                        <TableCell>{party.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(party)}
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
                                  <AlertDialogTitle>Delete Party</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {party.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteParty(party.id)}
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
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                        No parties found. Click "Add Party" to create one.
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
            <DialogTitle>Edit Party</DialogTitle>
            <DialogDescription>
              Update the details of the party.
            </DialogDescription>
          </DialogHeader>
          {currentParty && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Party Name</label>
                <Input 
                  id="edit-name" 
                  value={currentParty.name} 
                  onChange={(e) => setCurrentParty({ ...currentParty, name: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-symbol" className="text-sm font-medium">Party Symbol</label>
                <Input 
                  id="edit-symbol" 
                  value={currentParty.symbol} 
                  onChange={(e) => setCurrentParty({ ...currentParty, symbol: e.target.value })} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleEditParty} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageParties;

