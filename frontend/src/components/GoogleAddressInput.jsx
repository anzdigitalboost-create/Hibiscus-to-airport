import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Input } from './ui/input';
import axios from 'axios';
import { API } from '../config/api';

/**
 * GoogleAddressInput — Server-side autocomplete ONLY.
 *
 * LOCKED DECISION (2026-04-09): Google's native Autocomplete widget
 * is NOT used. It locked the input field when the API key was invalid,
 * expired, or restricted — making the entire booking form unusable.
 * This happened repeatedly and cost the business real customers.
 *
 * Instead, we use our own /api/places/autocomplete endpoint which
 * calls Google's Places API server-side. The dropdown is 100% ours.
 * Google's JS library NEVER loads, NEVER touches the input.
 *
 * The input is ALWAYS typeable. Always. No exceptions.
 */

const GoogleAddressInput = ({
  value,
  onChange,
  onSelect,
  placeholder = 'Start typing an address...',
  id,
  required,
  disabled,
  className = '',
  region = 'nz',
}) => {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  // Fetch suggestions from our server-side proxy
  const fetchSuggestions = useCallback((text) => {
    clearTimeout(debounceRef.current);
    if (!text || text.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const resp = await axios.get(`${API}/places/autocomplete`, {
          params: { input: text, region },
        });
        const preds = resp.data?.predictions || [];
        setSuggestions(preds);
        setShowDropdown(preds.length > 0);
        setActiveIndex(-1);
      } catch (err) {
        console.error('Autocomplete fetch failed:', err);
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 250);
  }, [region]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (onChange) onChange(val);
    fetchSuggestions(val);
  };

  const handleSelectSuggestion = (description) => {
    setShowDropdown(false);
    setSuggestions([]);
    setActiveIndex(-1);
    if (onSelect) onSelect(description);
    else if (onChange) onChange(description);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[activeIndex].description);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e) => {
      if (inputRef.current && !inputRef.current.parentElement?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [showDropdown]);

  // Scroll active suggestion into view
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const item = dropdownRef.current.children[activeIndex];
      if (item) item.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete="off"
        className={`transition-all duration-200 focus:ring-2 focus:ring-gold ${className}`}
      />
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-[99999]"
        >
          {suggestions.map((s, i) => (
            <button
              key={s.place_id || i}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectSuggestion(s.description)}
              className={`w-full px-4 py-3 text-left text-sm border-b border-gray-100 last:border-0 transition-colors ${
                i === activeIndex ? 'bg-gold/10 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {s.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleAddressInput;
