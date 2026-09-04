import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/common/StatusBadge';

export default function OwnerProductsTable({
  products = [],
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const isAvailable = product.availableQuantity > 0 && product.activeMenu;
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-border bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground font-title-sm">
                      {product.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-xs">
                      {product.ingredients}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <StatusBadge
                      status={isAvailable ? 'in-stock' : 'out-of-stock'}
                      label={isAvailable ? `Available (${product.availableQuantity})` : 'Out of Stock'}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-secondary-foreground hover:text-primary"
                      onClick={() => onEditProduct && onEditProduct(product)}
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-secondary-foreground hover:text-destructive"
                      onClick={() => onDeleteProduct && onDeleteProduct(product)}
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
