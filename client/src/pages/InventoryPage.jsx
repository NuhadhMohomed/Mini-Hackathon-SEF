import React, { useState } from 'react';
import { Plus, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InventoryFilter from '@/features/inventory/components/InventoryFilter';
import InventoryTable from '@/features/inventory/components/InventoryTable';
import AddIngredientModal from '@/features/inventory/components/AddIngredientModal';
import UpdateStockModal from '@/features/inventory/components/UpdateStockModal';
import { initialLarderInventory } from '@/features/inventory/services/inventoryMockService';

export default function InventoryPage() {
  const [items, setItems] = useState(initialLarderInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleOpenUpdateStock = (item) => {
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };

  const handleSaveNewIngredient = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const handleSaveStockUpdate = (itemId, newStockTotal) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, available: newStockTotal } : i))
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const lowStockCount = items.filter((i) => i.available < i.minimumStock).length;
  const okStockCount = items.filter((i) => i.available >= i.minimumStock).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ingredient Inventory Management"
        subtitle="Monitor larder stocks, safety thresholds, and log farm ingredient shipments."
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
      <InventoryTable items={filteredItems} onUpdateStock={handleOpenUpdateStock} />

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

      {/* Update Stock Modal (Explicit Addition) */}
      <UpdateStockModal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        item={selectedItem}
        onSaveStock={handleSaveStockUpdate}
      />
    </div>
  );
}
