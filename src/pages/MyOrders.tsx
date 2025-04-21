import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Info, ListOrdered } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const mockOrders = [
  {
    id: '1',
    date: '2024-04-20',
    items: [
      { name: 'Floral Dress', quantity: 1, price: 2399 }
    ],
    status: 'Delivered',
    total: 2399
  },
  {
    id: '2',
    date: '2024-04-19',
    items: [
      { name: 'Pearl Necklace', quantity: 1, price: 1599 }
    ],
    status: 'Delivered',
    total: 1599
  }
];

const MyOrders = () => {
  const { toast } = useToast();
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [exchangeDialogOpen, setExchangeDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [returnReason, setReturnReason] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [exchangeSize, setExchangeSize] = useState('');

  const handleReturnClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setReturnDialogOpen(true);
  };

  const handleReturn = () => {
    if (!returnReason || !pickupAddress) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in all the required fields.",
      });
      return;
    }

    toast({
      title: "Return Request Confirmed",
      description: "Our team will pick up your order from the provided address within 2-3 business days.",
    });
    setReturnDialogOpen(false);
    setReturnReason('');
    setPickupAddress('');
  };

  const handleExchangeClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setExchangeDialogOpen(true);
  };

  const handleExchange = () => {
    if (!exchangeSize) {
      toast({
        title: "Required Information Missing",
        description: "Please select the new size.",
      });
      return;
    }

    toast({
      title: "Exchange Request Confirmed",
      description: "Please visit our store within 2 hours. Bring your original item for a quick exchange.",
    });
    setExchangeDialogOpen(false);
    setExchangeSize('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <ListOrdered className="h-6 w-6" />
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium mb-2">Return & Exchange Policy</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Returns are accepted within 7 days of delivery</li>
                <li>Exchange requests must be processed within 2 hours at our store</li>
                <li>Item must be unused and in original packaging</li>
                <li>Please keep the receipt/invoice for returns/exchanges</li>
              </ul>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.name} x {item.quantity}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>₹{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReturnClick(order.id)}
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Return
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExchangeClick(order.id)}
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Exchange
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Order Details",
                              description: "Track your order or report issues here.",
                            });
                          }}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Request</DialogTitle>
            <DialogDescription>
              Please provide the reason for return and pickup details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Return</label>
              <Textarea
                placeholder="Please explain why you want to return this item..."
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pickup Address</label>
              <Textarea
                placeholder="Enter the address for pickup..."
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReturnDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReturn}>Confirm Return</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={exchangeDialogOpen} onOpenChange={setExchangeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exchange Request</DialogTitle>
            <DialogDescription>
              Please select the new size for exchange.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">New Size</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={exchangeSize}
                onChange={(e) => setExchangeSize(e.target.value)}
              >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <Alert>
              <AlertDescription>
                Please visit our store within 2 hours with your original item for the exchange.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExchangeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExchange}>Confirm Exchange</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MyOrders;
