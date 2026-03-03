import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import * as storage from "@/lib/localStorage";

const categories = [
  "necklaces", "earrings", "bangles", "bracelets", "rings", "bridal",
];

const emptyForm = {
  name: "",
  price: "",
  original_price: "",
  description: "",
  long_description: "",
  category: "necklaces",
  badge: "",
  slug: "",
};

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState(storage.getProducts());
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user && !isAdmin) {
      toast.error("You don't have admin access");
      navigate("/");
    }
  }, [loading, user, isAdmin, navigate]);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = "";
    if (imageFile) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
    }

    const slug = form.slug || generateSlug(form.name);
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : undefined,
      description: form.description,
      long_description: form.long_description || undefined,
      category: form.category,
      badge: form.badge || undefined,
      slug,
      image_url: imageUrl || "",
    };

    if (editingId) {
      if (!imageUrl) delete (payload as any).image_url;
      storage.updateProduct(editingId, payload);
      toast.success("Product updated");
    } else {
      if (!imageUrl) {
        toast.error("Please upload an image");
        setSaving(false);
        return;
      }
      storage.addProduct(payload);
      toast.success("Product added");
    }

    setForm(emptyForm);
    setEditingId(null);
    setImageFile(null);
    setProducts(storage.getProducts());
    setSaving(false);
  };

  const startEdit = (p: storage.Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : "",
      description: p.description,
      long_description: p.long_description || "",
      category: p.category,
      badge: p.badge || "",
      slug: p.slug,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this product?")) return;
    storage.deleteProduct(id);
    toast.success("Product deleted");
    setProducts(storage.getProducts());
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-16 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft size={16} /> Back to Site
          </Link>
          <h1 className="section-heading">Admin Console</h1>
        </div>
        <button onClick={signOut} className="btn-outline-gold flex items-center gap-2 text-xs">
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-sm p-6 mb-10 space-y-4">
        <h2 className="font-heading text-lg font-semibold mb-2">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Product Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            placeholder="Slug (auto-generated)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="number"
            step="0.01"
            placeholder="Price (₹) *"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Original Price (₹)"
            value={form.original_price}
            onChange={(e) => setForm({ ...form, original_price: e.target.value })}
            className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <input
          placeholder="Short Description *"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <textarea
          placeholder="Long Description"
          value={form.long_description}
          onChange={(e) => setForm({ ...form, long_description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Badge (e.g. Bestseller, New)"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="flex items-center gap-3 px-4 py-3 rounded-sm border border-border bg-background cursor-pointer hover:border-primary transition-colors">
            <Upload size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {imageFile ? imageFile.name : editingId ? "Upload new image (optional)" : "Upload Image *"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-gold flex items-center gap-2">
            {saving ? "Saving..." : editingId ? (
              <><Pencil size={14} /> Update Product</>
            ) : (
              <><Plus size={14} /> Add Product</>
            )}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setForm(emptyForm); setImageFile(null); }}
              className="btn-outline-gold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <h2 className="font-heading text-lg font-semibold mb-4">
        Products ({products.length})
      </h2>

      {products.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No products yet. Add your first product above.</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 bg-card border border-border rounded-sm p-4">
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-sm font-semibold truncate">{p.name}</h3>
                <p className="text-xs text-muted-foreground">
                  ₹{p.price} · {p.category}
                  {p.badge && ` · ${p.badge}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(p)}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
