import React, { useState } from 'react';
import { Plus, Store, Sparkles, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import OwnerProductsTable from '@/features/products/components/OwnerProductsTable';
import AddEditProductModal from '@/features/products/components/AddEditProductModal';
import { productService } from '@/features/products/services/productService';
import { initialOwnerProducts } from '@/features/products/services/ownerProductsMockData';

const CATEGORIES = ['All', 'Loaves & Buns', 'Cakes', 'Cupcakes', 'Brownies'];

export default function OwnerProductsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });

  const saveProductMutation = useMutation({
    mutationFn: (savedProduct) => {
      const payload = {
        name: savedProduct.name,
        category: savedProduct.categoryLabel || savedProduct.category || 'Loaves & Buns',
        price: Number(savedProduct.price || 0),
        availableQuantity: Number(savedProduct.remainingAllotment || savedProduct.availableQuantity || 10),
        isAvailable: savedProduct.available !== false,
        activeMenu: savedProduct.featured !== false,
        image: savedProduct.imageUrl || savedProduct.image || '',
        ingredients: savedProduct.ingredients || '',
        description: savedProduct.description || '',
      };
      if (savedProduct._id || (savedProduct.id && !savedProduct.id.startsWith('temp-'))) {
        return productService.updateProduct(savedProduct._id || savedProduct.id, payload);
      } else {
        return productService.createProduct(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

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
      deleteProductMutation.mutate(product._id || product.id);
    }
  };

  const handleSaveProduct = (savedProduct) => {
    saveProductMutation.mutate(savedProduct);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' ||
      product.category === activeCategory ||
      product.categoryLabel === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.categoryLabel && product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.ingredients && product.ingredients.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Artisan Product Management"
        subtitle="Configure hearth offerings, drop allotments, unit pricing, and sensory details persisted in the database."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Products' },
        ]}
        action={
          <Button onClick={handleOpenAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Offering</span>
          </Button>
        }
      />

      {/* Category Pills & Search Bar */}
      <Card tactile className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-surface-container-low text-secondary-foreground hover:bg-surface-container hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <Input
              type="search"
              placeholder="Search offerings, flour..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
        </div>
      </Card>

      {/* Products Table with Live State */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-mono">Fetching hearth menu from database...</p>
        </div>
      ) : (
        <OwnerProductsTable
          products={filteredProducts}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
