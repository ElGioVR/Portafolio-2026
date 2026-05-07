'use client';

import { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

interface VisitCounterProps {
  darkMode?: boolean;
}

export default function VisitCounter({ darkMode }: VisitCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const { t } = useTranslation();
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    const fetchAndUpdateCount = async () => {
      try {
        await signInAnonymously(auth);
        const alreadyVisited = localStorage.getItem('visited');
        const alreadyConfetty = localStorage.getItem('confetty');
        const counterRef = doc(db, 'analytics', 'visitCounter');
        let newCount = 0;
        interface GeoLocation {
          city?: string;
          country_name?: string;
          region?: string;
          latitude?: number;
          longitude?: number;
        }
        let geo: GeoLocation = {};
        try {
          const res = await fetch('https://ipapi.co/json/');
          geo = await res.json();
        } catch {
          geo = {};
        }

        const visitPayload = {
          time_local: new Date().toLocaleString(),
          timestamp: Date.now(),
          location_source: 'browser',
          userAgent: navigator.userAgent,
          city: geo.city,
          country: geo.country_name,
          state: geo.region,
          lat: geo.latitude,
          lon: geo.longitude,
        };

        const docSnap = await getDoc(counterRef);

        if (!alreadyVisited) {
          localStorage.setItem('visited', 'true');

          if (!docSnap.exists()) {
            await setDoc(counterRef, { count: 1 });
            newCount = 1;
          } else {
            const prevCount = docSnap.data().count || 0;
            await updateDoc(counterRef, {
              count: increment(1),
            });
            newCount = prevCount + 1;
          }

          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visit: visitPayload }),
          });

          if (!alreadyConfetty) {
            setTimeout(() => {
              localStorage.setItem('confetty', 'true');
            }, 700);
          }
        } else {
          if (docSnap.exists()) {
            newCount = docSnap.data().count;
          }
        }
        setCount(newCount);
      } catch (error) {
        console.error('Error al actualizar o leer el contador de visitas:', error);
        setCount(null);
      }
    };

    fetchAndUpdateCount();
  }, []);

  return (
    <div>
      <h2>
        {t('visitCounter.uniqueVisits')}:{" "}
        {count !== null ? (
          <span
            style={{
              display: 'inline-block',
              padding: '0.2em .6em',
              borderRadius: '999px',
              background: darkMode ? 'rgba(57, 213, 191, 0.16)' : 'rgba(15, 159, 143, 0.14)',
              color: darkMode ? '#39d5bf' : '#0f766e',
              fontWeight: 600,
              fontSize: '.7em',
            }}
          >
            {count}
          </span>
        ) : (
          t('visitCounter.loading')
        )}
      </h2>
    </div>
  );
}
