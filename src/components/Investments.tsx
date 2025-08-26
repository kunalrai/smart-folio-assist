import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Investment {
  id: number;
  platform: string;
  amount: number;
  date: string;
  type: string;
}

const Investments = () => {
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([
    { id: 1, platform: "Zerodha", amount: 45000, date: "2024-01-15", type: "Stocks" },
    { id: 2, platform: "Coinbase", amount: 35000, date: "2024-02-10", type: "Crypto" },
    { id: 3, platform: "SBI Bonds", amount: 25000, date: "2024-02-20", type: "Bonds" },
    { id: 4, platform: "REITs", amount: 20000, date: "2024-03-05", type: "Real Estate" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [formData, setFormData] = useState({
    platform: "",
    amount: "",
    date: "",
    type: ""
  });

  const platforms = ["Zerodha", "Groww", "Coinbase", "Binance", "SBI Bonds", "HDFC MF", "REITs"];
  const types = ["Stocks", "Crypto", "Bonds", "Mutual Funds", "Real Estate", "Gold"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.platform || !formData.amount || !formData.date || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newInvestment: Investment = {
      id: editingInvestment ? editingInvestment.id : Date.now(),
      platform: formData.platform,
      amount: parseFloat(formData.amount),
      date: formData.date,
      type: formData.type
    };

    if (editingInvestment) {
      setInvestments(investments.map(inv => 
        inv.id === editingInvestment.id ? newInvestment : inv
      ));
      toast({
        title: "Success",
        description: "Investment updated successfully"
      });
    } else {
      setInvestments([...investments, newInvestment]);
      toast({
        title: "Success",
        description: "Investment added successfully"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ platform: "", amount: "", date: "", type: "" });
    setEditingInvestment(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setFormData({
      platform: investment.platform,
      amount: investment.amount.toString(),
      date: investment.date,
      type: investment.type
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
    toast({
      title: "Success",
      description: "Investment deleted successfully"
    });
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Investment Portfolio</h2>
          <p className="text-muted-foreground">Total Invested: ₹{totalInvested.toLocaleString()}</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => resetForm()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Investment
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-accent/20">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingInvestment ? "Edit Investment" : "Add New Investment"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-foreground">Platform</Label>
                <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-foreground">Investment Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                  {editingInvestment ? "Update" : "Add"} Investment
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Investments Table */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-accent/20">
        <CardHeader>
          <CardTitle className="text-foreground">All Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => {
                const performance = Math.random() > 0.5 ? "up" : "down";
                const performanceValue = (Math.random() * 20 - 10).toFixed(1);
                
                return (
                  <TableRow key={investment.id}>
                    <TableCell className="font-medium">{investment.platform}</TableCell>
                    <TableCell>{investment.type}</TableCell>
                    <TableCell>₹{investment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(investment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className={`flex items-center space-x-1 ${
                        performance === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {performance === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span>{performanceValue}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(investment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(investment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;