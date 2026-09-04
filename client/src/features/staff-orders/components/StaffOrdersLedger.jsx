import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Printer, Phone } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusBadge from '@/components/common/StatusBadge';

const STATUS_WORKFLOW = ['Pending', 'Processing', 'Ready', 'Completed'];

export default function StaffOrdersLedger({
  orders = [],
  onUpdateStatus,
  onPrintBagTag,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.phone && order.phone.includes(searchQuery));
    return matchesTab && matchesSearch;
  });

  const getStatusBadgeType = (status) => {
    switch (status) {
      case 'Pending': return 'pending';
      case 'Processing': return 'baking';
      case 'Ready': return 'porchside';
      case 'Completed': return 'fulfilled';
      default: return 'pending';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="All">
              All ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="Pending">
              Pending ({orders.filter((o) => o.status === 'Pending').length})
            </TabsTrigger>
            <TabsTrigger value="Processing">
              Processing ({orders.filter((o) => o.status === 'Processing').length})
            </TabsTrigger>
            <TabsTrigger value="Ready">
              Ready ({orders.filter((o) => o.status === 'Ready').length})
            </TabsTrigger>
            <TabsTrigger value="Completed">
              Completed ({orders.filter((o) => o.status === 'Completed').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders or customer..."
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* DESKTOP TABLE VIEW (≥ 640px) */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-semibold text-primary">
                  #{order.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground font-title-sm">
                      {order.customer}
                    </span>
                    {order.phone && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {order.phone}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-foreground max-w-xs">
                    {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm font-semibold text-primary">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus && onUpdateStatus(order.id, e.target.value)}
                      className="rounded border border-input bg-card px-2 py-1 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"
                    >
                      {STATUS_WORKFLOW.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <StatusBadge status={getStatusBadgeType(order.status)} label={order.status} />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {onPrintBagTag && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs gap-1"
                        onClick={() => onPrintBagTag(order)}
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Tag</span>
                      </Button>
                    )}
                    <Link to={`/app/orders/${order.id}`}>
                      <Button size="sm" variant="secondary" className="h-8 text-xs gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE STACKED CARDS VIEW (< 640px) */}
      <div className="sm:hidden space-y-3">
        {filteredOrders.map((order) => (
          <Card key={order.id} tactile className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-primary block">
                  #{order.id}
                </span>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {order.customer}
                </h3>
              </div>
              <StatusBadge status={getStatusBadgeType(order.status)} label={order.status} />
            </div>

            <div className="bg-surface-container-low p-2.5 rounded-lg space-y-1 text-xs font-mono">
              <div className="text-foreground font-sans">
                {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
              </div>
              <div className="flex justify-between pt-1 text-sm font-semibold text-primary">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus && onUpdateStatus(order.id, e.target.value)}
                className="flex-1 rounded border border-input bg-card px-2 py-1.5 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"
              >
                {STATUS_WORKFLOW.map((st) => (
                  <option key={st} value={st}>
                    Status: {st}
                  </option>
                ))}
              </select>

              <Link to={`/app/orders/${order.id}`} className="flex-1">
                <Button size="sm" variant="secondary" className="w-full text-xs gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
