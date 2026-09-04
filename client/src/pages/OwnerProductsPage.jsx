import React, { useState } from 'react';
import { Plus, Store, Sparkles } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import OwnerProductsTable from '@/features/products/components/OwnerProductsTable';
import AddEditProductModal from '@/features/products/components/AddEditProductModal';
import { initialOwnerProducts } from '@/features/products/services/ownerProductsMockData';

const CATEGORIES = ['All', 'Loaves & Buns', 'Cakes', 'Cupcakes', 'Brownies'];

export default function OwnerProductsPage() {
  const [products, setProducts] = useState(initialOwnerProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to remove "${product.name}" from the bakery catalog?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const handleSaveProduct = (savedProduct) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === savedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      }
      return [savedProduct, ...prev];
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.ingredients && product.ingredients.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Artisan Product Management"
        subtitle="Configure hearth offerings, drop allotments, unit pricing, and sensory details."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Products' },
        ]}
        action={
          <Button onClick={handleOpenAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card tactile className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block">
              Total Catalog Items
            </span>
            <span className="font-serif text-xl font-semibold text-foreground">
              {products.length} Products
            </span>
          </div>
        </Card>

        <Card tactile className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-success/10 text-success">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block">
              Active Drop Items
            </span>
            <span className="font-serif text-xl font-semibold text-success">
              {products.filter((p) => p.activeMenu && p.availableQuantity > 0).length} Available
            </span>
          </div>
        </Card>

        <Card tactile className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-warning/10 text-warning">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase font-semibold block">
              Sold Out / Inactive
            </span>
            <span className="font-serif text-xl font-semibold text-warning">
              {products.filter((p) => !p.activeMenu || p.availableQuantity === 0).length} Depleted
            </span>
          </div>
        </Card>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border">
        <div className="relative flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, flour, or flavor..."
            className="text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-surface-container text-secondary-foreground hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Master Products Table */}
      <OwnerProductsTable
        products={filteredProducts}
        onEditProduct={handleOpenEditModal}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={editingProduct}
        onSaveProduct={handleSaveProduct}
      />
    </div>
  );
}
