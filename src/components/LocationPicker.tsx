'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import {
    MapPin,
    Navigation,
    Loader2,
    ExternalLink,
    CheckCircle2,
    AlertTriangle,
    Search,
    X,
} from 'lucide-react';

export interface LocationData {
    lat: number;
    lng: number;
    mapUrl: string;
}

interface LocationPickerProps {
    value?: LocationData | null;
    onChange: (location: LocationData) => void;
    error?: string;
}

// Default fallback coordinates (Caracas, Venezuela)
const DEFAULT_CENTER: [number, number] = [10.4806, -66.9036];
const DEFAULT_ZOOM = 14;

// Custom modern SVG Pin for Leaflet
const createCustomPinIcon = () => {
    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
            <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full cursor-grab active:cursor-grabbing">
                <div class="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-ping"></div>
                <div class="relative w-9 h-9 rounded-2xl bg-amber-500 text-white shadow-xl shadow-amber-500/40 border-2 border-white flex items-center justify-center transform hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
                <div class="absolute -bottom-1 w-2.5 h-1.5 bg-black/30 rounded-full blur-[1px]"></div>
            </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
};

export default function LocationPicker({ value, onChange, error }: LocationPickerProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    const [coords, setCoords] = useState<{ lat: number; lng: number }>(() => {
        if (value && typeof value.lat === 'number' && typeof value.lng === 'number') {
            return { lat: value.lat, lng: value.lng };
        }
        return { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };
    });

    // GPS states
    const [isLocating, setIsLocating] = useState(false);
    const [gpsSuccess, setGpsSuccess] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);

    // Geocoding (Nominatim) search states
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchFeedback, setSearchFeedback] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const generateMapUrl = useCallback((lat: number, lng: number) => {
        return `https://maps.google.com/?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
    }, []);

    // Notify parent and update marker/map
    const updateLocation = useCallback(
        (lat: number, lng: number, recenter = false) => {
            setCoords({ lat, lng });
            const url = generateMapUrl(lat, lng);
            onChange({ lat, lng, mapUrl: url });

            if (markerRef.current) {
                markerRef.current.setLatLng([lat, lng]);
            }

            if (recenter && mapInstanceRef.current) {
                mapInstanceRef.current.flyTo([lat, lng], 16, { animate: true, duration: 1 });
            }
        },
        [generateMapUrl, onChange]
    );

    // Initialize Leaflet Map
    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Cleanup existing map if re-rendering
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        const initialLat = value?.lat ?? DEFAULT_CENTER[0];
        const initialLng = value?.lng ?? DEFAULT_CENTER[1];

        const map = L.map(mapContainerRef.current, {
            center: [initialLat, initialLng],
            zoom: DEFAULT_ZOOM,
            zoomControl: false,
            attributionControl: false,
        });

        // Zoom controls top-right
        L.control.zoom({ position: 'topright' }).addTo(map);

        // OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Custom marker
        const pinIcon = createCustomPinIcon();
        const marker = L.marker([initialLat, initialLng], {
            icon: pinIcon,
            draggable: true,
        }).addTo(map);

        // Drag marker event
        marker.on('dragend', () => {
            const position = marker.getLatLng();
            updateLocation(position.lat, position.lng, false);
            setGpsSuccess(false);
            setSearchFeedback(null);
        });

        // Click on map to move marker
        map.on('click', (e: L.LeafletMouseEvent) => {
            updateLocation(e.latlng.lat, e.latlng.lng, false);
            setGpsSuccess(false);
            setSearchFeedback(null);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;

        // Invalidate size once rendered inside modal
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 200);

        return () => {
            clearTimeout(timer);
            map.remove();
            mapInstanceRef.current = null;
            markerRef.current = null;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Address Geocoding with OpenStreetMap (Nominatim)
    const handleSearchAddress = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const query = searchQuery.trim();
        if (!query) return;

        setIsSearching(true);
        setSearchFeedback(null);
        setGeoError(null);

        try {
            const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                query
            )}&limit=1`;

            const response = await fetch(endpoint, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);

                if (!isNaN(lat) && !isNaN(lon)) {
                    updateLocation(lat, lon, true);
                    setGpsSuccess(false);
                    setSearchFeedback({
                        type: 'success',
                        message: `Ubicación encontrada: ${result.display_name?.split(',').slice(0, 3).join(',') || query}`,
                    });
                } else {
                    setSearchFeedback({
                        type: 'error',
                        message: 'No pudimos procesar las coordenadas de esa dirección.',
                    });
                }
            } else {
                setSearchFeedback({
                    type: 'error',
                    message:
                        'No encontramos esa ubicación, intenta con un punto más general o mueve el Pin manualmente.',
                });
            }
        } catch (err) {
            console.error('Error al geocodificar dirección:', err);
            setSearchFeedback({
                type: 'error',
                message:
                    'Ocurrió un error al buscar la dirección. Por favor verifica tu conexión o mueve el Pin manualmente.',
            });
        } finally {
            setIsSearching(false);
        }
    };

    // Native browser GPS Geolocation
    const handleGetGPS = () => {
        if (!navigator.geolocation) {
            setGeoError('Tu navegador no soporta geolocalización.');
            return;
        }

        setIsLocating(true);
        setGeoError(null);
        setSearchFeedback(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setIsLocating(false);
                setGpsSuccess(true);
                setGeoError(null);
                updateLocation(latitude, longitude, true);
            },
            (err) => {
                setIsLocating(false);
                setGpsSuccess(false);
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setGeoError('Permiso de ubicación denegado. Puedes buscar tu zona arriba o mover el pin manualmente.');
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setGeoError('Ubicación no disponible en este momento. Ajusta el pin sobre el mapa.');
                        break;
                    case err.TIMEOUT:
                        setGeoError('Tiempo de espera agotado al obtener el GPS. Intenta de nuevo.');
                        break;
                    default:
                        setGeoError('No se pudo obtener la ubicación GPS.');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const currentMapUrl = generateMapUrl(coords.lat, coords.lng);

    return (
        <div className="space-y-2.5">
            {/* Header with Title and GPS Action Button */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={14} className="text-amber-600" />
                    <span>Ubicación de Entrega (Mapa Interactivo) *</span>
                </label>

                {/* GPS Capture Button */}
                <button
                    type="button"
                    onClick={handleGetGPS}
                    disabled={isLocating || isSearching}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900/80 text-amber-900 dark:text-amber-200 border border-amber-300/60 dark:border-amber-600/40 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isLocating ? (
                        <>
                            <Loader2 size={13} className="animate-spin text-amber-700 dark:text-amber-300" />
                            <span>Detectando GPS...</span>
                        </>
                    ) : (
                        <>
                            <Navigation size={13} className="text-amber-700 dark:text-amber-300" />
                            <span>Usar mi GPS actual</span>
                        </>
                    )}
                </button>
            </div>

            {/* Address Search Bar (Nominatim Geocoding) */}
            <form onSubmit={handleSearchAddress} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                    <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Ej: Ciudad, sector, avenida o punto de referencia..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isSearching}
                        className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input hover:border-amber-400 focus:border-amber-500 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                setSearchFeedback(null);
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-full"
                            title="Limpiar búsqueda"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                    {isSearching ? (
                        <>
                            <Loader2 size={14} className="animate-spin text-stone-950" />
                            <span>Buscando...</span>
                        </>
                    ) : (
                        <>
                            <Search size={14} />
                            <span>Buscar</span>
                        </>
                    )}
                </button>
            </form>

            {/* Search Feedback Notification */}
            {searchFeedback && (
                <div
                    className={`flex items-start gap-2 text-xs rounded-xl p-2.5 border transition-all ${
                        searchFeedback.type === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800/60'
                    }`}
                >
                    {searchFeedback.type === 'success' ? (
                        <CheckCircle2 size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    ) : (
                        <AlertTriangle size={15} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                    )}
                    <span className="flex-1">{searchFeedback.message}</span>
                </div>
            )}

            {/* GPS Error Message */}
            {geoError && (
                <div className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-2.5">
                    <AlertTriangle size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>{geoError}</span>
                </div>
            )}

            {/* Form Validation Error */}
            {error && !geoError && !searchFeedback && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
            )}

            {/* Interactive Map Container */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-inner bg-muted/40">
                <div
                    ref={mapContainerRef}
                    className="w-full h-48 sm:h-52 z-0 cursor-crosshair"
                    style={{ minHeight: '190px' }}
                />

                {/* Helper overlay instruction */}
                <div className="absolute top-2 left-2 z-10 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-border/80 text-[11px] text-muted-foreground shadow-sm pointer-events-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Toca o arrastra el pin para fijar tu dirección exacta</span>
                </div>

                {/* GPS Status feedback badge */}
                {gpsSuccess && (
                    <div className="absolute bottom-2 left-2 z-10 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>GPS capturado con éxito</span>
                    </div>
                )}
            </div>

            {/* Coordinates & Google Maps Link Preview */}
            <div className="flex items-center justify-between text-[11px] text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-xl border border-border/50">
                <div className="truncate font-mono">
                    Coords: <span className="text-foreground">{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</span>
                </div>
                <a
                    href={currentMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium shrink-0 ml-2"
                >
                    <span>Ver en Google Maps</span>
                    <ExternalLink size={11} />
                </a>
            </div>
        </div>
    );
}
