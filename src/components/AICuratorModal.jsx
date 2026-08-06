import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, X, ShoppingBag, Zap, DollarSign, CheckCircle2, ArrowRight, RefreshCw, Gift } from 'lucide-react';

const AICuratorModal = () => {
  const { showAICurator, closeAICurator, curateAIBundle, addAIBundleToCart } = useShop();

  const [occasion, setOccasion] = useState('Remote Work Setup');
  const [promptInput, setPromptInput] = useState('');
  const [maxBudget, setMaxBudget] = useState(300);
  const [isCurating, setIsCurating] = useState(false);
  const [curatedResult, setCuratedResult] = useState(null);

  if (!showAICurator) return null;

  const handleCurate = async (targetOccasion = occasion) => {
    setIsCurating(true);
    const result = await curateAIBundle({
      occasion: targetOccasion,
      prompt: promptInput,
      maxBudget
    });
    setCuratedResult(result);
    setIsCurating(false);
  };

  const handleChipClick = (chipText) => {
    setOccasion(chipText);
    handleCurate(chipText);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="glass-panel animate-fadeIn" 
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '36px',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 30px 60px -10px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAICurator}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(241, 245, 249, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '30px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '12px'
          }}>
            <Sparkles size={16} color="var(--primary)" /> NovaCraft AI Smart Concierge
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px 0', color: 'var(--text-main)' }}>
            AI Smart Occasion & <span className="gradient-text">Bundle Curator</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            Select an occasion or goal below. Our AI analyzes live inventory, curates matching bundles, and unlocks a <strong style={{ color: 'var(--primary)' }}>10% Bundle Discount</strong>.
          </p>
        </div>

        {/* Occasion Preset Chips */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ⚡ Popular AI Preset Vibe Boxes
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <VibeChip label="🖥️ Remote Work Desk Setup" onClick={() => handleChipClick('Remote Work Desk Setup')} active={occasion === 'Remote Work Desk Setup'} />
            <VibeChip label="☕ Cozy Coffee Corner" onClick={() => handleChipClick('Cozy Coffee Corner')} active={occasion === 'Cozy Coffee Corner'} />
            <VibeChip label="🏃 Fitness & Wellness Box" onClick={() => handleChipClick('Fitness & Wellness Box')} active={occasion === 'Fitness & Wellness Box'} />
            <VibeChip label="✈️ Travel & Outfit Combo" onClick={() => handleChipClick('Travel & Outfit Combo')} active={occasion === 'Travel & Outfit Combo'} />
          </div>
        </div>

        {/* Custom Prompt & Budget Controls */}
        <div style={{
          padding: '16px',
          borderRadius: '16px',
          background: 'rgba(241, 245, 249, 0.8)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
              Or describe custom vibe / goal:
            </label>
            <input
              type="text"
              placeholder="e.g., Modern living room setup under $250..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="glass-input"
              style={{ width: '100%', height: '42px' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
              <span>Target Budget Limit:</span>
              <span style={{ color: 'var(--primary)' }}>${maxBudget}</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="25"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          <button
            onClick={() => handleCurate()}
            disabled={isCurating}
            className="glass-button"
            style={{ width: '100%', marginTop: '16px', height: '44px' }}
          >
            {isCurating ? (
              <>
                <RefreshCw size={18} style={{ animation: 'logo-spin 1.5s linear infinite' }} /> Analyzing Live Database Products...
              </>
            ) : (
              <>
                <Sparkles size={18} /> Curate AI Bundle Box
              </>
            )}
          </button>
        </div>

        {/* Curated AI Bundle Results Display */}
        {curatedResult && (
          <div className="glass-panel animate-fadeIn" style={{
            padding: '24px',
            background: '#ffffff',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.12)'
          }}>
            {/* Result Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '800',
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#059669',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  ⚡ {curatedResult.matchScore}% Match Score
                </span>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '800',
                  background: 'rgba(225, 29, 72, 0.12)',
                  color: '#e11d48',
                  border: '1px solid rgba(225, 29, 72, 0.3)'
                }}>
                  🔥 {curatedResult.savingsPercentage} Savings
                </span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{curatedResult.title}</h4>
            </div>

            {/* AI Explanation Rationale */}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              💡 {curatedResult.aiRationale}
            </p>

            {/* Bundle Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {curatedResult.items.map((item) => (
                <div key={item._id || item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(241, 245, 249, 0.8)',
                  border: '1px solid rgba(226, 232, 240, 0.9)'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '13px', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>{item.name}</h5>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.category}</span>
                  </div>
                  <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>${Number(item.price).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            {/* Bundle Pricing Summary & 1-Click Checkout Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(226, 232, 240, 0.8)'
            }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  Original: ${curatedResult.originalTotal.toFixed(2)}
                </span>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>
                  Bundle Price: ${curatedResult.bundlePrice.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => addAIBundleToCart(curatedResult.items)}
                className="glass-button"
                style={{ padding: '12px 20px', fontSize: '14px' }}
              >
                <ShoppingBag size={18} /> Add Entire AI Bundle to Cart (1-Click)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const VibeChip = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 14px',
      borderRadius: '20px',
      border: active ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid rgba(203, 213, 225, 0.8)',
      background: active ? 'linear-gradient(135deg, #6366f1, #0284c7)' : 'rgba(255, 255, 255, 0.9)',
      color: active ? '#ffffff' : 'var(--text-main)',
      fontSize: '12px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    {label}
  </button>
);

export default AICuratorModal;
