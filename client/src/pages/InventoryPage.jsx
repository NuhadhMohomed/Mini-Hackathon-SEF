import React, { useState } from 'react';
import { Plus, Package, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InventoryFilter from '@/features/inventory/components/InventoryFilter';
import InventoryTable from '@/features/inventory/components/InventoryTable';
import AddIngredientModal from '@/features/inventory/components/AddIngredientModal';
import UpdateStockModal from '@/features/inventory/components/UpdateStockModal';
import { inventoryService } from '@/features/inventory/services/inventoryService';

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryService.getInventory(),
  });

  const addMutation = useMutation({
    mutationFn: (newItem) => inventoryService.addIngredient(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: ({ itemId, newStockTotal }) => {
      const existing = items.find((i) => i.id === itemId);
      return inventoryService.updateIngredient(itemId, {
        name: existing?.ingredient || existing?.name,
        available: newStockTotal,
        unit: existing?.unit,
        minimumStock: existing?.minimumStock,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleOpenUpdateStock = (item) => {
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };

  const handleSaveNewIngredient = (newItem) => {
    addMutation.mutate(newItem);
  };

  const handleSaveStockUpdate = (itemId, newStockTotal) => {
    updateStockMutation.mutate({ itemId, newStockTotal });
  };

  const filteredItems = items.filter((item) => {
    const ingredientName = item.ingredient || item.name || '';
    const unitName = item.unit || '';
    const matchesSearch =
      ingredientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unitName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const lowStockCount = items.filter((i) => i.available < i.minimumStock).length;
  const okStockCount = items.filter((i) => i.available >= i.minimumStock).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ingredient Inventory Management"
        subtitle="Monitor larder stocks, safety thresholds, and log farm ingredient shipments in the bakery database."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Inventory' },
        ]}
        action={
          <Button onClick={handleOpenAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Ingredient</span>
          </Button>
        }
      />

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card tactile className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block">
              Total Ingredients
            </span>
            <span className="font-serif text-xl font-semibold text-foreground">
              {items.length} Larder Items
            </span>
          </div>
        </Card>

        <Card tactile className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-warning/10 text-warning">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block">
              Low Stock Items
            </span>
            <span className="font-serif text-xl font-semibold text-warning">
              {lowStockCount} Low Status
            </span>
          </div>
        </Card>

        <Card tactile className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-success/10 text-success">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block">
              Sufficient Inventory
            </span>
            <span className="font-serif text-xl font-semibold text-success">
              {okStockCount} OK Status
            </span>
          </div>
        </Card>
      </div>

      {/* Search Filter */}
      <InventoryFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Master Inventory Table */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-mono">Fetching larder stocks from storehouse...</p>
        </div>
      ) : (
        <InventoryTable items={filteredItems} onUpdateStock={handleOpenUpdateStock} />
      )}

      {/* Add Ingredient Modal */}
      <AddIngredientModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSaveItem={(newItem) => {
          handleSaveNewIngredient({
            id: newItem.id,
            ingredient: newItem.name,
            available: newItem.currentStock,
            minimumStock: newItem.minThreshold,
            unit: newItem.unit,
          });
        }}
      />

      {/* Update Stock Modal */}
      <UpdateStockModal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        item={selectedItem}
        onSaveStock={handleSaveStockUpdate}
      />
    </div>
  );
}
