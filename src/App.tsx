import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Gem, 
  Menu, 
  X,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Constants & Types ---

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  weight: string;
  description: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  items: string; // JSON string
  total: number;
  status: string;
  created_at: string;
}

interface CartItem extends Product {
  quantity: number;
}

const CATEGORIES = [
  { id: 'cordoes', name: 'Cordões', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop', description: 'Ouro 18k e Prata 925' },
  { id: 'pulseiras', name: 'Pulseiras', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', description: 'Design exclusivo e robusto' },
  { id: 'brincos', name: 'Brincos', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Elegância em cada detalhe' },
  { id: 'aliancas', name: 'Alianças', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'O símbolo do seu compromisso' },
];

const CartDrawer = ({ isOpen, onClose, items, total, onRemove }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  total: number,
  onRemove: (id: number) => void
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items,
          total
        })
      });
      if (res.ok) {
        alert("Pedido realizado com sucesso! Entraremos em contato.");
        onClose();
        window.location.reload(); // Simple way to clear cart and refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-paper z-[70] shadow-2xl p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif">Seu Carrinho</h3>
              <button onClick={onClose} className="p-2 hover:bg-ink/5 rounded-full transition-colors"><X /></button>
            </div>

            {!isCheckingOut ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                  {items.length === 0 ? (
                    <div className="text-center py-12 text-ink/40 italic">Seu carrinho está vazio.</div>
                  ) : (
                    items.map(item => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.image} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-serif text-lg">{item.name}</h4>
                          <p className="text-sm text-ink/60">{item.quantity}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</p>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"><X size={16} /></button>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-ink/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-serif">Total</span>
                    <span className="text-2xl font-bold text-gold-dark">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                  </div>
                  <button 
                    disabled={items.length === 0}
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-ink text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-dark transition-all disabled:opacity-50"
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
                <button onClick={() => setIsCheckingOut(false)} className="text-sm text-gold-dark font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ChevronRight className="rotate-180" size={16} /> Voltar ao Carrinho
                </button>
                <input required placeholder="Nome Completo" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} />
                <input required type="email" placeholder="E-mail" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.customer_email} onChange={e => setFormData({...formData, customer_email: e.target.value})} />
                <input required placeholder="Telefone" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.customer_phone} onChange={e => setFormData({...formData, customer_phone: e.target.value})} />
                <input required placeholder="Endereço Completo" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Cidade" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  <input required placeholder="Estado" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                </div>
                <input required placeholder="CEP" className="w-full p-3 bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-gold-dark" value={formData.zip_code} onChange={e => setFormData({...formData, zip_code: e.target.value})} />
                <button type="submit" className="w-full bg-gold-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all mt-4">
                  Confirmar Pedido
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AdminDashboard = ({ onBack, onRefresh }: { onBack: () => void, onRefresh: () => void }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Cordões', price: 0, image: '', weight: '', description: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    const pRes = await fetch('/api/products');
    setProducts(await pRes.json());
    const oRes = await fetch('/api/orders');
    setOrders(await oRes.json());
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    setNewProduct({ name: '', category: 'Cordões', price: 0, image: '', weight: '', description: '' });
    fetchData();
    onRefresh();
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchData();
    onRefresh();
  };

  const handleUpdateOrderStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-ink/5 rounded-full transition-colors"><ArrowRight className="rotate-180" /></button>
            <h2 className="text-4xl font-serif">Painel Administrativo</h2>
          </div>
          <div className="flex bg-white rounded-xl p-1 shadow-sm">
            <button onClick={() => setActiveTab('products')} className={cn("px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all", activeTab === 'products' ? "bg-gold-dark text-white" : "text-ink/40")}>Produtos</button>
            <button onClick={() => setActiveTab('orders')} className={cn("px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all", activeTab === 'orders' ? "bg-gold-dark text-white" : "text-ink/40")}>Pedidos</button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="text-xl font-serif mb-6">Adicionar Produto</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input required placeholder="Nome" className="w-full p-3 bg-paper rounded-lg outline-none" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  <select className="w-full p-3 bg-paper rounded-lg outline-none" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <input required type="number" placeholder="Preço" className="w-full p-3 bg-paper rounded-lg outline-none" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  <input required placeholder="Peso (ex: 10g)" className="w-full p-3 bg-paper rounded-lg outline-none" value={newProduct.weight} onChange={e => setNewProduct({...newProduct, weight: e.target.value})} />
                  <input required placeholder="URL da Imagem" className="w-full p-3 bg-paper rounded-lg outline-none" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                  <textarea placeholder="Descrição" className="w-full p-3 bg-paper rounded-lg outline-none" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  <button type="submit" className="w-full bg-ink text-white py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gold-dark transition-all">Salvar Produto</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                  <img src={p.image} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-serif text-lg">{p.name}</h4>
                    <p className="text-xs text-ink/40 uppercase tracking-widest">{p.category} • {p.weight} • {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}</p>
                  </div>
                  <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"><X size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(o => (
              <div key={o.id} className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-serif mb-1">Pedido #{o.id}</h4>
                    <p className="text-sm text-ink/40">{new Date(o.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <select 
                    className={cn("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest outline-none", 
                      o.status === 'Pendente' ? "bg-yellow-100 text-yellow-700" : 
                      o.status === 'Enviado' ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700")}
                    value={o.status}
                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">Cliente</h5>
                    <p className="font-bold">{o.customer_name}</p>
                    <p className="text-sm">{o.customer_email}</p>
                    <p className="text-sm">{o.customer_phone}</p>
                    <div className="mt-4 p-4 bg-paper rounded-xl text-sm">
                      <p>{o.address}</p>
                      <p>{o.city}, {o.state} - {o.zip_code}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">Itens</h5>
                    <div className="space-y-2">
                      {JSON.parse(o.items).map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-ink/5 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-gold-dark">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(o.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="text-center py-24 text-ink/40 italic">Nenhum pedido realizado ainda.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Components ---

const Navbar = ({ onAdminClick, cartCount, onCartClick }: { onAdminClick: () => void, cartCount: number, onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-paper/90 backdrop-blur-md py-3 shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className="text-gold-dark w-8 h-8" />
          <span className="font-serif text-2xl font-bold tracking-tighter uppercase">Gigantão <span className="text-gold-dark">das Joias</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="nav-link text-sm font-medium uppercase tracking-widest">Início</a>
          <a href="#categorias" className="nav-link text-sm font-medium uppercase tracking-widest">Categorias</a>
          <a href="#destaques" className="nav-link text-sm font-medium uppercase tracking-widest">Destaques</a>
          <button onClick={onAdminClick} className="nav-link text-sm font-medium uppercase tracking-widest">Painel</button>
          <button onClick={onCartClick} className="relative p-2 text-ink hover:text-gold-dark transition-colors">
            <Gem size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-dark text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <a href="#contato" className="bg-gold-dark text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gold-light transition-colors">Falar com Especialista</a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ink" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-paper shadow-xl p-8 flex flex-col gap-6 md:hidden border-t border-ink/5"
          >
            <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif">Início</a>
            <a href="#categorias" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif">Categorias</a>
            <a href="#destaques" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif">Destaques</a>
            <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif">Sobre</a>
            <a href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="bg-gold-dark text-white py-4 rounded-xl text-center font-bold uppercase tracking-widest">WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920&auto=format&fit=crop" 
          className="w-full h-full object-cover brightness-[0.4]" 
          alt="Luxury Jewelry Background"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold-light font-medium tracking-[0.3em] uppercase mb-4 text-sm md:text-base"
        >
          Excelência em Ouro e Prata
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-8xl text-white font-serif mb-8 leading-tight"
        >
          Realce sua <span className="italic">Essência</span> com o Brilho Eterno
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <a href="#categorias" className="bg-white text-ink px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold-light hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
            Ver Coleções <ArrowRight size={18} />
          </a>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white backdrop-blur-sm px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
            <MessageCircle size={18} /> Atendimento VIP
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/50 mx-auto"></div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: typeof CATEGORIES[0];
  index: number;
  key?: React.Key;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <p className="text-gold-light text-xs font-bold tracking-widest uppercase mb-1">{category.description}</p>
        <h3 className="text-white text-3xl font-serif mb-4">{category.name}</h3>
        <div className="h-px w-0 bg-gold-light group-hover:w-full transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  key?: React.Key;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-white luxury-shadow">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-ink hover:text-gold-dark transition-colors shadow-sm">
            <Star size={18} />
          </button>
          <button 
            onClick={onAddToCart}
            className="bg-gold-dark text-white p-2 rounded-full hover:bg-gold-light transition-colors shadow-md"
          >
            <Gem size={18} />
          </button>
        </div>
      </div>
      <p className="text-gold-dark text-xs font-bold uppercase tracking-widest mb-1">{product.category} • {product.weight}</p>
      <h4 className="text-xl font-serif mb-2">{product.name}</h4>
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink/60">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
        </span>
        <button className="text-gold-dark font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
          Detalhes <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

const TrustSection = () => {
  const features = [
    { icon: <ShieldCheck className="w-10 h-10" />, title: "Garantia Eterna", desc: "Certificado de autenticidade para todas as peças em Ouro 18k e Prata 925." },
    { icon: <Gem className="w-10 h-10" />, title: "Qualidade Máxima", desc: "Seleção rigorosa de metais e pedras para garantir o brilho e durabilidade." },
    { icon: <Star className="w-10 h-10" />, title: "Design Exclusivo", desc: "Peças que unem o clássico ao moderno, criadas para momentos inesquecíveis." },
    { icon: <MessageCircle className="w-10 h-10" />, title: "Atendimento Direto", desc: "Suporte personalizado via WhatsApp para tirar todas as suas dúvidas." },
  ];

  return (
    <section id="sobre" className="py-24 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold-light font-bold tracking-widest uppercase mb-4">Nossa Essência</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Tradição e Confiança em cada <span className="italic">Quilate</span></h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              O Gigantão das Joias nasceu da paixão pelo brilho e pela sofisticação. Nossa missão é transformar metais nobres em símbolos de afeto, conquista e estilo. Com anos de experiência no mercado, nos tornamos referência em qualidade e atendimento personalizado.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="text-gold-light">{f.icon}</div>
                  <h4 className="text-xl font-serif">{f.title}</h4>
                  <p className="text-white/40 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop" 
                alt="Jewelry Workshop" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-gold-dark p-12 rounded-3xl hidden lg:block luxury-shadow">
              <p className="text-5xl font-serif mb-2">10+</p>
              <p className="text-sm font-bold uppercase tracking-widest">Anos de História</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contato" className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] overflow-hidden luxury-shadow grid md:grid-cols-5">
          <div className="md:col-span-2 bg-gold-dark p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-4xl font-serif mb-6">Fale Conosco</h3>
              <p className="text-white/80 mb-12">Estamos prontos para ajudar você a encontrar a joia perfeita ou criar um projeto personalizado.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><Phone size={20} /></div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Telefone</p>
                    <p className="font-bold">(00) 0000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><MessageCircle size={20} /></div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">WhatsApp</p>
                    <p className="font-bold">(00) 90000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><Mail size={20} /></div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">E-mail</p>
                    <p className="font-bold">contato@gigantaodasjoias.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Localização</p>
                    <p className="font-bold">Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="https://instagram.com/gigantaodasjoias" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 p-12">
            <h4 className="text-2xl font-serif mb-8">Envie uma mensagem</h4>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink/60">Nome Completo</label>
                  <input type="text" className="w-full bg-paper border-none rounded-xl p-4 focus:ring-2 focus:ring-gold-dark outline-none" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink/60">E-mail</label>
                  <input type="email" className="w-full bg-paper border-none rounded-xl p-4 focus:ring-2 focus:ring-gold-dark outline-none" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink/60">Assunto</label>
                <select className="w-full bg-paper border-none rounded-xl p-4 focus:ring-2 focus:ring-gold-dark outline-none appearance-none">
                  <option>Dúvida sobre produto</option>
                  <option>Orçamento personalizado</option>
                  <option>Alianças de casamento</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink/60">Mensagem</label>
                <textarea rows={4} className="w-full bg-paper border-none rounded-xl p-4 focus:ring-2 focus:ring-gold-dark outline-none resize-none" placeholder="Como podemos ajudar?"></textarea>
              </div>
              <button className="w-full bg-ink text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-dark transition-all duration-300">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-ink text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Gem className="text-gold-light w-8 h-8" />
              <span className="font-serif text-2xl font-bold tracking-tighter uppercase">Gigantão <span className="text-gold-light">das Joias</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Especialistas em joias de alto padrão. Transformando momentos em memórias eternas através do brilho do ouro e da prata.
            </p>
          </div>
          
          <div>
            <h5 className="font-serif text-xl mb-6">Links Rápidos</h5>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#inicio" className="hover:text-gold-light transition-colors">Início</a></li>
              <li><a href="#categorias" className="hover:text-gold-light transition-colors">Categorias</a></li>
              <li><a href="#destaques" className="hover:text-gold-light transition-colors">Destaques</a></li>
              <li><a href="#sobre" className="hover:text-gold-light transition-colors">Sobre Nós</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-xl mb-6">Categorias</h5>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-gold-light transition-colors">Cordões de Ouro</a></li>
              <li><a href="#" className="hover:text-gold-light transition-colors">Pulseiras Masculinas</a></li>
              <li><a href="#" className="hover:text-gold-light transition-colors">Brincos e Anéis</a></li>
              <li><a href="#" className="hover:text-gold-light transition-colors">Alianças de Prata</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-xl mb-6">Newsletter</h5>
            <p className="text-white/40 text-sm mb-4">Receba novidades e ofertas exclusivas.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Seu e-mail" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full outline-none focus:border-gold-light" />
              <button className="bg-gold-dark p-2 rounded-lg hover:bg-gold-light transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-white/20 text-xs uppercase tracking-widest gap-4">
          <p>© 2024 Gigantão das Joias. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('store')} onRefresh={fetchProducts} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onAdminClick={() => setView('admin')} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />

        {/* Categories Section */}
        <section id="categorias" className="py-24 px-6 bg-paper">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-gold-dark font-bold tracking-[0.2em] uppercase mb-4 text-sm">Nossas Coleções</p>
              <h2 className="text-4xl md:text-6xl font-serif">Explore por Categoria</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="destaques" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-gold-dark font-bold tracking-[0.2em] uppercase mb-4 text-sm">Seleção Especial</p>
                <h2 className="text-4xl md:text-6xl font-serif">Destaques da Semana</h2>
              </div>
              <a href="#" className="text-ink font-bold uppercase tracking-widest border-b-2 border-gold-dark pb-1 hover:text-gold-dark transition-colors">
                Ver Todo o Catálogo
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {products.length > 0 ? (
                products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} onAddToCart={() => addToCart(prod)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-ink/40 italic">
                  Nenhum produto cadastrado no catálogo.
                </div>
              )}
            </div>
          </div>
        </section>

        <TrustSection />
        
        <ContactForm />
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        total={cartTotal}
        onRemove={removeFromCart}
      />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5500000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-ink px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar no WhatsApp
        </span>
      </a>
    </div>
  );
}
