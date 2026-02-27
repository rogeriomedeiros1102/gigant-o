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

const CATEGORIES = [
  { id: 'cordoes', name: 'Cordões', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop', description: 'Ouro 18k e Prata 925' },
  { id: 'pulseiras', name: 'Pulseiras', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', description: 'Design exclusivo e robusto' },
  { id: 'brincos', name: 'Brincos', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', description: 'Elegância em cada detalhe' },
  { id: 'aliancas', name: 'Alianças', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop', description: 'O símbolo do seu compromisso' },
];

const FEATURED_PRODUCTS = [
  { id: 1, name: 'Cordão Grumet Ouro 18k', category: 'Cordões', price: 'Sob Consulta', image: 'https://images.unsplash.com/photo-1611085583191-a3b130944ac5?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Pulseira Riviera Prata 925', category: 'Pulseiras', price: 'Sob Consulta', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Brinco Argola Cravejada', category: 'Brincos', price: 'Sob Consulta', image: 'https://images.unsplash.com/photo-1635767791024-3d5705ee45d7?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Aliança de Casamento Classic', category: 'Alianças', price: 'Sob Consulta', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=600&auto=format&fit=crop' },
];

// --- Components ---

const Navbar = () => {
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
          <a href="#sobre" className="nav-link text-sm font-medium uppercase tracking-widest">Sobre</a>
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
  product: typeof FEATURED_PRODUCTS[0];
  key?: React.Key;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-white luxury-shadow">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-ink hover:text-gold-dark transition-colors">
            <Star size={18} />
          </button>
        </div>
      </div>
      <p className="text-gold-dark text-xs font-bold uppercase tracking-widest mb-1">{product.category}</p>
      <h4 className="text-xl font-serif mb-2">{product.name}</h4>
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink/60">{product.price}</span>
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
  return (
    <div className="min-h-screen">
      <Navbar />
      
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
              {FEATURED_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>

        <TrustSection />
        
        <ContactForm />
      </main>

      <Footer />

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
