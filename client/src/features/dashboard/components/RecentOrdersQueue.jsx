import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Receipt } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';

export default function RecentOrdersQueue({ orders = [] }) {
  const getStatusType = (status) => {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Recent Orders
          </h2>
        </div>
        <Link to="/app/orders">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs font-semibold text-primary">
                #{order.id}
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                {order.customer}
              </TableCell>
              <TableCell className="font-mono text-sm font-semibold text-primary">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>
                <StatusBadge status={getStatusType(order.status)} label={order.status} />
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/app/orders/${order.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
